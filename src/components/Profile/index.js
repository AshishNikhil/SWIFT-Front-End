import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({
          user: data[0],
          apiStatus: apiStatusConstants.success,
        });
        console.log("User data fetched successfully:", data[0]);
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        });
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
      console.error("Error fetching user data:", error);
    }
  };

  handleBack = () => {
    window.location.href = "/Dashboard";
  };

  renderLoadingView = () => (
    <div className="products-loader-container">
      <ThreeDots color="#0b69ff" height="50" width="50" />
    </div>
  );

  render() {
    const { user } = this.state;
    if (!user) return <div>{this.renderLoadingView}</div>;
    const { id, name, email, address, phone } = user;
    const { street, city } = address;
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    const phoneNo = phone.split(" ")[0];

    return (
      <div>
        <div className="navbar">
          <div>
            <img src="/Swiftlogo.png" alt="Logo" className="logo" />
          </div>
          <div className="profile-info">
            <div className="initials-bg">{initials}</div>
            <div className="nav-name">{name}</div>
          </div>
        </div>

        <div className="profile-container">
          <div className="profile-header">
            <button onClick={this.handleBack} className="back-bnt">
              ←
            </button>
            <h1 className="profile-name">Welcome, {name}</h1>
          </div>

          <div className="profile-content">
            <div className="profile-left-column">
              <div className="profile-logo">{initials}</div>
              <div className="profile-details">
                <h2>{name}</h2>
                <p>{email}</p>
              </div>
            </div>
            <div className="profile-right-column">
              <div>
                <label className="common-label">User ID</label>
                <div className="common-info">{id}</div>
              </div>
              <div>
                <label className="common-label">Name</label>
                <div className="common-info">{name}</div>
              </div>
              <div>
                <label className="common-label">Email ID</label>
                <div className="common-info">{email}</div>
              </div>
              <div>
                <label className="common-label">Address</label>
                <div className="common-info">
                  {street}, {city}
                </div>
              </div>
              <div>
                <label className="common-label">Phone</label>
                <div className="common-info">{phoneNo}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
