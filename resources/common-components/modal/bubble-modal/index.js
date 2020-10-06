import { useEffect, useMemo, useRef } from "react";
import { Modal } from "react-bootstrap";
import shortid from "shortid";
import OutClick from "../../out-click";
import styles from "./bubble-modal.module.scss";

export default function BubbleModal({
  contentClassName,
  title,
  triggerComponent,
  buttons,
  children,
  visible,
  onClose,
}) {
  // const modalId = useMemo(() => shortid());

  return (
    <Modal show={visible} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Body style={{ padding: 0 }}>
        <div className="modal-card card">
          <div className={`card-header ${styles.cfCeBbModalHeader}`}>
            <button
              type="button"
              style={{ flex: "unset" }}
              className="close btn-inline-block"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4
              className={`card-header-title ${styles.title}`}
              id="exampleModalCenterTitle"
            >
              {title}
            </h4>
            {buttons ? (
              <div className={styles.cfCeBbModalButtons}>{buttons}</div>
            ) : null}
          </div>
          <div
            className={`card-body ${styles.content} ${contentClassName || ""}`}
            style={{ maxHeight: "85vh", padding: "25px" }}
          >
            {children}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );

  // return (
  //   <>
  //     <div data-toggle="modal" data-target={`#${modalId}`} ref={ref}>
  //       {triggerComponent}
  //     </div>

  //     <div
  //       className={`modal fade`}
  //       id={modalId}
  //       tabIndex="-1"
  //       role="dialog"
  //       aria-hidden="true"
  //     >
  //       <div className="modal-dialog modal-dialog-centered" role="document">
  //         <div className="modal-content">
  //           <OutClick onOutClick={() => onClose && onClose()}>
  //             <div className="modal-card card">
  //               <div className={`card-header ${styles.cfCeBbModalHeader}`}>
  //                 <button
  //                   type="button"
  //                   style={{ flex: "unset" }}
  //                   className="close btn-inline-block"
  //                   data-dismiss="modal"
  //                   aria-label="Close"
  //                   onClick={onClose}
  //                 >
  //                   <span aria-hidden="true">&times;</span>
  //                 </button>
  //                 <h4
  //                   className="card-header-title"
  //                   id="exampleModalCenterTitle"
  //                 >
  //                   {title}
  //                 </h4>
  //                 {buttons ? (
  //                   <div className={styles.cfCeBbModalButtons}>{buttons}</div>
  //                 ) : null}
  //               </div>
  //               <div className="card-body" style={{ maxHeight: "80vh" }}>
  //                 {children}
  //               </div>
  //             </div>
  //           </OutClick>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
