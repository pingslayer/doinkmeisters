import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
//ui
import ModalLightFullScreen from "../../../../ui/modal-light-full-width/ModalLightFullScreen";
//css
import classes from "./GamersHub.module.css";
//components
import LoadingSpinner from "../../../../ui/loading-spinner/LoadingSpinner";
import ResultItem from "./ResultItem/ResultItem";
//hooks
import useHttp from "../../../../hooks/use-http";
//api
import { GamersHubPublicAPIs } from "../../../../apis/gamers-hub-api";

const GamersHub = (props) => {
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

  const {
    sendRequest,
    status,
    data: loadedData,
    error,
  } = useHttp(GamersHubPublicAPIs.getAllActive, true);

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

  if (loadedData === null || loadedData.length === 0) {
    return (
      <div className="text-center mt-5">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className={classes["no-data-icon"]}
        />{" "}
        <h3 className={`${classes["no-data-message"]} mt-3`}>
          No Data to Display{" "}
        </h3>{" "}
      </div>
    );
  }

  return (
    <Fragment>
      <ModalLightFullScreen
        isModalVisible={isModalVisible}
        onModalCloseHandler={onModalCloseHandler}
      >
        {ReactHtmlParser(description)}{" "}
      </ModalLightFullScreen>{" "}
      <Container>
        <ul className={classes["dm-results-list"]}>
          {" "}
          {loadedData.map((data, index) => (
            <ResultItem
              key={index}
              data={data}
              onShowContent={onShowContentHandler}
            />
          ))}{" "}
        </ul>{" "}
      </Container>{" "}
    </Fragment>
  );
};

export default GamersHub;
