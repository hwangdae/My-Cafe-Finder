import CafeInfo from "@/components/CafeInfo";
import { PlaceType } from "@/types/type";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { cafesState } from "@/globalState/recoilState";

interface PropsType {
  step: number;
}

const SearchResults = ({ step }: PropsType) => {
  const cafes = useRecoilValue(cafesState);

  return (
    <S.SearchResultsContainer>
      <S.SearchResultsInner>
        {cafes?.map((cafe: PlaceType) => {
          return <CafeInfo key={cafe.id} cafe={cafe} />;
        })}
      </S.SearchResultsInner>
    </S.SearchResultsContainer>
  );
};

export default SearchResults;

const S = {
  SearchResultsContainer: styled.div`
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  SearchResultsInner: styled.ul`
    width: 100%;
  `,
};
