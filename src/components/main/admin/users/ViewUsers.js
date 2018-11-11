import React from "react";
import ViewUser from "./ViewUser";

const ViewUsers = () => {
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
            <ViewUser />
            <ViewUser />
            <ViewUser />
            <ViewUser />
            <ViewUser />
            <ViewUser />
            <ViewUser />
            <ViewUser />
            <ViewUser />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;