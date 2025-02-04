import React, { FC } from 'react'
import { DepositAddress } from '@/services/avocadoService'
import { QrCode } from '@/components/QrCode'

type DepositAddressListProps = {
  depositAddresses: DepositAddress[]
}
export const DepositAddressList: FC<DepositAddressListProps> = ({ depositAddresses }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {depositAddresses.map((address) => {
        return (
          <div className="col" key={address.address}>
            <div className="card">
              <div className="row g-0">
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <QrCode value={address.address} />
                </div>
                <div className="col-8">
                  <div className="card-body ps-0">
                    <div className="vstack gap-2">
                      <h6 className="card-subtitle pt-3 text-body-secondary">{address.address}</h6>
                      <div className="card-text">
                        <div className="hstack gap-3 py-2">
                          <div className="pe-2">
                            Balance
                            <br />
                            <strong>{address.amount_deposited ?? 0.0} BTC</strong>
                          </div>
                          <span className="vr"></span>
                          <div className="pr-2">
                            Confirmations
                            <br />
                            <strong>{address?.confirmations ?? 0} / 6</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="card-footer">
                    <small className="text-body-secondary">3 mins ago&nbsp;—&nbsp;</small>
                    <small className="text-truncate">
                      <a href={`https://live.blockcypher.com/btc-testnet/address/${address.address}`} className="card-link text-truncate">
                        {address.source_address ?? 'View on Blockcypher'}
                      </a>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
