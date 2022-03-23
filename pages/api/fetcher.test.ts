import fetcher, { isFetcherError } from "./fetcher";
import { log } from "../utils";
import { MOCK_EXPRESS_REQUEST } from "./constants";
import { RIDES_RESPONSE_MOCK } from "./rides";

describe("Test fetcher", () => {
  it("fetcher failed return an error object", async () => {
    const result = await fetcher<typeof RIDES_RESPONSE_MOCK>(
      MOCK_EXPRESS_REQUEST
    );
    const result2 = await Promise.resolve<typeof RIDES_RESPONSE_MOCK>(
      RIDES_RESPONSE_MOCK
    );

    const resArray = [result, result2];
    const filteredResArray = resArray.map((res) =>
      isFetcherError(res) ? null : res
    );
    log({ resArray, filteredResArray });
  });
});
