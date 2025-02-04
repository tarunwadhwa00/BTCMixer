'use client'

import React, { FC, MouseEvent, ReactElement, useState } from 'react'
import Layout from '@/components/Layout'
import { Button } from '@/components/Button'

import type { DepositAddress } from '@/services/avocadoService'
import Swal from 'sweetalert2'
import { postStartMixSession } from '@/services/avocadoService'
import { DepositAddressList } from '@/components/pages/DepositAddressList'

interface MixDepositedPageProps {
  id?: string
  amountDeposited: string
  depositAddresses: DepositAddress[]
  status?: string
}

const MixDepositedPage: FC<MixDepositedPageProps> = ({ id, amountDeposited, depositAddresses }): ReactElement => {
  const [loading, setLoading] = useState(false)

  const startMix = async (id) => {
    const response = await Swal.fire({
      title: 'Are you sure you want to Start the Mix?',
      showDenyButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't Start`,
    })

    if (response.isConfirmed) {
      await postStartMixSession(id)
    } else if (response.isDenied) {
      Swal.fire('Cancelled', '', 'info')
    }
  }

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await startMix(id)
    } catch (error) {
      Swal.fire('Error', error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <main className="container-fluid bg-body-tertiary">
        <div className="col-12 col-lg-8 mx-auto p-4 py-md-5">
          <div className="row">
            <div className="col-12">
              <h1 className="text-body-emphasis">Deposit Detected</h1>
              <p className="lead col-10">Transactions found for the designated addresses</p>
            </div>
          </div>
          <div className="row h-100">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="text-container" style={{ margin: '0 auto' }}>
                      <p>DEPOSIT ADDRESSES</p>
                    </div>
                  </div>
                  <div className="row">
                    <DepositAddressList depositAddresses={depositAddresses} />
                  </div>
                  <div className="row">
                    <div className="text-container" style={{ margin: '0 auto', textAlign: 'center' }}>
                      <p style={{ maxWidth: '700px', margin: '0 auto' }}>
                        A total deposit of {amountDeposited} was detected. Your mixing will start according to the schedule chosen by you.
                        Please refresh this page after some time when mixing is complete.
                        <br />
                        Once all of your deposit are complete please click the Start Mix button
                        <br />
                        <b style={{ color: '#ff0000' }}>Do not Click Start Mix until all your Bitcoin deposits are showing.</b>
                        <form
                          className="mbr-form form-with-styler align-center"
                          style={{ margin: '0 auto', display: 'block', marginTop: '30px' }}
                        >
                          <div className="form-row">
                            <div
                              className="col-lg-12 col-md-12 col-sm-12 form-group m-auto"
                              style={{ marginBottom: '30px !important', textAlign: 'center' }}
                              data-for="email"
                            >
                              <Button variant="primary" onClick={handleClick}>
                                {loading ? 'Starting...' : 'Start Mix'}
                              </Button>
                            </div>
                          </div>
                        </form>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
export default MixDepositedPage
