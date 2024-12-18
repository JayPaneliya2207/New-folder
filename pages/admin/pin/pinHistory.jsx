import React, { useState } from "react";
import style from "../users/user.module.css";

const PinHistory = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [limit, setLimit] = useState(10);
  const [filteredUser, setFilteredUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Static data for users
  const userList = [
    {
      _id: "1",
      epinCode: "EPIN001",
      username: "user1",
      status: "yes",
      Date: "2024-08-17 04:09:26",
    },
    {
      _id: "2",
      epinCode: "EPIN002",
      username: "user2",
      status: "yes",
      Date: "2024-08-17 04:09:26",
    },
    {
      _id: "3",
      epinCode: "EPIN003",
      username: "user3",
      status: "yes",
      Date: "2024-08-17 04:09:26",
    },
    // Add more users here as needed
  ];

  const handleFilter = (e) => {
    e.preventDefault();
    const filtered = userList.filter(
      (user) =>
        user.username.toLowerCase().includes(username.toLowerCase()) &&
        user.email.toLowerCase().includes(fullName.toLowerCase())
    );
    setFilteredUser(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalRows = filteredUser.length || userList.length;

  const displayedUsers = filteredUser.length ? filteredUser : userList;

  return (
    <div className="pages_container">
      <div className="pu_container">
        <div className="pu_datatable_wrapper">
          <div className="row pt-3 bg-default">
            <h4 className="page-title">History</h4>
            <div className="col-sm-10">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="https://thewinnersacademy.in/admin/dashboard">
                    home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Pin</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Pin History
                </li>
              </ol>
            </div>
          </div>

          <form className="form-inline row" onSubmit={handleFilter}>
            <div className="col-12 col-md-2 mb-4">
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                className="form-control w-100"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-2 mb-4">
              <input
                type="text"
                placeholder="Enter Full Name"
                name="name"
                className="form-control w-100"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-1 mb-4">
              <select
                name="limit"
                className="form-control w-100"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="col-12 col-md-1 mb-4">
              <input
                type="submit"
                className="btn btn-sm btn-primary w-100"
                value="Filter"
              />
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>E-Pin Code</th>
                  <th>Username</th>
                  <th>Use Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers
                  .slice((currentPage - 1) * perPage, currentPage * perPage)
                  .map((user, index) => (
                    <tr key={user._id}>
                      <td>{(currentPage - 1) * perPage + index + 1}</td>
                      <td>{user.epinCode}</td>
                      <td>{user.username}</td>
                      <td>{user.status}</td>
                      <td>{user.Date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-container text-center">
            <nav aria-label="User pagination">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    aria-label="Previous page"
                  >
                    Previous
                  </a>
                </li>

                {/* Page Numbers */}
                {[...Array(Math.ceil(totalRows / perPage))].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(index + 1);
                      }}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === Math.ceil(totalRows / perPage)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < Math.ceil(totalRows / perPage))
                        handlePageChange(currentPage + 1);
                    }}
                    aria-label="Next page"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinHistory;
