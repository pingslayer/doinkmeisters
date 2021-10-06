import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
//components
import ResultItem from "./ResultItem/ResultItem";
//ui
import CardDark from "../../../../ui/card-dark/CardDark";
//css
import classes from "./Content.module.css";

const Content = (props) => {
  let loadedData = props.loadedData;

  if (
    loadedData === null ||
    loadedData === undefined ||
    loadedData.length === 0
  ) {
    return (
      <CardDark>
        <div className={classes["dm-content-container"]}>
          <div className="text-center mt-5">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={classes["no-data-icon"]}
            />
            <h3 className={`${classes["no-data-message"]} mt-3`}>
              No Data to Display
            </h3>
          </div>
        </div>
      </CardDark>
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
              onDelete={props.onDeleteContent}
            />
          ))}
        </ul>
      </div>
    </CardDark>
  );
};

export default Content;
