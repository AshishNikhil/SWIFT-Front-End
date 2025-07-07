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
    window.location.href = "/";
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
        {/* Top Navbar */}
        <div>
          <div>
            <span>S</span>WIFT
          </div>
          <div>
            <div>{initials}</div>
            <div>{user.name}</div>
          </div>
        </div>

        {/* Content */}
        <div>
          <button onClick={this.handleBack}>← Back to Dashboard</button>

          <h1>Welcome, {name}</h1>

          <div>
            {/* Left Column */}
            <div>
              <div>{initials}</div>
              <h2>{name}</h2>
              <p>{email}</p>
            </div>

            {/* Right Column */}
            <div>
              <div>
                <label>User ID</label>
                <div>{id}</div>
              </div>
              <div>
                <label>Name</label>
                <div>{name}</div>
              </div>
              <div>
                <label>Email ID</label>
                <div>{email}</div>
              </div>
              <div>
                <label>Address</label>
                <div>
                  {street}, {city}
                </div>
              </div>
              <div>
                <label>Phone</label>
                <div>{phoneNo}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
