'use client'

import { ReactElement, useState } from 'react'
import Layout from '@/components/Layout'
import swal from 'sweetalert'
import { Button } from '@/components/Button'
import { createMixSession } from '@/services/avocadoService'
import Swal2 from 'sweetalert2'

const ErrorsList = (errors): ReactElement => {
  return (
    errors.length > 0 &&
    errors.map((error) => (
      <div className="alert alert-danger" key={error}>
        {error}
      </div>
    ))
  )
}
function StartMix({ arrays }) {
  const [distributions, setDistributions] = useState(1)
  const [depositWalletCount, setDepositWalletCount] = useState(1)
  const [errors, setErrors] = useState([])
  const [email, setEmail] = useState('')
  const [duration, setDuration] = useState(0)

  const handleDuration = (e) => {
    e.preventDefault()
    setDuration(Number(e.target.value))
  }

  const handleEmail = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  function setCookie(name, value, days) {
    let expires = ''

    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // ) removed
      expires = '; expires=' + date.toUTCString() // + added
    }

    document.cookie = name + '=' + value + expires + ';path=/' // + and " added
  }

  const saveMixing = async (e) => {
    e.preventDefault()

    const data = {
      duration,
      distributions,
      email,
      deposit_wallet_count: depositWalletCount,
    }

    const res = await createMixSession(data)

    await Swal2.fire(
      'Success!',
      res.mix_session_id + ' is your Mix Session ID. Save it permanently before continuing or you risk losing your funds.',
      'success'
    )

    setCookie('mix_session_id', res.mix_session_id, 1)
    window.location.href = '/status/' + res.mix_session_id
  }

  return (
    <>
      <Layout>
        <main className="container-fluid bg-body-tertiary">
          <div className="col-12 col-lg-8 col-xxl-6 mx-auto p-4 py-md-5">
            <div className="row">
              <div className="col-12">
                <h1 className="text-body-emphasis">Create Mix</h1>
                <p className="lead col-10">
                  Quickly and easily get started with your crypto mixing. Enter your mixing preferences below and click Start Mix.
                </p>
              </div>
            </div>
            <div className="row h-100">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={saveMixing}>
                      <div className="mb-3">
                        <label htmlFor="duration" className="form-label">
                          Choose Duration: <strong>{duration === 0 ? 'Instantaneous' : duration + ' days'}</strong>
                        </label>
                        <input
                          type="range"
                          className="form-range"
                          id="duration"
                          min={0}
                          max={7}
                          step={1}
                          value={duration}
                          onChange={handleDuration}
                        />
                        <div className="form-text">
                          {/*{Charge 0.1% fee for 0-7 days, 0.05% fee for 8-14 days, 0.025% fee for 15-30 days}*/}
                          Duration is the amount of time it takes to mix your coins. Why? The longer the duration, the more difficult it is
                          to trace your coins but the higher the gas fees.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="distributions" className="form-label">
                          Choose Distributions: <strong>{distributions === 0 ? 'Random' : distributions}</strong>
                        </label>
                        <input
                          type="range"
                          className="form-range"
                          id="distributions"
                          min={0}
                          max={100}
                          step={1}
                          value={distributions}
                          onChange={(e) => setDistributions(Number(e.target.value))}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="Email" className="form-label">
                          Email address
                        </label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">
                          Send My Mix ID (optional)
                        </div>
                      </div>

                      <Button type={'submit'} variant={'primary'}>
                        Start Mix
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}
export default StartMix
