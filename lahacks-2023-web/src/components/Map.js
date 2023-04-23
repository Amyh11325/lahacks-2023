import { useEffect, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React from "react";
import NewNote from "./NewNote";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2VjMDA1IiwiYSI6ImNsZ3NncHR0ajFybW0zdXBtMzYzdG1qdjcifQ.3vnXg76QfpWaqrJaZ7u9og";
const LA_LATITUDE = 34.05;
const LA_LONGITUDE = -118.24;
const DEFAULT_ZOOM = 12;
const LONG_LAT_SIG_FIGS = 4;
const ZOOM_SIG_FIGS = 2;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(LA_LONGITUDE);
  const [lat, setLat] = useState(LA_LATITUDE);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const [noteToggle, setNoteToggle] = useState(false);

  useEffect(() => {
    // useEffect hook for initializing the map stuff
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    // useEffect hook for adjusting the current longitude and latitude
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(LONG_LAT_SIG_FIGS));
      setLat(map.current.getCenter().lat.toFixed(LONG_LAT_SIG_FIGS));
      setZoom(map.current.getZoom().toFixed(ZOOM_SIG_FIGS));
    });
  });

  useEffect(() => {
    // useEffect hook for adding a marker to the point on the map you double clicked
    if (!map.current) return; // wait for map to initialize
    map.current.on("dblclick", (event) => {
      const coordinates = event.lngLat;
      const newMarker = new mapboxgl.Marker();
      newMarker.setLngLat(coordinates).addTo(map.current);
      newMarker.getElement().addEventListener("click", () => {
        setNoteToggle((noteToggle) => !noteToggle);
        console.log("clicked", noteToggle);
      });
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      {noteToggle && <NewNote setNoteToggle={setNoteToggle} />}
    </div>
  );
}

export default Map;