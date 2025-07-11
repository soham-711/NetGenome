import React from "react";
import { useLocation } from "react-router-dom";

const MatchesPage = () => {
  const { state } = useLocation();
  const foundMatches = state?.foundMatches || {};
  const perfectMatches = foundMatches.perfectMatches || [];
  const suggestedMatches = foundMatches.suggestedMatches || [];

  const allMatches = [...perfectMatches, ...suggestedMatches];
  console.log(allMatches);
  

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <h1 className="text-4xl font-bold mb-6 text-center">
        🎶 Your Music Collaborator Matches
      </h1>

      {/* ✅ All Matches */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">
          🎯 All Matches ({allMatches.length})
        </h2>
        {allMatches.length === 0 ? (
          <p className="text-gray-300">
            No matches found. Please adjust your preferences.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allMatches.map((profile, index) => (
              <div
                key={index}
                className="bg-white/10 p-4 rounded-xl shadow-lg border border-white/20"
              >
                <h3 className="text-xl font-bold mb-1">
                  {profile.name || profile.username || "Unknown Artist"}
                </h3>
                <p>🎵 Genres: {(profile.genres || []).join(", ")}</p>
                <p>🎭 Roles: {(profile.roles || []).join(", ")}</p>
                <p>📍 Location: {profile.location || "N/A"}</p>
                <p>✨ Vibe: {(profile.vibeTags || []).join(", ")}</p>
                <p>🗣️ Languages: {(profile.languages || []).join(", ")}</p>
                <p>🚻 Gender: {profile.gender || "N/A"}</p>
                <p>⭐ Match Score: {profile.matchScore || "N/A"}%</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ Perfect Matches */}
      {perfectMatches.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">
            ✅ Perfect Matches ({perfectMatches.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {perfectMatches.map((profile, index) => (
              <div
                key={`perfect-${index}`}
                className="bg-green-900/20 p-4 rounded-xl border border-green-500/30"
              >
                <h3 className="text-xl font-bold mb-1">
                  {profile.name || profile.username || "Unknown Artist"}
                </h3>
                <p>🎵 Genres: {(profile.genres || []).join(", ")}</p>
                <p>🎭 Roles: {(profile.roles || []).join(", ")}</p>
                <p>📍 Location: {profile.location || "N/A"}</p>
                <p>✨ Vibe: {(profile.vibeTags || []).join(", ")}</p>
                <p>🗣️ Languages: {(profile.languages || []).join(", ")}</p>
                <p>🚻 Gender: {profile.gender || "N/A"}</p>
                <p>⭐ Match Score: {profile.matchScore || "N/A"}%</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ✅ Suggested Matches */}
      {suggestedMatches.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
            🤝 Suggested Matches ({suggestedMatches.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestedMatches.map((profile, index) => (
              <div
                key={`suggested-${index}`}
                className="bg-yellow-900/20 p-4 rounded-xl border border-yellow-400/30"
              >
                <h3 className="text-xl font-bold mb-1">
                  {profile.name || profile.username || "Unknown Artist"}
                </h3>
                <p>🎵 Genres: {(profile.genres || []).join(", ")}</p>
                <p>🎭 Roles: {(profile.roles || []).join(", ")}</p>
                <p>📍 Location: {profile.location || "N/A"}</p>
                <p>✨ Vibe: {(profile.vibeTags || []).join(", ")}</p>
                <p>🗣️ Languages: {(profile.languages || []).join(", ")}</p>
                <p>🚻 Gender: {profile.gender || "N/A"}</p>
                <p>⭐ Match Score: {profile.matchScore || "N/A"}%</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MatchesPage;
