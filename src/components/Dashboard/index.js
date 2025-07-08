import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      user: null,
      sortField: null,
      sortOrder: null,
      searchQuery: "",
      page: 1,
      pageSize: 10,
    };
  }

  componentDidMount = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({ comments: data, user: data[0] });
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  renderLoadingView = () => (
    <div className="products-loader-container">
      <ThreeDots color="#0b69ff" height="50" width="50" />
    </div>
  );

  handleBack = () => {
    window.location.href = "/";
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value, page: 1 });
  };

  handlePageSizeChange = (e) => {
    this.setState({ pageSize: parseInt(e.target.value), page: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ page });
  };

  cycleSort = (field, selectedOrder) => {
    this.setState({
      sortField: selectedOrder ? field : null,
      sortOrder: selectedOrder || null,
    });
  };

  getSortedAndFilteredData = () => {
    const { comments, searchQuery, sortField, sortOrder } = this.state;
    let filtered = comments;

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (comment) =>
          comment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          comment.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortField && sortOrder) {
      filtered.sort((a, b) => {
        let aField = a[sortField];
        let bField = b[sortField];
        if (typeof aField === "string") {
          aField = aField.toLowerCase();
          bField = bField.toLowerCase();
        }
        if (sortOrder === "asc") {
          return aField > bField ? 1 : -1;
        } else {
          return aField < bField ? 1 : -1;
        }
      });
    }

    return filtered;
  };

  render() {
    const { user, searchQuery, page, pageSize, sortField, sortOrder } =
      this.state;
    if (!user) {
      return <div>{this.renderLoadingView()}</div>;
    }

    const { name } = user;
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    const data = this.getSortedAndFilteredData();
    const pageCount = Math.ceil(data.length / pageSize);
    const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

    return (
      <>
        <div className="navbar">
          <div>
            <img src="/Swiftlogo.png" alt="Logo" className="logo" />
          </div>
          <div className="profile-info" onClick={this.handleBack}>
            <div className="initials-bg">{initials}</div>
            <div className="nav-name">{name}</div>
          </div>
        </div>
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <select
                onChange={(e) => this.cycleSort("postId", e.target.value)}
                value={sortField === "postId" ? sortOrder || "" : ""}
                className="sort-select"
              >
                <option value="">Sort Post ID</option>
                <option value="asc">Sort Post ID Asc</option>
                <option value="desc">Sort Post ID Des</option>
              </select>

              <select
                onChange={(e) => this.cycleSort("name", e.target.value)}
                value={sortField === "name" ? sortOrder || "" : ""}
                className="sort-select"
              >
                <option value="">Sort Name</option>
                <option value="asc">Sort Name Asc</option>
                <option value="desc">Sort Name Des</option>
              </select>

              <select
                onChange={(e) => this.cycleSort("email", e.target.value)}
                value={sortField === "email" ? sortOrder || "" : ""}
                className="sort-select"
              >
                <option value="">Sort Email</option>
                <option value="asc">Sort Email Asc</option>
                <option value="desc">Sort Email Des</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search by name, email or comment"
                value={searchQuery}
                onChange={this.handleSearchChange}
                className="search-input"
              />
            </div>
          </div>
          <div>
            <table
              border="1"
              cellPadding="5"
              cellSpacing="0"
              className="comments-table"
            >
              <thead>
                <tr>
                  <th>Post ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.postId}</td>
                    <td>{comment.name}</td>
                    <td>{comment.email}</td>
                    <td>{comment.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-controls">
              <div>
                <span className="pagination-info">
                  {Math.min((page - 1) * pageSize + 1, data.length)}-
                  {Math.min(page * pageSize, data.length)} of {data.length}{" "}
                  items
                </span>
                <button
                  onClick={() => this.handlePageChange(Math.max(page - 1, 1))}
                  disabled={page === 1}
                  className="pagination-button"
                >
                  &lt;
                </button>
                {Array.from({ length: pageCount }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => this.handlePageChange(index + 1)}
                    style={{
                      display: page === index + 1 ? "inline-block" : "none",
                      fontWeight: "bold",
                      marginLeft: "8px",
                      marginRight: "8px",
                      backgroundColor: "transparent",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      height: "26px",
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    this.handlePageChange(Math.min(page + 1, pageCount))
                  }
                  disabled={page === pageCount}
                  className="pagination-button"
                >
                  &gt;
                </button>
                <select
                  onChange={this.handlePageSizeChange}
                  value={pageSize}
                  className="page-size-select"
                >
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
