/*
  Warnings:

  - The primary key for the `TBAVA011` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DESCRICAO` on the `TBAVA011` table. All the data in the column will be lost.
  - You are about to drop the column `IDDEP` on the `TBAVA011` table. All the data in the column will be lost.
  - You are about to drop the column `IDFUNCAO` on the `TBAVA011` table. All the data in the column will be lost.
  - Added the required column `DTINIRESERVA` to the `TBAVA011` table without a default value. This is not possible if the table is not empty.
  - The required column `IDRESERVA` was added to the `TBAVA011` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `OBSERVACAO` to the `TBAVA011` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[TBAVA010] DROP CONSTRAINT [TBAVA010_STATUS_df];
ALTER TABLE [dbo].[TBAVA010] ALTER COLUMN [TIPO] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[TBAVA010] ADD CONSTRAINT [TBAVA010_STATUS_df] DEFAULT 1 FOR [STATUS];

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'TBAVA011'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_TBAVA011] (
    [IDRESERVA] NVARCHAR(1000) NOT NULL,
    [OBSERVACAO] VARCHAR(80) NOT NULL,
    [IDRECURSO] NVARCHAR(1000),
    [DTINIRESERVA] DATETIME2 NOT NULL,
    CONSTRAINT [TBAVA011_pkey] PRIMARY KEY CLUSTERED ([IDRESERVA])
);
IF EXISTS(SELECT * FROM [dbo].[TBAVA011])
    EXEC('INSERT INTO [dbo].[_prisma_new_TBAVA011] () SELECT  FROM [dbo].[TBAVA011] WITH (holdlock tablockx)');
DROP TABLE [dbo].[TBAVA011];
EXEC SP_RENAME N'dbo._prisma_new_TBAVA011', N'TBAVA011';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA010] ADD CONSTRAINT [TBAVA010_TIPO_fkey] FOREIGN KEY ([TIPO]) REFERENCES [dbo].[TBAVA009]([IDTIPORECURSO]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
