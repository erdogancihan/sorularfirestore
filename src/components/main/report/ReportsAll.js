import React from "react";
import Report from "./Report";

const ReportsAll = () => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Sıra No</th>
            <th>Username</th>
            <th>Üyelik Tarihi</th>
            <th>Son Yarışma</th>
            <th>Günlük Puan</th>
            <th>Toplam Puan</th>
          </tr>
        </thead>
        <tbody>
          <Report />
          <Report />
          <Report />
          <Report />
        </tbody>
      </table>
    </div>
  );
};

export default ReportsAll;
