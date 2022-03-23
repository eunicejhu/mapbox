import { useState } from "react";
import { fetchRides } from "@/api/fetcher";
import { _RIDES_WITH_COLOR, iPagination } from "@/api/types";
import { DEFAULT_PAGINATION } from "@/api/constants";
import merge from "lodash.merge";

export default function useRides(
  initialRides: _RIDES_WITH_COLOR
): [_RIDES_WITH_COLOR, () => void] {
  const [pagination, setPagination] = useState<iPagination>(DEFAULT_PAGINATION);
  const [rides, setRides] = useState<_RIDES_WITH_COLOR>(initialRides);
  // onClick handler
  const onLoadMore = async () => {
    // By default: fetch 5 rides
    const moreRides = await fetchRides(pagination);
    setPagination(merge(pagination, { from: pagination.from + 1 }));
    setRides([...rides, ...moreRides]);
  };

  return [rides, onLoadMore];
}
