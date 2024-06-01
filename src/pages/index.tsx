"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import SearchContainer from "@/components/SearchContainer";
import { useRouter } from "next/router";
import SearchResults from "./searchResults";
import MyCafe from "./myCafe";
import {useRecoilState} from 'recoil'
import { cafesState } from "@/globalState/recoilState";



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
  });
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any>();

  // const [cafes, setCafes] = useState<any>([]);
  const [cafes, setCafes] = useRecoilState<any>(cafesState);

  console.log(state)

  useEffect(() => {
    const { kakao } = window;
    kakao.maps.load(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setState((prev) => ({
            ...prev,
            center: { lat, lng },
          }));
        }, () => {
          alert("Error retrieving location");
        });
      } else {
        alert("Geolocation not supported");
      }
    });
  }, []);

  useEffect(() => {
    if (map && state.center.lat && state.center.lng) {
      const { kakao } = window;
      const searchPlaces = () => {
        let ps = new kakao.maps.services.Places();
        const category = "CE7";
        let options = {
          location: new kakao.maps.LatLng(state.center.lat, state.center.lng),
          sort: kakao.maps.services.SortBy.DISTANCE,
        };
        ps.categorySearch(category, placesSearchCB, options);
      };
      const placesSearchCB = (data: any, status: string, pagination: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setCafes(data);
          displayPlaces(data);
        }
      };
      const displayPlaces = (data: any) => {
        let bounds = new kakao.maps.LatLngBounds();
        let markers: any = [];
        data.forEach((place: any) => {
          markers.push({
            position: {
              lat: place.y,
              lng: place.x,
            },
          });
          bounds.extend(new kakao.maps.LatLng(place.y, place.x));
        });
        setMarkers(markers);
        map.setBounds(bounds);
      };
      searchPlaces();
    }
  }, [map, state.center]);



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
          onCreate={setMap}
        >
          {markers?.map((marker: MarkersType) => {
            return (
              <MapMarker
                key={`marker-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
              />
            );
          })}
          {/* {!state.isLoading && (
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
          )} */}
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
    // overflow-y: scroll;
    // height: 100vh;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
  `,
};
