'use client'

import Image from 'next/image'

interface IDCardProps {
  imageURL: string
}

const IDCard = ({ imageURL }: IDCardProps) => {
  return <Image src={imageURL} alt="ID Card" width={380} height={220} />
}

export default IDCard
