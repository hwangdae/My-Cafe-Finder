import Cafe from "@/components/Cafe";
import { PlaceType } from "@/types/type";
import React from "react";
import styled from "styled-components";

const SearchResults = ({ cafes }: any) => {
  return (
    <S.SearchResultsInner>
      {cafes?.map((cafe: PlaceType) => {
        return <Cafe cafe={cafe} />;
      })}
    </S.SearchResultsInner>
  );
};

export default SearchResults;

const S = {
  SearchResultsInner: styled.ul`
    margin-top: 160px;
  `,
};
