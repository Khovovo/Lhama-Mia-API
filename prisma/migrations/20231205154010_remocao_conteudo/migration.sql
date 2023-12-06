/*
  Warnings:

  - You are about to drop the column `ADIMISSAO` on the `Usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `PRIMACESSO` on the `Usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `SUPERVISOR` on the `Usuarios` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Usuarios] DROP COLUMN [ADIMISSAO],
[PRIMACESSO],
[SUPERVISOR];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
