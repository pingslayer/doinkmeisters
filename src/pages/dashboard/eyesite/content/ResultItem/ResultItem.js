import { Card, Row, Col } from "react-bootstrap";
//ui
import CardDark from "../../../../../ui/card-dark/CardDark";
//css
import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
  return (
    <li>
      <CardDark>
        <Row>
          <Col lg={3} md={3} sm={12}>
            <img
              src={props.data.logo_url}
              className="card-img"
              alt="No Image Found"
            />
          </Col>
          <Col lg={9} md={9} sm={12}>
            <div className={classes["dm-item-info"]}>
              <h4>{props.data.name}</h4>
              <figure>
                <blockquote>
                  <p>{props.data.description}</p>
                </blockquote>
                <figcaption>{props.data.best_review}</figcaption>
              </figure>
            </div>
          </Col>
        </Row>
      </CardDark>
    </li>
  );
};

export default ResultItem;
