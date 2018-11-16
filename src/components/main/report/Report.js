import React from "react";

const Report = ({user,index}) => {
  return (
    <tr>
      <td>{index+1}</td>
      <td>{user.userName}</td>
      <td>{user.signUpDate}</td>
      <td>{user.totalPoint}</td>
    </tr>
  );
};

export default Report;
