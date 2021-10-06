import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
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
  var requestFunction = props.getApiRef().getAllActive;

  const {
    sendRequest,
    setRequestFunction,
    status,
    data: loadedData,
    error,
  } = useHttp(requestFunction, true);

  const loadContentHandler = () => {
    setRequestFunction(props.getApiRef().getAllActive);
    sendRequest();
  };

  const deleteContentHandler = async (id) => {
    setRequestFunction(props.getApiRef().remove);
    await sendRequest(id);
    loadContentHandler();
  };

  useEffect(() => {
    sendRequest();
  }, []);

  if (status === "pending" || status === "sending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    loadedData === null ||
    loadedData === undefined ||
    loadedData.length === 0
  ) {
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
            <ResultItem
              key={index}
              data={data}
              onDelete={deleteContentHandler}
            />
          ))}
        </ul>
      </div>
    </CardDark>
  );
};

export default Content;
