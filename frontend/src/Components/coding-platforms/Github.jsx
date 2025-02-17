import React from "react";
import RepoCard from "../github/repocard";
import { useParams } from "react-router";

function GitHub() {
  const username = "keerthikumar132005";
  // const { username } = useParams();
  return <RepoCard username={username} />;
}

export default GitHub;
