import React from 'react';
import {YMaps, Map} from "@pbe/react-yandex-maps";
import {usePosition} from "../usePosition";


const YandexMap = () => {
        const { latitude, longitude, error } = usePosition();
    if (!latitude) {
    return <div>Loading...</div>;
  }

    return (
  <YMaps>
    <div className={"map"}>
        {error}
        <h2>Your geolocation</h2>
      <Map defaultState={{ center: [latitude, longitude], zoom: 15 }} width="100%" height="400px" />
    </div>
  </YMaps>
    );
};

export default YandexMap;

