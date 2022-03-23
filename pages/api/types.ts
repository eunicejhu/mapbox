import { RIDES_RESPONSE_MOCK, DIRECTION_RESPONSE_MOCK } from "@/api/rides";
export interface iColor {
  color: string;
}

// ride coordinatas:[{from: { lat: 48.85658, lon: 2.35183 }}, {to: { lat: 45.75889, lon: 4.84139 }}]
// will be converted to "2.35183,48.85658;4.84139,45.75889"
export interface iRideCoordinates {
  id_ride: string;
  coordinates: string;
}
export type _RIDES = typeof RIDES_RESPONSE_MOCK["hits"]["hits"];
export type _RIDE = typeof RIDES_RESPONSE_MOCK["hits"]["hits"][0];
export type _RIDE_WITH_COLOR = _RIDE & iColor;
export type _RIDES_WITH_COLOR = _RIDE_WITH_COLOR[];
export type _RIDES_RESPONSE = typeof RIDES_RESPONSE_MOCK;

export type _DIRECTION = typeof DIRECTION_RESPONSE_MOCK;

export interface iPagination {
  from: number;
  size: number;
}
