import React from "react";

const ViewUser = ({user}) => {
  return (
      <React.Fragment>
    <tr>
      
      <td>{user.userName}</td>
      <td>{user.signUpDate}</td>
      <td>{user.monthPoint}</td>
      <td>{user.totalPoint}</td>
      <td>{user.admin.toString()}</td>     
    </tr>
    </React.Fragment>
     
    
  );
};

export default ViewUser;
