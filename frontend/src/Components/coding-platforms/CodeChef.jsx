import React from "react";
import CodeChefDetails from "../codechef/CodeChefDetails";
import { useParams } from "react-router";

function CodeChef({ currentCodingPlatform }) {
  const username = "keerthikumar27";
  // const { username } = useParams();
  return (
    <CodeChefDetails
      username={username}
      currentCodingPlatform={currentCodingPlatform}
    />
  );
}

export default CodeChef;
