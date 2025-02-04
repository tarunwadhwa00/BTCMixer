import { useState } from 'react'

const useDataHookFactory = async (request) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const trigger = async () => {
    try {
      setLoading(true)
      const response = await request()
      setData(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, data, error, trigger }
}

export default useDataHookFactory
