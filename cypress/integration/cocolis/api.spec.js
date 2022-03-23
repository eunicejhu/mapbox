import { RIDES_SEARCH_REQUEST, MOCK_EXPRESS_REQUEST } from "@/api/constants";
const token_access =
  "pk.eyJ1Ijoic2ViZmllIiwiYSI6ImNreTk1aHBrczAzMnUyb3BudWpxc3QzOGsifQ.QvEmUtnbxp21kX8t0Ci2HQ";

https: describe("Test express api & Mapbox api", () => {
  context("POST https://staging.cocolis.fr/es/rides/_search", () => {
    it("request data from cocolis", () => {
      cy.request(RIDES_SEARCH_REQUEST({ from: 0, size: 5 })).should(
        (response) => {
          cy.log(JSON.stringify(response.body));
          expect(response.body.hits.hits.length).to.eq(5);
        }
      );
    });
  });

  context(
    `GET https://api.mapbox.com/directions/v5/mapbox/driving-traffic/2.36246822852,48.8287176845;4.444253,50.397725?&geometries=geojson&access_token=${token_access}`,
    () => {
      it("should return a list with all products", () => {
        cy.request({
          method: "GET",
          url: `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/2.36246822852,48.8287176845;4.444253,50.397725?&geometries=geojson&access_token=${token_access}`,
        }).should((response) => {
          cy.log(JSON.stringify(response.body));
        });
      });
    }
  );

  context("POST http://localhost:3002/rides", () => {
    it(`request data from local express server ${JSON.stringify(
      MOCK_EXPRESS_REQUEST
    )}`, () => {
      cy.request(MOCK_EXPRESS_REQUEST).should((response) => {
        cy.log(JSON.stringify(response.body));
      });
    });
  });
});

// cypress.go("http://localhost:3002/ridess")
