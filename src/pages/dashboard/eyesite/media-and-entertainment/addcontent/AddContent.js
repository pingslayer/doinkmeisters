import { Fragment, useEffect, useState, useRef } from "react";
//ui
import RadioDark from "../../../../../ui/radio-dark/RadioDark";
import CardDark from "../../../../../ui/card-dark/CardDark";
import CardGrey from "../../../../../ui/card-grey/CardGrey";
import SelectDark from "../../../../../ui/select-dark/SelectDark";
//css
import classes from "./AddContent.module.css";
//hooks
import useHttp from "../../../../../hooks/use-http";
//store
import { useAuth } from "../../../../../store/AuthContext";

const AddContent = () => {
  return (
    <Fragment>
      <CardDark>
        <SelectDark
          data={[
            { value: 1, text: "Video" },
            { value: 2, text: "Audio" },
            { value: 3, text: "Movie" },
          ]}
        ></SelectDark>
      </CardDark>
    </Fragment>
  );
};

export default AddContent;
