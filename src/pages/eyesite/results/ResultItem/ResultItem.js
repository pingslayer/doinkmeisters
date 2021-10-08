import { Card, Row, Col } from "react-bootstrap";
//css
import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
  return (
    <li>
      <a
        href={props.data.link}
        target="_blank"
        className={classes["dm-item-link"]}
      >
        <Card className="my-3">
          <Row>
            <Col lg={3} md={3} sm={12}>
              <img
                src={props.data.photo_url}
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
        </Card>
      </a>
    </li>
  );
};

export default ResultItem;
