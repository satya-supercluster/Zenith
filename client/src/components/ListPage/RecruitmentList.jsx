import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useData } from "@/context/DataContext";

const RecruitmentList = () => {
  const { registrationData } = useData();
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return registrationData?.filter((profile) => {
      if (search.trim() === "") return true;

      const lowerSearch = search.toLowerCase();
      return (
        (profile.name && profile.name.toLowerCase().includes(lowerSearch)) ||
        (profile.scholarNo &&
          profile.scholarNo.toLowerCase().includes(lowerSearch)) ||
        (profile.branch &&
          profile.branch.toLowerCase().includes(lowerSearch)) ||
        (profile.email && profile.email.toLowerCase().includes(lowerSearch)) ||
        (profile.contact && profile.contact.includes(search.trim())) ||
        (profile.skills &&
          profile.skills.toLowerCase().includes(lowerSearch)) ||
        (profile.github && profile.github.toLowerCase().includes(lowerSearch))
      );
    });
  }, [registrationData, search]);

  return (
    <div className="min-h-screen break-words">
      <nav className="fixed w-full flex items-center justify-between p-4 sm:px-20 h-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700">
        <NavLink
          to="/"
          className="flex items-center text-lg font-semibold text-blue-300 hover:text-blue-500"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        </NavLink>
        <div className="flex-1 mx-4 flex justify-center">
          <input
            type="text"
            placeholder="Search profiles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 font-extrabold"
          />
        </div>
      </nav>

      {/* Main content */}
      <div className="p-4">
        <div className="mb-4 mt-20 flex flex-col font-semibold sm:flex-row justify-center items-center text-gray-100">
          <div className="mb-2 sm:mb-0">
            <span className="mr-4">
              Total Profiles: <strong>{filteredData.length}</strong>
            </span>
          </div>
        </div>

        {/* Profile data list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((profile, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300 border border-gray-700 max-sm:text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                {profile.name}
              </h3>
              <p>
                <strong className="text-purple-400">Scholar No:</strong>{" "}
                {profile.scholarNo}
              </p>
              <p>
                <strong className="text-green-400">Email:</strong>{" "}
                {profile.email}
              </p>
              <p>
                <strong className="text-yellow-400">Year:</strong>{" "}
                {profile.year}
              </p>
              <p>
                <strong className="text-blue-400">Contact:</strong>{" "}
                {profile.contact}
              </p>
              <p>
                <strong className="text-pink-400">Branch:</strong>{" "}
                {profile.branch}
              </p>
              <p>
                <strong className="text-orange-400">Skills:</strong>{" "}
                {profile.skills}
              </p>

              {/* Coding profiles section */}
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="font-semibold text-red-400 mb-2">
                  Coding Profiles:
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.github && (
                    <a
                      href={
                        profile.github.startsWith("http")
                          ? profile.github
                          : `https://github.com/${profile.github}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-600"
                    >
                      GitHub
                    </a>
                  )}
                  {profile.codeforces && (
                    <a
                      href={
                        profile.codeforces.startsWith("http")
                          ? profile.codeforces
                          : `https://codeforces.com/profile/${profile.codeforces}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-600"
                    >
                      Codeforces
                    </a>
                  )}
                  {profile.codechef && (
                    <a
                      href={
                        profile.codechef.startsWith("http")
                          ? profile.codechef
                          : `https://www.codechef.com/users/${profile.codechef}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-600"
                    >
                      CodeChef
                    </a>
                  )}
                  {profile.leetcode && (
                    <a
                      href={
                        profile.leetcode.startsWith("http")
                          ? profile.leetcode
                          : `https://leetcode.com/${profile.leetcode}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-600"
                    >
                      LeetCode
                    </a>
                  )}
                </div>
              </div>

              {/* Portfolio link if available */}
              {profile.portfolio && (
                <div className="mt-3">
                  <a
                    href={
                      profile.portfolio.startsWith("http")
                        ? profile.portfolio
                        : `https://${profile.portfolio}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    View Portfolio
                  </a>
                </div>
              )}

              {/* Why Join section with expandable text */}
              {profile.whyJoin && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <details>
                    <summary className="font-semibold text-indigo-400 cursor-pointer mb-1">
                      Why Join
                    </summary>
                    <p className="text-gray-300 text-sm pl-2 border-l-2 border-indigo-400">
                      {profile.whyJoin}
                    </p>
                  </details>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentList;
