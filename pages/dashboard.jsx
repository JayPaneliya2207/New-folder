import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { setPageHeading } from "../src/redux/actions/commonAction";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";
import { common } from "../src/helper/Common";
import { FaRegCopy } from "react-icons/fa6";
import { BiSolidBusiness } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { DarkModeContext } from "../src/components/common/darkmodeContext/DarkModeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../styles/pages/Dashboard.module.css";

const Dashboard = () => {
  let dispatch = useDispatch();
  const { darkMoreMainSection, darkModeAllContain, darkMode } =
    useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState("overall");

  useEffect(() => {
    dispatch(
      setPageHeading({
        pageHeading: "PixaURL - Dashboard",
        title: "PixaURL - Dashboard",
      })
    );
  }, [dispatch]);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 50,
    });

    const getCurrentUserdata = () => {
      common.getAPI(
        {
          method: "POST",
          url: "user/getProfile",
          data: {},
        },
        (resp) => {
          console.log("===============", resp);
        }
      );
    };

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="user_pages_container">
      <div
        className={`${
          darkMoreMainSection
            ? "darkMoreMainSection"
            : `${styles.dashboard_hero_section}`
        } `}
      >
        <Breadcrumb>
          <Breadcrumb.Item href="#">/Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <h2 className="mb-2 text-white">Dashboard</h2>
        <div className="row">
          <div className="col-sm-12 col-xl-12">
            <div className={`card ${styles.hero_section} text-white`}>
              <div
                className={`d-flex justify-content-between ${styles.welcome_banner}`}
              >
                <video autoPlay muted loop className={styles.background_video}>
                  <source src="/images/dashboard/dash1.mp4" type="video/mp4" />
                </video>
                <div className={`d-flex`}>
                  <div className="dropdown mt-4 ms-4">
                    <h2 className="mt-2">Dashboard</h2>
                    <p>Welcome to Investment Plan</p>
                    <a href="#" className="btn btn-success">
                      Active
                    </a>
                  </div>
                </div>
                <div className={styles.inner_welcome_banner}>
                  <div className="d-flex">
                    <h5>Profile Status: View Profile</h5>
                    <div className={styles.view_profile}>
                      <Link href={"/user/my_account/profiles"}>
                        <a href="#">View Profile</a>
                      </Link>
                    </div>
                  </div>
                  <h5>My Package</h5>
                  <h4 style={{ color: "green" }}>$ 0</h4>
                  <p>
                    Date Of Joining: <span>2024-07-01 11:58:00</span>
                  </p>
                  <p>
                    Activation Date: <span>2024-07-01 17:28:00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div
            className={`col-12 col-xl-6 col-md-12 col-sm-12 mt-5 ${styles.response_account_section}`}
          >
            <div
              className={`card ${
                darkModeAllContain
                  ? "darkModeAllContain"
                  : `${styles.account_balance}`
              }`}
            >
              <div className={`d-flex ${styles.acc_balance}`}>
                <div>
                  <img
                    src="/images/dashboard/finance.png"
                    alt="img"
                    className={styles.animate_img}
                  />
                </div>
                <div className={`mt-5 ${styles.animate_content}`}>
                  <h1>Account Balance</h1>
                  <h1>Wallet</h1>
                  <p>
                    Profit Wallet: <span>0</span>
                  </p>
                  <p>
                    Fund Wallet: <span>0</span>
                  </p>
                  <div
                    style={{ marginTop: "50px" }}
                    className={styles.response_wallet_btn}
                  >
                    <Link href={"/user/fund/addFund"}>
                      <a href="#" className={styles.wallet_btn}>
                        Buy Fund
                      </a>
                    </Link>

                    <Link href={"/user/topup/topup"}>
                      <a href="#" className={styles.wallet_btn}>
                        Buy Package
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div
              className={styles.dash_animate}
              style={{ position: "relative" }}
            >
              <video autoPlay muted loop className={styles.side_animate_video}>
                <source
                  src="/images/dashboard/sidevideo.mp4"
                  type="video/mp4"
                />
              </video>
              <div className={styles.affiliate_refer_card}>
                <div className="card-body">
                  <div className="refreal_data_links">
                    <h3 className="text-white">Referral Link</h3>
                    <div className={styles.wallet_input}>
                      <input
                        type="text"
                        className="form-control linkToCopy"
                        value="https://mlmsoftwaredeveloper.com/demo/investment_roi/register?ref=companyname&position=1"
                        readOnly
                      />
                      <button
                        className={styles.copyButton}
                        onClick={() =>
                          copyToClipboard(
                            "https://mlmsoftwaredeveloper.com/demo/investment_roi/register?ref=companyname&position=1"
                          )
                        }
                      >
                        <FaRegCopy />
                      </button>
                    </div>
                    <div className={styles.wallet_input}>
                      <input
                        type="text"
                        className="form-control linkToCopy"
                        value="https://mlmsoftwaredeveloper.com/demo/investment_roi/register?ref=companyname&position=2"
                        readOnly
                      />
                      <button
                        className={styles.copyButton}
                        onClick={() =>
                          copyToClipboard(
                            "https://mlmsoftwaredeveloper.com/demo/investment_roi/register?ref=companyname&position=2"
                          )
                        }
                      >
                        <FaRegCopy />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 col-xl-4 mt-4" data-aos="zoom-in">
            <div className={`card ${styles.statistics_card_1} overflow-hidden`}>
              <div className={`card-body ${styles.card_blur_section}`}>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 ms-3">
                    <h3 className="mb-0 text-white">Total Business</h3>
                  </div>
                  <div className={styles.card_icon_section}>
                    <BiSolidBusiness className={styles.card_icon} />
                  </div>
                </div>
                <div className={styles.card_section}>
                  <div className={styles.dash_underline}></div>
                  <div className="row g-3 text-center">
                    <div className="col-6">
                      <h3 className="mb-0 text-white">₹ 0</h3>
                    </div>
                    <div className="col-6 border-start">
                      <h4 className="mb-0 text-white">Today Business:</h4>
                      <h5 className="mb-0 text-white">₹ 0</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 mt-4" data-aos="fade-up">
            <div className={`card ${styles.statistics_card_2} overflow-hidden`}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 ms-3">
                    <h3 className="mb-0 text-white">Total Team</h3>
                  </div>
                  <div className={styles.card_icon_section}>
                    <RiTeamFill className={styles.card_icon} />
                  </div>
                </div>
                <div className={styles.card_section}>
                  <div className={styles.dash_underline}></div>
                  <div className="row g-3 text-center">
                    <div className="col-6">
                      <h3 className="mb-0 text-white">₹ 0</h3>
                    </div>
                    <div className="col-6 border-start">
                      <h4 className="mb-0 text-white">Active Team:</h4>
                      <h5 className="mb-0 text-white">₹ 0</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 mt-4" data-aos="zoom-in-up">
            <div className={`card ${styles.statistics_card_3} overflow-hidden`}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 ms-3">
                    <h3 className="mb-0 text-white">Total Income</h3>
                  </div>
                  <div className={styles.card_icon_section}>
                    <p className={styles.card_icon}>$</p>
                  </div>
                </div>
                <div className={styles.card_section}>
                  <div className={styles.dash_underline}></div>
                  <div className="row g-3 text-center">
                    <div className="col-6">
                      <h3 className="mb-0 text-white">₹ 0</h3>
                    </div>
                    <div className="col-6 border-start">
                      <h4 className="mb-0 text-white">Today Incom:</h4>
                      <h5 className="mb-0 text-white">₹ 0</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-4 mt-4" data-aos="zoom-in">
            <div className={`card ${styles.statistics_card_3} overflow-hidden`}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 ms-3">
                    <h3 className="mb-0 text-white">Weekly ROI</h3>
                  </div>
                  <div className={styles.card_icon_section}></div>
                </div>
                <div className={styles.card_section}>
                  <div className={styles.dash_underline}></div>
                  <div className="row g-3 text-center">
                    <div className="col-6">
                      <h3 className="mb-0 text-white">₹ 0</h3>
                    </div>
                    <div className="col-6 border-start">
                      <h4 className="mb-0 text-white">Today :</h4>
                      <h5 className="mb-0 text-white">₹ 0</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 mt-4" data-aos="fade-up">
            <div className={`card ${styles.statistics_card_2} overflow-hidden`}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 ms-3">
                    <h3 className="mb-0 text-white">Direct Income</h3>
                  </div>
                  <div className={styles.card_icon_section}>
                    <p className={styles.card_icon}>$</p>
                  </div>
                </div>
                <div className={styles.card_section}>
                  <div className={styles.dash_underline}></div>
                  <div className="row g-3 text-center">
                    <div className="col-6">
                      <h3 className="mb-0 text-white">₹ 0</h3>
                    </div>
                    <div className="col-6 border-start">
                      <h4 className="mb-0 text-white">Today :</h4>
                      <h5 className="mb-0 text-white">₹ 0</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 mt-4" data-aos="zoom-in-up">
            <div className={`card ${styles.statistics_card_1} overflow-hidden`}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 ms-3">
                    <h3 className="mb-0 text-white">Direct Bonanza</h3>
                  </div>
                  <div className={styles.card_icon_section}></div>
                </div>
                <div className={styles.card_section}>
                  <div className={styles.dash_underline}></div>
                  <div className="row g-3 text-center">
                    <div className="col-6">
                      <h3 className="mb-0 text-white">₹ 0</h3>
                    </div>
                    <div className="col-6 border-start">
                      <h4 className="mb-0 text-white">Today :</h4>
                      <h5 className="mb-0 text-white">₹ 0</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-4 mt-4" data-aos="zoom-in">
            <div className={`card ${styles.statistics_card_1} overflow-hidden`}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 ms-3">
                    <h3 className="mb-0 text-white">Voucher Income</h3>
                  </div>
                  <div className={styles.card_icon_section}>
                    <BiSolidBusiness className={styles.card_icon} />
                  </div>
                </div>
                <div className={styles.card_section}>
                  <div className={styles.dash_underline}></div>
                  <div className="row g-3 text-center">
                    <div className="col-6">
                      <h3 className="mb-0 text-white">₹ 0</h3>
                    </div>
                    <div className="col-6 border-start">
                      <h4 className="mb-0 text-white">Today :</h4>
                      <h5 className="mb-0 text-white">₹ 0</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 mt-4" data-aos="zoom-in-up">
            <div className={`card ${styles.statistics_card_3} overflow-hidden`}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 ms-3">
                    <h3 className="mb-0 text-white">Matching</h3>
                  </div>
                  <div className={styles.card_icon_section}>
                    <BiSolidBusiness className={styles.card_icon} />
                  </div>
                </div>
                <div className={styles.card_section}>
                  <div className={styles.dash_underline}></div>
                  <div className="row g-3 text-center">
                    <div className="col-6">
                      <h3 className="mb-0 text-white">₹ 0</h3>
                    </div>
                    <div className="col-6 border-start">
                      <h4 className="mb-0 text-white">Today:</h4>
                      <h5 className="mb-0 text-white">₹ 0</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3" data-aos="fade-up">
            <div
              className={`card col-md-8 mt-4 m-2 ${
                darkMode ? "dark_mode_container" : `${styles.team_section}`
              } `}
            >
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h3 className="mb-0 text-white">Team Section</h3>
                </div>
                <div className="row g-3">
                  <div className={`col-md-6 col-xxl-6 ${styles.team_border}`}>
                    <div
                      className={`p-3 pt-4 rounded-4  ${styles.team_border1}`}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0 text-white">Total Directs</p>
                        <p className="mb-0 text-white">0</p>
                      </div>
                    </div>
                  </div>
                  <div className={`col-md-6 col-xxl-6 ${styles.team_border}`}>
                    <div
                      className={`p-3 pt-4 rounded-4  ${styles.team_border1}`}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0 text-white">Active Directs</p>
                        <p className="mb-0 text-white">0</p>
                      </div>
                    </div>
                  </div>
                  <div className={`col-md-6 col-xxl-6 ${styles.team_border}`}>
                    <div
                      className={`p-3 pt-4 rounded-4  ${styles.team_border1}`}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0 text-white">Inactive Directs</p>
                        <p className="mb-0 text-white">0</p>
                      </div>
                    </div>
                  </div>
                  <div className={`col-md-6 col-xxl-6 ${styles.team_border}`}>
                    <div
                      className={`p-3 pt-4 rounded-4  ${styles.team_border1}`}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0 text-white">Total generation</p>
                        <p className="mb-0 text-white">0</p>
                      </div>
                    </div>
                  </div>
                  <div className={`col-md-6 col-xxl-6 ${styles.team_border}`}>
                    <div
                      className={`p-3 pt-4 rounded-4  ${styles.team_border1}`}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0 text-white">Active generation</p>
                        <p className="mb-0 text-white">0</p>
                      </div>
                    </div>
                  </div>
                  <div className={`col-md-6 col-xxl-6 ${styles.team_border}`}>
                    <div
                      className={`p-3 pt-4 rounded-4  ${styles.team_border1}`}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0 text-white">Left team</p>
                        <p className="mb-0 text-white">0</p>
                      </div>
                    </div>
                  </div>
                  <div className={`col-md-6 col-xxl-6 ${styles.team_border}`}>
                    <div
                      className={`p-3 pt-4 rounded-4  ${styles.team_border1}`}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0 text-white">Right team</p>
                        <p className="mb-0 text-white">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`card col-md-3  m-4 ${
                darkMode ? "dark_mode_container" : `${styles.wallet_sec}`
              }`}
            >
              <div className={`card-body`}>
                <div
                  className={`row g-3 text-center d-sm-block ${styles.finance_section}`}
                >
                  <div className="col-6 col-sm-12" data-aos="zoom-out">
                    <div className={`card ${styles.e_wallet_images}`}>
                      <div className="card-body">
                        <div className="e_wallet_data">
                          <div>
                            <img
                              src="/images/dashboard/withdraw.png"
                              className={styles.withdrwalimg}
                            />
                          </div>
                          <div className="e_wallet">Total withdrawal</div>
                          <h5 className="wallet_income_1">$&nbsp;0 </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-sm-12" data-aos="zoom-in">
                    <div className={`card ${styles.e_wallet_images1}`}>
                      <div className="card-body">
                        <div className="e_wallet_data">
                          <div>
                            <img
                              src="/images/dashboard/transfer.png"
                              className={styles.recivedimg}
                            />
                          </div>
                          <div className="e_wallet">Recevied Withdrawal </div>
                          <h5 className="wallet_income_2">$&nbsp;0 </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-sm-12" data-aos="zoom-out">
                    <div className={`card ${styles.e_wallet_images2}`}>
                      <div className="card-body">
                        <div className="e_wallet_data">
                          <div>
                            <img
                              src="/images/dashboard/deposit.png"
                              className={styles.pendingimg}
                            />
                          </div>
                          <div className="e_wallet">Pending Withdrawal</div>
                          <h5 className="wallet_income_3">$&nbsp;0 </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`col-xl-12 col-md-12 mt-4`} data-aos="fade-up">
          <div className="sidebar_desc">
            <div className="row">
              <div
                className={`card affiliate_refer_card ${
                  darkMode ? "dark_mode_container" : `${styles.earning_section}`
                }`}
              >
                <div className={`card-body`}>
                  <div className="col-12 ">
                    <div className="refreal_data_links">
                      <h3 className={styles.earning_header}>Latest Earnings</h3>
                      <div className={styles.recent_data_eraning}>
                        <div
                          className={`col-xxl-3 col-md-3 col-sm-12 ${styles.dash_earning_border}`}
                          data-aos="zoom-in"
                        >
                          <div className={`${styles.earning_border}`}>
                            <h4>Data</h4>
                            <div className="border-start"></div>
                            <h4>0</h4>
                          </div>
                        </div>
                        <div
                          className={`col-md-3 col-xxl-3 ${styles.dash_earning_border}`}
                          data-aos="fade-down"
                        >
                          <div className={`${styles.earning_border}`}>
                            <h4>Amount type</h4>
                            <div className="border-start"></div>
                            <h4>0</h4>
                          </div>
                        </div>
                        <div
                          className={`col-md-3 col-xxl-3 ${styles.dash_earning_border}`}
                          data-aos="zoom-in-up"
                        >
                          <div className={`${styles.earning_border}`}>
                            <h4>Total amount</h4>
                            <div className="border-start"></div>
                            <h4>0</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`col-xl-12 col-md-12 mt-5`} data-aos="fade-up">
          <div
            className={`card ${
              darkMode
                ? `${styles.darkmode_dash_tab_body}`
                : `${styles.dash_tab_body}`
            }`}
          >
            <div className="d-flex mb-4">
              {/* Tab Buttons */}
              <div
                className={`${styles.tab_button} ${
                  activeTab === "overall" ? `${styles.active}` : ""
                }`}
                onClick={() => setActiveTab("overall")}
                style={{ cursor: "pointer", padding: "10px" }}
              >
                Overall
              </div>
              <div
                className={`${styles.tab_button} ${
                  activeTab === "binary" ? `${styles.active}` : ""
                }`}
                onClick={() => setActiveTab("binary")}
                style={{ cursor: "pointer", padding: "10px" }}
              >
                Binary
              </div>
              <div
                className={`${styles.tab_button} ${
                  activeTab === "news" ? `${styles.active}` : ""
                }`}
                onClick={() => setActiveTab("news")}
                style={{ cursor: "pointer", padding: "10px" }}
              >
                News
              </div>
            </div>

            {/* Tab Panels */}
            <div className="card-body">
              {activeTab === "overall" && (
                <div className={styles.tab_panel}>
                  <p data-aos="zoom-in">
                    <strong>Total Income:</strong> 1770.5000
                  </p>
                  <p data-aos="zoom-in">
                    <strong>Main Wallet:</strong> 820.5
                  </p>
                  <p data-aos="zoom-in">
                    <strong>Fund Wallet:</strong> 184.2
                  </p>
                  <p data-aos="zoom-in">
                    <strong>Total Withdrawal:</strong> 950
                  </p>
                </div>
              )}

              {activeTab === "binary" && (
                <div className={styles.tab_panel}>
                  <p data-aos="zoom-in">
                    <strong>Matching:</strong> 9700
                  </p>
                  <p data-aos="zoom-in">
                    <strong>Carry:</strong> 300
                  </p>
                  <p data-aos="zoom-in">
                    <strong>Flash:</strong> 00
                  </p>
                </div>
              )}

              {activeTab === "news" && (
                <div className={styles.tab_panel}>
                  <p data-aos="zoom-in">Latest updates and news.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 mt-5" data-aos="fade-up">
          <div
            className={`card table-card ${
              darkMode ? "dark_mode_container" : `${styles.table_section}`
            }`}
          >
            <div
              className={`card-header bg-info d-flex align-items-center justify-content-between py-3 ${
                darkMode ? "dark_mode" : `${styles.dash_table_heading}`
              }`}
            >
              <div className="d-flex justify-content-center">
                <img
                  src="/images/dashboard/winner.png"
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
                <h3
                  className=" text-white"
                  style={{ fontSize: "38px", marginTop: "30px" }}
                >
                  Award, Reward & Tour
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover" id="pc-dt-simple">
                  <thead>
                    <tr className="border-bottom border-primary">
                      <th>Rank</th>
                      <th>Self Package</th>
                      <th>Direct Business</th>
                      <th>Team Business</th>
                      <th>Required Directs</th>
                      <th>Award</th>
                      <th>Rewards</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-bottom border-success">
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">Gain</h6>
                          </div>
                        </div>
                      </td>
                      <td>$</td>
                      <td>$</td>
                      <td>$</td>
                      <td> </td>
                      <td>$ ()</td>
                      <td>%</td>
                      <td>
                        <button className="btn btn-success">Archived</button>
                      </td>
                    </tr>
                    <tr className="border-bottom border-danger">
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">Allowance</h6>
                          </div>
                        </div>
                      </td>
                      <td>$</td>
                      <td>$</td>
                      <td>$</td>
                      <td> </td>
                      <td>$ ()</td>
                      <td>%</td>
                      <td>
                        <button className="btn btn-success">Archived</button>
                      </td>
                    </tr>
                    <tr className="border-bottom border-warning">
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">Proceed</h6>
                          </div>
                        </div>
                      </td>
                      <td>$</td>
                      <td>$</td>
                      <td>$</td>
                      <td> </td>
                      <td>$ ()</td>
                      <td>%</td>
                      <td>
                        <button className="btn btn-success">Archived</button>
                      </td>
                    </tr>
                    <tr className="border-bottom border-info">
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">Premium</h6>
                          </div>
                        </div>
                      </td>
                      <td>$</td>
                      <td>$</td>
                      <td>$</td>
                      <td> </td>
                      <td>$ ()</td>
                      <td>%</td>
                      <td>
                        <button className="btn btn-success">Archived</button>
                      </td>
                    </tr>
                    <tr className="border-bottom border-success">
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">SAPPHIRE</h6>
                          </div>
                        </div>
                      </td>
                      <td>$</td>
                      <td>$</td>
                      <td>$</td>
                      <td> </td>
                      <td>$ ()</td>
                      <td>%</td>
                      <td>
                        <button className="btn btn-success">Archived</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
