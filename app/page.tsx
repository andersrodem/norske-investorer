// app/page.tsx
import { prisma } from '../lib/prisma'

export default async function Home() {
  const investors = await prisma.investor.findMany({
    include: {
      engagement: true,
      phases: {
        include: {
          phase: true,
        },
      },
      investorTypes: {
        include: {
          type: true,
        },
      },
      cities: {
        include: {
          city: true,
        },
      },
    },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Investors</h1>
      <ul>
        {investors.map((investor) => (
          <li key={investor.id}>
            {investor.name} - {investor.email}
            <ul>
              <li>LinkedIn: {investor.linkedin}</li>
              <li>Website: {investor.website}</li>
              <li>Engagement: {investor.engagement.type}</li>
              <li>Phases: {investor.phases.map(p => p.phase.name).join(', ')}</li>
              <li>Types: {investor.investorTypes.map(t => t.type.name).join(', ')}</li>
              <li>Cities: {investor.cities.map(c => c.city.name).join(', ')}</li>
              <li>Min Investment: {investor.minInvestment}</li>
              <li>Max Investment: {investor.maxInvestment}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
