import React, { useState, useEffect, Fragment } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
//css
import classes from "./Results.module.css";
//components
import LoadingSpinner from "../../../ui/loading-spinner/LoadingSpinner";
import ResultItem from "./ResultItem/ResultItem";
//hooks
import useHttp from "../../../hooks/use-http";
//data
import { CategoriesData } from "../../../store/eyesite";
//api
import { getAllVideoGamesActive } from "../../../apis/video-games-api";

const Results = (props) => {
  const match = useRouteMatch();
  const categories = CategoriesData();
  var apiCallRef = null;

  switch (props.categoryId) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    default:
      apiCallRef = getAllVideoGamesActive;
      break;
  }

  const {
    sendRequest,
    status,
    data: loadedData,
    error,
  } = useHttp(apiCallRef, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending" || status === "sending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (loadedData === null || loadedData.length === 0) {
    return (
      <div className="text-center mt-5">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className={classes["no-data-icon"]}
        />
        <h3 className={`${classes["no-data-message"]} mt-3`}>
          No Data to Display
        </h3>
      </div>
    );
  }

  return (
    <Container>
      <ul className={classes["dm-results-list"]}>
        {loadedData.map((data, index) => (
          <ResultItem key={index} data={data} />
        ))}
      </ul>
    </Container>
  );
};

export default Results;
