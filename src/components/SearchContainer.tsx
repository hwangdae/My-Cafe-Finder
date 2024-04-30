import React, { useState } from "react";
import styled from "styled-components";
import Search from "@/assets/Search.svg";
import Link from "next/link";

const TABNAV = [
  {
    name: "검색",
    href: "/search",
  },
  { name: "MYCAFE", href: "/myCafe" },
];

const SearchContainer = () => {
    
  const [searchName, setSearchName] = useState("");
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
              <li>
                <Link href={item.href}>{item.name}</Link>
              </li>
            );
          })}
        </S.SearchTabMenu>
      </S.SearchInner>
    </S.SearchContainer>
  );
};

export default SearchContainer;

const S = {
  SearchContainer: styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #d1bb9e;
  `,
  SearchInner: styled.div`
    padding: 20px;
  `,
  SearchForm: styled.form`
    position: relative;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 20px; */
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
    li {
      cursor: pointer;
      width: 50%;
      padding: 10px 0px;
      border-radius: 22px;
      &:first-child {
        background-color: #a79277;
        color: #fff;
      }
    }
  `,
};
