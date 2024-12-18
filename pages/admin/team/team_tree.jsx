/* eslint-disable react/jsx-no-undef */

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { common } from "../../../src/helper/Common.js";
import {
  setPageHeading,
  updateMyStatus,
  confirmPopupStatus,
} from "../../../src/redux/actions/commonAction.js";
import validator from "validator";
import Header from "../../../src/components/common/header/Header.jsx";
import svg from "../../../src/helper/svg.js";
import { Tooltip } from "@mui/material";
import {
  AlertMsg,
  getNameInitials,
  Loading,
} from "../../../src/helper/helper.js";
import { IoMenu } from "react-icons/io5";
import Footer from "../../../src/components/admin/linklist/Footer.jsx";
import styles from "../dashboard.module.css";
// import StylesTeam from "./team-genration.module.css"
import { defaultCurrency } from "../../../src/helper/currencies.js";
import { CiLogin } from "react-icons/ci";
import Tree from "react-d3-tree";

const Generation = () => {
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
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });
  const [otoName, setOtoName] = useState([]);
  let dispatch = useDispatch();
  const teamMembers = [
    {
      id: 1,
      name: "THE WINNWERS ACADEMY",
      username: "WA0186495",
      email: "thewinnersacademyin@gmail.com",
      mobile: "9021238197",
      joinDate: "2024-08-19 11:15:32",
      status: "Inactive",
      sponsor: "thewinnersacademy (company)",
    },
    // Add more members as needed
  ];

  useEffect(() => {
    dispatch(
      setPageHeading({
        pageHeading: "Users",
        title: "Users",
      })
    );
  }, [dispatch]);
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("API_URL");
      const data = await response.json();
      setTeamMembers(data); // Assuming you have a state to store team members
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

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
          setUserList(resp.data);
          setPerPage(listPerPage);
          setTotalRows(resp.totalUser);
        }
        setLoading(false);
      }
    );
  };
  const handlePageChange = (page) => {
    fetchUsers(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    fetchUsers(page, newPerPage, true);
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
  }, []);

  const columns = [
    {
      name: "#S.N.",
      width: "50px", // Adjust width for smaller screens
      center: true,
      cell: (row, index) => <span>{"#" + (index + 1)}</span>,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="pu_avatarName_wrapper">
          <div className="pu_avatar_icon">
            <span className="pu_avatar_initial">
              {getNameInitials(row.name)}
            </span>
            {row.userImg ? <img src={row.userImg} alt="" /> : null}
          </div>
          <div className="pu_avatar_name">{row.name}</div>
        </div>
      ),
    },
    {
      name: "UserName",
      selector: (row) => row.UserName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Registration Date",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Mobile",
      sortable: true,
    },
    {
      name: "My Package",
      sortable: true,
    },
    {
      name: "My Rank",
      sortable: true,
    },
    {
      name: "Active Status",
      sortable: true,
    },
    {
      name: "Block Status",
      sortable: true,
    },
    {
      name: "Sponsor",
      sortable: true,
    },
    {
      name: "Upline",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row, index) => (
        <div className="pu_switch">
          <input
            id={"userChk_" + index}
            type="checkbox"
            value={row.status}
            defaultChecked={row.status === 1 ? true : false}
            onClick={(e) => updateUserStatus(row.id, row.status === 1 ? 0 : 1)}
          />
          <label htmlFor={"userChk_" + index}>
            <span className="pu_switch_icon"></span>
            <span className="pu_switch_text">
              {row.status === 1 ? "Active" : "Inactive"}
            </span>
          </label>
        </div>
      ),
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

  const planColumns = [
    {
      name: "Plan Name",
      width: "120px",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
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
      width: "100px",
      cell: (row) => (
        <button
          className="pu_btn"
          style={{ width: "80px", height: "30px", padding: "0px 10px" }}
          onClick={(e) => {
            planAssign(row.id);
          }}
        >
          Select
        </button>
      ),
    },
  ];

  const planAssign = (planId) => {
    common.getAPI(
      {
        method: "POST",
        url: "admin/assignPlan",
        data: { planId: planId, user_id: userID },
      },
      (resp) => {
        if (resp.status === "success") {
          fetchUsers();
        }
        setLoading(false);
      }
    );
  };

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
    //Reset popup form start
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
      setEmail("");
    }, 100);
  };

  /* add user start */
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
  /* add user end */

  /* update user status start */
  const updateUserStatus = (id, status) => {
    if (id) {
      dispatch(
        updateMyStatus({
          url: "admin/updateUserStatus",
          user_id: id,
          userStatus: status,
        })
      );
      const newUserList = [...userList];
      var userIndex = newUserList.findIndex((user) => user._id == id);
      newUserList[userIndex].status = status;
      setUserList(newUserList);
    }
  };
  /* update user status end */

  /* edit user start */
  const getEditedData = (e, id) => {
    e.preventDefault();

    const newUserList = [...userList];
    var user = newUserList.find((user) => user._id == id);
    if (user) {
      manageIsEdit(true);
      setEditId(user._id);
      setName(user.name);
      setEmail(user.email);
      setAddUserPopup(true);
    }
  };
  const refreshUserList = () => {
    fetchUsers(1);
  };
  const deleteUser = (e, id) => {
    if (id) {
      dispatch(
        confirmPopupStatus(true, {
          type: "User",
          url: "admin/deleteUser",
          data: { user_id: id },
          action: refreshUserList,
        })
      );
    }
  };

  const assignPlan = (e, userData) => {
    e.preventDefault();

    setUserId(userData.id);
    setEmail(userData.email);
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
  /* delete user end */

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
  };

  // Adjust tree translate based on window width
  const getTreeTranslate = () => {
    if (windowWidth <= 480) {
      return { x: 300, y: 100 };
    } else if (windowWidth <= 768) {
      return { x: 600, y: 120 };
    }
    return { x: 730, y: 120 };
  };
  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const treeData = [
    {
      name: "companyname (Active)",
      attributes: {
        Description: "This is the root",
      },
      children: [
        {
          name: "Null",
          attributes: {
            Description: "This is the first child",
          },
          children: [
            {
              name: "Null",
              attributes: {
                Description: "This is a sub child",
              },
              children: [
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
              ],
            },
            {
              name: "Null",
              attributes: {
                Description: "This is a sub child",
              },
              children: [
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "Null",
          attributes: {
            Description: "This is the second child",
          },
          children: [
            {
              name: "Null",
              attributes: {
                Description: "This is a sub child",
              },
              children: [
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
              ],
            },
            {
              name: "Null",
              attributes: {
                Description: "This is a sub child",
              },
              children: [
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
                {
                  name: "Null",
                  attributes: {
                    Description: "This is a sub child",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const tooltipData = [
    {
      Name: "companyname",
      SponsorId: 123456,
      TotalMember: "L:0 R:0",
      Kit: 0,
      TotalGreenUnit: "L:0 R:0",
      TotalRedUnit: "L:0 R:0",
      TotalDirectGreen: "L:0 R:0",
      TotalDirectRed: "L:0 R:0",
      Time: "2024-07-01 17:28:00",
    },
  ];

  const handleMouseEnter = (e, nodeDatum) => {
    if (nodeDatum.name === "companyname (Active)") {
      const { clientX, clientY } = e;

      setTooltip({
        visible: true,
        x: clientX + 10,
        y: clientY + 10,
        content: (
          <div
            style={{
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            {tooltipData.map((data, index) => (
              <>
                <div key={index}>
                  <p>
                    <strong>Name:</strong> {data.Name}
                  </p>
                  <p>
                    <strong>Sponsor ID:</strong> {data.SponsorId}
                  </p>
                  <p>
                    <strong>Total Members:</strong> {data.TotalMember}
                  </p>
                  <p>
                    <strong>Kit:</strong> {data.Kit}
                  </p>
                  <p>
                    <strong>Total Green Unit:</strong> {data.TotalGreenUnit}
                  </p>
                  <p>
                    <strong>Total Red Unit:</strong> {data.TotalRedUnit}
                  </p>
                  <p>
                    <strong>Total Direct Green:</strong> {data.TotalDirectGreen}
                  </p>
                  <p>
                    <strong>Total Direct Red:</strong> {data.TotalDirectRed}
                  </p>
                  <p>
                    <strong>Time:</strong> {data.Time}
                  </p>
                </div>
              </>
            ))}
          </div>
        ),
      });
    }
  };
  // Custom rendering for tree nodes
  const renderCustomNode = ({ nodeDatum }) => (
    <g>
      <circle
        r="20"
        fill="#87CEEB"
        onMouseEnter={(e) => handleMouseEnter(e, nodeDatum)}
        onMouseLeave={handleMouseLeave}
      />
      <text
        fill="white"
        strokeWidth="1.5"
        x="25"
        dy=".33em"
        fontSize="14"
        textAnchor="start"
      >
        {nodeDatum.name}
      </text>
    </g>
  );
  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: "" });
  };
  return (
    <>
      <div className="pages_container">
        <div className="container-fluid">
          <header className="row pt-2 pb-2">
            <div className="col-sm-9">
              <h4 className="page-title">Team Tree</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="localhost:3000/admin/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item active">Team Tree</li>
              </ol>
            </div>
            <div className="col-sm-3"></div>
          </header>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-8">
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor02"
                    aria-controls="navbarColor02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <form
                          action="admin/team/team-tree"
                          className="d-flex flex-column flex-lg-row my-2 my-lg-0"
                          method="post"
                        >
                          <input
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            className="form-control mr-sm-2 mb-2 mb-lg-0"
                            required
                          />
                          <select
                            className="form-control mr-sm-2 mb-2 mb-lg-0"
                            name="selected_position"
                            required
                          >
                            <option value="">Select</option>
                            <option value="whole_team">Whole Team</option>
                            <option value="right">Right Team</option>
                            <option value="left">Left Team</option>
                          </select>
                          <input
                            type="submit"
                            name="search"
                            className="btn btn-light mb-2 mb-lg-0"
                            value="Filter"
                          />
                          &nbsp;
                          <a
                            href="admin/team/team-tree"
                            className="btn btn-light btn-sm mb-2 mb-lg-0"
                          >
                            Reset
                          </a>
                        </form>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div>
            <div style={{ width: "100%", height: "700px" }}>
              <Tree
                data={treeData}
                renderCustomNodeElement={renderCustomNode}
                orientation="vertical"
                translate={getTreeTranslate()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Generation;
