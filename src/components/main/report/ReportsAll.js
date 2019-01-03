import React from "react";
import Report from "./Report";

const ReportsAll = ({ users, activeUser}) => {
  console.log(activeUser)
  let activeUserIndex = 0;
  users &&
    users.map((user, index) => {
      if (user.id === activeUser.id) {
        return (activeUserIndex = index);
      }
    });
  let activeUserReport = null;
  if (activeUserIndex > 10) {
    return (activeUserReport = (
      <Report
        key={activeUser.id}
        user={activeUser}
        index={activeUserIndex}
        activeUser={"activeUserClass"}
      />
    ));
  }
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
          {users &&
            users.slice(0, 10).map((user, index) => {
              if (user.id === activeUser.id) {
                return (
                  <Report
                    key={user.id}
                    user={user}
                    index={index}
                    activeUser={"activeUserClass"}
                  />
                );
              } else {
                return <Report key={user.id} user={user} index={index} />;
              }
            })}
          {activeUserReport}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsAll;
