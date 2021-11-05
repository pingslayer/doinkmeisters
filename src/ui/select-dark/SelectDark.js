import { Row, Col, Form, Card, ProgressBar, Toast } from "react-bootstrap";
//css
import classes from "./SelectDark.module.css";

const SelectDark = (props) => {
  return (
    <Form.Select variant="dark">
      <option>Open this select content type</option>
      {props.data.map((data, index) => (
        <option key={index} value={data.value}>
          {data.text}
        </option>
      ))}
    </Form.Select>
  );
};

export default SelectDark;
