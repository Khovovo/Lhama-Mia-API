BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[TBAVA001] (
    [IDCOL] INT NOT NULL IDENTITY(1,1),
    [NOME] VARCHAR(120) NOT NULL,
    [EMAIL] NVARCHAR(1000) NOT NULL,
    [SENHA] NVARCHAR(1000) NOT NULL,
    [SUPERVISOR] INT,
    [ACESSOSISTEMA] BIT NOT NULL CONSTRAINT [TBAVA001_ACESSOSISTEMA_df] DEFAULT 0,
    [CHEFIA] BIT NOT NULL CONSTRAINT [TBAVA001_CHEFIA_df] DEFAULT 0,
    [STATUS] BIT NOT NULL CONSTRAINT [TBAVA001_STATUS_df] DEFAULT 1,
    [IDEMP] NVARCHAR(1000),
    [ADIMISSAO] DATETIME2 NOT NULL,
    [IDDEP] NVARCHAR(1000) NOT NULL,
    [IDFUNC] NVARCHAR(1000) NOT NULL,
    [PRIMACESSO] BIT,
    CONSTRAINT [TBAVA001_pkey] PRIMARY KEY CLUSTERED ([IDCOL])
);

-- CreateTable
CREATE TABLE [dbo].[TBAVA002] (
    [IDFORM] NVARCHAR(1000) NOT NULL,
    [TITULO] NVARCHAR(1000) NOT NULL,
    [IDUSERCAD] INT NOT NULL,
    [DATACADAST] DATETIME2 NOT NULL CONSTRAINT [TBAVA002_DATACADAST_df] DEFAULT CURRENT_TIMESTAMP,
    [IDUSERMOD] INT,
    [DATAHORASYNC] DATETIME2,
    [COMPETENCIA] DATETIME2 NOT NULL,
    CONSTRAINT [TBAVA002_pkey] PRIMARY KEY CLUSTERED ([IDFORM])
);

-- CreateTable
CREATE TABLE [dbo].[TBAVA003] (
    [IDPER] NVARCHAR(1000) NOT NULL,
    [DESCRICAO] NVARCHAR(1000) NOT NULL,
    [IDFORM] NVARCHAR(1000) NOT NULL,
    [STATUS] BIT NOT NULL CONSTRAINT [TBAVA003_STATUS_df] DEFAULT 1,
    [COMPETENCIA] DATETIME2 NOT NULL,
    [IDUSERCAD] INT NOT NULL,
    [DATACADAST] DATETIME2 NOT NULL CONSTRAINT [TBAVA003_DATACADAST_df] DEFAULT CURRENT_TIMESTAMP,
    [IDUSERMOD] INT,
    [DATAHORASYNC] DATETIME2,
    [INDEX] INT,
    [TIPORESPOSTA] CHAR(1) NOT NULL,
    CONSTRAINT [TBAVA003_pkey] PRIMARY KEY CLUSTERED ([IDPER])
);

-- CreateTable
CREATE TABLE [dbo].[TBAVA004] (
    [IDPERRES] NVARCHAR(1000) NOT NULL,
    [IDUSERRES] INT NOT NULL,
    [IDPER] NVARCHAR(1000) NOT NULL,
    [RESPOSTA] CHAR(1) NOT NULL,
    [OBS] VARCHAR(125),
    CONSTRAINT [TBAVA004_pkey] PRIMARY KEY CLUSTERED ([IDPERRES])
);

-- CreateTable
CREATE TABLE [dbo].[TBAVA005] (
    [IDPERUSU] NVARCHAR(1000) NOT NULL,
    [IDCOL] INT NOT NULL,
    [IDFORM] NVARCHAR(1000) NOT NULL,
    [STATUS] BIT NOT NULL CONSTRAINT [TBAVA005_STATUS_df] DEFAULT 0,
    [AVALIADO] INT,
    [DATACAD] DATETIME2 NOT NULL CONSTRAINT [TBAVA005_DATACAD_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [TBAVA005_pkey] PRIMARY KEY CLUSTERED ([IDPERUSU])
);

-- CreateTable
CREATE TABLE [dbo].[TBAVA006] (
    [IDEMP] NVARCHAR(1000) NOT NULL,
    [RAZSOC] VARCHAR(120) NOT NULL,
    CONSTRAINT [TBAVA006_pkey] PRIMARY KEY CLUSTERED ([IDEMP])
);

-- CreateTable
CREATE TABLE [dbo].[TBAVA007] (
    [IDDEP] NVARCHAR(1000) NOT NULL,
    [DESCRICAO] VARCHAR(80) NOT NULL,
    CONSTRAINT [TBAVA007_pkey] PRIMARY KEY CLUSTERED ([IDDEP])
);

-- CreateTable
CREATE TABLE [dbo].[TBAVA008] (
    [IDFUNCAO] NVARCHAR(1000) NOT NULL,
    [DESCRICAO] VARCHAR(80) NOT NULL,
    [IDDEP] NVARCHAR(1000),
    CONSTRAINT [TBAVA008_pkey] PRIMARY KEY CLUSTERED ([IDFUNCAO])
);

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA001] ADD CONSTRAINT [TBAVA001_IDEMP_fkey] FOREIGN KEY ([IDEMP]) REFERENCES [dbo].[TBAVA006]([IDEMP]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA001] ADD CONSTRAINT [TBAVA001_IDDEP_fkey] FOREIGN KEY ([IDDEP]) REFERENCES [dbo].[TBAVA007]([IDDEP]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA001] ADD CONSTRAINT [TBAVA001_IDFUNC_fkey] FOREIGN KEY ([IDFUNC]) REFERENCES [dbo].[TBAVA008]([IDFUNCAO]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA002] ADD CONSTRAINT [TBAVA002_IDUSERCAD_fkey] FOREIGN KEY ([IDUSERCAD]) REFERENCES [dbo].[TBAVA001]([IDCOL]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA002] ADD CONSTRAINT [TBAVA002_IDUSERMOD_fkey] FOREIGN KEY ([IDUSERMOD]) REFERENCES [dbo].[TBAVA001]([IDCOL]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA003] ADD CONSTRAINT [TBAVA003_IDFORM_fkey] FOREIGN KEY ([IDFORM]) REFERENCES [dbo].[TBAVA002]([IDFORM]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA003] ADD CONSTRAINT [TBAVA003_IDUSERCAD_fkey] FOREIGN KEY ([IDUSERCAD]) REFERENCES [dbo].[TBAVA001]([IDCOL]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA003] ADD CONSTRAINT [TBAVA003_IDUSERMOD_fkey] FOREIGN KEY ([IDUSERMOD]) REFERENCES [dbo].[TBAVA001]([IDCOL]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA004] ADD CONSTRAINT [TBAVA004_IDPER_fkey] FOREIGN KEY ([IDPER]) REFERENCES [dbo].[TBAVA003]([IDPER]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA004] ADD CONSTRAINT [TBAVA004_IDUSERRES_fkey] FOREIGN KEY ([IDUSERRES]) REFERENCES [dbo].[TBAVA001]([IDCOL]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA005] ADD CONSTRAINT [TBAVA005_AVALIADO_fkey] FOREIGN KEY ([AVALIADO]) REFERENCES [dbo].[TBAVA001]([IDCOL]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA005] ADD CONSTRAINT [TBAVA005_IDCOL_fkey] FOREIGN KEY ([IDCOL]) REFERENCES [dbo].[TBAVA001]([IDCOL]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA005] ADD CONSTRAINT [TBAVA005_IDFORM_fkey] FOREIGN KEY ([IDFORM]) REFERENCES [dbo].[TBAVA002]([IDFORM]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TBAVA008] ADD CONSTRAINT [TBAVA008_IDDEP_fkey] FOREIGN KEY ([IDDEP]) REFERENCES [dbo].[TBAVA007]([IDDEP]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
