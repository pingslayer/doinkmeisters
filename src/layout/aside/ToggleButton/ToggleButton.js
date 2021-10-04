import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
//css
import classes from "./ToggleButton.module.css";

const ToggleButton = ({ handleToggleSidebar }) => {
  return (
    <div
      onClick={() => handleToggleSidebar(true)}
      className={classes["dm-sidebar-toggle-btn"]}
    >
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};

export default ToggleButton;
