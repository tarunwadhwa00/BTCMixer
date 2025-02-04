'use client'

import React, { FC } from 'react'
import Layout from '@/components/Layout'
import { DepositAddress } from '@/services/avocadoService'
import { QrCode } from '@/components/QrCode'
import { DepositAddressList } from '@/components/pages/DepositAddressList'

type MixCreatedPageProps = {
  id: string
  depositAddresses: DepositAddress[]
  amountDeposited: string
}

const MixCreatedPage: FC<MixCreatedPageProps> = ({ id: mixSessionId, depositAddresses }) => {
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div style={{ width: '100%' }}>
              <div className="col-lg-12" style={{ marginTop: '30px' }}>
                <div className="row">
                  <p style={{ fontSize: '16px', textAlign: 'center' }}>
                    <strong>{mixSessionId}</strong> is your Mix Session ID. Save it <b>permanently</b> before continuing or you risk losing
                    your funds.
                  </p>
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="row">
                  <div className="text-container" style={{ margin: '0 auto' }}>
                    <p>DEPOSIT ADDRESSES</p>

                    <DepositAddressList depositAddresses={depositAddresses} />
                  </div>
                </div>
                <div className="row">
                  <div className="text-container" style={{ margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ maxWidth: '700px', margin: '0 auto' }}>
                      <b style={{ color: '#b03e00' }}>
                        Minimum amount is .001 BTC and a random fee upto 2.5% fee will be applied to all transactions.
                      </b>
                      You have 24 hours to fund the address. After 24 hours your session will be removed from our system. You do not need to
                      keep this page open. Please come back after you have funded the mix and click the restore session button. Please note
                      that you will need your session ID from Step 1.
                      <br />
                      <br />
                      If you are funding the address now you can keep this page open and refresh it in a few minutes to see your mix status.
                      If you have any issues please contact support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default MixCreatedPage
