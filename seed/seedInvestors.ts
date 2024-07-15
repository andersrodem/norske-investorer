import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function getPhaseId(name: string) {
  const phase = await prisma.phase.findUnique({ where: { name } });
  if (!phase) throw new Error(`Phase with name "${name}" not found`);
  return phase.id;
}

async function getInvestorTypeId(name: string) {
  const investorType = await prisma.investorType.findUnique({
    where: { name },
  });
  if (!investorType)
    throw new Error(`InvestorType with name "${name}" not found`);
  return investorType.id;
}

async function getCityId(name: string) {
  const city = await prisma.city.findUnique({ where: { name } });
  if (!city) throw new Error(`City with name "${name}" not found`);
  return city.id;
}
async function getEngagementId(type: string) {
  const engagement = await prisma.engagement.findUnique({ where: { type } });
  if (!engagement) throw new Error(`Engagement with type "${type}" not found`);
  return engagement.id;
}

async function main() {
  const dataPath = path.join(__dirname, "data.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  for (const investor of data) {
    const phaseIds = await Promise.all(investor.phases.map(getPhaseId));
    const investorTypeIds = await Promise.all(
      investor.investorTypes.map(getInvestorTypeId)
    );
    const cityIds = await Promise.all(investor.cities.map(getCityId));
    const engagementId = await getEngagementId(investor.engagement);

    await prisma.investor.create({
      data: {
        name: investor.name,
        contactName: investor.contactName,
        email: investor.email,
        linkedin: investor.linkedin,
        website: investor.website,
        minInvestment: investor.minInvestment,
        maxInvestment: investor.maxInvestment,
        engagementId,
        phases: {
          create: phaseIds.map((phaseId) => ({ phaseId })),
        },
        investorTypes: {
          create: investorTypeIds.map((typeId) => ({ typeId })),
        },
        cities: {
          create: cityIds.map((cityId) => ({ cityId })),
        },
      },
    });
  }

  console.log("Investor data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
