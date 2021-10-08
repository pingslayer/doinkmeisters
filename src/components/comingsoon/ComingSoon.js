import { Container } from "react-bootstrap";
//css
import classes from "./ComingSoon.module.css";

const ComingSoonn = (props) => {
  let modeClass;
  if (props.mode === "dark") {
    modeClass = classes["mode-dark"];
  } else {
    modeClass = classes["mode-white"];
  }
  return (
    <div
      className={`${classes["dm-coming-soon-message-container"]} ${modeClass}`}
    >
      <Container>
        <h2>Website is coming soon.</h2>
        <h4>
          We are working on the full version of our new site and will be back
          shortly.
        </h4>
      </Container>
    </div>
  );
};

export default ComingSoonn;
