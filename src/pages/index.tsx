"use client";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import SearchContainer from "@/components/SearchContainer";
import { useRouter } from "next/router";
import {useRecoilState} from 'recoil'
import { cafesState } from "@/globalState/recoilState";


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
  // const [cafes, setCafes] = useState<any>([]);
  const [cafes, setCafes] = useRecoilState<any>(cafesState);

  const router = useRouter()
  console.log(router)

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
        <SearchContainer />
        
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
              />
            );
          })}
          {!state.isLoading && (
            <MapMarker
              position={state.center}
              image={{
                src: "/myPositionMarker.png",
                size: {
                  width: 50,
                  height: 50,
                },
              }}
            />
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

  SearchResultsContainer: styled.div`
    overflow-y: scroll;
    height: 100vh;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  
};
