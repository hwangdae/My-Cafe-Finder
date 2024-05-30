import React, { useState } from "react";
import styled from "styled-components";
import Search from "@/assets/Search.svg";
import Link from "next/link";
import shortid from "shortid";
import SearchResults from "@/pages/searchResults";
import MyCafe from "@/pages/myCafe";
import { useRecoilValue } from "recoil";
import { cafesState } from "@/globalState/recoilState";

const TABNAV = [
  {
    id: 0,
    name: "검색",
    href: "/searchResults",
  },
  { id: 1, name: "MYCAFE", href: "/myCafe" },
];

const SearchContainer = () => {
  const [step, setStep] = useState<number>(0);
  const [searchName, setSearchName] = useState("");
  const cafes = useRecoilValue(cafesState);
  return (
    <S.SearchContainer>
      <S.SearchInner>
        <S.SearchForm>
          <S.SearchInput
            type="text"
            value={searchName}
            onChange={(e) => e.target.value}
            placeholder="찾으시는 카페 있으신가요?"
          />
          <S.SearchButton>
            <Search fill="#919191" />
          </S.SearchButton>
        </S.SearchForm>
        <S.SearchTabMenu>
          {TABNAV.map((item) => {
            return (
              <S.TabMenuItem>
                <S.TabMenuButton
                  step={step}
                  id={item.id}
                  onClick={() => {
                    item.id === 0 ? setStep(0) : setStep(1);
                  }}
                >
                  {item.name}
                </S.TabMenuButton>
              </S.TabMenuItem>
            );
          })}
        </S.SearchTabMenu>
      </S.SearchInner>
      <S.SearchResultsContainer>
        <SearchResults cafes={cafes} step={step} />
        <MyCafe step={step} />
      </S.SearchResultsContainer>
    </S.SearchContainer>
  );
};

export default SearchContainer;

const S = {
  SearchContainer: styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    overflow :hidden;
  `,
  SearchInner: styled.div`
    padding: 20px;
    background-color: #d1bb9e;
  `,
  SearchForm: styled.form`
    position: relative;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  SearchInput: styled.input`
    width: 94%;
    outline: none;
    border: none;
    padding: 14px;
    border-radius: 5px;
    &::placeholder {
      font-size: 15px;
      font-weight: bold;
      color: #919191;
      letter-spacing: -1px;
    }
  `,
  SearchButton: styled.button`
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -15px;
  `,
  SearchTabMenu: styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-top: 20px;
  `,
  TabMenuItem: styled.li`
    width: 50%;
    display: block;
  `,
  TabMenuButton: styled.button<{ step: number; id: number }>`
    cursor: pointer;
    width: 100%;
    padding: 10px 0px;
    border-radius: 22px;
    background-color: ${(props) =>
      props.step === props.id ? "#a79277" : "none"};
    color: ${(props) => (props.step === props.id ? "#fff" : "#111")};
  `,
  SearchResultsContainer: styled.div`
    width: 100%;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};
