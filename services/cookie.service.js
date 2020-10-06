import { parseCookies, setCookie, destroyCookie } from "nookies";

class CookieService {
  getCookie(field) {
    return parseCookies(null)[field];
  }

  updateCookie = (field, value) => {
    setCookie(null, field, value, { path: "/" });
  };

  deleteCookie = (field) => {
    destroyCookie(null, field, { path: "/" });
  };
}

export default new CookieService();
