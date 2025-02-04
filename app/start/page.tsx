import { Metadata } from 'next'
import MixStartPage from '@/components/pages/MixStartPage'

export const metadata: Metadata = { title: 'Start Mix | Guacamole' }

async function getData() {
  const days = []
  const distributions = []

  for (let i = 1; i <= 30; i++) {
    days.push(i)
  }

  distributions.push(1, 5)

  for (let i = 10; i <= 100; i++) {
    distributions.push(i)
  }

  const arrays = { days: days, distributions: distributions }

  return { arrays }
}

export default async function Page() {
  const data = await getData()
  return <MixStartPage {...data} />
}
