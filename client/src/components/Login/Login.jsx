import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../../context/DataContext";
const Login = () => {
  const { passcode, setPasscode } = useData();
  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
      <div className=" bg-black bg-opacity-30 sm:min-w-[500px] shadow-lg rounded-lg p-6 min-h-[50vh] m-2 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center font-extrabold my-5 sm:my-10 text-blue-200">
          LOGIN
        </h1>

        <h1 className="text-xl max-md:text-lg text-center font-bold my-2 text-green-100">
          Zenith Recruitment Data
        </h1>
        <AnimatePresence mode="wait">
          {passcode === "" ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.2 }}
              className="text-blue-500 p-2 text-sm lg:text-lg font-semibold my-1 text-center"
            >
              PassCode Required!
            </motion.div>
          ) : (
            <motion.div
              key="incorrect"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 p-2 text-sm lg:text-lg font-semibold my-1 text-center"
            >
              Access Denied!
            </motion.div>
          )}
        </AnimatePresence>
        <input
          type="password"
          value={passcode}
          onChange={handlePasscodeChange}
          placeholder="Enter passcode"
          className="w-full max-w-52 px-4 py-2 border-2 rounded-md border-yellow-500 focus:outline-none focus:border-blue-500 font-bold text-slate-700 text-center"
        />
      </div>
    </div>
  );
};

export default Login;
