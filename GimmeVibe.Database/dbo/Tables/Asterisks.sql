CREATE TABLE [dbo].[Asterisks] (
    [Id]           INT          NOT NULL,
    [Code]         VARCHAR (50) NOT NULL,
    [CreationDate] DATETIME     NOT NULL,
    [PlaceId]      INT          NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Asterisks_Places] FOREIGN KEY ([PlaceId]) REFERENCES [dbo].[Places] ([Id])
);


