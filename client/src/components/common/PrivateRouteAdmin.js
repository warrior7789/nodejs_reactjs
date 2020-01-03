import React, { Fragment } from "react";
import { Route, Redirect ,Link} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";



const AppLayout = ({ children }) => (                       
  <div>
    <p>App Layout</p>
    <br/>
    <ul>
      <li><Link to={'/homes'}>Home</Link></li>
      <li><Link to={'/users'}>User</Link></li>
    </ul>
    {children}                                          
  </div>           
);




const PrivateRouteAdmin = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true && auth.isAdmin === true ? (
        <AppLayout><Component {...props} /></AppLayout>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRouteAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
