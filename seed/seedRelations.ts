import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const phases = [
    { name: 'Angel' },
    { name: 'Pre-Seed' },
    { name: 'Seed' },
    { name: 'Series A' },
    { name: 'Series B' },
    { name: 'Series C' },
    { name: 'Series D+' },
    { name: 'Debt Financing' },
    { name: 'Equity Crowdfunding' },
    { name: 'Grant' },
    { name: 'Initial Coin Offering' },
    { name: 'Non-equity Assistance' },
    { name: 'Post-IPO Equity' },
    { name: 'Secondary Market' },
    { name: 'Undisclosed' }
  ]

  const investorTypes = [
    { name: 'Accelerator' },
    { name: 'Angel' },
    { name: 'Venture Capital' },
    { name: 'Private Equity' },
    { name: 'Family Office' },
    { name: 'Corporate' },
    { name: 'Crowdfunding' },
    { name: 'Government' },
    { name: 'Non-Profit' },
    { name: 'Other' }
  ]

  const cities = [
    { name: 'Oslo' },
    { name: 'Bergen' },
    { name: 'Trondheim' },
    { name: 'Stavanger' },
    { name: 'Tromsø' },
    { name: 'Kristiansand' },
    { name: 'Ålesund' },
    { name: 'Molde' },
    { name: 'Haugesund' },
    { name: 'Fredrikstad' },
    { name: 'Drammen' },
    { name: 'Sandnes' },
    { name: 'Skien' },
    { name: 'Sarpsborg' },
    { name: 'Bodø' },
    { name: 'Sandefjord' },
    { name: 'Arendal' },
    { name: 'Hamar' },
    { name: 'Ytrebygda' },
    { name: 'Larvik' },
    { name: 'Halden' },
    { name: 'Askøy' },
    { name: 'Moss' },
    { name: 'Harstad' },
    { name: 'Lillehammer' },
    { name: 'Molde' },
    { name: 'Gjøvik' },
    { name: 'Kongsberg' },
    { name: 'Horten' },
    { name: 'Ås' },
    { name: 'Elverum' },
    { name: 'Kongsvinger' },
    { name: 'Jessheim' },
    { name: 'Narvik' },
    { name: 'Lillestrøm' },
    { name: 'Mo i Rana' },
    { name: 'Hønefoss' },
    { name: 'Leirvik' },
    { name: 'Vennesla' },
    { name: 'Førde' },
    { name: 'Holmestrand' },
    { name: 'Drøbak' },
    { name: 'Sandnessjøen' },
    { name: 'Sogndal' },
    { name: 'Brumunddal' },
    { name: 'Namsos' },
    { name: 'Fauske' },
    { name: 'Florø' },
    { name: 'Ørsta' },
    { name: 'Risør' },
    { name: 'Svelvik' },
    { name: 'Kragerø' },
    { name: 'Flekkefjord' },
    { name: 'Volda' },
    { name: 'Lillesand' },
    { name: 'Mandal' },
    { name: 'Hokksund' },
    { name: 'Stjørdalshalsen' },
  ]

  await prisma.phase.createMany({ data: phases })
  await prisma.investorType.createMany({ data: investorTypes })
  await prisma.city.createMany({ data: cities })

  console.log('Seed data for phases, investor types, and cities inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
