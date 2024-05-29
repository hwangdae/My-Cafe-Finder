import Cafe from "@/components/Cafe";
import { PlaceType } from "@/types/type";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SearchResults = ({ cafes, step }: any) => {
  return (
    <S.SearchResultsInner
      step={step}
      animate={{ translateX: `${step * -100}%` }}
      transition={{ ease: "easeInOut" }}
    >
      {cafes?.map((cafe: PlaceType) => {
        return <Cafe cafe={cafe} />;
      })}
    </S.SearchResultsInner>
  );
};

export default SearchResults;

const S = {
  SearchResultsInner: styled(motion.ul)<{ step: number }>`
    /* margin-top: 160px; */
    width: 100%;
    overflow: ${(props) => (props.step === 1 ? "hidden" : "visible")};
  `,
};
