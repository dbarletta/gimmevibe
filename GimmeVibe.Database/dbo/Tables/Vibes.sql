CREATE TABLE [dbo].[Vibes] (
    [Id] BIGINT         IDENTITY (1, 1) NOT NULL,
    [DeviceId]       INT         NOT NULL,
    [EmotionId]       INT NOT NULL,
    [PlaceId]      INT NOT NULL,
    [AsteriskId]          INT  NULL,
    [Comment] NCHAR(10) NULL, 
    [CreationDate]  DATETIME  NOT NULL
    CONSTRAINT [PK_Voting] PRIMARY KEY CLUSTERED ([Id] ASC)
);

