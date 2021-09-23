import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//css
import classes from "./Search.module.css";

const Search = () => {
  return (
    <Container className={classes["dm-search-wrapper"]}>
      <Row>
        <Col lg={10} md={10} sm={12}>
          <InputGroup size="lg">
            <InputGroup.Text
              id="inputGroup-sizing-lg"
              className={classes["dm-search-input-group-dark-bg"]}
            >
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <FormControl
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              className={classes["dm-search-form-control-dark-bg"]}
              placeholder="Search Eyesite"
            />
          </InputGroup>
        </Col>
        <Col lg={2} md={2} sm={12}>
          <Button
            variant="dark"
            className={classes["dm-search-random-button-dark-bg"]}
          >
            RANDOM
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
