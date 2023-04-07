import React from "react";
import Navbar from "../../components/Navbar";
import LeaderTable from "../../components/StudentPart/LeaderTable";
import "../../style/output.css";

const Leaderboard = () => {
  return (
    <div>
      <Navbar />
      <LeaderTable />
    </div>
  );
};

export default Leaderboard;
