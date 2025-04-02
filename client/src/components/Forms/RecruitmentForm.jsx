import React from "react";

function RecruitmentForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Zenith - Recruitment Form
      </h1>
      <form
        action="http://localhost:3001/api/recruit"
        method="POST"
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="experience">
            Programming Experience:
          </label>
          <textarea
            id="experience"
            name="experience"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RecruitmentForm;
