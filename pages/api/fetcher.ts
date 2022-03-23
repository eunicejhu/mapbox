import { warn, withColor, log } from "@/utils/index";
import axios, { AxiosRequestConfig, Method } from "axios";
import {
  _RIDES,
  _RIDES_RESPONSE,
  _RIDE_WITH_COLOR,
  iPagination,
} from "@/api/types";

import {
  RIDES_SEARCH_REQUEST,
  DEFAULT_PAGINATION_SIZE,
  DEFAULT_PAGINATION_FROM,
  MOCK_EXPRESS_REQUEST,
} from "@/api/constants";
export interface RequestConfig extends AxiosRequestConfig {}
export type HttpMethod = Method;
export interface FetcherError {
  message: string;
  detail: string;
}

export const isFetcherError = (value: any): value is FetcherError =>
  Object.keys(value).includes("cocolis-fetch-error");

export default async function cocolisFetcher<T>(
  requestConfig: RequestConfig
): Promise<T | FetcherError> {
  try {
    const { data } = await axios(requestConfig);
    return data;
  } catch (error) {
    warn("Fetcher error: " + error);
    return Promise.resolve({
      "cocolis-fetch-error": true,
      message: `fetch data error from url ${requestConfig.url}`,
      detail: JSON.stringify(error),
    });
  }
}

const rides_request = (pagination: iPagination, mock: boolean) => {
  if (mock) {
    return MOCK_EXPRESS_REQUEST;
  } else {
    return RIDES_SEARCH_REQUEST(pagination);
  }
};

export async function fetchRides(
  { from, size } = {
    from: DEFAULT_PAGINATION_FROM,
    size: DEFAULT_PAGINATION_SIZE,
  }
): Promise<_RIDE_WITH_COLOR[]> {
  log({ from, size });
  const result = await cocolisFetcher<_RIDES_RESPONSE>(
    // to use data from cocolis, please switch mock to false
    rides_request({ from, size }, true)
  );
  if (!isFetcherError(result)) {
    return withColor(result.hits.hits);
  } else {
    return [];
  }
}
