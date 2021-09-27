import React, { useState, useEffect, Fragment } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
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

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ul>
      {loadedData.map((data, index) => {
        return <ResultItem key={index} data={data} />;
      })}
    </ul>
  );
};

export default Results;
