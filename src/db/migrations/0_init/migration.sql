-- CreateTable
CREATE TABLE "institutions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "institutionId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "start_at" TIMESTAMPTZ(6),
    "end_at" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "publication_date" TIMESTAMPTZ(6),

    CONSTRAINT "competitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitionTeams" (
    "id" SERIAL NOT NULL,
    "donation_count" INTEGER DEFAULT 0,
    "teamId" INTEGER,
    "competitionId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competitionTeams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(255),
    "user_email" VARCHAR(255),
    "competitionTeamId" INTEGER,
    "competitionId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "institutions_name_key" ON "institutions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_institutionId_key" ON "teams"("name", "institutionId");

-- CreateIndex
CREATE INDEX "competitions_end_at" ON "competitions"("end_at");

-- CreateIndex
CREATE INDEX "competitions_start_at" ON "competitions"("start_at");

-- CreateIndex
CREATE UNIQUE INDEX "competitionTeams_competitionId_teamId_key" ON "competitionTeams"("competitionId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "donations_user_email_competitionId_key" ON "donations"("user_email", "competitionId");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "competitionTeams" ADD CONSTRAINT "competitionTeams_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "competitionTeams" ADD CONSTRAINT "competitionTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_competitionTeamId_fkey" FOREIGN KEY ("competitionTeamId") REFERENCES "competitionTeams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

