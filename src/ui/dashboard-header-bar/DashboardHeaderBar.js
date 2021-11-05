import { Button } from "react-bootstrap";
//css
import CardDark from "../card-dark/CardDark";

const DashboardHeaderBar = (props) => {
  const SHOW_ALL_VIEW = "Your Content";
  const ADD_VIEW = "Add Content";
  const EDIT_VIEW = "Edit Content";

  return (
    <CardDark>
      <div className="d-flex justify-content-between">
        {props.view === SHOW_ALL_VIEW && (
          <Button className="btn btn-dark" onClick={props.addContent}>
            + Add
          </Button>
        )}
        {props.view === ADD_VIEW && (
          <Button className="btn btn-dark" onClick={props.showContent}>
            &#60; Back
          </Button>
        )}
        {props.view === EDIT_VIEW && (
          <Button className="btn btn-dark" onClick={props.showContent}>
            &#60; Back
          </Button>
        )}

        <h4>
          {props.menuName} {`>`} {props.view}
        </h4>
      </div>
    </CardDark>
  );
};

export default DashboardHeaderBar;
