// app/api/investors/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request: Request) {
  const {
    name,
    contactName,
    email,
    linkedin,
    website,
    minInvestment,
    maxInvestment,
    engagementId,
    phases,
    investorTypes,
    cities
  } = await request.json()

  try {
    const investor = await prisma.investor.create({
      data: {
        name,
        contactName,
        email,
        linkedin,
        website,
        minInvestment,
        maxInvestment,
        engagementId,
        phases: {
          create: phases.map((phaseId: number) => ({ phaseId }))
        },
        investorTypes: {
          create: investorTypes.map((typeId: number) => ({ typeId }))
        },
        cities: {
          create: cities.map((cityId: number) => ({ cityId }))
        }
      }
    })
    return NextResponse.json(investor, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error creating investor' }, { status: 500 })
  }
}
