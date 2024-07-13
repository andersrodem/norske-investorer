-- CreateTable
CREATE TABLE "Investor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "minInvestment" DOUBLE PRECISION NOT NULL,
    "maxInvestment" DOUBLE PRECISION NOT NULL,
    "engagementId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorPhase" (
    "investorId" INTEGER NOT NULL,
    "phaseId" INTEGER NOT NULL,

    CONSTRAINT "InvestorPhase_pkey" PRIMARY KEY ("investorId","phaseId")
);

-- CreateTable
CREATE TABLE "InvestorType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "InvestorType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorTypeLink" (
    "investorId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "InvestorTypeLink_pkey" PRIMARY KEY ("investorId","typeId")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestorCity" (
    "investorId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "InvestorCity_pkey" PRIMARY KEY ("investorId","cityId")
);

-- CreateTable
CREATE TABLE "Engagement" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Investor_email_key" ON "Investor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_linkedin_key" ON "Investor"("linkedin");

-- CreateIndex
CREATE UNIQUE INDEX "Phase_name_key" ON "Phase"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InvestorType_name_key" ON "InvestorType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Engagement_type_key" ON "Engagement"("type");

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorPhase" ADD CONSTRAINT "InvestorPhase_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorPhase" ADD CONSTRAINT "InvestorPhase_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorTypeLink" ADD CONSTRAINT "InvestorTypeLink_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorTypeLink" ADD CONSTRAINT "InvestorTypeLink_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "InvestorType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorCity" ADD CONSTRAINT "InvestorCity_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestorCity" ADD CONSTRAINT "InvestorCity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
