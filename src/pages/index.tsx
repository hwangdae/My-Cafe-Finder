"use client";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

interface MarkersType {
  position: {
    lat: string;
    lng: string;
  };
  content: string;
}
const Home = () => {
  const [searchName, setSearchName] = useState("");
  const [markers, setMarkers] = useState<MarkersType[]>([]);
  const [map, setMap] = useState();

  useEffect(() => {
    var places = new kakao.maps.services.Places();
    var callback = function(status:any, result:any, pagination:any) {
      if (status === kakao.maps.services.Status.OK) {
        alert("검색된 음식점의 갯수는 " +  result.places.length + "개 입니다.");
      }
    };
    
    places.categorySearch('FD6', callback, {
      location: new kakao.maps.LatLng(33.450701, 126.570667)
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
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "100vh" }}
        >
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
            <div style={{ color: "#000" }}>Hello World!</div>
          </MapMarker>
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
