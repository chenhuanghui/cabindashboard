export default function DropDown({ triggerComponent, options }) {
  return (
    <div className="dropdown">
      <a
        href="#"
        className="dropdown-ellipses dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {triggerComponent || <i className="fe fe-more-vertical"></i>}
      </a>
      <div className="dropdown-menu dropdown-menu-right">
        {options.map((option) => (
          <a
            key={option.id}
            href="#!"
            className="dropdown-item"
            onClick={(e) => {
              e.preventDefault();
              option.onClick && option.onClick();
            }}
            // style={{ fontWeight: 500, fontSize: "14px", color: "#12263F" }}
          >
            {option.label}
          </a>
        ))}
      </div>
    </div>
  );
}
