/*
  Warnings:

  - You are about to drop the column `DTINIRESERVA` on the `TBAVA011` table. All the data in the column will be lost.
  - Added the required column `STATUS` to the `TBAVA011` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TEMPOEMMINUTOS` to the `TBAVA011` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[TBAVA011] DROP COLUMN [DTINIRESERVA];
ALTER TABLE [dbo].[TBAVA011] ADD [FIMRESERVA] DATETIME2,
[IDCOLABORADOR] INT,
[INIRESERVA] DATETIME2,
[STATUS] BIT NOT NULL,
[TEMPOEMMINUTOS] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[TBAVA012] (
    [IDDIA] NVARCHAR(1000) NOT NULL,
    [DIA] DATETIME2 NOT NULL,
    [Status] BIT NOT NULL CONSTRAINT [TBAVA012_Status_df] DEFAULT 0,
    CONSTRAINT [TBAVA012_pkey] PRIMARY KEY CLUSTERED ([IDDIA])
);

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA011] ADD CONSTRAINT [TBAVA011_IDRECURSO_fkey] FOREIGN KEY ([IDRECURSO]) REFERENCES [dbo].[TBAVA010]([IDRECURSO]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA011] ADD CONSTRAINT [TBAVA011_IDCOLABORADOR_fkey] FOREIGN KEY ([IDCOLABORADOR]) REFERENCES [dbo].[TBAVA001]([IDCOL]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
