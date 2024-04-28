"use client";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import Search from "@/assets/Search.svg";
import { styleFont } from "@/styles/styleFont";
import Cafe from "@/components/Cafe";
import { PlaceType } from "@/types/type";

// const {kakao} = window;
declare global {
  interface Window {
    kakao: any;
  }
}

interface MarkersType {
  position: {
    lat: number;
    lng: number;
  };
}


const Home = () => {
  const [searchName, setSearchName] = useState("");
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any>();
  const [cafes, setCafes] = useState<any>([]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setState((prev) => {
            return { ...prev, center: { lat, lng }, isLoading: false };
          });
        });
      }

      const searchPlaces = () => {
        const ps = new kakao.maps.services.Places();
        const category = "CE7";
        const options = {
          location: new kakao.maps.LatLng(state.center.lat, state.center.lng),
          sort: kakao.maps.services.SortBy.DISTANCE,
        };
        ps.categorySearch(category, placesSearchCB, options);
      };
      const placesSearchCB = (data: any, status: string, pagination: any) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(data);
          setCafes(data);
          displayPlaces(data);
        }
      };
      const displayPlaces = (data: any) => {
        const bounds = new kakao.maps.LatLngBounds();
        // console.log(bounds.extend)
        let markers: any = [];
        data.forEach((place: any) => {
          markers.push({
            position: {
              lat: place.y,
              lng: place.x,
            },
          });
        });

        setMarkers(markers);
        // map.setBounds(bounds);
      };

      searchPlaces();
    });
  }, []);
  console.log(markers);
  return (
    <S.Container>
      <S.SideContainer>
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
              <li>검색</li>
              <li>MYCAFE</li>
            </S.SearchTabMenu>
          </S.SearchInner>
        </S.SearchContainer>
        <S.SearchResultsContainer>
          <S.SearchResultsInner>
            {cafes?.map((cafe: PlaceType) => {
              return (
                <Cafe cafe={cafe}/>
              );
            })}
          </S.SearchResultsInner>
        </S.SearchResultsContainer>
      </S.SideContainer>
      <main>
        <Map
          center={{ lat: state.center.lat, lng: state.center.lng }}
          style={{ width: "100%", height: "100vh" }}
        >
          {markers?.map((marker: MarkersType) => {
            return (
              <MapMarker
                key={`marker-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
              ></MapMarker>
            );
          })}
          {!state.isLoading && (
            <MapMarker position={state.center}>
              <div style={{ padding: "5px", color: "#000" }}>
                {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
              </div>
            </MapMarker>
          )}
        </Map>
      </main>
    </S.Container>
  );
};

export default Home;

const S = {
  Container: styled.div``,
  SideContainer: styled.aside`
    position: absolute;
    left: 0;
    top: 0;
    width: 360px;
    height: 100vh;
    z-index: 999;
    background-color: #fff;
  `,
  SearchInner: styled.div`
    padding: 20px;
  `,
  SearchContainer: styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fac123;
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
      width: 50%;
      padding: 10px 0px;
      border-radius: 22px;
      &:first-child {
        background-color: #ff8c09;
        color: #fff;
      }
    }
  `,
  SearchResultsContainer: styled.div`
    overflow-y: scroll;
    height: 100vh;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  SearchResultsInner: styled.ul`
    margin-top: 150px;
  `,
  
};
