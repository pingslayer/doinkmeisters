import { Card } from "react-bootstrap";
//css
import classes from "./CardGrey.module.css";

const CardGrey = (props) => {
  return <Card className={classes["dm-card"]}>{props.children}</Card>;
};

export default CardGrey;
