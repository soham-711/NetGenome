import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Music2, // for TikTok alternative icon
} from "lucide-react";
const ViewArtistProfile = () => {
  const { state } = useLocation();
  const artist = state || {};
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.4s ease-out forwards;
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .text-balance {
        text-wrap: balance;
      }
      .platform-icon {
        transition: all 0.3s ease;
      }
      .platform-card:hover .platform-icon {
        transform: scale(1.1);
      }
      .glossy-black {
        background: linear-gradient(145deg, #030303 0%, #1a1a1a 100%);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }
      .neon-yellow {
        color: #e0ff00;
        text-shadow: 0 0 5px rgba(224, 255, 0, 0.5);
      }
      .neon-yellow-bg {
        background: rgba(224, 255, 0, 0.1);
        box-shadow: 0 0 10px rgba(224, 255, 0, 0.2);
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const colors = {
    primary: "bg-gradient-to-r from-gray-700 to-gray-800",
    primaryHover: "hover:from-gray-800 hover:to-gray-900",
    primaryText: "text-gray-400",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700",
    accent: "neon-yellow-bg",
    cardBg: "glossy-black",
    cardBorder: "border border-gray-800 shadow-lg shadow-black/50",
    sectionTitle: "text-gray-100",
    bodyText: "text-gray-400",
    lightBg: "bg-gradient-to-br from-gray-900 to-gray-800",
    tagBg: "bg-gray-800/80 text-gray-300 border border-gray-700",
    tabActive: "bg-gray-800 text-neon-yellow border-gray-700 shadow",
    tabInactive:
      "bg-gray-800/30 text-gray-400 border-gray-700 hover:bg-gray-800/50",
    hoverEffect:
      "hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300 ease-out",
    divider: "border-gray-800",
    neonText: "neon-yellow",
    neonBorder: "border border-gray-700 hover:border-neon-yellow",
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "👤" },
    { id: "career", label: "Career", icon: "🎵" },
    { id: "creative", label: "Creative", icon: "🎨" },
    { id: "presence", label: "Online", icon: "🌐" },
    { id: "story", label: "Story", icon: "📖" },
  ];

  const getYearDisplay = (year) => {
    if (!year) return "??";
    const yearStr = String(year);
    return yearStr.length >= 2 ? yearStr.slice(-2) : yearStr;
  };

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

  const platformIcons = {
    spotify: "🎵",
    "apple music": "",
    "youtube music": "▶️",
    soundcloud: "☁️",
    tidal: "🌊",
    deezer: "🌀",
    "amazon music": "🅰️",
    bandcamp: "🅱️",
    default: "🎧",
  };

  const getPlatformIcon = (platformName) => {
    if (!platformName) return platformIcons.default;
    const lowerName = platformName.toLowerCase();
    for (const [key, icon] of Object.entries(platformIcons)) {
      if (lowerName.includes(key)) return icon;
    }
    return platformIcons.default;
  };

  const formatYearsActive = (years) => {
    if (!years) return "Unknown";
    if (years.includes("-present")) return `Since ${years.split("-")[0]}`;
    return years;
  };

  const TabContent = ({ tabId }) => {
    switch (tabId) {
      case "overview":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 ${colors.primary} rounded-lg flex items-center justify-center ${colors.neonText} mr-3`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${colors.sectionTitle}`}>
                    Identity
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.neonText} bg-opacity-20`}
                    ></div>
                    <div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide ${colors.neonText}`}
                      >
                        Real Name
                      </span>
                      <p className={`${colors.bodyText} mt-1`}>
                        {artist.identity?.realName || "Not specified"}
                      </p>
                    </div>
                  </div>
                  {safeArray(artist.identity?.aliases).length > 0 && (
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.neonText} bg-opacity-20`}
                      ></div>
                      <div>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wide ${colors.neonText}`}
                        >
                          Aliases
                        </span>
                        <p className={`${colors.bodyText} mt-1`}>
                          {artist.identity.aliases.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.neonText} bg-opacity-20`}
                    ></div>
                    <div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide ${colors.neonText}`}
                      >
                        Origin
                      </span>
                      <p className={`${colors.bodyText} mt-1`}>
                        {artist.identity?.origin || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.neonText} bg-opacity-20`}
                    ></div>
                    <div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide ${colors.neonText}`}
                      >
                        Based In
                      </span>
                      <p className={`${colors.bodyText} mt-1`}>
                        {artist.identity?.location || "Not specified"}
                      </p>
                    </div>
                  </div>
                  {artist.identity?.birthYear && (
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.neonText} bg-opacity-20`}
                      ></div>
                      <div>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wide ${colors.neonText}`}
                        >
                          Birth Year
                        </span>
                        <p className={`${colors.bodyText} mt-1`}>
                          {artist.identity.birthYear}
                        </p>
                      </div>
                    </div>
                  )}
                  {safeArray(artist.identity?.languages).length > 0 && (
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${colors.neonText} bg-opacity-20`}
                      ></div>
                      <div>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wide ${colors.neonText}`}
                        >
                          Languages
                        </span>
                        <p className={`${colors.bodyText} mt-1`}>
                          {artist.identity.languages.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 ${colors.secondary} rounded-lg flex items-center justify-center ${colors.neonText} mr-3`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-bold ${colors.sectionTitle}`}>
                    Artistic Background
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div
                    className={`p-4 rounded-xl border ${colors.neonBorder} bg-gray-900/50`}
                  >
                    <h4 className={`font-semibold ${colors.neonText} mb-2`}>
                      Roles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {safeArray(artist.artistic_background?.roles).map(
                        (role, i) => (
                          <span
                            key={i}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.tagBg}`}
                          >
                            {role}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-xl border ${colors.neonBorder} bg-gray-900/50`}
                  >
                    <h4 className={`font-semibold ${colors.neonText} mb-2`}>
                      Genres
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {safeArray(artist.artistic_background?.genres).map(
                        (genre, i) => (
                          <span
                            key={i}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.tagBg}`}
                          >
                            {genre}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  {artist.artistic_background?.signature_style && (
                    <div
                      className={`p-4 rounded-xl border ${colors.neonBorder} bg-gray-900/50`}
                    >
                      <h4 className={`font-semibold ${colors.neonText} mb-2`}>
                        Signature Style
                      </h4>
                      <p className={`text-sm ${colors.bodyText}`}>
                        {artist.artistic_background.signature_style}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {safeArray(artist.artistic_background?.influences).length > 0 && (
                <div
                  className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
                >
                  <h3
                    className={`text-lg font-bold ${colors.sectionTitle} mb-4`}
                  >
                    Influences
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {safeArray(artist.artistic_background.influences).map(
                      (influence, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${colors.tagBg}`}
                        >
                          {influence}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {safeArray(artist.artistic_background?.skills).length > 0 && (
                <div
                  className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
                >
                  <h3
                    className={`text-lg font-bold ${colors.sectionTitle} mb-4`}
                  >
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {safeArray(artist.artistic_background.skills).map(
                      (skill, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${colors.tagBg}`}
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {safeArray(artist.discography).length > 0 && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-xl font-bold ${colors.sectionTitle} mb-6`}>
                  Latest Releases
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {safeArray(artist.discography)
                    .slice(0, 4)
                    .map((work, index) => (
                      <div
                        key={index}
                        className={`group relative overflow-hidden rounded-xl ${colors.cardBg} border ${colors.neonBorder} p-5`}
                      >
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 ${colors.primary}`}
                        ></div>
                        <div className="flex items-center mb-3">
                          <div
                            className={`w-9 h-9 ${colors.primary} rounded-lg flex items-center justify-center ${colors.neonText} mr-3 text-xs font-bold`}
                          >
                            {getYearDisplay(work.year)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-100">
                              {work.title || "Untitled"}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {work.type || "Unknown"}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-gray-400">
                          Label: {work.label || "Independent"}
                        </p>
                        {work.details && (
                          <p className="mt-2 text-xs text-gray-300 line-clamp-2">
                            {work.details}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        );

      case "career":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-5 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} text-center group`}
              >
                <div
                  className={`w-12 h-12 ${colors.primary} rounded-xl flex items-center justify-center ${colors.neonText} mx-auto mb-3`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className={`text-sm font-bold ${colors.sectionTitle} mb-1`}>
                  Education
                </h3>
                <p className={`${colors.bodyText} text-xs`}>
                  {artist.career?.education || "Not specified"}
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} text-center group`}
              >
                <div
                  className={`w-12 h-12 ${colors.secondary} rounded-xl flex items-center justify-center ${colors.neonText} mx-auto mb-3`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className={`text-sm font-bold ${colors.sectionTitle} mb-1`}>
                  Collaborations
                </h3>
                <p className={`${colors.bodyText} text-xs`}>
                  {safeArray(artist.career?.collaborations).length} projects
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} text-center group`}
              >
                <div
                  className={`w-12 h-12 ${colors.accent} rounded-xl flex items-center justify-center ${colors.neonText} mx-auto mb-3`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h3 className={`text-sm font-bold ${colors.sectionTitle} mb-1`}>
                  Awards
                </h3>
                <p className={`${colors.bodyText} text-xs`}>
                  {safeArray(artist.career?.awards).length} recognitions
                </p>
              </div>
            </div>

            {artist.career?.career_evolution && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Career Evolution
                </h3>
                <p className={`${colors.bodyText} text-sm leading-relaxed`}>
                  {artist.career.career_evolution}
                </p>
                {artist.career?.years_active && (
                  <div className="mt-4 flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${colors.neonText} mr-2`}
                    ></div>
                    <span className={`text-xs ${colors.neonText} font-medium`}>
                      {formatYearsActive(artist.career.years_active)}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Recent Collaborations
                </h3>
                <div className="space-y-3">
                  {safeArray(artist.career?.collaborations).length > 0 ? (
                    safeArray(artist.career.collaborations)
                      .slice(0, 5)
                      .map((collab, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors.neonText} bg-opacity-20`}
                          ></div>
                          <p className={`text-sm ${colors.bodyText}`}>
                            {collab}
                          </p>
                        </div>
                      ))
                  ) : (
                    <p
                      className={`${colors.bodyText} text-center italic text-sm`}
                    >
                      No collaborations listed
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Notable Performances
                </h3>
                <div className="space-y-3">
                  {safeArray(artist.career?.performances).length > 0 ? (
                    safeArray(artist.career.performances)
                      .slice(0, 5)
                      .map((performance, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors.neonText} bg-opacity-20`}
                          ></div>
                          <p className={`text-sm ${colors.bodyText}`}>
                            {performance}
                          </p>
                        </div>
                      ))
                  ) : (
                    <p
                      className={`${colors.bodyText} text-center italic text-sm`}
                    >
                      No performances listed
                    </p>
                  )}
                </div>
              </div>
            </div>

            {safeArray(artist.career?.awards).length > 0 && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Awards & Recognitions
                </h3>
                <div className="space-y-3">
                  {safeArray(artist.career.awards).map((award, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors.neonText} bg-opacity-20`}
                      ></div>
                      <p className={`text-sm ${colors.bodyText}`}>{award}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "creative":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 ${colors.primary} rounded-lg flex items-center justify-center ${colors.neonText} mr-3`}
                  >
                    ✍️
                  </div>
                  <h3 className={`text-lg font-bold ${colors.sectionTitle}`}>
                    Songwriting Process
                  </h3>
                </div>
                <div className={`text-sm ${colors.bodyText} space-y-3`}>
                  {artist.creative_process?.songwriting_process ? (
                    artist.creative_process.songwriting_process
                      .split("\n")
                      .map((paragraph, i) => (
                        <p key={i} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                  ) : (
                    <p className="italic">
                      No songwriting process information available
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect} group`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 ${colors.secondary} rounded-lg flex items-center justify-center ${colors.neonText} mr-3`}
                  >
                    🎛️
                  </div>
                  <h3 className={`text-lg font-bold ${colors.sectionTitle}`}>
                    Production Process
                  </h3>
                </div>
                <div className={`text-sm ${colors.bodyText} space-y-3`}>
                  {artist.creative_process?.production_process ? (
                    artist.creative_process.production_process
                      .split("\n")
                      .map((paragraph, i) => (
                        <p key={i} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                  ) : (
                    <p className="italic">
                      No production process information available
                    </p>
                  )}
                </div>
              </div>
            </div>

            {artist.creative_process?.creative_rituals && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Creative Rituals
                </h3>
                <div className={`text-sm ${colors.bodyText} space-y-3`}>
                  {artist.creative_process.creative_rituals
                    .split("\n")
                    .map((paragraph, i) => (
                      <p key={i} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Current Projects
                </h3>
                <div className="space-y-2">
                  {safeArray(artist.availability?.current_projects).length >
                  0 ? (
                    safeArray(artist.availability.current_projects).map(
                      (project, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${colors.neonText} animate-pulse`}
                          ></div>
                          <span className={`text-sm ${colors.bodyText}`}>
                            {project}
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <p
                      className={`${colors.bodyText} text-center italic text-sm`}
                    >
                      No current projects listed
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Looking For
                </h3>
                <div className="space-y-2">
                  {safeArray(artist.availability?.looking_for).length > 0 ? (
                    safeArray(artist.availability.looking_for).map(
                      (item, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${colors.neonText}`}
                          ></div>
                          <span className={`text-sm ${colors.bodyText}`}>
                            {item}
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <p
                      className={`${colors.bodyText} text-center italic text-sm`}
                    >
                      No specific requirements listed
                    </p>
                  )}
                </div>
              </div>
            </div>

            {artist.social_impact && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-lg font-bold ${colors.sectionTitle} mb-4`}>
                  Social Impact
                </h3>
                <p className={`text-sm ${colors.bodyText}`}>
                  {artist.social_impact}
                </p>
              </div>
            )}
          </div>
        );

      case "presence":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div
              className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
            >
              <h3
                className={`text-xl font-bold ${colors.sectionTitle} mb-6 flex items-center`}
              >
                <span className="mr-2">🎧</span> Streaming Platforms
              </h3>
              {safeArray(artist.online_presence?.streaming_platforms).length >
              0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {safeArray(artist.online_presence.streaming_platforms).map(
                    (platform, i) => (
                      <a
                        key={i}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="platform-card group"
                      >
                        <div
                          className={`p-4 rounded-xl border ${colors.neonBorder} ${colors.cardBg} flex flex-col items-center text-center ${colors.hoverEffect}`}
                        >
                          <div className="platform-icon w-12 h-12 text-2xl mb-2 flex items-center justify-center">
                            {getPlatformIcon(platform.platform)}
                          </div>
                          <span className="text-sm font-medium text-gray-200 group-hover:text-neon-yellow">
                            {platform.platform}
                          </span>
                          {platform.stats && (
                            <span className="text-xs text-gray-400 mt-1">
                              {platform.stats}
                            </span>
                          )}
                        </div>
                      </a>
                    )
                  )}
                </div>
              ) : (
                <p className={`${colors.bodyText} text-center italic`}>
                  No streaming platforms listed
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artist.online_presence?.website && (
                <div
                  className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
                >
                  <h3
                    className={`text-lg font-bold ${colors.sectionTitle} mb-4 flex items-center`}
                  >
                    <span className="mr-2">🌐</span> Official Website
                  </h3>
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${colors.neonText} mr-2`}
                    ></div>
                    <a
                      href={artist.online_presence.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm ${colors.bodyText} hover:${colors.neonText} underline underline-offset-4`}
                    >
                      {artist.online_presence.website.replace(
                        /^https?:\/\//,
                        ""
                      )}
                    </a>
                  </div>
                </div>
              )}

              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3
                  className={`text-lg font-bold ${colors.sectionTitle} mb-4 flex items-center`}
                >
                  <span className="mr-2">📱</span> Social Media
                </h3>
                <div className="space-y-3">
                  {safeArray(artist.online_presence?.social_media).length >
                  0 ? (
                    safeArray(artist.online_presence.social_media).map(
                      (platform, i) => (
                        <div key={i} className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full ${colors.neonText} mr-2`}
                          ></div>
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${colors.bodyText} hover:${colors.neonText} flex items-center`}
                          >
                            <span className="mr-2">
                              {platform.platform === "instagram" && "📷"}
                              {platform.platform === "twitter" && "🐦"}
                              {platform.platform === "facebook" && "👍"}
                              {platform.platform === "tiktok" && "🎵"}
                              {platform.platform === "youtube" && "▶️"}
                              {(!platform.platform ||
                                ![
                                  "instagram",
                                  "twitter",
                                  "facebook",
                                  "tiktok",
                                  "youtube",
                                ].includes(platform.platform)) &&
                                "🔗"}
                            </span>
                            {platform.handle || platform.platform}
                            {platform.followers && (
                              <span className="ml-2 text-xs text-gray-400">
                                ({platform.followers})
                              </span>
                            )}
                          </a>
                        </div>
                      )
                    )
                  ) : (
                    <p className={`${colors.bodyText} italic text-sm`}>
                      No social media links available
                    </p>
                  )}
                </div>
              </div>
            </div>

            {artist.commerce && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3
                  className={`text-lg font-bold ${colors.sectionTitle} mb-4 flex items-center`}
                >
                  <span className="mr-2">🛒</span> Merch & Store
                </h3>
                <p className={`text-sm ${colors.bodyText}`}>
                  {artist.commerce}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artist.online_presence?.press_kit && (
                <div
                  className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
                >
                  <h3
                    className={`text-lg font-bold ${colors.sectionTitle} mb-4 flex items-center`}
                  >
                    <span className="mr-2">📰</span> Press Kit
                  </h3>
                  <a
                    href={artist.online_presence.press_kit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-4 py-2 rounded-lg ${colors.neonBorder} ${colors.neonText} hover:bg-gray-800/50 transition-colors`}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      />
                    </svg>
                    Download Press Kit
                  </a>
                </div>
              )}

              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3
                  className={`text-lg font-bold ${colors.sectionTitle} mb-4 flex items-center`}
                >
                  <span className="mr-2">✉️</span> Contact
                </h3>
                <div className="space-y-3">
                  {artist.online_presence?.contact_email && (
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${colors.neonText} mr-2`}
                      ></div>
                      <a
                        href={`mailto:${artist.online_presence.contact_email}`}
                        className={`text-sm ${colors.bodyText} hover:${colors.neonText}`}
                      >
                        {artist.online_presence.contact_email}
                      </a>
                    </div>
                  )}
                  {artist.online_presence?.booking_email && (
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${colors.neonText} mr-2`}
                      ></div>
                      <a
                        href={`mailto:${artist.online_presence.booking_email}`}
                        className={`text-sm ${colors.bodyText} hover:${colors.neonText}`}
                      >
                        Booking: {artist.online_presence.booking_email}
                      </a>
                    </div>
                  )}
                  {!artist.online_presence?.contact_email &&
                    !artist.online_presence?.booking_email && (
                      <p className={`${colors.bodyText} italic text-sm`}>
                        No contact information available
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        );

      case "story":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div
              className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
            >
              <h3 className={`text-xl font-bold ${colors.sectionTitle} mb-4`}>
                Artist Narrative
              </h3>
              <div
                className={`prose prose-invert max-w-none ${colors.bodyText}`}
              >
                {artist.long_narrative ? (
                  artist.long_narrative.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="italic">No narrative available</p>
                )}
              </div>
            </div>

            {artist.personal_philosophy && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-xl font-bold ${colors.sectionTitle} mb-4`}>
                  Personal Philosophy
                </h3>
                <div
                  className={`prose prose-invert max-w-none ${colors.bodyText}`}
                >
                  {artist.personal_philosophy
                    .split("\n\n")
                    .map((paragraph, i) => (
                      <p key={i} className="mb-4 leading-relaxed italic">
                        "{paragraph}"
                      </p>
                    ))}
                </div>
              </div>
            )}

            {safeArray(artist.quotes).length > 0 && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-xl font-bold ${colors.sectionTitle} mb-4`}>
                  Quotes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safeArray(artist.quotes).map((quote, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border ${colors.neonBorder} bg-gray-900/50`}
                    >
                      <p className={`italic ${colors.bodyText} mb-3`}>
                        "{quote}"
                      </p>
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full ${colors.primary} flex items-center justify-center text-xs font-bold mr-2`}
                        >
                          {artist.displayName
                            ? artist.displayName.charAt(0)
                            : "?"}
                        </div>
                        <p className="text-sm font-medium text-gray-200">
                          {artist.displayName || "Unknown"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {safeArray(artist.fan_press_quotes).length > 0 && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-xl font-bold ${colors.sectionTitle} mb-4`}>
                  Fan & Press Quotes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safeArray(artist.fan_press_quotes).map((quote, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border ${colors.neonBorder} bg-gray-900/50`}
                    >
                      <p className={`italic ${colors.bodyText} mb-3`}>
                        "{quote}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {artist.lazie_indie_association && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-xl font-bold ${colors.sectionTitle} mb-4`}>
                  Lazie Indie Association
                </h3>
                <p className={`text-sm ${colors.bodyText}`}>
                  {artist.lazie_indie_association}
                </p>
              </div>
            )}

            {safeArray(artist.career_highlights).length > 0 && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-xl font-bold ${colors.sectionTitle} mb-6`}>
                  Career Highlights
                </h3>
                <div className="relative">
                  <div
                    className={`absolute left-5 top-0 h-full w-0.5 ${colors.primary}`}
                  ></div>
                  {safeArray(artist.career_highlights).map((highlight, i) => (
                    <div
                      key={i}
                      className="relative pl-12 pb-6 group last:pb-0"
                    >
                      <div
                        className={`absolute left-5 top-1 w-3 h-3 rounded-full ${colors.neonText} transform -translate-x-1/2 z-10`}
                      ></div>
                      <div
                        className={`p-4 rounded-xl ${colors.cardBg} border ${colors.neonBorder} ${colors.hoverEffect}`}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-100">
                            {highlight.title}
                          </h4>
                          {highlight.year && (
                            <span
                              className={`text-xs px-2 py-1 rounded ${colors.tagBg}`}
                            >
                              {highlight.year}
                            </span>
                          )}
                        </div>
                        {highlight.description && (
                          <p
                            className={`mt-2 text-sm ${colors.bodyText} line-clamp-3`}
                          >
                            {highlight.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {safeArray(artist.testimonials).length > 0 && (
              <div
                className={`p-6 rounded-2xl ${colors.cardBg} ${colors.cardBorder} ${colors.hoverEffect}`}
              >
                <h3 className={`text-xl font-bold ${colors.sectionTitle} mb-6`}>
                  Testimonials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safeArray(artist.testimonials).map((testimonial, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border ${colors.neonBorder} bg-gray-900/50`}
                    >
                      <p className={`italic ${colors.bodyText} mb-3`}>
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full ${colors.primary} flex items-center justify-center text-xs font-bold mr-2`}
                        >
                          {testimonial.source
                            ? testimonial.source.charAt(0)
                            : "?"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-200">
                            {testimonial.source || "Unknown"}
                          </p>
                          {testimonial.relation && (
                            <p className="text-xs text-gray-400">
                              {testimonial.relation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${colors.lightBg} text-gray-100 pb-20`}>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-neon-yellow border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-neon-yellow animate-pulse">
              Loading artist profile...
            </p>
          </div>
        </div>
      )}

      <div className="relative">
        <div className="h-48 md:h-64 lg:h-80 w-full bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
          {artist.imageUrl && (
            <img
              src={artist.imageUrl}
              alt={`${artist.displayName || "Artist"}'s cover`}
              className="w-full h-full object-cover opacity-70"
              onLoad={() => setIsImageLoaded(true)}
            />
          )}
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${colors.cardBg} border-4 border-gray-800 shadow-xl overflow-hidden relative`}
            >
              {artist.imageUrl ? (
                <img
                  src={artist.imageUrl}
                  alt={artist.displayName || "Artist"}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-4xl font-bold">
                  {artist.displayName ? artist.displayName.charAt(0) : "?"}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-1">
                {artist.displayName || "Unknown Artist"}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {safeArray(artist.vibeTags)
                  .slice(0, 3)
                  .map((tag, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.tagBg}`}
                    >
                      {tag}
                    </span>
                  ))}
                {artist.identity?.origin && (
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.tagBg}`}
                  >
                    {artist.identity.origin}
                  </span>
                )}
              </div>
              <p className={`max-w-3xl ${colors.bodyText} line-clamp-2`}>
                {artist.long_narrative
                  ? artist.long_narrative.split("\n\n")[0]
                  : "No description available"}
              </p>
            </div>
            {/* <div className="flex flex-wrap gap-2">
              {safeArray(artist.online_presence?.social_media).slice(0, 4).map((platform, i) => (
                
                <a
                  key={i}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full ${colors.cardBg} border ${colors.neonBorder} flex items-center justify-center hover:${colors.neonText} hover:bg-gray-800/50 transition-colors`}
                  title={platform.platform}
                >
                  {platform.platform === "instagram" }
                  {platform.platform === "twitter" }
                  {platform.platform === "facebook" }
                  {platform.platform === "tiktok"}
                  {platform.platform === "youtube"}
                 
                </a>
              ))}
            </div> */}
            <div className="flex flex-wrap gap-2">
              {safeArray(artist.online_presence?.social_media)
                .slice(0, 4)
                .map((platform, i) => {
                  const icon =
                    platform.platform.toLowerCase() === "instagram" ? (
                      <Instagram className="w-5 h-5" />
                    ) : platform.platform.toLowerCase() === "twitter/x" ? (
                      <Twitter className="w-5 h-5" />
                    ) : platform.platform.toLowerCase() === "facebook" ? (
                      <Facebook className="w-5 h-5" />
                    ) : platform.platform.toLowerCase() === "youtube" ? (
                      <Youtube className="w-5 h-5" />
                    ) 
                    : null;

                  return (
                    <a
                      key={i}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full ${colors.cardBg} border ${colors.neonBorder} flex items-center justify-center hover:${colors.neonText} hover:bg-gray-800/50 transition-colors`}
                      title={platform.platform}
                    >
                      {icon}
                    </a>
                  );
                })}
            </div>
            
            {/* <div className="flex flex-wrap gap-2">
  {safeArray(artist.online_presence?.social_media)
    .slice(0, 4)
    .map((platform, i) => {
      const platformName = platform.platform.toLowerCase();
console.log(platformName);

      // Map each platform to its logo image URL
      const iconSrc =
        platformName === "instagram"
          ? "https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
          : platformName === "twitter/x"
          ? "https://cdn-icons-png.flaticon.com/512/733/733579.png"
          : platformName === "facebook"
          ? "https://cdn-icons-png.flaticon.com/512/733/733547.png"
          : platformName === "youtube"
          ? "https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
          : platformName === "tiktok"
          ? "https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
          : null;

      if (!iconSrc) return null;

      return (
        <a
          key={i}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full ${colors.cardBg} border ${colors.neonBorder} flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30 transition-all`}
          title={platform.platform}
        >
          <img
            src={iconSrc}
            alt={platform.platform}
            className="w-6 h-6 object-contain"
          />
        </a>
      );
    })}
</div> */}

          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-8">
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                  activeTab === tab.id ? colors.tabActive : colors.tabInactive
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <TabContent tabId={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default ViewArtistProfile;
