import React from "react";
import moment from "moment"
import "moment/locale/tr";

const Report = ({user,index,activeUser}) => {
  moment.locale("tr")
  if(activeUser){
    return (
      <tr className={activeUser}>
        <td>{index+1}</td>
        <td>{user.userName}</td>
        <td>{moment(user.signUpDate).format("DD MMMM YYYY")}</td>
        <td>{user.totalPoint}</td>
      </tr>
    );
  }else
  return (
    <tr>
      <td>{index+1}</td>
      <td>{user.userName}</td>
      <td>{moment(user.signUpDate).format("DD MMMM YYYY")}</td>
      <td>{user.totalPoint}</td>
    </tr>
  );
};

export default Report;
