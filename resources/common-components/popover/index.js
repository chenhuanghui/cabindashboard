import { Popover as RBPopover, OverlayTrigger } from "react-bootstrap";
import { useState } from "react";
import OutClick from "../out-click";

export default function Popover({
  trigger,
  triggerComponent,
  placement,
  children,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <OverlayTrigger
      trigger={trigger}
      placement={placement}
      show={visible}
      overlay={
        <RBPopover
          content={false}
          arrowProps={{ style: { display: "none" } }}
          // id="cf-ce-popover"
        >
          <RBPopover.Content>{children}</RBPopover.Content>
        </RBPopover>
      }
    >
      <OutClick
        onClick={() => setVisible((previous) => !previous)}
        onOutClick={() => setVisible(false)}
      >
        {triggerComponent}
      </OutClick>
    </OverlayTrigger>
  );
}
