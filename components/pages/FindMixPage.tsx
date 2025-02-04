'use client'

// Dependencies
import { ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'

// Components
import Layout from '@/components/Layout'
import { Button } from '@/components/Button'

const MixStatus = (): ReactElement => {
  const router = useRouter()
  const [mixId, setMixId] = useState('')
  const handleMixId = (e) => {
    e.preventDefault()
    setMixId(e.target.value)
  }

  function checkStatus(e) {
    e.preventDefault()
    router.push(`/status/${mixId}`)
  }

  return (
    <>
      <Layout>
        <main className="container-fluid bg-body-tertiary">
          <div className="col-12 col-lg-8 col-xxl-6 mx-auto p-4 py-md-5">
            <div className="row">
              <div className="col-12">
                <h1 className="text-body-emphasis">Find Mix</h1>
                <p className="lead col-10">Enter your Mix ID to check the status of your mix.</p>
              </div>
            </div>
            <div className="row h-100">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={checkStatus}>
                      <div className="start-mix-table">
                        <div>
                          <label>Enter Your Mix ID</label>
                          <div className="field-wrap">
                            <input id="mix_session_id" name="" placeholder="Your Mix ID" type="text" required onChange={handleMixId} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Button type="submit" name="submit" value="submit" variant={'primary'}>
                          Show status
                        </Button>
                      </div>
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
export default MixStatus
