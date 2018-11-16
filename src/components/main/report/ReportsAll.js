import React from "react";
import Report from "./Report";

const ReportsAll = ({ users }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Sıra No</th>
            <th>Username</th>
            <th>Üyelik Tarihi</th>
            <th>Toplam Puan</th>
          </tr>
        </thead>
        <tbody>
         {users&&users.slice(0,10).map((user,index)=>{
          return <Report key={user.id} user={user} index={index} />;
         })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsAll;
