"use client";
import { getCipherInfo } from "crypto";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

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
  content: string;
}
interface PlacesType {
  data: PlaceType[];
}
interface PlaceType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
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

  useEffect(() => {
    window.kakao.maps.load(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position:any) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setState((prev) => {
            return { ...prev, center: { lat, lng },isLoading:false };
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
          // console.log(data);
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
              lon: place.x,
            },
          });
        });

        setMarkers(markers);
        // map.setBounds(bounds);
      };

      searchPlaces();
      console.log(markers);
    });
  }, []);

  return (
    <div>
      <S.searchResults>
        <form>
          <input
            type="text"
            value={searchName}
            onChange={(e) => e.target.value}
          ></input>
        </form>
      </S.searchResults>
      <main>
        {/* <div id="map" style={{ width: "100%", height: "800px" }}></div> */}
        <Map
          center={{ lat: state.center.lat, lng: state.center.lng }}
          style={{ width: "100%", height: "100vh" }}
        >
          {markers?.map((marker: any) => {
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
    </div>
  );
};

export default Home;

const S = {
  searchResults: styled.aside`
    position: absolute;
    left: 0;
    top: 0;
    width: 400px;
    height: 100vh;
    z-index: 999;
    background-color: #fff;
  `,
};
