/* eslint-disable no-unused-vars */
import React from "react";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import MySpace from "./components/ui/myspace";
import mockData from "./components/ui/mockdata";
import activeUsers from "./components/ui/activeuser";



function App() {
  return (
    <>
      <Header />
      <MySpace />

      <div className="min-h-screen">
        <div className="hero-content">          
          <div className="text-center lg:w-1/2 p-6">
            <h1 className="text-3xl font-bold">Active Users</h1>
            <ul className="menu bg-base-200 rounded-box space-y-2">
              {activeUsers.map((user) => (
                <li key={user.id}>
                  <a>{user.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="card w-full max-w-md shadow-2xl bg-base-100">
            <h1 className="text-3xl font-bold text-center">To-Do / Schedule</h1>
            <div className="form-control">
              {mockData.map(item => (
                <label key={item.id} className="label cursor-pointer">
                <span className="label-text">{item.label}</span>
                <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
              </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
