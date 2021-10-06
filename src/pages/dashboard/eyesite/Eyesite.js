import { useState, useCallback, useEffect } from "react";
import { Row, Col, Container, Form, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
//hook
import useHttp from "../../../hooks/use-http";
//components
import Content from "./content/Content";
import AddContent from "./addcontent/AddContent";
//ui
import LoadingSpinner from "../../../ui/loading-spinner/LoadingSpinner";
import CardDarkWithBtn from "../../../ui/card-dark-with-btn/CardDarkWithBtn";
//css
import classes from "./Eyesite.module.css";
//apis
import { MediaAndEntertainmentAPIs } from "../../../apis/media-and-entertainment-api";
import { GamersHubAPIs } from "../../../apis/gamers-hub-api";
import { CoffeeBreaksAPIs } from "../../../apis/coffee-breaks-api";
import { DopeTechAPIs } from "../../../apis/dope-tech-api";
import { FashionAndHealthAPIs } from "../../../apis/fashion-and-health-api";

const Eyesite = (props) => {
  const SHOW_ALL_VIEW = "SHOW_ALL_VIEW";
  const ADD_VIEW = "ADD_VIEW";
  const EDIT_VIEW = "EDIT_VIEW";

  const [view, setView] = useState(SHOW_ALL_VIEW);

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

  const showAllContentHandler = () => {
    setView(SHOW_ALL_VIEW);
  };

  const addContentHandler = () => {
    setView(ADD_VIEW);
  };

  const deleteContentHandler = async (id) => {
    setRequestFunction(apiRefHandler().remove);
    await sendRequest(id);
    reloadContentHandler();
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
    <div className={classes["dm-eyesite-wrapper"]}>
      <Container>
        <br />
        <Card className={classes["dm-title-card"]}>
          <div className="d-flex justify-content-between">
            <h4>{props.category.nameCasual}</h4>

            {view === ADD_VIEW ? (
              <Button className="btn btn-dark" onClick={showAllContentHandler}>
                Show All
              </Button>
            ) : (
              <Button className="btn btn-dark" onClick={addContentHandler}>
                + Add
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
            onDeleteContent={deleteContentHandler}
          />
        )}
      </Container>
    </div>
  );
};

export default Eyesite;
