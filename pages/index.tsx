import React, { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";

import LayoutCocolis from "@/components/Layout";
import styles from "@/styles/index.module.scss";
import fetcher, { fetchRides, isFetcherError } from "@/api/fetcher";
import useRides from "@/hooks/useRides";

import {
  directions_api_request_with_color,
  ROUTE_COLORS,
  DEFAULT_PAGINATION_SIZE,
} from "@/api/constants";
import {
  _RIDES,
  _RIDE,
  _RIDE_WITH_COLOR,
  _RIDES_WITH_COLOR,
  _RIDES_RESPONSE,
  _DIRECTION,
  iColor,
  iRideCoordinates,
} from "@/api/types";
import {
  warn,
  lastNElements,
  toCoordinateString,
  toAlphaColor,
  BG_ALPHA,
} from "@/utils/index";

const isProd = process.env.NODE_ENV === "production";

import mapboxgl, { LngLatLike } from "mapbox-gl";
import { LineString } from "geojson";
// to revert back
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export function drawRoute(
  map: mapboxgl.Map,
  direction: _DIRECTION,
  color: string
): void {
  new mapboxgl.Marker({
    color,
  })
    .setLngLat(direction.waypoints[0].location as LngLatLike)
    .addTo(map);

  // Create a default Marker, colored black, rotated 45 degrees.
  new mapboxgl.Marker({
    color,
    rotation: 45,
  })
    .setLngLat(direction.waypoints[1].location as LngLatLike)
    .addTo(map);

  map.addSource(direction.uuid, {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: direction.routes[0].geometry as LineString,
    },
  });
  map.addLayer({
    id: direction.uuid,
    type: "line",
    source: direction.uuid,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": color,
      "line-width": 8,
    },
  });
}

interface iPropsFromServerSide {
  fallback: {
    data: _RIDE_WITH_COLOR[];
  };
}
export const getServerSideProps: GetServerSideProps<
  iPropsFromServerSide
> = async (context) => {
  // `getServerSideProps` is only executed on the server side.
  // Fetch data from external API

  const rides = await fetchRides();

  // Pass data to the page via props
  return {
    props: {
      fallback: {
        data: rides,
      },
    },
  };
};
interface iCocolisProps extends iPropsFromServerSide {
  children?: React.ReactNode;
}

export default function Cocolis(props: iCocolisProps) {
  const { data } = props.fallback;
  const [rides, onLoadMore] = useRides(data);
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [map, setMap] = useState<mapboxgl.Map>();
  const mapNode = useRef(null);
  const notificationsNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageIsMounted(true);
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;
    const mapboxMap = new mapboxgl.Map({
      container: node,

      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 2,
    });
    mapboxMap.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  useEffect(() => {
    const newlyLoadedRides = lastNElements(rides, DEFAULT_PAGINATION_SIZE);
    const transformedRides: (iRideCoordinates & iColor)[] =
      newlyLoadedRides.map((ride) => {
        return {
          id_ride: ride._id,
          color: ride.color,
          coordinates: toCoordinateString(
            ride["_source"]["from"],
            ride["_source"]["to"]
          ),
        };
      });

    const directionRequests = directions_api_request_with_color(
      transformedRides,
      mapboxgl.accessToken
    );

    directionRequests.forEach(async ({ request, color }, index) => {
      const result = await fetcher<_DIRECTION>(request);
      if (!isFetcherError(result)) {
        if (result.code.toLocaleLowerCase() === "ok") {
          if (!map?.loaded()) {
            map?.on("load", () => {
              drawRoute(map, result, color);
            });
          } else {
            drawRoute(map, result, color);
          }
        } else {
          warn("Error fetching route (Error code): ", result.code);
        }
      }
    });

    notificationsNode?.current?.lastElementChild?.scrollIntoView(true);
  }, [rides, pageIsMounted, map]);
  return (
    <React.StrictMode>
      <LayoutCocolis>
        <div
          id="cocolis-map"
          ref={mapNode}
          className={styles["cocolis-map"]}
        ></div>
        <div
          ref={notificationsNode}
          id="notifications"
          className={styles.notifications}
        >
          {rides.map((ride, index) => (
            <div
              style={{ backgroundColor: toAlphaColor(ride.color, BG_ALPHA) }}
              key={ride["_source"]["id"]}
            >
              <span style={{ color: ride.color }}>
                {ride["_source"]["id"]}{" "}
              </span>
              <span style={{ color: ride.color }}>
                {ride["_source"]["title"]}{" "}
              </span>
            </div>
          ))}
        </div>
        <div className={styles["load-more-wrapper"]}>
          <button
            className={styles["load-more"]}
            onClick={onLoadMore}
            style={{
              backgroundColor: ROUTE_COLORS[0],
            }}
          >
            Load more
          </button>
        </div>
      </LayoutCocolis>
    </React.StrictMode>
  );
}
