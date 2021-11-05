import { Container, Row, Col } from "react-bootstrap";
//ui
import ResultItem from "./ResultItem/ResultItem";
//res
import YouZixLogo from "../../../../res/img/logos/youzix-logo.jpg";
import AudioSphereLogo from "../../../../res/img/logos/audio-sphere-logo.jpg";
import FlixzillaLogo from "../../../../res/img/logos/flixzilla-logo.jpg";
//css
import classes from "./MediaAndEntertainment.module.css";

const MediaAndEntertainment = () => {
  return (
    <Container>
      <ul className={classes["dm-results-list"]}>
        <ResultItem
          data={{
            name: "YouZix",
            photo: YouZixLogo,
            summary: "",
          }}
        />
        <ResultItem
          data={{
            name: "Audio Sphere",
            photo: AudioSphereLogo,
            summary: "",
          }}
        />
        <ResultItem
          data={{
            name: "FlixZilla",
            photo: FlixzillaLogo,
            summary: "",
          }}
        />
      </ul>
    </Container>
  );
};

export default MediaAndEntertainment;
