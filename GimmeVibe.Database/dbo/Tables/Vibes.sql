CREATE TABLE [dbo].[Vibes] (
    [Id]           BIGINT     IDENTITY (1, 1) NOT NULL,
    [DeviceId]     INT        NOT NULL,
    [EmotionId]    INT        NOT NULL,
    [PlaceId]      INT        NOT NULL,
    [AsteriskId]   INT        NULL,
    [Comment]      NCHAR (10) NULL,
    [CreationDate] DATETIME   NOT NULL,
    CONSTRAINT [PK_Voting] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Vibes_Asterisks] FOREIGN KEY ([AsteriskId]) REFERENCES [dbo].[Asterisks] ([Id]),
    CONSTRAINT [FK_Vibes_Devices] FOREIGN KEY ([DeviceId]) REFERENCES [dbo].[Devices] ([Id]),
    CONSTRAINT [FK_Vibes_Emotions] FOREIGN KEY ([EmotionId]) REFERENCES [dbo].[Emotions] ([Id]),
    CONSTRAINT [FK_Vibes_Places] FOREIGN KEY ([PlaceId]) REFERENCES [dbo].[Places] ([Id])
);



