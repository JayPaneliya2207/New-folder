/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router.js";
import WithdrawalCards from "../../src/components/admin/linklist/WithdrawalCards.jsx";
import { common } from "../../src/helper/Common.js";
import { setPageHeading } from "../../src/redux/actions/commonAction.js";
import styles from "./dashboard.module.css";
// import { IoMenu } from "react-icons/io5";
import Table from "../../src/components/admin/linklist/Table.jsx";
import Report from "../../src/components/admin/linklist/Reports.jsx";
import { MdBubbleChart, MdAttachMoney } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaRegMoneyBill1 } from "react-icons/fa6";
const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // var isAdminRoute = router.pathname === "/admin/dashboard";
  // var isUserRoute = router.pathname === "/dashboard";
  const [monthlyVisitor, setMonthlyVisitor] = useState(0);
  const [weeklyClicks, setWeeklyClicks] = useState(0);
  const [weeklyVisitor, setWeeklyVisitor] = useState(0);
  const [linkCount, setLinkCount] = useState(0);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0); // New state for active users
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    dispatch(setPageHeading({ pageHeading: "Dashboard", title: "Dashboard" }));
  }, [dispatch]);

  useEffect(() => {
    common.getAPI(
      {
        method: "POST",
        url: "admin/getDashboardAnalytics",
      },
      (resp) => {
        if (resp.status === "success") {
          setMonthlyVisitor(resp.data.totalMonthlyVisitor);
          setWeeklyClicks(resp.data.totalWeeklyClicks);
          setWeeklyVisitor(resp.data.totalWeeklyVisitor);
          setLinkCount(resp.data.linkCount);
        }
      }
    );
  }, []);
  useEffect(() => {
    common.getAPI(
      {
        method: "POST",
        url: "/dashboard/getAdminDashboard",
      },
      (resp) => {
        if (resp.status === "success") {
          setActiveUsers(resp.data.activeUsers);
          // setInactiveUsers(resp.data.inactiveUsers);
          // Calculate total users (sum of active and inactive users)
          setTotalUsers(resp.data.activeUsers + resp.data.inactiveUsers);
        }
      }
    );
  }, []);
  return (
    <>
      <div className="pages_container">
        <section className="statistics">
          <section className="statis text-center mb-4">
            <div className="row">
              {/* Total Users */}
              <div className="col-md-6 col-sm-6 col-lg-3 mb-4">
                <div className="pu_analytics_white_box">
                  <div className="pu_awb_details">
                    <p>Total Users</p>
                    <h3>{totalUsers}</h3>
                  </div>
                  <div
                    className="pu_awb_icon p-2 border-white rounded-circle"
                    style={{ border: "1px solid white" }}
                  >
                    <FaUsers className="text-white" size={40} />
                  </div>
                </div>
              </div>

              {/* Active Users */}
              <div className="col-md-6 col-sm-6 col-lg-3 mb-4">
                <div className="pu_analytics_white_box">
                  <div className="pu_awb_details">
                    <p>Active</p>
                    <h3>{activeUsers}</h3>
                  </div>
                  <div
                    className="pu_awb_icon p-2 border-white rounded-circle"
                    style={{ border: "1px solid white" }}
                  >
                    <MdBubbleChart className="text-white" size={40} />
                  </div>
                </div>
              </div>

              {/* Total Investment */}
              <div className="col-md-6 col-sm-6 col-lg-3 mb-4">
                <div className="pu_analytics_white_box">
                  <div className="pu_awb_details">
                    <p>Total Investment</p>
                    <h3>{monthlyVisitor}</h3>
                  </div>
                  <div
                    className="pu_awb_icon p-2 border-white rounded-circle"
                    style={{ border: "1px solid white" }}
                  >
                    <MdAttachMoney className="text-white" size={40} />
                  </div>
                </div>
              </div>

              {/* Total Income */}
              <div className="col-md-6 col-sm-6 col-lg-3 mb-4">
                <div className="pu_analytics_white_box">
                  <div className="pu_awb_details">
                    <p>Total Income</p>
                    <h3>{monthlyVisitor}</h3>
                  </div>
                  <div
                    className="pu_awb_icon p-2 border-white rounded-circle"
                    style={{ border: "1px solid white" }}
                  >
                    <FaRegMoneyBill1 className="text-white" size={40} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <WithdrawalCards />
          <Report />
          <Table />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
