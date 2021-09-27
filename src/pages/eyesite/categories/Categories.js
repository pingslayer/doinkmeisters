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
        {categories.map((category) => {
          return (
            <Nav.Item key={category.id}>
              <Nav.Link
                as={NavLink}
                to={category.url}
                className={classes["dm-categories-link"]}
              >
                <FontAwesomeIcon
                  icon={faMobileAlt}
                  className={classes["dm-categories-item-icon"]}
                />
                {category.name}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default Categories;
