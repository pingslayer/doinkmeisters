import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router";
//layout
import Layout from "./layout/layout/Layout";
//ui
import LoadingSpinner from "./ui/loading-spinner/LoadingSpinner";
//pages
import Landing from "./pages/landing/Landing";

function App() {
  const fallback = (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );

  return (
    <Layout>
      <Suspense fallback={fallback}>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/about">
            <Redirect to="/" />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
