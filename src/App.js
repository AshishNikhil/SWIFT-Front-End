import { Component } from "react";
import { Route, Routes } from "react-router-dom";

import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    );
  }
}

export default App;
