export default function Header({ title, subTitle, utilButtons }) {
  return (
    <div className="header" style={{ marginBottom: "0px" }}>
      <div className="container-fluid">
        <div
          className="header-body"
          style={{ borderBottom: "none", paddingBottom: "0px" }}
        >
          <div className="row align-items-end">
            <div className="col">
              <h6
                className="header-pretitle"
                style={{
                  fontSize: "10px",
                  lineHeight: "12px",
                  color: "#6E84A3",
                  fontWeight: "bold",
                  marginBottom: "2px",
                }}
              >
                {title}
              </h6>

              <h1
                className="header-title"
                style={{
                  fontWeight: "bold",
                  fontSize: "28px",
                  lineHeight: "34px",
                  color: "#12263F",
                }}
              >
                {subTitle || title}
              </h1>
            </div>
            <div className="col-auto" id="headerUtilButtons">
              {utilButtons}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
