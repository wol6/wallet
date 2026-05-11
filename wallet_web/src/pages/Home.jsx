import React, { useEffect, useState } from "react";
import FinPage from "./fin/FinPage";
import HrPage from "./hr/HrPage";
import OprPage from "./opr/OprPage";
import MarkPage from "./mark/MarkPage";
import { useNavigate } from "react-router-dom";

function Home() {
  const tabs = ["finance", "hr", "operations", "marketing"];

  const [activeTab, setActiveTab] = useState("finance");
  const navigate = useNavigate()

  const getUser = localStorage.getItem('user')
  const user = JSON.parse(getUser)

  function handleLogout(){
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="p-6">

      {/* Title */}
      <div className="mb-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            Digital Expense Wallet
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {user.name[0]}
              </div>

              <p className="text-sm font-medium text-gray-700">
                {user.name}
              </p>
            </div>

            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition"
            onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>


        <p className="text-gray-500 mt-2">
          Departmental expense wallet management system
        </p>
      </div>


      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 cursor-pointer rounded capitalize transition ${activeTab === tab
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Pages */}
      {activeTab === "finance" && <FinPage />}
      {activeTab === "hr" && <HrPage />}
      {activeTab === "operations" && <OprPage />}
      {activeTab === "marketing" && <MarkPage />}
    </div>
  );
}

export default Home;