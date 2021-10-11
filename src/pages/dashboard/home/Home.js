import { Container } from "react-bootstrap";
//css
import classes from "./Home.module.css";

const Home = () => {
  return (
    <Container>
      <br />
      <div className={classes["info-box"]}>
        <h4>Hello &#38; Welcome to Admin Resource Panel</h4>
        <br />
        <h5>Please note the following points before proceeding:</h5>
        <ul>
          <li>
            We are humble and enthusiastic people, driven to contribute to our
            passion
          </li>
          <li>
            This is an early development version, so bear with simple UI, bugs
            &#38; feature limitations
          </li>
          <li>Hosting &#38; Bandwidth is limited for now</li>
          <li>
            It is not fully mobile responsive yet, so meanwhile it's preferred
            to be used on large screen devices
          </li>
          <li>Do NOT spam unnecessary content</li>
          <li>In the end, your ideas and feedback is most appreciated</li>
        </ul>
        <p class={classes["outro"]}>p.s, Have fun ;-)</p>
      </div>
    </Container>
  );
};

export default Home;
