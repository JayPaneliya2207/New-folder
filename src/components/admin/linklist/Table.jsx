import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";
import { common } from "../../../../src/helper/Common.js";

const Table = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async (page, listPerPage = perPage) => {
    setLoading(true);
    common.getAPI(
      {
        method: "POST",
        url: "admin/getUsers",
        data: { page: page, listPerPage: listPerPage, searchTerm: searchTerm },
      },
      (resp) => {
        if (resp.status === "success") {
          let userData = Array.isArray(resp.data) ? resp.data : [];
          // Sort the user list in descending order by createdAt
          userData = userData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setUserList(userData);
          setPerPage(listPerPage);
          setTotalUsers(resp.totalUser);
        }
        setLoading(false);
      }
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page, perPage);
  };

  useEffect(() => {
    fetchUsers(currentPage, perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage, searchTerm]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="mainSection">
        <div
          className={`card-header border-0 d-flex justify-content-between align-items-center ${styles.mainHeader}`}
        >
          <h5 className="mb-0">New Customer List</h5>
          <div className="card-action">
            <a
              href="users/alluser"
              className="btn btn-sm btn-outline-success btn-round"
            >
              All
            </a>
          </div>
        </div>
        <div
          className={`container table-responsive ${styles.tableHeadSection}`}
        >
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Sr no.</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Join date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : userList.length > 0 ? (
                userList.map((user, index) => (
                  <tr key={user.id || index}>
                    <th scope="row">
                      {(currentPage - 1) * perPage + index + 1}
                    </th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
