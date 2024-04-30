import { useRouter } from 'next/router'
import React from 'react'

const MyCafe = () => {
  const router = useRouter()
  console.log(router)
  return (
    <div>index</div>
  )
}

export default MyCafe