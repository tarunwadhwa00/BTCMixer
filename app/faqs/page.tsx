import { Metadata } from 'next'
import Faqs from '../../data/faqs.json'
import { FaqPage } from '@/components/pages/FaqPage'
import { Faq } from '../../interfaces'
export const metadata: Metadata = {
  title: 'FAQ | Super Coin Laundry',
}

async function getData(): Promise<{ faqs: Faq[] }> {
  return { faqs: Faqs }
}
export default async function Page() {
  const data = await getData()
  return <FaqPage {...data} />
}
