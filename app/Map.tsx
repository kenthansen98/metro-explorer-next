"use client";

import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { parseLineString, parsePoint } from "../utils/parseShapley";
import Link from "next/link";

interface Props {
  cities?: any[] | null;
  city?: any;
  lineData?: {
    systems: any[];
    sectionLines: any[];
  } | null;
}

function Map({ cities, city, lineData }: Props) {
  const center: [number, number] = city ? parsePoint(city.coords) : [25, 0];
  const zoom = city ? 12 : 3;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-screen h-screen outline-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities?.map((city) => (
        <CircleMarker key={city.id} center={parsePoint(city.coords)} radius={3}>
          <Popup>
            <Link href={`/${city.url_name}`}>
              {city.name}, {city.country}
            </Link>
          </Popup>
        </CircleMarker>
      ))}
      {lineData?.sectionLines?.map((sectionLine) => (
        <Polyline
          key={sectionLine.id}
          pathOptions={{ color: sectionLine.Line.color }}
          positions={parseLineString(sectionLine.Section.geometry)}
        />
      ))}
    </MapContainer>
  );
}

export default Map;
