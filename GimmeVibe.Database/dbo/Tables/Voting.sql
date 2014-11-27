CREATE TABLE [dbo].[Voting] (
    [idTransaction] BIGINT         IDENTITY (1, 1) NOT NULL,
    [IdVoter]       BIGINT         NOT NULL,
    [Emotion]       NVARCHAR (500) NOT NULL,
    [Location]      NVARCHAR (500) NOT NULL,
    [Code]          NVARCHAR (50)  NOT NULL,
    [VotationTime]  DATETIME2 (7)  NOT NULL,
    CONSTRAINT [PK_Voting] PRIMARY KEY CLUSTERED ([idTransaction] ASC)
);

