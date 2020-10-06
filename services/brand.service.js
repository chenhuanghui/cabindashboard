import restClientService from "./rest-client.service";

const AirtablePlus = require("airtable-plus");

class BrandService {
  constructor() {
    process.env.NEXT_PUBLIC_AIR_TABLE_API_KEY &&
      (this.airtableBRAND = new AirtablePlus({
        baseID: process.env.NEXT_PUBLIC_AIR_TABLE_BASE_ID_BRAND,
        apiKey: process.env.NEXT_PUBLIC_AIR_TABLE_API_KEY,
      }));
  }

  async getBrandByUserId(userId) {
    return this.airtableBRAND
      .read(
        { filterByFormula: `'auth0UserId = "${userId}"'`, maxRecords: 1 },
        { tableName: "Brand" }
      )
      .then((items) => items.map((item) => item.fields))
      .then((items) => items[0]);
  }

  async getBrandIdBySlug(brandSlug) {
    if (brandSlug === "broken-rice") {
      return 10001;
    } else {
      return null;
    }
  }

  async getBrandOverview() {
    return restClientService
      .asyncGet("/brand/overview")
      .then(({ status, data }) => {
        if (status === 200 && data) {
          return data;
        }
      })
      .catch((err) => null);
  }
}

export default new BrandService();
