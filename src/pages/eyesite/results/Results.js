import React, { useState, useEffect, Fragment } from "react";
//components
import LoadingSpinner from "../../../ui/loading-spinner/LoadingSpinner";
//hooks
import useHttp from "../../../hooks/use-http";
//lib
import { getFeaturedVideoGames } from "../../../apis/video-games-api";

const Results = () => {
  const {
    sendRequest,
    status,
    data: loadedGames,
    error,
  } = useHttp(getFeaturedVideoGames, true);

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
  console.log(loadedGames);

  return <h1>This is a view</h1>;
};

export default Results;
