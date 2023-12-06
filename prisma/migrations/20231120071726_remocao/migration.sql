/*
  Warnings:

  - You are about to drop the column `Usuario` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the `Metas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NivelAcesso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA001` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA002` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA003` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA004` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA005` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA006` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA007` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA008` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA009` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA010` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA011` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Colaborador` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Pedido] DROP CONSTRAINT [Pedido_Usuario_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA001] DROP CONSTRAINT [TBAVA001_IDDEP_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA001] DROP CONSTRAINT [TBAVA001_IDEMP_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA001] DROP CONSTRAINT [TBAVA001_IDFUNC_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA002] DROP CONSTRAINT [TBAVA002_IDUSERCAD_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA002] DROP CONSTRAINT [TBAVA002_IDUSERMOD_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA003] DROP CONSTRAINT [TBAVA003_IDFORM_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA003] DROP CONSTRAINT [TBAVA003_IDUSERCAD_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA003] DROP CONSTRAINT [TBAVA003_IDUSERMOD_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA004] DROP CONSTRAINT [TBAVA004_IDPER_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA004] DROP CONSTRAINT [TBAVA004_IDPERUSU_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA004] DROP CONSTRAINT [TBAVA004_IDUSERRES_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA005] DROP CONSTRAINT [TBAVA005_AVALIADO_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA005] DROP CONSTRAINT [TBAVA005_IDCOL_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA005] DROP CONSTRAINT [TBAVA005_IDFORM_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA008] DROP CONSTRAINT [TBAVA008_IDDEP_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA010] DROP CONSTRAINT [TBAVA010_TIPO_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA011] DROP CONSTRAINT [TBAVA011_IDCOLABORADOR_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA011] DROP CONSTRAINT [TBAVA011_IDRECURSO_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Usuario] DROP CONSTRAINT [Usuario_idNivel_fkey];

-- AlterTable
ALTER TABLE [dbo].[Pedido] DROP COLUMN [Usuario];
ALTER TABLE [dbo].[Pedido] ADD [Colaborador] INT NOT NULL;

-- DropTable
DROP TABLE [dbo].[Metas];

-- DropTable
DROP TABLE [dbo].[NivelAcesso];

-- DropTable
DROP TABLE [dbo].[TBAVA001];

-- DropTable
DROP TABLE [dbo].[TBAVA002];

-- DropTable
DROP TABLE [dbo].[TBAVA003];

-- DropTable
DROP TABLE [dbo].[TBAVA004];

-- DropTable
DROP TABLE [dbo].[TBAVA005];

-- DropTable
DROP TABLE [dbo].[TBAVA006];

-- DropTable
DROP TABLE [dbo].[TBAVA007];

-- DropTable
DROP TABLE [dbo].[TBAVA008];

-- DropTable
DROP TABLE [dbo].[TBAVA009];

-- DropTable
DROP TABLE [dbo].[TBAVA010];

-- DropTable
DROP TABLE [dbo].[TBAVA011];

-- DropTable
DROP TABLE [dbo].[Usuario];

-- CreateTable
CREATE TABLE [dbo].[Usuarios] (
    [IDCOL] INT NOT NULL IDENTITY(1,1),
    [NOME] VARCHAR(120) NOT NULL,
    [EMAIL] NVARCHAR(1000) NOT NULL,
    [SENHA] NVARCHAR(1000) NOT NULL,
    [SUPERVISOR] INT,
    [ACESSOSISTEMA] BIT NOT NULL CONSTRAINT [Usuarios_ACESSOSISTEMA_df] DEFAULT 0,
    [CHEFIA] BIT NOT NULL CONSTRAINT [Usuarios_CHEFIA_df] DEFAULT 0,
    [STATUS] BIT NOT NULL CONSTRAINT [Usuarios_STATUS_df] DEFAULT 1,
    [ADIMISSAO] DATETIME2 NOT NULL,
    [PRIMACESSO] BIT,
    CONSTRAINT [Usuarios_pkey] PRIMARY KEY CLUSTERED ([IDCOL])
);

-- AddForeignKey
ALTER TABLE [dbo].[Pedido] ADD CONSTRAINT [Pedido_Colaborador_fkey] FOREIGN KEY ([Colaborador]) REFERENCES [dbo].[Usuarios]([IDCOL]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
