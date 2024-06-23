import { useRouter } from "next/router";
import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Shop from "@/assets/Shop.svg";
import { styleFont } from "@/styles/styleFont";

interface Propstype {
  step: number;
}

const MyCafe = ({ step }: Propstype) => {
  return (
    <S.Container
      step={step}
      animate={{ translateX: `${(1 - step) * 100}%` }}
      transition={{ ease: "easeInOut" }}
    >
      <S.EmptyInner>
        <S.EmptyIcon>
          <Shop fill={"#cccccc"} width="100px" height="100px" />
        </S.EmptyIcon>
        <S.EmptyTitle>내 카페엔 아직 아무것도 없어요 !</S.EmptyTitle>
      </S.EmptyInner>
    </S.Container>
  );
};

export default MyCafe;

const S = {
  Container: styled(motion.div)<{ step: number }>`
    margin-top: 141px;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    overflow: ${(props) => (props.step === 0 ? "hidden" : "visible")};
  `,
  EmptyIcon: styled.p`
    padding-bottom: 10px;
  `,
  EmptyInner: styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
  `,
  EmptyTitle: styled.h2`
    ${styleFont.textMedium};
    color: #8f8f8f;
  `
};
