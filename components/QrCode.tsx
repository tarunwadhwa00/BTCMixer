import Image from 'next/image'
import { FC } from 'react'

type QrCodeProps = {
  value: string
}
export const QrCode: FC<QrCodeProps> = ({ value }) => {
  const url = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${value}&choe=UTF-8`
  return <Image width={150} height={150} src={url} alt={value} />
}
