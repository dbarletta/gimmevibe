using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.ExceptionHandling;
using NLog;

namespace GimmeVibe.Server.Filters
{
    public class UnhandledExceptionLogger : ExceptionLogger
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();

        public override void Log(ExceptionLoggerContext context)
        {
            logger.Error(context.Exception.Message, context.Exception);
        }
    }
}