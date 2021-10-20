import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ReactHtmlParser from "react-html-parser";
//components
import ResultItem from "./ResultItem/ResultItem";
//ui
import CardDark from "../../../../../ui/card-dark/CardDark";
import ModalDarkFullScreen from "../../../../../ui/modal-dark-full-screen/ModalDarkFullScreen";
//css
import classes from "./Content.module.css";

const Content = (props) => {
  let loadedData = props.loadedData;

  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onShowContentHandler = (data) => {
    if (data.citation == 1) {
      window.open(data.link, "_blank").focus();
    } else if (data.citation == 2) {
      setDescription(data.description);
      onModalOpenHandler();
    }
  };

  function onModalOpenHandler() {
    setIsModalVisible(true);
  }

  function onModalCloseHandler() {
    setIsModalVisible(false);
  }

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
    <Fragment>
      <ModalDarkFullScreen
        isModalVisible={isModalVisible}
        onModalCloseHandler={onModalCloseHandler}
      >
        {ReactHtmlParser(description)}
      </ModalDarkFullScreen>
      <CardDark>
        <div className={classes["dm-content-container"]}>
          <ul className={classes["dm-results-list"]}>
            {loadedData.map((data, index) => (
              <ResultItem
                key={index}
                data={data}
                onShowContent={onShowContentHandler}
                onEditContent={props.onEditContent}
                onDeleteContent={props.onDeleteContent}
              />
            ))}
          </ul>
        </div>
      </CardDark>
    </Fragment>
  );
};

export default Content;
