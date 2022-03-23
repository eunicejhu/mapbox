import {
  log,
  lastNElements,
  toLonLatString,
  toCoordinateString,
  generateFixedFloat,
  overwriteLonLatObj,
  rgbColor,
  colors,
  withColor,
  toAlphaColor,
} from "./index";

describe("test uitls", () => {
  it("log(1, 2, 'zuoqin') will log ", () => {
    const spy = jest.spyOn(console, "log");
    log(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it("test lastNElements", () => {
    const result = lastNElements([1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 2], 5);
    const expected = [6, 7, 8, 9, 2];
    expect(result).toEqual(expected);
  });

  it("test toLonLatString", () => {
    const inputObj = { lat: 48.85658, lon: 2.35183 };

    const expected = "2.35183,48.85658";
    expect(toLonLatString(inputObj)).toBe(expected);
  });

  it("test toCoordinateString", () => {
    const fromObj = { lat: 48.85658, lon: 2.35183 };
    const toObj = { lat: 45.75889, lon: 4.84139 };
    const expected = "2.35183,48.85658;4.84139,45.75889";
    expect(toCoordinateString(fromObj, toObj)).toBe(expected);
  });

  it("test generateFixedFloat", () => {
    log(generateFixedFloat());
  });

  it("test colors", () => {
    const colorsArray = colors(5);
    log(colorsArray);
  });

  it("test withColor", () => {
    const obj = [{ a: 1 }];
    const result = withColor<{ a: number }>(obj);
    log(result);
  });

  it("test toAlphaColor", () => {
    const color = "rgb(1, 233, 33)";
    const alpha = 0;
    expect(toAlphaColor(color, alpha)).toEqual("rgba(1,233,33,0)");
  });

  it("test overwriteLonLatObj", () => {
    const inputObj = {
      _id: 1,
      _source: {
        id: 1,
        from_lat: 48.85658,
        to_lat: 45.75889,
        from_lng: 2.35183,
        to_lng: 4.84139,
        from: { lat: 48.85658, lon: 2.35183 },
        to: { lat: 45.75889, lon: 4.84139 },
      },
    };
    const coordinateObj = {
      from: { lat: 28.85658, lon: 0.32383 },
      to: { lat: 15.75889, lon: 1.12339 },
    };

    const expected = {
      _id: "QDJ",
      _source: {
        id: "QDJ",
        from_lat: 28.85658,
        to_lat: 15.75889,
        from_lng: 0.32383,
        to_lng: 1.12339,
        from: { lat: 28.85658, lon: 0.32383 },
        to: { lat: 15.75889, lon: 1.12339 },
      },
    };
    expect(overwriteLonLatObj(inputObj, coordinateObj, "QDJ")).toEqual(
      expected
    );
  });
});
