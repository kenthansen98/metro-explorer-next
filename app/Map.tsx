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
  sectionLines: any[] | null;
}

function Map({ cities, city, sectionLines }: Props) {
  const center: [number, number] = city ? parsePoint(city.coords) : [25, 0];
  const zoom = city ? 12 : 3;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
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
      {sectionLines?.map((sectionLine) => (
        <Polyline
          key={sectionLine.id}
          pathOptions={{ color: sectionLine.Line.color, weight: 5 }}
          positions={parseLineString(sectionLine.Section.geometry)}
        >
          <Popup>{sectionLine.Line?.name}</Popup>
        </Polyline>
      ))}
    </MapContainer>
  );
}

export default Map;
