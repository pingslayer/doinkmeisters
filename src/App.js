import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router";
//layout
import Layout from "./layout/layout/Layout";
//component
import PrivateRoute from "./components/privateroute/PrivateRoute";
import ComingSoon from "./components/comingsoon/ComingSoon";
//ui
import LoadingSpinner from "./ui/loading-spinner/LoadingSpinner";
//pages
import EyeSite from "./pages/eyesite/EyeSite";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/notfound/NotFound";
//store
import { useAuth } from "./store/AuthContext";

function App() {
  const { currentUser } = useAuth();

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
            {!currentUser ? <EyeSite /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/about">
            {!currentUser ? (
              <ComingSoon mode="light" />
            ) : (
              <Redirect to="/dashboard" />
            )}
          </Route>
          <Route path="/login" exact>
            {!currentUser ? <Login /> : <Redirect to="/dashboard" />}
          </Route>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="*">
            <NotFound mode="light" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
