import { useState, useCallback } from "react";
import { Row, Col, Container, Form, Card, Button } from "react-bootstrap";
//components
import Content from "./content/Content";
import AddContent from "./addcontent/AddContent";
//ui
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
  const [isAddContent, setIsAddContent] = useState(false);

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

  const showAllContentHandler = () => {
    setIsAddContent(false);
  };

  const addContentHandler = () => {
    setIsAddContent(true);
  };

  return (
    <div className={classes["dm-eyesite-wrapper"]}>
      <Container>
        <br />
        <Card className={classes["dm-title-card"]}>
          <div className="d-flex justify-content-between">
            <h4>{props.category.nameCasual}</h4>

            {isAddContent ? (
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
        {isAddContent ? (
          <AddContent
            category={props.category}
            getApiRef={apiRefHandler}
            showAllContent={showAllContentHandler}
          />
        ) : (
          <Content getApiRef={apiRefHandler} />
        )}
      </Container>
    </div>
  );
};

export default Eyesite;
