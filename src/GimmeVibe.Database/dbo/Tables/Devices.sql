CREATE TABLE [dbo].[Devices]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [UUID] VARCHAR(MAX) NOT NULL,
    [Platform] VARCHAR(50) NULL, 
    [Version] VARCHAR(50) NULL, 
    [Model] VARCHAR(50) NULL, 
    [CreationDate] DATETIME NOT NULL
)
