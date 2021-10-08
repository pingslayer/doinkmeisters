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
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/eyesite">
            <EyeSite />
          </Route>
          <Route path="/about">
            <ComingSoon mode="light" />
          </Route>
          <Route path="/login" exact>
            {currentUser && <Redirect to="/dashboard" />}
            {!currentUser && <Login />}
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
