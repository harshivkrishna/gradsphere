import React from "react";
import UserProfile from "../codeforces/UserProfile";
import { useParams } from "react-router";

function Codeforces() {
  const username = "login";
  // const { username } = useParams();
  return <UserProfile userName={username} />;
}

export default Codeforces;
