import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter
} from "react-router-dom";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// get layout admin

//get layout front

// Containers
const Navbar = React.lazy(() => import("./components/layout/Navbar"));
const Footer = React.lazy(() => import("./components/layout/Footer"));
const Landing = React.lazy(() =>
  import("./components/layout/Landing")
);

const Register = React.lazy(() =>
  import("./components/auth/Register")
);
const Login = React.lazy(() => import("./components/auth/Login"));
const Dashboard = React.lazy(() =>
  import("./components/dashboard/Dashboard")
);
const CreateProfile = React.lazy(() =>
  import("./components/create-profile/CreateProfile")
);
const EditProfile = React.lazy(() =>
  import("./components/edit-profile/EditProfile")
);
const AddExperience = React.lazy(() =>
  import("./components/add-credentials/AddExperience")
);
const AddEducation = React.lazy(() =>
  import("./components/add-credentials/AddEducation")
);
const Profiles = React.lazy(() =>
  import("./components/profiles/Profiles")
);
const Profile = React.lazy(() =>
  import("./components/profile/Profile")
);
const Posts = React.lazy(() => import("./components/posts/Posts"));
const Post = React.lazy(() => import("./components/post/Post"));
const NotFound = React.lazy(() =>
  import("./components/not-found/NotFound")
);


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Provider store={store}>
            <Router>
              <div className="App">
                <Navbar />
                <Route exact path="/" component={Landing} />
                <div className="container">
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/profiles" component={Profiles} />
                  <Route exact path="/profile/:handle" component={Profile} />
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/dashboard"
                      component={Dashboard}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/create-profile"
                      component={CreateProfile}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/edit-profile"
                      component={EditProfile}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/add-experience"
                      component={AddExperience}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/add-education"
                      component={AddEducation}
                    />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/feed" component={Posts} />
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/post/:id" component={Post} />
                  </Switch>
                  <Route exact path="/not-found" component={NotFound} />
                </div>
                <Footer />
              </div>
            </Router>
          </Provider>
        </React.Suspense>
      </HashRouter>
    );
  }
}
export default App;
