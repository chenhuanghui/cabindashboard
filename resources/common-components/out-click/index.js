/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

export default function OutClick({
  children,
  onClick,
  onOutClick,
  disabled = false,
  className,
  style,
  exceptionElementSelectors = [],
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const onClick = (e) => {
      if (
        !containerRef?.current?.contains(e.target) &&
        !exceptionElementSelectors.some((selector) => {
          const elementDom = document.querySelector(selector);

          return elementDom && elementDom.contains(e.target);
        })
      ) {
        onOutClick && onOutClick();
      }
    };

    if (disabled) {
      return;
    }

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [disabled, onOutClick, exceptionElementSelectors]);

  return (
    <div
      style={{ display: "inline-block", ...(style || {}) }}
      className={className || ""}
      ref={containerRef}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
