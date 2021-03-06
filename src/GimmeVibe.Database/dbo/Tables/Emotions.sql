﻿CREATE TABLE [dbo].[Emotions]
(
	[Id] INT NOT NULL PRIMARY KEY  IDENTITY(1,1), 
    [Name] VARCHAR(20) NOT NULL, 
    [ImageUri] VARCHAR(100) NOT NULL,
    [ColorRGB] VARCHAR(30) NOT NULL DEFAULT 'rgba(255, 255, 255, 0.5)', 
    [Description] VARCHAR(MAX) NULL
)
