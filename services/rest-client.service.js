import axios from "axios";
import queryString from "query-string";
import { get, isEmpty } from "lodash";
import cookieService from "./cookie.service";

class RestClientService {
  constructor() {
    this.token = null;
    this.domain = "";
    this.defaultContentType = "application/json";
    this.brandId = null;
  }

  getToken() {
    return cookieService.getCookie("token");
  }

  setDomain(domain) {
    this.domain = domain;
  }

  setBrandId(brandId) {
    this.brandId = brandId;
  }

  createAuthorization() {
    return `Bearer ${this.getToken()}`;
  }

  createHeaders(options = { contentType: "application/json" }) {
    return {
      "Content-Type": get(options, "contentType", this.defaultContentType),
      Authorization: this.createAuthorization(),
      "brand-id": this.brandId,
    };
  }

  createApi(url, query = {}) {
    return `${this.domain}${url}${
      !isEmpty(query) ? `?${queryString.stringify(query)}` : ""
    }`;
  }

  asyncGet(url, query = {}, options = { contentType: "application/json" }) {
    return axios.get(this.createApi(url, query), {
      headers: this.createHeaders(options),
    });
  }

  asyncPost(url, data = {}, options = { contentType: "application/json" }) {
    return axios.post(this.createApi(url), data, {
      headers: this.createHeaders(options),
    });
  }

  asyncPut(url, data = {}, options = { contentType: "application/json" }) {
    return axios.put(this.createApi(url), data, {
      headers: this.createHeaders(options),
    });
  }

  asyncAll(requests) {
    return axios
      .all(
        requests.map((req) => {
          if (req.method === "get") {
            return this.asyncGet(req.url, req.query || {}, req.options || {});
          }

          return this.asyncPost(req.url, req.data || {}, req.options || {});
        })
      )
      .then(
        axios.spread((...responses) =>
          responses.map((res) => get(res, "data", null))
        )
      );
  }
}

const restClientService = new RestClientService();
restClientService.setDomain(process.env.NEXT_PUBLIC_BE_HOST);

export default restClientService;
