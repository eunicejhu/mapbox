import { HttpMethod, RequestConfig } from "@/api/fetcher";
import { iColor, iRideCoordinates } from "@/api/types";

export const ROUTE_COLORS = [
  "rgb(66, 165, 245)",
  "rgb(186, 104, 200)",
  "rgb(239, 83, 80)",
  "rgb(255, 152, 0)",
  "rgb(76, 175, 80)",
];

export const DEFAULT_PAGINATION_SIZE = 5;
export const DEFAULT_PAGINATION_FROM = 0;
export const DEFAULT_PAGINATION = {
  from: DEFAULT_PAGINATION_FROM,
  size: DEFAULT_PAGINATION_SIZE,
};

export const toDirectionRequest = (coordinate: string, access_token: string) =>
  `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${coordinate}?&geometries=geojson&access_token=${access_token}`;

export function directions_api_request_with_color(
  coordinates: (iRideCoordinates & iColor)[],
  access_token: string
): { request: RequestConfig; color: string }[] {
  return coordinates.map(({ coordinates, color }) => ({
    request: {
      url: toDirectionRequest(coordinates, access_token),
      method: "get" as HttpMethod,
    },
    color,
  }));
}

export const RIDES_SEARCH_REQUEST = ({ from, size }) => ({
  url: "https://staging.cocolis.fr/es/rides/_search",
  method: "POST" as HttpMethod,
  body: {
    size,
    query: {
      bool: {
        filter: [
          {
            range: {
              to_pickup_date: {
                gte: "2021-11-24T08:43:01.660Z",
              },
            },
          },
        ],
      },
    },
    sort: [
      {
        last_edited_at: {
          order: "desc",
        },
      },
    ],
    from,
  },
  headers: {
    Authority: "staging.cocolis.fr",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    "Sec-Ch-Ua":
      '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
    Tracestate:
      "2570670@nr=0-1-2570670-915484818-a4549697315242ce----1637743381661",
    Traceparent: "00-539986fdddcf2921ec6cdd6bbd6f0a20-a4549697315242ce-01",
    "Sec-Ch-Ua-Mobile": "?0",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    Newrelic:
      "eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjI1NzA2NzAiLCJhcCI6IjkxNTQ4NDgxOCIsImlkIjoiYTQ1NDk2OTczMTUyNDJjZSIsInRyIjoiNTM5OTg2ZmRkZGNmMjkyMWVjNmNkZDZiYmQ2ZjBhMjAiLCJ0aSI6MTYzNzc0MzM4MTY2MX19",
    "Content-Type": "application/json",
    Accept: "application/json",
    Dpr: "2",
    "Sentry-Trace": "2ecaf53496fd4071bc12593ca960d08b-856848d38897c562-1",
    "Sec-Ch-Ua-Platform": "macOS",
    Origin: "https://staging.cocolis.fr",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    Referer: "https://staging.cocolis.fr/sign-in",
    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    Cookie:
      "_ga=GA1.2.1443066122.1625588870; _gcl_au=1.1.385972229.1633529515; cookieName=amp-R4hTHTFaNzczqoHtASB9Fw; _hjid=87a1cfb8-aaf2-44ea-8dc5-aa07a2e32f05; amp_e9074a=ixszu9wh.Nzk2Ng==..1fjp19a6o.1fjp5ilpe.1tj.1s5.3po; _gaexp=GAX1.2.tw5YTjzKSNeXLpSTOAJnMw.19007.0; _gid=GA1.2.1350717489.1637743363; _gat_UA-64206773-8=1",
    "Accept-Encoding": "gzip",
  },
});

export const MOCK_EXPRESS_REQUEST = {
  url: "http://localhost:3002/rides",
  method: "post" as HttpMethod,
  body: {},
  headers: {},
};
