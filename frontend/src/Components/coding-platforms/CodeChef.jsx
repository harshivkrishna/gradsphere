import React from "react";
import CodeChefDetails from "../codechef/CodeChefDetails";
import { useParams } from "react-router";

function CodeChef() {
  const { username } = useParams();
  return <CodeChefDetails username={username} />;
}

export default CodeChef;
