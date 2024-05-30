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
          return <CafeInfo cafe={cafe} />;
        })}
      </S.SearchResultsInner>
    </S.SearchResultsContainer>
  );
};

export default SearchResults;

const S = {
  SearchResultsContainer : styled.div`
    // position: absolute; left: 0; top: 0;
    overflow-y: scroll;
    height
    // height: calc(100vh - 360px);
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  SearchResultsInner: styled(motion.ul)<{ step: number }>`
    width: 100%;
    overflow: ${(props) => (props.step === 1 ? "hidden" : "visible")};
  `,
};
