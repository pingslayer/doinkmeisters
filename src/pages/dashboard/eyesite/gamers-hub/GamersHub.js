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
import CardDark from "../../../../ui/card-dark/CardDark";
import LoadingSpinner from "../../../../ui/loading-spinner/LoadingSpinner";
import ModalDarkConfirmation from "../../../../ui/modal-dark-confirmation/ModalDarkConfirmation";
import DashboardHeaderBar from "../../../../ui/dashboard-header-bar/DashboardHeaderBar";
//css
import classes from "./GamersHub.module.css";
//apis
import { GamersHubAPIs } from "../../../../apis/gamers-hub-api";
//store
import { useAuth } from "../../../../store/AuthContext";

const GamersHub = (props) => {
  const { currentUser } = useAuth();

  const SHOW_ALL_VIEW = "Your Content";
  const ADD_VIEW = "Add Content";
  const EDIT_VIEW = "Edit Content";

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [view, setView] = useState(SHOW_ALL_VIEW);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedContentId, setSelectedContentId] = useState(null);

  const {
    sendRequest,
    setRequestFunction,
    status,
    data: loadedData,
    error,
  } = useHttp(GamersHubAPIs.getAllByUserIdOrderByCreatedAt, true);

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
      setRequestFunction(GamersHubAPIs.remove);
      await sendRequest(selectedContentId);
      reloadContentHandler();
    }
  };

  const reloadContentHandler = () => {
    if (currentUser.email === process.env.REACT_APP_ADMIN_EMAIL) {
      setRequestFunction(GamersHubAPIs.getAllOrderByCreatedAt);
    } else {
      setRequestFunction(GamersHubAPIs.getAllByUserIdOrderByCreatedAt);
    }
    sendRequest(currentUser.uid);
  };

  useEffect(() => {
    reloadContentHandler();
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
          <DashboardHeaderBar
            menuName={"Gamers Hub"}
            view={view}
            addContent={addContentHandler}
            showContent={showAllContentHandler}
          />
          <br />
          {view === SHOW_ALL_VIEW && (
            <Content
              status={status}
              loadedData={loadedData}
              onEditContent={editContentHandler}
              onDeleteContent={deleteContentHandler}
            />
          )}
          {view === ADD_VIEW && (
            <AddContent
              category={props.category}
              apiRef={GamersHubAPIs}
              showAllContent={showAllContentHandler}
              reloadContent={reloadContentHandler}
            />
          )}
          {view === EDIT_VIEW && (
            <EditContent
              category={props.category}
              apiRef={GamersHubAPIs}
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

export default GamersHub;
