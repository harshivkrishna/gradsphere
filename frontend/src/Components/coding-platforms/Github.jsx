/* eslint-disable react/prop-types */
import RepoCard from "../github/repocard";

function GitHub({ currentCodingPlatform }) {
  const username = "keerthikumar132005";
  // const { username } = useParams();
  return (
    <RepoCard
      username={username}
      currentCodingPlatform={currentCodingPlatform}
    />
  );
}

export default GitHub;
