import { Component } from "react";
import "./index.css";

class Navbar extends Component {
  handleBack = () => {
    window.location.href = "/";
  };

  render() {
    const { user } = this.props;
    const { name } = user;
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    return (
      <div className="navbar">
        <div>
          <img src="/Swiftlogo.png" alt="Logo" className="logo" />
        </div>
        <div className="profile-info" onClick={this.handleBack}>
          <div className="initials-bg">{initials}</div>
          <div className="nav-name">{name}</div>
        </div>
      </div>
    );
  }
}

export default Navbar;
