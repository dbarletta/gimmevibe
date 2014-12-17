using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using GimmeVibe.Domain.Aggregates;
using GimmeVibe.Domain.Entities;

namespace GimmeVibe.Domain.Infrastructure.EntityFramework
{
    public abstract class RepositoryBase<T> : IRepository<T> where T : class, new()
    {
        protected IContextFactory _factory;
        private List<string> _aggregateTypes;

        public RepositoryBase(IContextFactory factory)
        {
            _factory = factory;
        }


        public bool Any(Expression<Func<T, bool>> predicate)
        {
            using (var db = _factory.Create())
            {
                return db.Set<T>().Any(predicate);
            }
        }


        public T Single(Expression<Func<T, bool>> predicate)
        {
            using (var db = _factory.Create())
            {
                return db.Set<T>().FirstOrDefault(predicate);
            }
        }

        public T Single(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            List<string> includelist = new List<string>();

            foreach (var item in includes)
            {
                MemberExpression body = item.Body as MemberExpression;
                if (body == null)
                    throw new ArgumentException("The body must be a member expression");

                includelist.Add(body.Member.Name);
            }

            using (var db = _factory.Create())
            {
                DbQuery<T> query = db.Set<T>();

                includelist.ForEach(x => query = query.Include(x));

                return query.FirstOrDefault(predicate);
            }
        }


        public List<T> GetAll()
        {
            using (var db = _factory.Create())
            {
                return (List<T>)db.Set<T>().ToList();
            }
        }

        public List<T> GetAll(int page, int pagesize)
        {
            using (var db = _factory.Create())
            {
                return (List<T>)db.Set<T>()
                                  .Skip(pagesize * (page - 1))
                                  .Take(pagesize)
                                  .ToList();
            }
        }

        public List<T> GetAll(params Expression<Func<T, object>>[] includes)
        {
            List<string> includelist = new List<string>();

            foreach (var item in includes)
            {
                MemberExpression body = item.Body as MemberExpression;
                if (body == null)
                    throw new ArgumentException("The body must be a member expression");

                includelist.Add(body.Member.Name);
            }

            using (var db = _factory.Create())
            {
                DbQuery<T> query = db.Set<T>();

                includelist.ForEach(x => query = query.Include(x));

                return (List<T>)query.ToList();
            }

        }

        public List<T> GetAll(int page, int pagesize, params Expression<Func<T, object>>[] includes)
        {
            List<string> includelist = new List<string>();

            foreach (var item in includes)
            {
                MemberExpression body = item.Body as MemberExpression;
                if (body == null)
                    throw new ArgumentException("The body must be a member expression");

                includelist.Add(body.Member.Name);
            }

            using (var db = _factory.Create())
            {
                DbQuery<T> query = db.Set<T>();

                includelist.ForEach(x => query = query.Include(x));

                return (List<T>)query.Skip(pagesize * (page - 1))
                                     .Take(pagesize)
                                     .ToList();
            }

        }



        public List<T> Get(Expression<Func<T, bool>> predicate)
        {
            using (var db = _factory.Create())
            {
                return (List<T>)db.Set<T>().Where(predicate).ToList();
            }
        }

        public List<T> Get(int page, int pagesize, Expression<Func<T, bool>> predicate)
        {
            using (var db = _factory.Create())
            {
                return (List<T>)db.Set<T>()
                                  .Where(predicate)
                                  .Skip(pagesize * (page - 1))
                                  .Take(pagesize)
                                  .ToList();
            }
        }

        public List<T> Get(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            List<string> includelist = new List<string>();

            foreach (var item in includes)
            {
                MemberExpression body = item.Body as MemberExpression;
                if (body == null)
                    throw new ArgumentException("The body must be a member expression");

                includelist.Add(body.Member.Name);
            }

            using (var db = _factory.Create())
            {
                DbQuery<T> query = db.Set<T>();

                includelist.ForEach(x => query = query.Include(x));

                return (List<T>)query.Where(predicate).ToList();
            }
        }

        public List<T> Get(int page, int pagesize, Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            List<string> includelist = new List<string>();

            foreach (var item in includes)
            {
                MemberExpression body = item.Body as MemberExpression;
                if (body == null)
                    throw new ArgumentException("The body must be a member expression");

                includelist.Add(body.Member.Name);
            }

            using (var db = _factory.Create())
            {
                DbQuery<T> query = db.Set<T>();

                includelist.ForEach(x => query = query.Include(x));

                return (List<T>)query.Where(predicate)
                                     .Skip(pagesize * (page - 1))
                                     .Take(pagesize)
                                     .ToList();
            }
        }


        public void Insert(T entity)
        {
            using (var db = _factory.Create())
            {
                db.Set<T>().Add(entity);
                db.SaveChanges();
            }
        }

        public void Update(T entity)
        {
            using (var db = _factory.Create())
            {
                db.Entry<T>(entity).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public void SaveAggregate(T entity)
        {
            Type aggregateType = typeof(T);

            if (!typeof(IAggregate).IsAssignableFrom(aggregateType))
                throw new InvalidOperationException("Entity is not an aggregate. Must implement IAggregate");

            _aggregateTypes = new List<string>();

            using (var ctx = _factory.Create())
            {
                SetEntityState(entity, ctx);
                ctx.SaveChanges();
            }
        }
        

        public void Delete(T entity)
        {
            using (var db = _factory.Create())
            {
                db.Entry(entity).State = EntityState.Deleted;
                db.SaveChanges();
            }
        }

        public void Delete(Expression<Func<T, bool>> predicate)
        {
            using (var db = _factory.Create())
            {
                var entities = db.Set<T>().Where(predicate).ToList();
                entities.ForEach(x => db.Entry(x).State = EntityState.Deleted);
                db.SaveChanges();
            }
        }



        private void SetEntityState(object entity, DbContext ctx)
        {
            Type rootType = entity.GetType();
                        
            //determine root state
            var rootPKProperty = rootType.GetProperty("Id");
            var rootPK = rootPKProperty.GetValue(entity);
            var rootDefaultPK = Activator.CreateInstance(rootPKProperty.PropertyType);
            if (rootPK.Equals(rootDefaultPK))
            {
                ctx.Entry(entity).State = EntityState.Added;
            }
            else
            {
                ctx.Entry(entity).State = EntityState.Modified;
            }

            //determine members state
            foreach (var prop in rootType.GetProperties())
            {
                if (prop.PropertyType.IsClass && typeof(IEntity).IsAssignableFrom(prop.PropertyType))
                {
                    object entityMember = prop.GetValue(entity);
                    if (entityMember != null)
                    {
                        if (!_aggregateTypes.Contains(prop.PropertyType.ToString()))
                        {
                            _aggregateTypes.Add(prop.PropertyType.ToString());
                            SetEntityState(entityMember, ctx);
                        }
                    }
                }
            }
        }

    }
}
