"use client";
import { useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800  mb-4">
              About Agora
            </h1>
            <p className="text-xl text-gray-600  max-w-3xl mx-auto">
              Connecting local buyers and sellers in a modern marketplace 
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white  rounded-2xl shadow-lg p-6 sticky top-6">
                <nav className="space-y-2">
                  {[
                    { id: "mission", label: "Our Mission" },
                    { id: "story", label: "Our Story" },
                  
                    { id: "values", label: "Values" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-blue-100  text-blue-600  font-semibold"
                          : "text-gray-600  hover:bg-gray-100 "
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-2">
              <div className="bg-white  rounded-2xl shadow-lg p-8">
                {activeTab === "mission" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-800  mb-6">
                      Our Mission
                    </h2>
                    <p className="text-gray-600  text-lg leading-relaxed">
                      Agora is dedicated to creating a trustworthy
                      platform where local communities can buy and sell products
                      with confidence. We believe in empowering small businesses
                      and individual sellers while providing buyers with unique,
                      locally-sourced items.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                      <div className="text-center p-6 bg-blue-50  rounded-xl">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">🤝</span>
                        </div>
                        <h3 className="font-semibold text-gray-800  mb-2">
                          Community First
                        </h3>
                        <p className="text-gray-600  text-sm">
                          Building local connections
                        </p>
                      </div>
                      <div className="text-center p-6 bg-green-50  rounded-xl">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">🛡️</span>
                        </div>
                        <h3 className="font-semibold text-gray-800  mb-2">
                          Trust & Safety
                        </h3>
                        <p className="text-gray-600  text-sm">
                          Secure transactions
                        </p>
                      </div>
                      <div className="text-center p-6 bg-purple-50  rounded-xl">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">💡</span>
                        </div>
                        <h3 className="font-semibold text-gray-800  mb-2">
                          Innovation
                        </h3>
                        <p className="text-gray-600  text-sm">
                          Modern marketplace
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "story" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-800  mb-6">
                      Our Story
                    </h2>
                    <p className="text-gray-600  text-lg leading-relaxed">
                      Founded in 2025, Agora started as a simple idea: to create
                      a better way for local communities to connect through
                      commerce. 
                    </p>
                  </div>
                )}

             

                {activeTab === "values" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-800  mb-6">
                      Our Values
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          value: "Transparency",
                          desc: "Clear communication and honest dealings",
                        },
                        {
                          value: "Community",
                          desc: "Putting people and connections first",
                        },
                        {
                          value: "Innovation",
                          desc: "Continuous improvement and modern solutions",
                        },
                       
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-green-100  rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-green-600  text-lg">
                              ✓
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 ">
                              {item.value}
                            </h4>
                            <p className="text-gray-600 ">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
