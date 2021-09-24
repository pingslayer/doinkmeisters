import { Route, Switch, Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faGamepad,
  faMicrochip,
  faMobileAlt,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
//css
import classes from "./Categories.module.css";

const Categories = () => {
  return (
    <div className={classes["dm-categories-wrapper"]}>
      <div className={classes["dm-categories-navbar-topline"]}></div>

      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link href="" className={classes["dm-categories-link"]}>
            <FontAwesomeIcon
              icon={faMobileAlt}
              className={classes["dm-categories-item-icon"]}
            />
            MEDIA AND ENTERTAINMENT
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="" className={classes["dm-categories-link"]}>
            <FontAwesomeIcon
              icon={faGamepad}
              className={classes["dm-categories-item-icon"]}
            />
            GAMERS HUB
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="" className={classes["dm-categories-link"]}>
            <FontAwesomeIcon
              icon={faCode}
              className={classes["dm-categories-item-icon"]}
            />
            COFFEE BREAKS
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="" className={classes["dm-categories-link"]}>
            <FontAwesomeIcon
              icon={faMicrochip}
              className={classes["dm-categories-item-icon"]}
            />
            DOPE TECHS
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="" className={classes["dm-categories-link"]}>
            <FontAwesomeIcon
              icon={faShoppingBag}
              className={classes["dm-categories-item-icon"]}
            />
            FASHION AND HEALTH
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Categories;
