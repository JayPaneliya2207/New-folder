/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { common } from "../../../src/helper/Common.js";
import {
  setPageHeading,
  updateMyStatus,
  confirmPopupStatus,
} from "../../../src/redux/actions/commonAction.js";
import validator from "validator";
import svg from "../../../src/helper/svg.js";
import { Tooltip } from "@mui/material";
import {
  AlertMsg,
  getNameInitials,
  Loading,
} from "../../../src/helper/helper.js";
import Link from "next/link";
import Popup from "../../../src/components/common/popup/Popup.jsx";
import styles from "../dashboard.module.css";
import style from "./user.module.css";
import { defaultCurrency } from "../../../src/helper/currencies.js";
import { CiLogin } from "react-icons/ci";
const Users = ({ users }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addUserPopup, setAddUserPopup] = useState(false);
  let [isEdit, manageIsEdit] = useState(false);
  let [editId, setEditId] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [addplanpopup, setAddPlanPopup] = useState(false);
  const [isAssign, setIsAssign] = useState(false);
  const [planList, setPlanList] = useState("");
  const [planCurrency, setPlanCurrency] = useState(defaultCurrency);
  const [userID, setUserId] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [limit, setLimit] = useState(10);
  const [filteredUser, setFilteredUser] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [otoName, setOtoName] = useState([]);
  let dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(
      setPageHeading({
        pageHeading: "Users",
        title: "Users",
      })
    );
  }, [dispatch]);

  const fetchUsers = async (page, listPerPage = perPage, nchange = false) => {
    setLoading(true);
    common.getAPI(
      {
        method: "POST",
        url: "admin/getUsers",
        data: { page: page, listPerPage: listPerPage, searchTerm: searchTerm },
      },
      (resp) => {
        if (resp.status === "success") {
          const userData = Array.isArray(resp.data) ? resp.data : [];
          setFilteredUser(userData);
          setUserList(resp.data);
          setPerPage(listPerPage);
          setTotalRows(resp.totalUser);
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
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };
  const handleSearchKeyupEvent = async (e) => {
    let t = e.target;
    let searchTerm = t.value;
    setSearchTerm(searchTerm);
    if (e.keyCode === 13) {
      fetchUsers(1);
    }
  };

  useEffect(() => {
    fetchUsers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const planColumns = [
    {
      name: "Plan Name",
      width: "120px",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "price",
      width: "70px",
      selector: (row) => row.currency?.symbol.concat(row.price),
      sortable: false,
    },
    {
      name: "Validity",
      width: "80px",
      selector: (row) => row.validity,
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="pu_datatable_btns">
          <Tooltip title="Edit" placement="top" arrow>
            <a className="pu_dt_btn">
              <CiLogin style={{ marginRight: "5px" }} />
            </a>
          </Tooltip>
          <Tooltip title="Edit" placement="top" arrow>
            <a
              onClick={(e) => getEditedData(e, row.id)}
              className="pu_dt_btn edit"
            >
              {svg.dt_edit_icon}
            </a>
          </Tooltip>
          <Tooltip title="Delete" placement="top" arrow>
            <a
              onClick={(e) => deleteUser(e, row.id)}
              className="pu_dt_btn delete"
            >
              {svg.dt_delete_icon}
            </a>
          </Tooltip>
        </div>
      ),
    },
  ];

  const planAssign = (planId) => {
    common.getAPI(
      {
        method: "POST",
        url: "admin/assignPlan",
        data: { planId: planId, id: userID },
      },
      (resp) => {
        if (resp.status === "success") {
          fetchUsers();
        }
        setLoading(false);
      }
    );
  };

  // const handleloginclick = () => {
  //   router.push(`/dashboard/${filteredUser[2]._id}`);
  // };

  const data = [];
  if (userList.length) {
    userList.forEach((item, index) => {
      const newItem = {
        id: item._id,
        name: item.name,
        userImg: item.profilePicture ? item.profilePicture.file : "",
        email: item.email,
        createdAt: common.dateFormatter(item.createdAt),
        validityDate: item.validityDate,
        status: item.status,
      };
      data.push(newItem);
    });
  }

  const userPopupCloseHandler = (e) => {
    setAddUserPopup(false);
    setTimeout(() => {
      manageIsEdit(false);
      setEditId("");
      setName("");
      setEmail("");
      setPassword("");
    }, 100);
  };

  const planPopupCloseHandler = (e) => {
    setAddPlanPopup(false);
    setTimeout(() => {
      setIsAssign(false);
      setEditId("");
      // setEmail("");
    }, 100);
  };

  const addUserFormSubmit = (e) => {
    e.preventDefault();
    const emptyname = validator.isEmpty(name, { ignore_whitespace: true });
    const emptyemail = validator.isEmpty(email, { ignore_whitespace: true });
    const emptypassword = validator.isEmpty(password, {
      ignore_whitespace: true,
    });
    const isemail = validator.isEmail(email);
    const passlength = validator.isLength(password, { min: 5, max: 15 });
    if (emptyname || emptyemail || (emptypassword && !isEdit)) {
      AlertMsg("error", "Oops!", "Field can not be empty!");
      return false;
    } else if (!isemail) {
      AlertMsg("error", "Oops!", "Email Is not valid!");
      return false;
    } else if ((!passlength && !isEdit) || (!passlength && password)) {
      AlertMsg(
        "error",
        "Oops!",
        "Password should be between 5 to 15 characters."
      );
      return false;
    } else {
      const data = {
        name: name,
        email: email,
        password: password,
      };
      if (isEdit === true) {
        data.id = editId;
        if (password === "") delete data.password;
      }
      Loading(true);
      common.getAPI(
        {
          method: "POST",
          url: "admin/updateUser",
          data: data,
        },
        (resp) => {
          if (resp.status === "success") {
            userPopupCloseHandler();
            setEditId("");
            setName("");
            setEmail("");
            setPassword("");
            fetchUsers(1);
          }
        }
      );
    }
  };

  const updateUserStatus = ( userId , status) => {
    if (userId) {
      dispatch(
        updateMyStatus({
          url: "admin/updateUserStatus",
          userId: userId,
          userStatus: status,
        })
      );
      const newUserList = [...userList];
      var userIndex = newUserList.findIndex((user) => user._id == userId);
      if (userIndex !== -1) {
        newUserList[userIndex].status = status;
        setUserList(newUserList);
      }
    }
  };

  const getEditedData = (e, userId) => {
    e.preventDefault();
    const userToEdit = userList.find((user) => user._id === userId);

    if (userToEdit) {
      setEditId(userToEdit._id);
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPassword("");
      manageIsEdit(true);
      setAddUserPopup(true);
    }
  };

  const refreshUserList = () => {
    fetchUsers(1);
  };

  const deleteUser = (id) => {
    if (id) {
      dispatch(
        confirmPopupStatus(true, {
          type: "User",
          url: "admin/deleteUser",
          data: { id: id },
          action: refreshUserList,
        })
      );
    }
  };

  const assignPlan = (e, userData) => {
    e.preventDefault();

    setUserId(userData.id);
    // setEmail(userData.email);
    common.getAPI(
      {
        method: "POST",
        url: "auth/getPlans",
        data: { status: 1 },
      },
      (resp) => {
        if (resp.status === "success") {
          setPlanList(resp.data);
          setPlanCurrency(resp.currency);
        }
        setLoading(false);
      }
    );
    const newUserList = [...userList];
    var user = newUserList.find((user) => user._id == userData.id);
    if (user) {
      setIsAssign(true);
      setEditId(user?._id);
      setAddPlanPopup(true);
    }
  };

  const otoname = ["FE", "OTO1", "OTO2", "OTO3", "OTO4"];

  const handleOtoChange = (event) => {
    const {
      target: { value },
    } = event;
    setOtoName(typeof value === "string" ? value.split(",") : value);
  };

  const list = [];
  if (planList.length) {
    planList.forEach((item, index) => {
      const newItem = {
        id: item._id,
        name: item.planname,
        price: item.price,
        validity: item.validity,
        createdAt: common.dateFormatter(item.createdAt),
        status: item.status,
        currency: planCurrency,
      };
      list.push(newItem);
    });
  }
  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
    // setSidebarVisible(!isSidebarVisible);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchUsers(1, limit);

    const filtered = users?.filter(
      (user) =>
        user.username.toLowerCase().includes(username.toLowerCase()) &&
        user.name.toLowerCase().includes(fullName.toLowerCase())
    );
    setFilteredUser(filtered);
  };
  const handleToggle = (userId) => {
    if (!users) {
      console.error("Users data is undefined");
      return;
    }

    const userToToggle = users.find((u) => u._id === userId);

    if (userToToggle) {
      const updatedUser = { ...userToToggle, active: !userToToggle.active };

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === userId ? updatedUser : u))
      );
    }
  };
  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <>
      <div className="pages_container">
        <section
          id={styles.wrapper}
          className={`${styles.wrapper} ${
            isSidebarVisible ? "" : styles.fullwidth
          }`}
        >
          <div className="pu_container">
            <div className="pu_datatable_wrapper">
              <div className="row pt-3 bg-default">
                <div className="col-sm-10">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="https://thewinnersacademy.in/admin/dashboard">
                        home
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">users</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      All Users
                    </li>
                  </ol>
                </div>
                <div className="col-sm-2"></div>
              </div>
              <div className={`${style.pu_pagetitle_wrapper}`}>
                <h3> All Users ({totalUsers})</h3>
                <div className={`${style.pu_pagetitle_right}`}>
                  <button
                    className={`${style.pu_btn}`}
                    onClick={(e) => setAddUserPopup(true)}
                  >
                    Add New User
                  </button>
                </div>
              </div>
              <form className="form-inline row" onSubmit={handleFilter}>
                <div className="col-12 col-md-2 mb-4">
                  <div className="form-group w-100">
                    <input
                      type="text"
                      placeholder="Enter Username"
                      name="username"
                      className="form-control w-100"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-2 mb-4">
                  <div className="form-group w-100">
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      name="name"
                      className="form-control w-100"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-1 mb-4">
                  <div className="form-group w-100">
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
                      <option value={200}>200</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-1 mb-4">
                  <input
                    type="submit"
                    className="btn btn-sm btn-primary w-100"
                    value="Filter"
                  />
                </div>

                <div className="col-12 col-md-1 mb-4">
                  <a
                    href="/admin/users/alluser"
                    className="btn btn-sm btn-secondary w-100"
                  >
                    Reset
                  </a>
                </div>
              </form>

              <div className="">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Action</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>My Package</th>
                        <th>My Rank</th>
                        <th>Join Date</th>
                        <th>Active Status</th>
                        <th>Block Status</th>
                        <th>Sponsor</th>
                        <th>Upline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(filteredUser) &&
                      filteredUser.length > 0 ? (
                        userList.map((user, index) => (
                          <tr key={user._id}>
                            <td>
                              {(currentPage - 1) * usersPerPage + index + 1}
                            </td>
                            <td>
                              <a
                                className="btn btn-danger btn-sm"
                                style={{ marginRight: "4px" }}
                                onClick={(e) => getEditedData(e, user._id)}
                              >
                                <i
                                  className="fa fa-edit"
                                  style={{
                                    color: "white",
                                    borderColor: "#fb6340",
                                    padding: "5px",
                                    borderRadius: "5px",
                                  }}
                                ></i>
                              </a>
                              <a
                                className="btn btn-danger btn-sm"
                                style={{ marginRight: "4px" }}
                                onClick={() => {
                                  // Copy the user ID to the clipboard
                                  navigator.clipboard
                                    .writeText(user._id)
                                    .then(() => {
                                      // Show confirmation that the user ID has been copied
                                      alert(
                                        `User ID (${user._id}) copied to clipboard!`
                                      );
                                    })
                                    .catch((err) => {
                                      // Handle any errors during the copy action
                                      alert("Failed to copy user ID: " + err);
                                    });
                                }}
                              >
                                <i
                                  className="fa fa-copy"
                                  style={{
                                    color: "white",
                                    borderColor: "#fb6340",
                                    padding: "5px",
                                    borderRadius: "5px",
                                  }}
                                ></i>
                              </a>
                              <Link
                                href={`/admin/users/edit-account?id=${user._id}`}
                                rel="noreferrer"
                              >
                                <a
                                  className="btn btn-info btn-sm"
                                  style={{ color: "white" }}
                                  target="_blank"
                                >
                                  Edit Account
                                </a>
                              </Link>
                            </td>
                            <td>{user.name}</td>
                            <td>
                              <i
                                className="fa fa-circle btn-sm"
                                style={{
                                  color: user.status === 1 ? "green" : "red",
                                  marginRight: "4px",
                                }}
                                aria-hidden="true"
                              />
                              {user.username}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.package}</td>
                            <td>{user.rank}</td>
                            <td>{user.joinDate}</td>
                            <td>
                              <label className={`${style.switch}`}>
                                <input
                                  id={"userChk_" + index}
                                  type="checkbox"
                                  value={user.status}
                                  checked={user.status === 1}
                                  onChange={() => {
                                    const newStatus = user.status === 1 ? 0 : 1;
                                    updateUserStatus(user._id, newStatus);
                                  }}
                                />
                                <span
                                  className={`${style.slider} ${style.round}`}
                                ></span>
                                <span className="pu_switch_icon"></span>
                              </label>
                            </td>
                            <td>{user.status === 1 ? "Unblock" : "Blocked"}</td>
                            <td>{user.sponsor}</td>
                            <td>{user.upline}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="13" className="text-center">
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pagination-container text-center">
                <nav aria-label="User pagination">
                  <ul className="pagination justify-content-center">
                    {/* Previous Button */}
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1)
                            handlePageChange(currentPage - 1);
                        }}
                        aria-label="Previous page"
                      >
                        Previous
                      </a>
                    </li>

                    {/* Page Numbers */}
                    {totalRows > 0 &&
                      [...Array(Math.ceil(totalRows / perPage))].map(
                        (_, index) => (
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
                        )
                      )}

                    {/* Next Button */}
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
        </section>
      </div>
      <Popup
        heading={isEdit ? "Update User" : "Add New User"}
        show={addUserPopup}
        onClose={userPopupCloseHandler}
      >
        <form onSubmit={addUserFormSubmit}>
          <div className="pu_input_wrapper">
            <label>Name</label>
            <input
              type="text"
              className="pu_input"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="pu_input_wrapper">
            <label>Email</label>
            <input
              type="text"
              className="pu_input"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // readOnly={isEdit ? true : false}
              // disabled={isEdit ? true : false}
            />
          </div>
          <div className="pu_input_wrapper">
            <label>Password</label>
            <input
              type="password"
              className="pu_input"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="pu_btn">
              {isEdit ? "Update" : "Add User"}
            </button>
          </div>
        </form>
      </Popup>
      <Popup
        heading={isAssign ? "Assign plan" : ""}
        subHeading={email}
        show={addplanpopup}
        onClose={planPopupCloseHandler}
      >
        <DataTable columns={planColumns} data={list} />
      </Popup>
    </>
  );
};
export default Users;
