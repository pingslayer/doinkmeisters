import { useState } from "react";
import { ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const RadioDark = (props) => {
  return (
    <ToggleButtonGroup type="radio" name="options" value={props.value}>
      {props.radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          variant="dark"
          value={radio.value}
          onChange={(e) => props.setRadioValue(e.currentTarget.value)}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default RadioDark;
