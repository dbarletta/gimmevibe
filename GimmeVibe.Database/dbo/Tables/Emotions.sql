CREATE TABLE [dbo].[Emotions]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Name] VARCHAR(20) NOT NULL, 
    [ImageUri] VARCHAR(100) NOT NULL,
    [ColorRGB] VARCHAR(21) NOT NULL DEFAULT 'rgba(255, 255, 255, 0.5)', 
    [Description] VARCHAR(MAX) NULL
)
