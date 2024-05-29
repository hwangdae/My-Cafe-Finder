import Cafe from "@/components/Cafe";
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
          return <Cafe cafe={cafe} />;
        })}
      </S.SearchResultsInner>
    </S.SearchResultsContainer>
  );
};

export default SearchResults;

const S = {
  SearchResultsContainer : styled.div`
    overflow-y: scroll;
  /* position: absolute; left: 0; top: 0;
    overflow-y: scroll;
    height: 100vh; */
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  SearchResultsInner: styled(motion.ul)<{ step: number }>`
    width: 100%;
    overflow: ${(props) => (props.step === 1 ? "hidden" : "visible")};
  `,
};
