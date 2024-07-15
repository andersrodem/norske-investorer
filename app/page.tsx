// app/page.tsx
import { prisma } from '../lib/prisma'
import { GetServerSideProps } from 'next'

async function getInvestors(query: string) {
  return await prisma.investor.findMany({
    where: {
      OR: [
        { name: { search: query } },
        { contactName: { search: query } },
        { email: { search: query } },
      ],
    },
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
}

interface HomeProps {
  searchParams: { q?: string }
}

export default async function Home({ searchParams }: HomeProps) {
  const query = searchParams?.q || ''
  const investors = await getInvestors(query)

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Investors</h1>
      <form method="get">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search investors"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {investors.map((investor) => (
          <li key={investor.id}>
            {investor.name} - {investor.email}
            <ul>
              <li>LinkedIn: <a href={investor.linkedin}>{investor.linkedin}</a></li>
              <li>Website: <a href={investor.website}>{investor.website}</a></li>
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
