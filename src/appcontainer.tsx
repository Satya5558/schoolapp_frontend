import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import config from "config";
import { Login, SchoolLogin } from "./pages/Authentication";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import SchoolDashboard from "./pages/Dashboard/SchoolDashboard";
import { Error401, Error404 } from "./pages/Error";
import AddSchool from "./pages/Schools/AddSchool";
import EditSchool from "./pages/Schools/EditSchool";
import SchoolList from "./pages/Schools/SchoolList";
import ViewSchool from "./pages/Schools/ViewSchool";

import { AuthRoute } from "./routes";
import NonAuthRoute from "./routes/NonAuthRoute";

const StudentList = lazy(() =>
  import("./pages/Students").then((module) => ({
    default: module.StudentList,
  }))
);

const appcontainer = () => {
  return (
    <Router basename={`${config.publicPath}`}>
      <Switch>
        <NonAuthRoute exact path="/" component={SchoolLogin} />
        <NonAuthRoute exact path="/admin" component={Login} />
        <AuthRoute
          exact
          path="/admin-dashboard"
          component={AdminDashboard}
          roles={["ROLE_ADMIN"]}
        />
        <AuthRoute
          exact
          path="/schools"
          component={SchoolList}
          roles={["ROLE_ADMIN"]}
        />
        <AuthRoute
          exact
          path="/add-school"
          component={AddSchool}
          roles={["ROLE_ADMIN"]}
        />
        <AuthRoute
          exact
          path="/view-school/:schoolId"
          component={ViewSchool}
          roles={["ROLE_ADMIN"]}
        />
        <AuthRoute
          exact
          path="/edit-school/:schoolId"
          component={EditSchool}
          roles={["ROLE_ADMIN"]}
        />
        <AuthRoute
          exact
          path="/dashboard"
          component={SchoolDashboard}
          roles={["ROLE_SCHOOL_ADMIN"]}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <AuthRoute
            exact
            path="/students"
            component={StudentList}
            roles={["ROLE_SCHOOL_ADMIN"]}
          />
        </Suspense>
        <AuthRoute
          exact
          path="/logout"
          component={AdminDashboard}
          roles={["ROLE_SCHOOL_ADMIN"]}
        />
        <Route path="/unauthorized" component={Error401} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
};

export default appcontainer;
