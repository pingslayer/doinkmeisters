import { Route, Switch, Redirect } from "react-router";
import { NavLink } from "react-router-dom";
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
//data
import { CategoriesData } from "../../../store/eyesite";

const Categories = () => {
  const categories = CategoriesData();

  return (
    <div className={classes["dm-categories-wrapper"]}>
      <div className={classes["dm-categories-navbar-topline"]}></div>
      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/eyesite/media-and-entertainment"
            className={classes["dm-categories-link"]}
            activeClassName={classes["dm-categories-link-active"]}
          >
            <FontAwesomeIcon
              icon={faMobileAlt}
              className={classes["dm-categories-item-icon"]}
            />
            MEDIA AND ENTERTAINMENT
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/eyesite/gamers-hub"
            className={classes["dm-categories-link"]}
            activeClassName={classes["dm-categories-link-active"]}
          >
            <FontAwesomeIcon
              icon={faGamepad}
              className={classes["dm-categories-item-icon"]}
            />
            GAMERS HUB
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/eyesite/coffee-breaks"
            className={classes["dm-categories-link"]}
            activeClassName={classes["dm-categories-link-active"]}
          >
            <FontAwesomeIcon
              icon={faCode}
              className={classes["dm-categories-item-icon"]}
            />
            COFFEE BREAKS
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/eyesite/dope-tech"
            className={classes["dm-categories-link"]}
            activeClassName={classes["dm-categories-link-active"]}
          >
            <FontAwesomeIcon
              icon={faMicrochip}
              className={classes["dm-categories-item-icon"]}
            />
            DOPE TECH
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/eyesite/fashion-and-health"
            className={classes["dm-categories-link"]}
            activeClassName={classes["dm-categories-link-active"]}
          >
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
