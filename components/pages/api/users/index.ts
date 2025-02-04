import { NextApiRequest, NextApiResponse } from 'next'
import { sampleUserData } from '../../../../utils/sample-data'

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(sampleUserData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
