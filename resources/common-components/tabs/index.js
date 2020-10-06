export default function Tabs({
  className,
  style,
  tabs,
  activeTab,
  onChangeActiveTab,
}) {
  return (
    <div className="header-body">
      <div className="row align-items-center">
        <div className="col">
          <ul className="nav nav-tabs nav-overflow header-tabs" style={{}}>
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className="nav-item"
                onClick={() => onChangeActiveTab && onChangeActiveTab(tab.id)}
              >
                <a
                  href="#"
                  className={`nav-link  ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={(e) => e.preventDefault()}
                >
                  {tab.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
