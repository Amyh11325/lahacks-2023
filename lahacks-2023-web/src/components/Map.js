import { useEffect, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React from "react";
import NewNote from "./NewNote";
import ButtonAppBar from "./ButtonAppBar";

import '../styles/map.css'

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
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [noteToggle, setNoteToggle] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [formData, setFormData] = useState("");

  useEffect(() => { 
    // useEffect hook for adding popup text to markers 
    if (!activeMarker || !buttonPressed) return; // don't add popup text if the save button wasn't pressed
    const coordinates = activeMarker.getLngLat();
    const newPopup = new mapboxgl.Popup().setLngLat(coordinates).setText(formData).addTo(map.current);
    activeMarker.setPopup(newPopup);
    setButtonPressed(false); // set it back to false until it's pressed again
  }, [formData, activeMarker, buttonPressed]);

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
        setActiveMarker(newMarker);
        setNoteToggle((noteToggle)  => !noteToggle);
        console.log("clicked", noteToggle);
      });
      setMarkers([...markers, newMarker]);
    });
  });

  return (
    <div>
      <ButtonAppBar/>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      {noteToggle && <NewNote setNoteToggle={setNoteToggle} setFormData={setFormData} setButtonPressed={setButtonPressed}/>}
    </div>
  );
}

export default Map;
