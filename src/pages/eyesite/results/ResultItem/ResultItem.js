import { Card, Row, Col } from "react-bootstrap";
//css
import classes from "./ResultItem.module.css";

const ResultItem = (props) => {
  console.log("Hello");

  return (
    <li>
      <Card className="my-3">
        <Row>
          <Col lg={2} md={2} sm={12}>
            <img
              src={props.data.logo_url}
              className="card-img"
              alt="No Image Found"
            />
          </Col>
          <Col lg={10} md={10} sm={12}>
            <h3>{props.data.name}</h3>
            <p>{props.data.description}</p>
          </Col>
        </Row>
      </Card>
    </li>
  );
};

export default ResultItem;
