import { Component } from "react";
import { Route, Routes } from "react-router-dom";

import Profile from "./components/Profile";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Profile />} />
      </Routes>
    );
  }
}

export default App;
