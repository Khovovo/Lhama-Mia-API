/*
  Warnings:

  - You are about to drop the `TBAVA012` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA013` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TBAVA014` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA013] DROP CONSTRAINT [TBAVA013_IDCOLABORADOR_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA014] DROP CONSTRAINT [TBAVA014_IDCOLABORADOR_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[TBAVA014] DROP CONSTRAINT [TBAVA014_IDPUBLI_fkey];

-- DropTable
DROP TABLE [dbo].[TBAVA012];

-- DropTable
DROP TABLE [dbo].[TBAVA013];

-- DropTable
DROP TABLE [dbo].[TBAVA014];

-- CreateTable
CREATE TABLE [dbo].[NivelAcesso] (
    [idNivel] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [NivelAcesso_pkey] PRIMARY KEY CLUSTERED ([idNivel])
);

-- CreateTable
CREATE TABLE [dbo].[Usuario] (
    [Login] NVARCHAR(1000) NOT NULL,
    [senha] NVARCHAR(1000) NOT NULL,
    [idNivel] INT NOT NULL,
    [nomeFuncionario] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Usuario_pkey] PRIMARY KEY CLUSTERED ([Login])
);

-- CreateTable
CREATE TABLE [dbo].[Metas] (
    [idPercentual] INT NOT NULL IDENTITY(1,1),
    [meta1] FLOAT(53) NOT NULL,
    [meta2] FLOAT(53) NOT NULL,
    [meta3] FLOAT(53) NOT NULL,
    CONSTRAINT [Metas_pkey] PRIMARY KEY CLUSTERED ([idPercentual])
);

-- CreateTable
CREATE TABLE [dbo].[Pedido] (
    [idPedido] INT NOT NULL IDENTITY(1,1),
    [quantidade] INT NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Pedido_status_df] DEFAULT 1,
    [Usuario] NVARCHAR(1000) NOT NULL,
    [idComanda] INT NOT NULL,
    [dataPedido] DATETIME2 NOT NULL CONSTRAINT [Pedido_dataPedido_df] DEFAULT CURRENT_TIMESTAMP,
    [idItem] INT NOT NULL,
    CONSTRAINT [Pedido_pkey] PRIMARY KEY CLUSTERED ([idPedido])
);

-- CreateTable
CREATE TABLE [dbo].[Cardapio] (
    [idItem] INT NOT NULL IDENTITY(1,1),
    [categoria] INT NOT NULL,
    [statusItem] BIT NOT NULL CONSTRAINT [Cardapio_statusItem_df] DEFAULT 1,
    [nomeItem] NVARCHAR(1000) NOT NULL,
    [preco] FLOAT(53) NOT NULL,
    [descricao] NVARCHAR(1000) NOT NULL,
    [descricaoStatus] NVARCHAR(1000),
    CONSTRAINT [Cardapio_pkey] PRIMARY KEY CLUSTERED ([idItem])
);

-- CreateTable
CREATE TABLE [dbo].[Categoria] (
    [idCategoria] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Categoria_pkey] PRIMARY KEY CLUSTERED ([idCategoria])
);

-- CreateTable
CREATE TABLE [dbo].[ComandaMesa] (
    [idComanda] INT NOT NULL IDENTITY(1,1),
    [idMesa] INT NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [ComandaMesa_status_df] DEFAULT 1,
    [observacoes] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ComandaMesa_pkey] PRIMARY KEY CLUSTERED ([idComanda])
);

-- CreateTable
CREATE TABLE [dbo].[Mesa] (
    [idMesa] INT NOT NULL IDENTITY(1,1),
    [numeroMesa] INT NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Mesa_status_df] DEFAULT 1,
    CONSTRAINT [Mesa_pkey] PRIMARY KEY CLUSTERED ([idMesa])
);

-- CreateTable
CREATE TABLE [dbo].[BonusGarcom] (
    [idBonus] INT NOT NULL IDENTITY(1,1),
    [diaReferencia] DATETIME2 NOT NULL CONSTRAINT [BonusGarcom_diaReferencia_df] DEFAULT CURRENT_TIMESTAMP,
    [porcentagem] FLOAT(53) NOT NULL,
    [idPedido] INT NOT NULL,
    [valor] FLOAT(53) NOT NULL,
    CONSTRAINT [BonusGarcom_pkey] PRIMARY KEY CLUSTERED ([idBonus])
);

-- AddForeignKey
ALTER TABLE [dbo].[Usuario] ADD CONSTRAINT [Usuario_idNivel_fkey] FOREIGN KEY ([idNivel]) REFERENCES [dbo].[NivelAcesso]([idNivel]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Pedido] ADD CONSTRAINT [Pedido_idItem_fkey] FOREIGN KEY ([idItem]) REFERENCES [dbo].[Cardapio]([idItem]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Pedido] ADD CONSTRAINT [Pedido_Usuario_fkey] FOREIGN KEY ([Usuario]) REFERENCES [dbo].[Usuario]([Login]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Pedido] ADD CONSTRAINT [Pedido_idComanda_fkey] FOREIGN KEY ([idComanda]) REFERENCES [dbo].[ComandaMesa]([idComanda]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Cardapio] ADD CONSTRAINT [Cardapio_categoria_fkey] FOREIGN KEY ([categoria]) REFERENCES [dbo].[Categoria]([idCategoria]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ComandaMesa] ADD CONSTRAINT [ComandaMesa_idMesa_fkey] FOREIGN KEY ([idMesa]) REFERENCES [dbo].[Mesa]([idMesa]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BonusGarcom] ADD CONSTRAINT [BonusGarcom_idPedido_fkey] FOREIGN KEY ([idPedido]) REFERENCES [dbo].[Pedido]([idPedido]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
