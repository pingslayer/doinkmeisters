import { useState, useCallback, useEffect, Fragment } from "react";
import { Row, Col, Container, Form, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
//hook
import useHttp from "../../../../hooks/use-http";
//components
import Content from "./content/Content";
import AddContent from "./addcontent/AddContent";
import EditContent from "./editcontent/EditContent";
//ui
import LoadingSpinner from "../../../../ui/loading-spinner/LoadingSpinner";
import ModalDarkConfirmation from "../../../../ui/modal-dark-confirmation/ModalDarkConfirmation";
//css
import classes from "./Eyesite.module.css";
//apis
import { MediaAndEntertainmentAPIs } from "../../../../apis/media-and-entertainment-api";
import { GamersHubAPIs } from "../../../../apis/gamers-hub-api";
import { CoffeeBreaksAPIs } from "../../../../apis/coffee-breaks-api";
import { DopeTechAPIs } from "../../../../apis/dope-tech-api";
import { FashionAndHealthAPIs } from "../../../../apis/fashion-and-health-api";
import { isAllOf } from "@reduxjs/toolkit";

const Eyesite = (props) => {
  const SHOW_ALL_VIEW = "Show All";
  const ADD_VIEW = "Add";
  const EDIT_VIEW = "Edit";

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [view, setView] = useState(SHOW_ALL_VIEW);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedContentId, setSelectedContentId] = useState(null);

  const apiRefHandler = useCallback(() => {
    var apiRef = null;
    switch (props.category.id) {
      case 1:
        apiRef = MediaAndEntertainmentAPIs;
        break;

      case 2:
        apiRef = GamersHubAPIs;
        break;

      case 3:
        apiRef = CoffeeBreaksAPIs;
        break;

      case 4:
        apiRef = DopeTechAPIs;
        break;

      case 5:
        apiRef = FashionAndHealthAPIs;
        break;

      default:
        apiRef = MediaAndEntertainmentAPIs;
        break;
    }
    return apiRef;
  }, []);

  const {
    sendRequest,
    setRequestFunction,
    status,
    data: loadedData,
    error,
  } = useHttp(apiRefHandler().getAllActive, true);

  function onModalOpenHandler() {
    setIsModalVisible(true);
  }

  function onModalCloseHandler() {
    setIsModalVisible(false);
  }

  const showAllContentHandler = () => {
    setView(SHOW_ALL_VIEW);
  };

  const addContentHandler = () => {
    setView(ADD_VIEW);
  };

  const editContentHandler = (content) => {
    setSelectedContent(content);
    setView(EDIT_VIEW);
  };

  const deleteContentHandler = (id) => {
    setSelectedContentId(id);
    setIsModalVisible(true);
  };

  const deleteContentConfirmationHandler = async (isAccepted) => {
    setIsModalVisible(false);
    if (isAccepted) {
      setRequestFunction(apiRefHandler().remove);
      await sendRequest(selectedContentId);
      reloadContentHandler();
    }
  };

  const reloadContentHandler = () => {
    setRequestFunction(apiRefHandler().getAllActive);
    sendRequest();
  };

  useEffect(() => {
    sendRequest();
  }, []);

  if (status === "pending" || status === "sending") {
    return (
      <div className={classes["dm-eyesite-wrapper"]}>
        <div className="centered my-0" style={{ height: "100%" }}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <ModalDarkConfirmation
        isModalVisible={isModalVisible}
        onModalCloseHandler={onModalCloseHandler}
        onConfirmation={deleteContentConfirmationHandler}
      >
        <h6>Are you sure you want to delete?</h6>
      </ModalDarkConfirmation>

      <div className={classes["dm-eyesite-wrapper"]}>
        <Container>
          <br />
          <Card className={classes["dm-title-card"]}>
            <div className="d-flex justify-content-between">
              <h4>
                {props.category.nameCasual} {`>`} {view}
              </h4>

              {view === SHOW_ALL_VIEW && (
                <Button className="btn btn-dark" onClick={addContentHandler}>
                  + Add
                </Button>
              )}
              {view === ADD_VIEW && (
                <Button
                  className="btn btn-dark"
                  onClick={showAllContentHandler}
                >
                  Show All
                </Button>
              )}
              {view === EDIT_VIEW && (
                <Button
                  className="btn btn-dark"
                  onClick={showAllContentHandler}
                >
                  Show All
                </Button>
              )}
            </div>
          </Card>
          <br />
          {view === ADD_VIEW && (
            <AddContent
              category={props.category}
              getApiRef={apiRefHandler}
              showAllContent={showAllContentHandler}
              reloadContent={reloadContentHandler}
            />
          )}
          {view === SHOW_ALL_VIEW && (
            <Content
              status={status}
              loadedData={loadedData}
              onEditContent={editContentHandler}
              onDeleteContent={deleteContentHandler}
            />
          )}
          {view === EDIT_VIEW && (
            <EditContent
              category={props.category}
              getApiRef={apiRefHandler}
              content={selectedContent}
              showAllContent={showAllContentHandler}
              reloadContent={reloadContentHandler}
            />
          )}
        </Container>
      </div>
    </Fragment>
  );
};

export default Eyesite;
