import { useState } from 'react'
import { getMixStatus } from '../services/avocadoService'
// import useDataHookFactory from '../utils/useDataHookFactory'

const useMixStatus = (id) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const trigger = async () => {
    try {
      setLoading(true)
      const response = await getMixStatus(id)
      setData(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, data, error, trigger }
}

export default useMixStatus
//
// export const useMixStatus = async (id) => await useDataHookFactory(() => getMixStatus(id))
