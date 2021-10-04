import { Card } from "react-bootstrap";
//css
import classes from "./CardDark.module.css";

const CardDark = (props) => {
  return <Card className={classes["dm-card"]}>{props.children}</Card>;
};

export default CardDark;
