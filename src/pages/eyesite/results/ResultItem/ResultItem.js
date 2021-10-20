import { Card, Row, Col } from "react-bootstrap";
//components
import ResultItemImage from "./ResultItemImage/ResultItemImage";
//css
import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
  const onContentClickHandler = () => {
    props.onShowContent(props.data);
  };

  return (
    <li onClick={onContentClickHandler}>
      <Card className={`${classes["dm-item-link"]} my-3`}>
        <Row>
          <Col lg={3} md={3} sm={12}>
            <ResultItemImage photoURL={props.data.photo_url} />
          </Col>
          <Col lg={9} md={9} sm={12}>
            <div className={classes["dm-item-info"]}>
              <h4>{props.data.name}</h4>
              <figure>
                <blockquote>
                  <p>{props.data.summary}</p>
                </blockquote>
                <figcaption>
                  Reference:&nbsp;
                  {props.data.citation == 1 && "External Link"}
                  {props.data.citation == 2 && "Description"}
                </figcaption>
              </figure>
            </div>
          </Col>
        </Row>
      </Card>
    </li>
  );
};

export default ResultItem;
