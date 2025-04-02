import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCode,
  faUser,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";

export default function RecruitmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    scholarNo: "",
    branch: "",
    year: "",
    email: "",
    skills: "",
    portfolio: "",
    github: "",
    codeforces: "",
    codechef: "",
    leetcode: "",
    whyJoin: "",
  });

  const [activeSection, setActiveSection] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const programmingSkills = [
    "Web Development",
    "App Development",
    "Machine Learning",
    "Competitive Programming",
    "Open Source",
    "UI/UX Design",
  ];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "skills") {
      setFormData((prevData) => ({
        ...prevData,
        skills: checked
          ? [...prevData.skills.split(",").filter((s) => s.trim()), value].join(
              ","
            )
          : prevData.skills
              .split(",")
              .filter((s) => s.trim() !== value)
              .join(","),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error for the field on change
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateSection = (section) => {
    const newErrors = {};
    if (section === "personal") {
      if (!formData.name.trim()) {
        newErrors.name = "Please enter your name";
      }
      if (!formData.scholarNo.trim()) {
        newErrors.scholarNo = "Please enter your scholar number";
      }
      if (!formData.branch.trim()) {
        newErrors.branch = "Please enter your branch";
      }
      if (!formData.year) {
        newErrors.year = "Please select your year";
      }
    } else if (section === "skills") {
      // Skills section validation Nahi Chahiye Vaise To
    } else if (section === "profiles") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.github.trim()) {
        newErrors.github = "Please enter your GitHub profile URL";
      }
    } else if (section === "motivation") {
      if (!formData.whyJoin.trim()) {
        newErrors.whyJoin = "Please tell us why you want to join Zenith";
      } else if (formData.whyJoin.trim().length < 20) {
        newErrors.whyJoin = "Please provide at least 20 characters";
      }
    }
    return newErrors;
  };

  const handleNext = () => {
    const currentErrors = validateSection(activeSection);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    // Clear errors when moving forward
    setErrors({});
    if (activeSection === "personal") {
      setActiveSection("skills");
    } else if (activeSection === "skills") {
      setActiveSection("profiles");
    } else if (activeSection === "profiles") {
      setActiveSection("motivation");
    }
  };

  const handlePrevious = () => {
    setErrors({});
    if (activeSection === "skills") {
      setActiveSection("personal");
    } else if (activeSection === "profiles") {
      setActiveSection("skills");
    } else if (activeSection === "motivation") {
      setActiveSection("profiles");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = validateSection(activeSection);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch("https://zenith-club-manit.onrender.com/api/recruit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 400) {
        setActiveSection("profiles");
        setErrors({ email: "Email already registered" });
      } else if (response.status === 500) {
        alert("Something went wrong. Please try again.");
      } else if (response.status === 200) {
        alert(
          "Your registration was successful!"
        );
        // Reset form
        setFormData({
          name: "",
          scholarNo: "",
          branch: "",
          year: "",
          email: "",
          skills: "",
          portfolio: "",
          github: "",
          codeforces: "",
          codechef: "",
          leetcode: "",
          whyJoin: "",
        });
        setErrors({});
        setActiveSection("personal");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSkillSelected = (skill) => {
    return formData.skills.split(",").some((s) => s.trim() === skill);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 tracking-widest">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[900px] rounded-xl shadow-xl overflow-hidden w-full max-w-2xl border border-blue-400"
      >
        <div className="px-6 py-4 bg-blue-800">
          <h2 className="sm:text-3xl font-bold text-blue-100 text-center flex items-center justify-center">
            <FontAwesomeIcon icon={faCode} className="mr-2" />
            Zenith Recruitment 2025
          </h2>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1 sm:space-x-2">
              <motion.div
                className={`h-2 w-12 sm:w-24 rounded-full ${
                  activeSection === "personal"
                    ? "bg-blue-500" 
                    : activeSection === "skills" ||
                      activeSection === "profiles" ||
                      activeSection === "motivation"
                    ? "bg-green-500" 
                    : "bg-gray-500" 
                } transition-colors`}
                whileHover={{ scale: 1.05 }}
              />
              <motion.div
                className={`h-2 w-12 sm:w-24 rounded-full ${
                  activeSection === "skills"
                    ? "bg-blue-500" 
                    : activeSection === "profiles" ||
                      activeSection === "motivation"
                    ? "bg-green-500" 
                    : "bg-gray-500" 
                } transition-colors`}
                whileHover={{ scale: 1.05 }}
              />
              <motion.div
                className={`h-2 w-12 sm:w-24 rounded-full ${
                  activeSection === "profiles"
                    ? "bg-blue-500" 
                    : activeSection === "motivation"
                    ? "bg-green-500" 
                    : "bg-gray-500" 
                } transition-colors`}
                whileHover={{ scale: 1.05 }}
              />
              <motion.div
                className={`h-2 w-12 sm:w-24 rounded-full ${
                  activeSection === "motivation"
                    ? "bg-blue-500" 
                    : "bg-gray-500" 
                } transition-colors`}
                whileHover={{ scale: 1.05 }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-gray-900 text-gray-100">
          <AnimatePresence mode="wait">
            {activeSection === "personal" && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-blue-300 mb-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400 font-semibold">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="scholarNo"
                      className="block text-sm font-semibold text-blue-300 mb-1"
                    >
                      Scholar Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="scholarNo"
                      type="text"
                      name="scholarNo"
                      value={formData.scholarNo}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.scholarNo && (
                      <p className="mt-1 text-xs text-red-400 font-semibold">
                        {errors.scholarNo}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="branch"
                      className="block text-sm font-semibold text-blue-300 mb-1"
                    >
                      Branch <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="branch"
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.branch && (
                      <p className="mt-1 text-xs text-red-400 font-semibold">
                        {errors.branch}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-300 mb-1">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="year"
                          value="2"
                          checked={formData.year === "2"}
                          onChange={handleChange}
                          className="h-5 w-5 text-blue-500"
                        />
                        <span className="text-blue-300">2nd Year</span>
                      </label>
                    </div>
                    {errors.year && (
                      <p className="mt-1 text-xs text-red-400 font-semibold">
                        {errors.year}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faLaptopCode} className="mr-2" />
                  Technical Skills
                </h3>
                <p className="text-sm text-blue-300 mb-4">
                  Select all areas you have experience or interest in
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programmingSkills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg overflow-hidden ${
                        isSkillSelected(skill)
                          ? "border-blue-400 bg-blue-900/50"
                          : "border-blue-700"
                      }`}
                    >
                      <label className="cursor-pointer">
                        <div className="flex items-start p-4">
                          <input
                            type="checkbox"
                            name="skills"
                            value={skill}
                            checked={isSkillSelected(skill)}
                            onChange={handleChange}
                            className="h-5 w-5 text-blue-500 mt-1"
                          />
                          <div className="ml-3">
                            <span className="font-semibold text-blue-300">
                              {skill}
                            </span>
                          </div>
                        </div>
                      </label>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="skills-other"
                    className="block text-sm font-semibold text-blue-300 mb-1"
                  >
                    Other Skills (comma separated)
                  </label>
                  <textarea
                    id="skills-other"
                    name="skills"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
              </motion.div>
            )}

            {activeSection === "profiles" && (
              <motion.div
                key="profiles"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  Contact & Profiles
                </h3>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-blue-300 mb-1"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400 font-semibold">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="github"
                      className="block text-sm font-semibold text-blue-300 mb-1"
                    >
                      GitHub Profile <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="github"
                      type="text"
                      name="github"
                      placeholder="https://github.com/yourusername"
                      value={formData.github}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.github && (
                      <p className="mt-1 text-xs text-red-400 font-semibold">
                        {errors.github}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="portfolio"
                      className="block text-sm font-semibold text-blue-300 mb-1"
                    >
                      Portfolio Website (optional)
                    </label>
                    <input
                      id="portfolio"
                      type="text"
                      name="portfolio"
                      placeholder="https://your-portfolio.com"
                      value={formData.portfolio}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="codeforces"
                        className="block text-sm font-semibold text-blue-300 mb-1"
                      >
                        Codeforces
                      </label>
                      <input
                        id="codeforces"
                        type="text"
                        name="codeforces"
                        placeholder="Username"
                        value={formData.codeforces}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="codechef"
                        className="block text-sm font-semibold text-blue-300 mb-1"
                      >
                        CodeChef
                      </label>
                      <input
                        id="codechef"
                        type="text"
                        name="codechef"
                        placeholder="Username"
                        value={formData.codechef}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="leetcode"
                        className="block text-sm font-semibold text-blue-300 mb-1"
                      >
                        LeetCode
                      </label>
                      <input
                        id="leetcode"
                        type="text"
                        name="leetcode"
                        placeholder="Username"
                        value={formData.leetcode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === "motivation" && (
              <motion.div
                key="motivation"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  Why Zenith?
                </h3>

                <div>
                  <label
                    htmlFor="whyJoin"
                    className="block text-sm font-semibold text-blue-300 mb-1"
                  >
                    Tell us why you want to join Zenith Programming Club{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-blue-400 mb-2">
                    (Minimum 20 characters)
                  </p>
                  <textarea
                    id="whyJoin"
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 bg-gray-800 text-gray-100 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-blue-400">
                      {formData.whyJoin.length} characters
                    </p>
                    {errors.whyJoin && (
                      <p className="text-xs text-red-400 font-semibold">
                        {errors.whyJoin}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-between gap-2">
            {activeSection !== "personal" ? (
              <motion.button
                type="button"
                onClick={handlePrevious}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 text-blue-400 border border-blue-500 rounded-lg font-semibold flex items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Prev
              </motion.button>
            ) : (
              <div></div>
            )}

            {activeSection !== "motivation" ? (
              <motion.button
                type="button"
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg ml-auto flex items-center"
              >
                Next <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 ${
                  isSubmitting ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-500"
                } text-white rounded-lg font-semibold ml-auto flex items-center`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <span>Submitting</span>
                    <div className="flex space-x-1">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce delay-200">.</span>
                      <span className="animate-bounce delay-400">.</span>
                    </div>
                  </div>
                ) : (
                  "Submit"
                )}
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
