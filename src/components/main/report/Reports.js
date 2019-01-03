import React, { Component } from "react";
import { connect } from "react-redux";

import ReportsMonth from "./ReportsMonth";
import ReportsAll from "./ReportsAll";
import { fetchSession,fetchAllUsers } from "../../../store/actions/userActionsCreator";

class Reports extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount() {
    let token = this.props.user.id;
    let date = new Date();
    date.setMonth(date.getMonth()-1);
    date=date.toISOString();
    this.props.fetchAllUsers(token)
   // this.props.fetchSession(date);
  }

  render() {
    const {users,user}=this.props;
    return (
      <div>
        <ReportsAll users={users} activeUser={user.user} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    session: state.user.session,
    users: state.user.users,
    user:state.user.user
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
