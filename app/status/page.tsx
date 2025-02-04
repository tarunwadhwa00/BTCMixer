import FindMix from '@/components/pages/FindMixPage'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mix Status | Guacamole' }
export default async function Page() {
  return <FindMix />
}
