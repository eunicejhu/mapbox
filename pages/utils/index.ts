import merge from "lodash.merge";
import {
  COLOR_REGEX,
  RGB_REGEX,
  SPACE_REGEX,
  ALPHA_REGEX,
} from "@/utils/constants";

export { BG_ALPHA } from "@/utils/constants";

const DEFAULT_PAGE = 1;
const DEFAULT_NB_OF_PAGE = 10;

export const log = (...args: any[]) => {
  console.log(...args);
};

export const err = (...args: any[]) => {
  console.error(...args);
};

export const warn = (...args: any[]) => {
  console.warn(...args);
};

export const lastNElements = <T>(arr: T[], n: number): T[] => {
  return arr.slice(-n);
};
interface LonLatObject {
  lon: number;
  lat: number;
}
export function toLonLatString({ lon, lat }: LonLatObject): string {
  return [lon, lat].join(",");
}

export function toCoordinateString(
  from: LonLatObject,
  to: LonLatObject
): string {
  return [toLonLatString(from), toLonLatString(to)].join(";");
}

export function rgbColor(): string {
  const _3Digit = () => Math.round(Math.random() * 255);
  const COLOR = `rgb(${_3Digit()}, ${_3Digit()}, ${_3Digit()})`;
  return COLOR;
}

export function colors(size: number): string[] {
  return new Array(size).fill(0).map(() => rgbColor());
}

export function withColor<T>(input: T[]): (T & { color: string })[] {
  if (Array.isArray(input)) {
    return input.map((value: T) => merge({}, value, { color: rgbColor() }));
  }
  return merge({}, input, { color: rgbColor() });
}

export function toAlphaColor(
  color: string,
  alpha: string | number = Math.random().toFixed(2)
): string {
  if (!COLOR_REGEX.test(color)) {
    warn("invalid color: ", color);
    return "rgba(0, 0, 0, 0.1)";
  } else {
    return color
      .replace(SPACE_REGEX, "")
      .replace(RGB_REGEX, "rgba")
      .replace(ALPHA_REGEX, `,${alpha})`);
  }
}

export function generateFixedFloat(): number {
  return parseFloat((Math.random() * (45.12 - 0.02)).toFixed(5));
}

interface iHybridLonLat {
  _id: number;
  _source: {
    id: number;
    from_lat: number;
    to_lat: number;
    from_lng: number;
    to_lng: number;
    from: LonLatObject;
    to: LonLatObject;
  };
}

/**
 *
 * @param obj
 * @param coordinateObj
 *
 * it will return a new object, without mutating the obj
 */

export function overwriteLonLatObj(
  obj: iHybridLonLat,
  coordinateObj: { from: LonLatObject; to: LonLatObject },
  id: string | number
): iHybridLonLat {
  const firstLevel = {
    _source: {
      from_lat: coordinateObj.from.lat,
      to_lat: coordinateObj.to.lat,
      from_lng: coordinateObj.from.lon,
      to_lng: coordinateObj.to.lon,
    },
  };

  const secondLevel = { _source: coordinateObj };
  const idPart = { _id: id, _source: { id } };
  return merge({}, obj, firstLevel, secondLevel, idPart);
}

// export function deepMerge(
//   obj1: iObj,
//   obj2: iObj
// ): { [key: keyof obj1 | keyof obj2]: any } {
//   return;
// }

export interface iPaginationData<T> {
  data: T[];
  page: number;
  nbOfPage: number;
  totalPages: number;
}
export const pagination = <T>(
  array: T[],
  page: number,
  nbOfPage: number
): iPaginationData<T> => {
  let sanitizedArray: T[], sanitizedPage, sanitizedNbOfPage;
  let resultArray, totalPages;
  if (!Array.isArray(array)) {
    console.error("not an array from pagination", array);
    sanitizedArray = [];
  } else {
    sanitizedArray = array;
  }

  if (typeof page != "string" && typeof page != "number") {
    sanitizedPage = DEFAULT_PAGE;
  } else if (page == Infinity) {
    console.error("page should not be Inifinity from pagination");
    sanitizedPage = DEFAULT_PAGE;
  } else if (typeof page == "string") {
    sanitizedPage = parseInt(page);
  } else {
    sanitizedPage = page;
  }

  if (typeof nbOfPage != "string" && typeof nbOfPage != "number") {
    console.error("invalid nbOfPage from pagination", nbOfPage);
    sanitizedNbOfPage = DEFAULT_NB_OF_PAGE;
  } else if (typeof nbOfPage == "string") {
    sanitizedNbOfPage = parseInt(nbOfPage);
  } else {
    sanitizedNbOfPage = nbOfPage;
  }

  totalPages = Math.ceil(sanitizedArray.length / sanitizedNbOfPage);
  resultArray = sanitizedArray.slice(
    (sanitizedPage - 1) * sanitizedNbOfPage,
    sanitizedPage * sanitizedNbOfPage
  );
  return {
    data: resultArray,
    page: sanitizedPage,
    nbOfPage: sanitizedNbOfPage,
    totalPages,
  };
};

/** Playground for TS*/
const objA = { _source: { a: 1 } };
const objB = { _source: { b: 1 } };
const objC = { _source: { c: 1 } };

type A = typeof objA;
type B = typeof objB;
type C = typeof objC;

// intersection Types
type Result = A & B;

// extending Types, compiler complains
// interface iResult extends A, B, C {}

const result = merge<{}, A, B>({}, objA, objB); //Object.assign({}, objA, objB, objC);

const arr = [1, null, 2, null, 3];
const isNull = (value: any): value is null => value === null;
// const arr_res = arr.forEach((value) => {
//   if (isNull(value)) {
//     // do nothing
//     log(value);
//   } else {
//     value.toFixed(3);
//   }
// });

arr.forEach((value, index) => {
  if (isNull(value)) {
    return;
  } else {
    //log({ value });
  }
});

/** End  Playground for TS*/
