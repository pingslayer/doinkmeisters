import { Card } from "react-bootstrap";
//css
import classes from "./CardDarkWithBtn.module.css";

const CardDarkWithBtn = (props) => {
  return <Card className={classes["dm-card"]}>{props.children}</Card>;
};

export default CardDarkWithBtn;
