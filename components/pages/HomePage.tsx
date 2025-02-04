'use client'

import Layout from '../Layout'
import { Metadata } from 'next'
import { Button } from '../Button'
import { useRouter } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Home | Crypto Incognito',
}

export default function HomePage() {
  const router = useRouter()

  return (
    <Layout>
      <main className="main flex-fill ">
        <div className="d-flex position-relative px-4 p-md-5 text-center bg-body-tertiary h-100 justify-content-center align-items-center">
          <div className="col-md-6 col-xxl-4 p-lg-5 mx-auto my-5">
            <h1 className="display-3 fw-bold">Crypto Mixer</h1>
            <h3 className="fw-normal text-muted mb-3">Uses smart technology to make your transactions 100% anonymous </h3>
            <div className="d-flex gap-3 justify-content-center lead fw-normal">
              <Button variant={'primary'} onClick={() => router.push('/start')}>
                Start Mixing
                <svg style={{ width: '1em', height: '1em', fill: 'currentcolor' }} className={'ms-1'}>
                  <use xlinkHref="#chevron-right" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
