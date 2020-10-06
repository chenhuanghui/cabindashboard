import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import shortid from "shortid";
import { uuidV4 } from "../../../utils/uuid";
// import 'filestack-react/dist/filestack-react'
// import ReactFilestack from "filestack-react";
import styles from "./file-uploader.module.scss";

// const ReactFilestack = dynamic(() => import("filestack-react"));

export default function FileUploader({
  className,
  style,
  // containerId,
  onUploaded,
}) {
  const [containerId] = useState(`_${shortid()}`);

  useEffect(() => {
    const apikey = "A88NrCjOoTtq2X3RiYyvSz";
    const client = filestack.init(apikey);
    const options = {
      container: containerId, // can be CSS selector string or DOM node
      displayMode: "dropPane",
      dropPane: {
        overlay: false, // if this is true then overlays will conflict between instances
        onSuccess: (res) => onUploaded && onUploaded(res[0]),
      },
    };

    client.picker(options).open();
  }, []);

  return (
    <div
      id={containerId}
      className={`${styles.container} ${className || ""}`}
      style={style || {}}
      // onClick={onPick}
    >
      {/* Drag and drop or click to upload */}
    </div>
  );

  // return (
  //   <ReactFilestack
  //     apikey={"A88NrCjOoTtq2X3RiYyvSz"}
  //     action="pick"
  //     // actionOptions={{
  //     //   displayMode: "dropPane",
  //     //   container: containerId,
  //     // }}
  //     componentDisplayMode={{
  //       type: "link",
  //       customText: "Drag and drop or click to upload",
  //     }}
  //     customRender={({ onPick }) => (
  //       <div
  //         className={`${styles.container} ${className || ""}`}
  //         style={style || {}}
  //         onClick={onPick}
  //       >
  //         Drag and drop or click to upload
  //       </div>
  //     )}
  //     onSuccess={(res) => onUploaded && onUploaded(res.filesUploaded[0])}
  //   />
  // );
}
