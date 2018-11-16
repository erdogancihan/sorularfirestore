import React, { Component } from "react";
import { connect } from "react-redux";

import ReportsMonth from "./ReportsMonth";
import ReportsAll from "./ReportsAll";
import { fetchSession,fetchAllUsers } from "../../../store/actions/userActionsCreator";

class Reports extends Component {
  componentWillMount() {
    let token = this.props.session.id;
    let date = new Date();
    date.setMonth(date.getMonth()-1);
    date=date.toISOString();
    this.props.fetchAllUsers(token)
   // this.props.fetchSession(date);
  }

  render() {
    const {users, sessions}=this.props;
    return (
      <div>
        <ReportsAll users={users} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.session.session,
    users: state.user.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSession: (date) => dispatch(fetchSession(date)),
    fetchAllUsers:(token) =>dispatch(fetchAllUsers(token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reports);
