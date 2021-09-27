import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
//css
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className={classes["dm-header"]}>
      <Container>
        <Navbar.Brand>
          <div className={classes["dm-logo"]}>
            <NavLink to="/">Doinkmeisters.</NavLink>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className={classes.nav}>
            <NavLink
              to="/eyesite"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
            >
              Eyesite
            </NavLink>
            <NavLink
              to="/about"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
            >
              About
            </NavLink>
            <NavLink
              to="/login"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
            >
              <Button variant="outline-danger">LOGIN</Button>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
