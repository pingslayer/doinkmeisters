import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
//css
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/">Doinkmeisters.</NavLink>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/home" activeClassName={classes.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/eyesite" activeClassName={classes.active}>
              Eyesite
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName={classes.active}>
              <Button variant="outline-danger">LOGIN</Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
