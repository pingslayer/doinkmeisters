import { Fragment, useState } from "react";
//ui
import LoadingSpinnerXS from "../loading-spinner-xs/LoadingSpinnerXS";

const ResultItemImage = (props) => {
  const [loading, setLoading] = useState(true);

  const onImageLoaded = () => {
    setLoading(false);
  };

  return (
    <Fragment>
      <div style={{ display: loading ? "block" : "none" }} className="centered">
        <LoadingSpinnerXS />
      </div>
      <div style={{ display: loading ? "none" : "block" }}>
        <img
          src={props.photoURL}
          className="img-thumbnail"
          alt="No Image Found"
          onLoad={onImageLoaded}
          width="100%"
        />
      </div>
    </Fragment>
  );
};

export default ResultItemImage;
