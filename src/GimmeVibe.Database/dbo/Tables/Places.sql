CREATE TABLE [dbo].[Places]
(
	[Id] INT NOT NULL PRIMARY KEY  IDENTITY(1,1), 
    [Name] VARCHAR(100) NOT NULL, 
    [PhotoUrl] VARCHAR(200) NULL, 
    [Rating] VARCHAR(10) NULL, 
    [GooglePlaceId] VARCHAR(100) NOT NULL, 
    [CreationDate] DATETIME NOT NULL
)
