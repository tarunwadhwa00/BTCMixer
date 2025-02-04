import { Metadata } from 'next'

import MixCompletePage from '@/components/pages/MixCompletePage'
import { getAmountDeposited, getDepositAddress, getMixStatus } from '@/services/avocadoService'
import MixCreatedPage from '@/components/pages/MixCreatedPage'
import MixDepositedPage from '@/components/pages/MixDepositedPage'

export const metadata: Metadata = { title: 'Mix Status | Crypto Mixer' }

async function fetchMixStatus(id) {
  try {
    return getMixStatus(id)
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

async function fetchDepositAddresses(id) {
  try {
    return getDepositAddress(id)
  } catch (error) {
    throw new Error('Failed to fetch deposit wallets')
  }
}

async function fetchAmountDeposited(id) {
  try {
    return getAmountDeposited(id)
  } catch (error) {
    throw new Error('Failed to fetch deposit wallets')
  }
}

export default async function Page({ params: { id } }) {
  const { status } = await fetchMixStatus(id)

  if (status === 'Pending Start' || status === 'Depositing') {
    const { deposit_addresses: depositAddresses } = await fetchDepositAddresses(id)
    const { amount_deposited: amountDeposited } = await fetchAmountDeposited(id)
    return <MixCreatedPage id={id} amountDeposited={amountDeposited} depositAddresses={depositAddresses} />
  }

  if (status === 'Deposited') {
    const { deposit_addresses: depositAddresses } = await fetchDepositAddresses(id)
    const { amount_deposited: amountDeposited } = await fetchAmountDeposited(id)
    return <MixDepositedPage amountDeposited={amountDeposited} depositAddresses={depositAddresses} />
  }

  if (status === 'Mixing' || status === 'Mixed') {
    return <MixCompletePage id={id} status={status}/>
  }

  return <>Status: {status}</>
}
