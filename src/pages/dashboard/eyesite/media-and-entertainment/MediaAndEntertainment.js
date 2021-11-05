import { useState } from "react";
import { Container } from "react-bootstrap";
//components
import AddContent from "./addcontent/AddContent";
//ui
import DashboardHeaderBar from "../../../../ui/dashboard-header-bar/DashboardHeaderBar";
//css
import classes from "./MediaAndEntertainment.module.css";

const MediaAndEntertainment = (props) => {
  const SHOW_ALL_VIEW = "Your Content";
  const ADD_VIEW = "Add Content";
  const EDIT_VIEW = "Edit Content";

  const [view, setView] = useState(SHOW_ALL_VIEW);

  const showContentHandler = () => {
    setView(SHOW_ALL_VIEW);
  };

  const addContentHandler = () => {
    setView(ADD_VIEW);
  };

  const editContentHandler = () => {
    setView(EDIT_VIEW);
  };

  return (
    <div className={classes["dm-eyesite-wrapper"]}>
      <Container>
        <br />
        <DashboardHeaderBar
          menuName={"Media And Entertainment"}
          view={view}
          addContent={addContentHandler}
          showContent={showContentHandler}
        />
        <br />
        {view === SHOW_ALL_VIEW && "Hello"}
        {view === ADD_VIEW && <AddContent />}
      </Container>
    </div>
  );
};

export default MediaAndEntertainment;
