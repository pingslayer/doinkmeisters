import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router";
//layout
import Layout from "./layout/layout/Layout";
//ui
import LoadingSpinner from "./ui/loading-spinner/LoadingSpinner";
//pages
import Landing from "./pages/landing/Landing";
import EyeSite from "./pages/eyesite/EyeSite";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";

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
            <Redirect to="/eyesite" />
          </Route>
          <Route path="/eyesite">
            <EyeSite />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
