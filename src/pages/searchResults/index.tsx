import CafeInfo from "@/components/CafeInfo";
import { PlaceType } from "@/types/type";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SearchResults = ({ cafes, step }: any) => {
  return (
    <S.SearchResultsContainer>
      <S.SearchResultsInner
        step={step}
        animate={{ translateX: `${step * -100}%` }}
        transition={{ ease: "easeInOut" }}
      >
        {cafes?.map((cafe: PlaceType) => {
          return <CafeInfo key={cafe.id} cafe={cafe} />;
        })}
      </S.SearchResultsInner>
    </S.SearchResultsContainer>
  );
};

export default SearchResults;

const S = {
  SearchResultsContainer : styled.div`
    position : absolute; left : 0; top : 0;
    margin-top : 141px;
    overflow-y: scroll;
    // height :100%;
    height: calc(100vh - 141px);
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  SearchResultsInner: styled(motion.ul)<{ step: number }>`
    width: 100%;
    overflow: ${(props) => (props.step === 1 ? "hidden" : "visible")};
  `,
};
