import { useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
//components
import ResultItem from "./ResultItem/ResultItem";
//ui
import LoadingSpinner from "../../../../ui/loading-spinner/LoadingSpinner";
import CardDark from "../../../../ui/card-dark/CardDark";
//css
import classes from "./Content.module.css";

//hook
import useHttp from "../../../../hooks/use-http";

const Content = (props) => {
  const {
    sendRequest,
    status,
    data: loadedData,
    error,
  } = useHttp(props.getApiRef().getAllActive, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending" || status === "sending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  console.log(loadedData);

  if (loadedData === null || loadedData.length === 0) {
    return (
      <div className="text-center mt-5">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className={classes["no-data-icon"]}
        />
        <h3 className={`${classes["no-data-message"]} mt-3`}>
          No Data to Display
        </h3>
      </div>
    );
  }

  return (
    <CardDark>
      <div className={classes["dm-content-container"]}>
        <ul className={classes["dm-results-list"]}>
          {loadedData.map((data, index) => (
            <ResultItem key={index} data={data} />
          ))}
        </ul>
      </div>
    </CardDark>
  );
};

export default Content;
