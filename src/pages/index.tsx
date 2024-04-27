"use client";
import { getCipherInfo } from "crypto";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MarkersType {
  position: {
    lat: string;
    lng: string;
  };
  content: string;
}

const Home = () => {
  const [searchName, setSearchName] = useState("");


  useEffect(() => {
    // if (window.kakao) {
    window.kakao.maps.load(() => {
      // 기본적인 지도 생성
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      console.log('인포윈도우',infowindow)
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const ps = new window.kakao.maps.services.Places();
      console.log(ps)

      const getCurrentCoordinate = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude; // 위도
            const lon = position.coords.longitude; // 경도
            const coordinate = new kakao.maps.LatLng(lat, lon);
            console.log(coordinate)
            map.setCenter(coordinate); 
            return coordinate;
          });
        }
      };
   
      const searchPlaces = async () => {
        var category = "CE7";
        const currentCoordinate = await getCurrentCoordinate();
        var options = {
          location: currentCoordinate,
        };
        ps.categorySearch(category, placesSearchCB, options);
      };
      
      function placesSearchCB(data: any, status: string, pagination: any) {
        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          console.log(data);
          // displayPlaces(data);
          // // 페이지 번호를 표출합니다
          // displayPagination(pagination);
        }
      }
      searchPlaces()
    });
    // }
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
        <div id="map" style={{ width: "100%", height: "100vh" }}></div>
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
