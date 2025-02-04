'use client'

// Dependencies
import { useEffect, useState, ReactElement } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

// Components
import Layout from '@/components/Layout'
import { getMixes, postTransferAll } from '@/services/avocadoService'

function MixCompletePage({ id: mixSessionId, status }): ReactElement {
  const apiUrl = 'https://example.com/api/'

  const [mixes, setMixes] = useState([])
  const [amount_mixed, setAmountMixed] = useState([])
  const [amount_live, setAmountLive] = useState([])

  async function showKey(e) {
    e.preventDefault()
    console.log(e)
    const private_key = e.target.dataset.private_key

    await Swal.fire('Private Key', private_key, 'success')
  }

  async function transfer(e) {
    e.preventDefault()
    console.log(e)
    const mix_id = e.target.dataset.mix_id
    // const balance = e.target.dataset.balance
    const live_balance = e.target.dataset.live_balance

    const { value: formValues } = await Swal.fire({
      title: 'Transfer Balance',
      showCancelButton: true,
      width: '600px',
      confirmButtonText: 'Withdraw',
      html:
        'Maximum Withdrawal: ' +
        live_balance +
        ' BTC' +
        '<input type="text" id="swal-input1" class="swal2-input" placeholder="Enter Withdrawal Address" style="width: 450px">' +
        '<input type="number" step="0.000001" min=0 max="' +
        live_balance +
        '" id="swal-input2" class="swal2-input" placeholder="Enter Amount to Withdraw">',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById('swal-input1').value, document.getElementById('swal-input2').value]
      },
    })

    if (formValues) {
      const withdrawal_address = formValues[0]
      const withdrawal_amount = formValues[1]

      const data = {
        mix_session_id: mixSessionId,
        mix_id: mix_id,
        withdrawal_amount: withdrawal_amount,
        withdrawal_address: withdrawal_address,
      }

      axios
        .post(apiUrl + `/api/transfer.php`, data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .then((res) => {
          console.log(res)
          if (res.data.success === 1) {
            Swal.fire('Success!', res.data.message, 'success')
          } else if (res.data.success === 0) {
            Swal.fire('Error!', res.data.message, 'error')
          }
        })
        .catch(function (error) {
          if (error.response) {
            const errors = error.response.data.errors
            let err_txt = ''
            for (const property in errors) {
              err_txt += property + '-' + errors[property]
            }

            Swal.fire(error.response.data.message, err_txt, 'error')
          }
        })
    }
  }

  async function transferAll(e) {
    e.preventDefault()

    const { value } = await Swal.fire({
      title: 'Transfer All Balances',
      html: 'Please input withdrawal address <br/>(Max Withdrawal: ' + amount_live + ' BTC)',
      input: 'text',
      inputPlaceholder: 'Enter Withdrawal Address',
      showCancelButton: true,
    })

    if (value) {
      const data = {
        mix_session_id: mixSessionId,
        withdrawal_address: value,
      }

      try {
        const res = await postTransferAll(data)

        if (res.success === 1) {
          await Swal.fire('Success!', res.message, 'success')
        } else if (res.success === 0) {
          await Swal.fire('Error!', res.message, 'error')
        }
      } catch (error) {
        if (error.response) {
          const errors = error.response.data.errors
          let err_txt = ''
          for (const property in errors) {
            err_txt += property + '-' + errors[property]
          }

          await Swal.fire(error.response.data.message, err_txt, 'error')
        }
      }
    }
  }

  function downloadKey(e) {
    e.preventDefault()
    console.log(e)
    const mix_id = e.target.dataset.mix_id

    window.open(process.env.NEXT_PUBLIC_API_HOST + '/download_key.php?mix_id=' + mix_id + '&mix_session_id=' + mixSessionId, '_blank')
  }

  useEffect(() => {
    getMixes(mixSessionId)
      .then((res) => {
        setMixes(res.mixes)
        setAmountMixed(res.total_amount)
        setAmountLive(res.total_live_amount)
      })
      .catch(function (error) {
        if (error.response) {
          const errors = error.response.data.errors
          let err_txt = ''
          for (const property in errors) {
            err_txt += property + '-' + errors[property]
          }

          Swal.fire(error.response.data.message, err_txt, 'error')
        }
      })
  }, [mixSessionId])

  return (
    <Layout>
      <div style={{ width: '100%' }}>
        <div className="col-lg-12">
          <div className="row">
            <div className="text-container" style={{ margin: '0 auto', textAlign: 'center' }}>
              <p style={{ fontSize: '40px' }}>{status == 'Mixing' ? 'MIXING IN PROCESS' : 'MIXING COMPLETE'}</p>
            </div>
          </div>
          <div className="row">
            <div className="text-container" style={{ margin: '0 auto', textAlign: 'center' }}>
              <p style={{ maxWidth: '700px', margin: '0 auto' }}>
                <b style={{ color: '#b03e00' }}></b>
                {status == 'Mixing'
                  ? 'Mixing for your session is under process. Please wait for some time and refresh this page. Your mixing will run according to the schedule chosen by you'
                  : ''}
              </p>
              <br />
              <div style={{ clear: 'both' }}></div>

              <table style={{ margin: '0 auto', width: '80%', backgroundColor: '#fff' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center', color: '#000' }}>Wallet</th>
                    <th style={{ textAlign: 'center', color: '#000' }}>Address</th>
                    <th style={{ textAlign: 'center', color: '#000' }}>Balance</th>
                    <th style={{ textAlign: 'center', color: '#000' }}>Live Balance</th>
                    <th style={{ textAlign: 'center', color: '#000' }}>Private Key</th>
                  </tr>
                </thead>
                <tbody>
                  {mixes.map((mix, index) => {
                    return (
                      <tr key={`mixes-${index}`}>
                        <td>BTC</td>
                        <td>
                          <a target="_blank" href={'https://live.blockcypher.com/btc-testnet/address/' + mix.address}>
                            {mix.address}
                          </a>
                        </td>
                        <td>{mix.balance} BTC</td>
                        <td>{mix.live_balance} BTC</td>
                        <td>
                          <a
                            style={{ cursor: 'pointer', display: 'inline-block', marginRight: '10px' }}
                            onClick={showKey}
                            data-private_key={mix.private_key}
                            className="btn btn-sm btn-primary btn_extra_small"
                          >
                            View
                          </a>
                          |
                          <a
                            style={{
                              cursor: 'pointer',
                              display: 'inline-block',
                              marginLeft: '10px',
                              marginRight: '10px',
                            }}
                            onClick={downloadKey}
                            data-mix_id={mix.id}
                            className="btn btn-sm btn-primary btn_extra_small"
                          >
                            Download
                          </a>
                          |
                          <a
                            style={{ cursor: 'pointer', display: 'inline-block', marginLeft: '10px' }}
                            onClick={transfer}
                            data-balance={mix.balance}
                            data-live_balance={mix.live_balance}
                            data-mix_id={mix.id}
                            className="btn btn-sm btn-primary btn_extra_small"
                          >
                            Transfer
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                  <tr>
                    <th colSpan={2}>Total</th>
                    <th>{amount_mixed}</th>
                    <th>{amount_live}</th>
                    <td>
                      <a
                        style={{ display: 'inline-block', marginRight: '10px' }}
                        target="_blank"
                        href={apiUrl + '/api/download_all_keys.php?mix_session_id=' + mixSessionId}
                        className="btn btn-sm btn-primary btn_extra_small"
                      >
                        Download All
                      </a>
                      |
                      <a
                        style={{ display: 'inline-block', cursor: 'pointer', marginLeft: '10px' }}
                        target="_blank"
                        onClick={transferAll}
                        className="btn btn-sm btn-primary btn_extra_small"
                      >
                        Transfer All
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default MixCompletePage
