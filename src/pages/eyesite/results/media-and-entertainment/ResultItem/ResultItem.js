import { Card, Row, Col } from "react-bootstrap";
//ui
import ResultItemImage from "../../../../../ui/result-item-image/ResultItemImage";
//css
import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
  const onContentClickHandler = () => {
    props.onShowContent(props.data.link);
  };

  return (
    <li onClick={onContentClickHandler}>
      <Card className={`${classes["dm-item-link"]} my-3`}>
        <Row>
          <Col lg={3} md={3} sm={12}>
            <ResultItemImage photoURL={props.data.photo} />
          </Col>
          <Col lg={9} md={9} sm={12}>
            <div className={classes["dm-item-info"]}>
              <h4>{props.data.name}</h4>
              <figure>
                <blockquote>
                  <p>{props.data.summary}</p>
                </blockquote>
              </figure>
            </div>
          </Col>
        </Row>
      </Card>
    </li>
  );
};

export default ResultItem;
