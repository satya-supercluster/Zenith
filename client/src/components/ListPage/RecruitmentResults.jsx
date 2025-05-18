import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RecruitmentResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfetti, setShowConfetti] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const names = [
    "Aakarsh Jain",
    "Aakrisht Singh",
    "Abizer",
    "Adarsh Pandey",
    "Aditya Singh",
    "Akshansh Gupta",
    "Anant Gupta",
    "Anish Kumar Sharma",
    "Ankit Dubey",
    "Ansh Jalan",
    "Anshul Mishra",
    "Arnav Bhardwaj",
    "Arnav Surana",
    "Atishay Jain",
    "Atul Jaiswal",
    "DARKKK - Tejas Fuke",
    "Debanjan Rakshit",
    "Devansh Pathak",
    "Disha Mittal",
    "Disha Singla",
    "Farheen Ahmed",
    "Gaurav Shukla",
    "Harish Kushwaha",
    "Hozefa Travadi",
    "Jatin Patidar",
    "Jay Gautam",
    "Kashish Jaiswal",
    "Krishna Verma",
    "Kushagra Subhedar",
    "Kushal Gupta",
    "LAKSHYA GUPTA",
    "Neeraj Choithwani",
    "Nitin Jangid",
    "OMTEJA KOTHMIRKAR",
    "Payal Pratap Jadhav",
    "Piyush Omer",
    "Prakhar Sharma",
    "Prashant Gupta",
    "Priyanshu Singh",
    "Pukhraj Motwani",
    "Pulkit Gangil",
    "Ram Babu",
    "Ravi Ranjan",
    "Saksham Chopra",
    "Saksham Singh Rathore",
    "Samriddhi Srivastava",
    "Satyam Vatsal",
    "Shivam Gupta",
    "Shreyas Patil",
    "Sidhesh Dudhabaware",
    "Vansh gupta",
    "Vinay Nagle",
  ];

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handlePersonClick = (name) => {
    setSelectedPerson(name);
    setTimeout(() => {
      setSelectedPerson(null);
    }, 3000);
  };

  const Confetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(150)].map((_, i) => {
          const size = Math.random() * 10 + 5;
          const left = Math.random() * 100;
          const animationDuration = Math.random() * 3 + 2;
          const delay = Math.random() * 5;
          const color = [
            "bg-blue-500",
            "bg-blue-400",
            "bg-blue-300",
            "bg-blue-600",
            "bg-blue-700",
            "bg-indigo-500",
            "bg-indigo-400",
            "bg-purple-500",
            "bg-yellow-400",
          ][Math.floor(Math.random() * 9)];

          return (
            <div
              key={i}
              className={`absolute ${color} opacity-80 rounded-md`}
              style={{
                width: size + "px",
                height: size + "px",
                left: left + "%",
                top: "-20px",
                animation: `fall ${animationDuration}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
        <style jsx global>{`
          @keyframes fall {
            0% {
              transform: translateY(-20px) rotate(0deg);
              opacity: 1;
            }
            80% {
              opacity: 0.8;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center justify-start bg-gradient-to-br from-blue-900 to-blue-950">
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <div className="px-6 py-8 bg-blue-800 rounded-t-xl border-t border-l border-r border-blue-400 shadow-lg">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-blue-100 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Zenith Recruitment Results
          </motion.h1>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-xl text-blue-100">
              Congratulations to our new team members!
            </p>
            <div className="h-1 w-40 bg-blue-500 rounded-full mx-auto mt-4"></div>
          </motion.div>

          <motion.div
            className="mt-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <input
              type="text"
              placeholder="Search for a name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-gray-100 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-3.5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </motion.div>
        </div>

        <motion.div
          className="bg-gray-900 rounded-b-xl border-b border-l border-r border-blue-400 shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold text-blue-300 mb-6">
              Selected Candidates ({names.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredNames.map((name, index) => (
                  <motion.div
                    key={name}
                    layoutId={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    onClick={() => handlePersonClick(name)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg cursor-pointer border ${
                      selectedPerson === name
                        ? "border-blue-400 bg-blue-900/70"
                        : "border-blue-700 bg-blue-900/30 hover:bg-blue-900/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                        {name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-blue-100 font-medium">{name}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredNames.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-blue-300">
                  No matches found for "{searchTerm}"
                </p>
              </motion.div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-900 border-t border-blue-800">
            <motion.div
              className="flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="text-blue-300 text-sm">
                Zenith Programming Club - 2025
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfetti(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium"
              >
                Celebrate!
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
