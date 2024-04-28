import { styleFont } from "@/styles/styleFont";
import React from "react";
import styled from "styled-components";
import Indent from "@/assets/Indent.svg";
import Star from "@/assets/Star.svg";
import { PlaceType } from "@/types/type";

interface PropsType {
  cafe: PlaceType;
}

const Cafe = ({ cafe }: PropsType) => {
  const { id, place_name, address_name, phone } = cafe;
  return (
    <S.Cafe key={id}>
      <S.CafeInfo>
        <S.CafeName>{place_name}</S.CafeName>
        <S.CafeAddressName>{address_name}</S.CafeAddressName>
        <S.CafePhone>{phone}</S.CafePhone>
      </S.CafeInfo>
      <S.CafeFn>
        <button>
          <Indent />
        </button>
        <button>
          <Star />
        </button>
      </S.CafeFn>
    </S.Cafe>
  );
};

export default Cafe;
const S = {
  Cafe: styled.li`
    display: flex;
    justify-content: space-between;
    padding: 18px 16px;
    margin: 14px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  `,
  CafeInfo: styled.div`
    width: 65%;
  `,
  CafeName: styled.h1`
    ${styleFont.textLarge}
    margin-bottom: 14px;
  `,
  CafeAddressName: styled.h2`
    ${styleFont.textMedium}
    margin-bottom: 6px;
  `,
  CafePhone: styled.p``,
  CafeFn: styled.div``,
};
