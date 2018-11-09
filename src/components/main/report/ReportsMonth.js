import React from "react";
import Report from "./Report";

const ReportsMonth = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sıra No</th>
            <th>Username</th>
            <th>Üyelik Tarihi</th>
            <th>Son Yarışma</th>
            <th>Günlük Puan</th>
            <th>Aylık Puan</th>
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

export default ReportsMonth;
