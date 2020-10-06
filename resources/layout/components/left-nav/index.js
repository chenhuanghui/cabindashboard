import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import styles from "./left-nav.module.scss";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { useRouter } from "next/router";

export default function LeftNav({ pageId }) {
  const { user } = useAuth0();
  const { query } = useRouter();
  const brand = useSelector((state) => get(state, ["userReducer", "brand"]));

  const brandSlug = query?.brandSlug;

  return (
    <nav
      className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light"
      id="sidebar"
    >
      <div className="container-fluid">
        {/* <!-- Toggler --> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* <!-- Logo of cabin eat --> */}
        <Link className="navbar-brand" href={`/${brandSlug}`}>
          <img
            src={get(brand, ["businessLogoUrl"]) || "/assets/img/logo.svg"}
            className="navbar-brand-img mx-auto"
            style={{ marginTop: "37px" }}
            alt="..."
          />
        </Link>

        {/* <!-- User (xs) --> */}
        <div className="navbar-user d-md-none">
          {/* <!-- Dropdown --> */}
          <div className="dropdown">
            {/* <!-- Toggle --> */}
            <a
              href="#"
              id="sidebarIcon"
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="avatar avatar-sm avatar-online">
                <img
                  src={user?.picture}
                  className={`avatar-img rounded-circle ${styles.cfCeAvatarImage}`}
                  alt="..."
                />
              </div>
            </a>

            {/* <!-- Menu --> */}
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="sidebarIcon"
            >
              <a href="./profile-posts.html" className="dropdown-item">
                Thông tin tài khoản
              </a>
              <hr className="dropdown-divider" />
              <a
                href={`/${query.brandSlug}/sign-out`}
                className="dropdown-item"
              >
                Đăng xuất
              </a>
            </div>
          </div>
        </div>

        {/* <!-- Collapse --> */}
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          {/* <!-- Form --> */}
          <form className="mt-4 mb-3 d-md-none">
            <div className="input-group input-group-rounded input-group-merge">
              <input
                type="search"
                className="form-control form-control-rounded form-control-prepended"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <span className="fe fe-search"></span>
                </div>
              </div>
            </div>
          </form>

          {/* <!-- Navigation --> */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href={`/${brandSlug}`}>
                <a
                  className={`nav-link ${
                    pageId === "home" ? `active ${styles.active}` : ""
                  }`}
                  role="button"
                >
                  <i className="fe fe-home"></i> Trang chủ
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#sidebarPages"
                data-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarPages"
              >
                <i className="fe fe-tag"></i> Thực đơn
              </a>
              <div className="collapse" id="sidebarPages">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <Link href={`/${brandSlug}/products`}>
                      <a
                        href={`/${brandSlug}/products`}
                        className={`nav-link ${
                          pageId === "products" ? `active ${styles.active}` : ""
                        }`}
                        role="button"
                      >
                        Sản phẩm
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={`/${brandSlug}/selections`}>
                      <a
                        href={`/${brandSlug}/selections`}
                        className={`nav-link ${
                          pageId === "selections"
                            ? `active ${styles.active}`
                            : ""
                        }`}
                        role="button"
                      >
                        Tùy chọn
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={`/${brandSlug}/design`}>
                      <a
                        href={`/${brandSlug}/design`}
                        className={`nav-link ${
                          pageId === "design" ? `active ${styles.active}` : ""
                        }`}
                        role="button"
                      >
                        Thiết kế
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <Link href={`/${brandSlug}/coupon`}>
                <a
                  className={`nav-link ${
                    pageId === "ads" ? `active ${styles.active}` : ""
                  }`}
                  href={`/${brandSlug}/coupon`}
                  role="button"
                >
                  <i className="fe fe-gift"></i> Quảng cáo
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={`/${brandSlug}/order`}>
                <a
                  className={`nav-link ${
                    pageId === "order" ? `active ${styles.active}` : ""
                  }`}
                  href={`/${brandSlug}/order`}
                  role="button"
                >
                  <i className="fe fe-list"></i> Giao dịch
                </a>
              </Link>
            </li>
          </ul>

          {/* <!-- Divider --> */}
          <hr className="navbar-divider my-3" />

          <h6
            className="navbar-heading"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Ứng dụng{" "}
            <i className={`fe fe-plus-circle ${styles.cfCeAddAppIcon}`}></i>
          </h6>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/" role="button">
                <i className="fe fe-printer"></i> Cabin POS
              </a>
            </li>
          </ul>

          {/* <!-- Push content down --> */}
          <div className="mt-auto"></div>

          {/* <!-- User (md) --> */}
          <div className="navbar-user d-none d-md-flex" id="sidebarUser">
            {/* <!-- Icon --> */}
            <a
              href="#sidebarModalActivity"
              className="navbar-user-link"
              data-toggle="modal"
            >
              <span className="icon">
                <i className="fe fe-bell"></i>
              </span>
            </a>

            {/* <!-- Dropup --> */}
            <div className="dropup">
              {/* <!-- Toggle --> */}
              <a
                href="#"
                id="sidebarIconCopy"
                className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="avatar avatar-sm avatar-online">
                  <img
                    src={user?.picture}
                    className={`avatar-img rounded-circle ${styles.cfCeAvatarImage}`}
                    alt="..."
                  />
                </div>
              </a>

              {/* <!-- Menu --> */}
              <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                <a href="/profile" className="dropdown-item">
                  Thông tin tài khoản
                </a>
                <hr className="dropdown-divider" />
                <a
                  href={`/${query.brandSlug}/sign-out`}
                  className="dropdown-item"
                >
                  Đăng xuất
                </a>
              </div>
            </div>

            <a
              href="#sidebarModalSearch"
              className="navbar-user-link"
              data-toggle="modal"
            >
              <span className="icon">
                <i className="fe fe-search"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
