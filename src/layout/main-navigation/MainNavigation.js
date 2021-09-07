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
            <NavLink to="/doink" activeClassName={classes.active}>
              Doink
            </NavLink>
          </li>
          <li>
            <NavLink to="/kaboom" activeClassName={classes.active}>
              Kaboom
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
