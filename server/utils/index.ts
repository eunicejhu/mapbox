import merge from 'lodash.merge'

export const log = (...args: any[]) => {
  console.log(...args)
}

export const generateFloat = (): number => parseFloat((Math.random() * (45.12 - 0.02)).toFixed(5))

interface LonLatObject {
  lon: number
  lat: number
}
export function generateLonLatFloat(): LonLatObject {
  return { lon: generateFloat(), lat: generateFloat() }
}

interface iHybridLonLat {
  _id: number
  _source: {
    id: number
    from_lat: number
    to_lat: number
    from_lng: number
    to_lng: number
    from: LonLatObject
    to: LonLatObject
  }
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
  id: number | string
): iHybridLonLat {
  const firstPart = {
    _id: id,
    _source: {
      id,
      from_lat: coordinateObj.from.lat,
      to_lat: coordinateObj.to.lat,
      from_lng: coordinateObj.from.lon,
      to_lng: coordinateObj.to.lon,
      ...coordinateObj,
    },
  }

  return merge({}, obj, firstPart)
}
