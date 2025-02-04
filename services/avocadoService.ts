import axios, { AxiosResponse } from 'axios'

export type DepositAddress = {
  address: string
  amount_deposited: string
  confirmations?: string
  status: string
  source_address: string
}

export type GetDepositAddressResponse = {
  success: number
  deposit_addresses: DepositAddress[]
}

export type Mix = {
  id: string
  live_balance: string
  status: string
  datetime_reveal: string
  address: string
  private_key: string
  balance: string
}

export type GetMixesResponse = {
  mixes: Mix[]
  success: number
  total_amount: number
  total_live_amount: number
}

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_API_BASE_PATH}/`,
})

export const endpoint = (apiPath) => `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_API_BASE_PATH}/${apiPath}`

export const CREATE_MIX_SESSION_PATH = 'create_mix.php'
export const GET_AMOUNT_DEPOSITED_PATH = 'get_amount_deposited.php'
export const GET_DEPOSIT_ADDRESS_PATH = 'get_deposit_addresses.php'
export const GET_MIX_STATUS_PATH = 'get_mix_status.php'
export const GET_MIXES_PATH = 'get_mixes.php'
export const START_MIX_SESSION_PATH = 'start_mix.php'

export const POST_TRANSFER_ALL_PATH = 'transfer_all.php'

export const createMixSession = async (data) => {
  try {
    const response = await axiosInstance.postForm(CREATE_MIX_SESSION_PATH, data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const getAmountDeposited = async (mixSessionId: string): Promise<{ amount_deposited: string }> => {
  try {
    const response = await axiosInstance.get(GET_AMOUNT_DEPOSITED_PATH, { params: { mix_session_id: mixSessionId } })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getDepositAddress = async (mixSessionId: string): Promise<GetDepositAddressResponse> => {
  try {
    const response: AxiosResponse<GetDepositAddressResponse> = await axiosInstance.get(GET_DEPOSIT_ADDRESS_PATH, {
      params: { mix_session_id: mixSessionId },
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getMixStatus = async (mixSessionId: string) => {
  try {
    const response = await axiosInstance.get(GET_MIX_STATUS_PATH, { params: { mix_session_id: mixSessionId } })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getMixes = async (mixSessionId: string) => {
  try {
    const response = await axiosInstance.get(GET_MIXES_PATH, { params: { mix_session_id: mixSessionId } })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const postStartMixSession = async (data) => {
  try {
    const response = await axiosInstance.postForm(START_MIX_SESSION_PATH, data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const postTransferAll = async (data) => {
  console.log('postTransferAll', data)
  try {
    const response = await axiosInstance.postForm(POST_TRANSFER_ALL_PATH, data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
