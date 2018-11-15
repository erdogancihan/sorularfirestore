import React from "react";
import ViewUser from "./ViewUser";

const ViewUsers = ({users}) => {
  console.log(users)
  return (
    <div className="container  ">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Kullanıcı Adı</th>              
              <th>Üyelik Tarihi</th>
              <th>Aylık Puanı</th>
              <th>ToplamPuanı</th>
              <th>Düzenle</th>
              
            </tr>
          </thead>
          <tbody>
          {users&&users.map(user=>{
            return <ViewUser key={user.id} user={user}/>
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
