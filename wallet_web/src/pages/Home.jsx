import React, { useState } from "react";
import FinPage from "./fin/FinPage";
import HrPage from "./hr/HrPage";
import OprPage from "./opr/OprPage";
import MarkPage from "./mark/MarkPage";

function Home() {
  const tabs = ["finance", "hr", "operations", "marketing"];

  const [activeTab, setActiveTab] = useState("finance");

  return (
    <div className="p-6">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Digital Expense Wallet
        </h1>

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
            className={`px-4 py-2 rounded capitalize transition ${
              activeTab === tab
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