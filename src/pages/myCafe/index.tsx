import { useRouter } from 'next/router'
import React from 'react'
import { motion } from "framer-motion";
import styled from 'styled-components';

interface Propstype {
  step :number
}

const MyCafe = ({step}:Propstype) => {

  console.log(step)
  return (
    <S.Container step={step} animate={{ translateX: `${(1 - step) * 100}%` }} transition={{ease:'easeInOut'}}>
    <div>내 카페엔 아직 아무것도 없어요 !</div>
    </S.Container>
  )
}

export default MyCafe

const S = {
  Container : styled(motion.div)<{ step: number }>`
  width: 100%;
  position: absolute; right: 0; top: 0;
  overflow: ${(props) => props.step === 0 ? 'hidden' :'visible'};
`
}