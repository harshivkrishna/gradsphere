import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProfileCard } from "../leetcode/ProfileCard";
import { SolvedStatsCard } from "../leetcode/SolvedStats";
import { ContestStatsCard } from "../leetcode/ContestStats";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router";

const API_BASE_URL = "https://alfa-leetcode-api.onrender.com";

function LeetCode() {
  const username = "keerthikumarcse";
  // const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [solvedStats, setSolvedStats] = useState(null);
  const [contestStats, setContestStats] = useState(null);

  useEffect(() => {
    if (username) {
      fetchUserData(username);
    }
  }, [username]);

  const fetchUserData = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const [profileRes, solvedRes, contestRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/${username}`),
        axios.get(`${API_BASE_URL}/${username}/solved`),
        axios.get(`${API_BASE_URL}/${username}/contest`),
      ]);

      setProfile(profileRes.data);
      setSolvedStats(solvedRes.data);
      setContestStats(contestRes.data);
    } catch (err) {
      setError(
        "Failed to fetch user data. Please check the username and try again."
      );
      setProfile(null);
      setSolvedStats(null);
      setContestStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          LeetCode Profile Viewer
        </h1>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin" size={32} />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {profile && (
          <div className="space-y-6">
            <ProfileCard profile={profile} />
            {solvedStats && <SolvedStatsCard stats={solvedStats} />}
            {contestStats && <ContestStatsCard stats={contestStats} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeetCode;
