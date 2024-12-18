/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { resetCreateLinkDataACT } from "../../../redux/actions/commonAction";

import { SubMenu, Menu, MenuItem } from "react-pro-sidebar";
import {
  FaNetworkWired,
  FaUserNurse,
  FaProductHunt,
  FaHospital,
  FaClosedCaptioning,
  FaRegistered,
  FaBloggerB,
} from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { logoutAdmin } from "../../../redux/actions/authAction";
import { RiAiGenerate } from "react-icons/ri";
import { SiWikimediafoundation } from "react-icons/si";
import { HiSupport } from "react-icons/hi";
import { FaPhone, FaRankingStar } from "react-icons/fa6";
import { SiPowerapps } from "react-icons/si";
import { IoGiftSharp } from "react-icons/io5";
import { LiaGiftsSolid } from "react-icons/lia";
import { GiVerticalBanner } from "react-icons/gi";
import { ImNewspaper } from "react-icons/im";
import {
  MdOutlineBorderStyle,
  MdMonetizationOn,
  MdCreditScore,
  MdStarRate,
  MdOutlineFeaturedVideo,
  MdOutlineOndemandVideo,
  MdCircleNotifications,
  MdBackup,
  MdAdminPanelSettings,
} from "react-icons/md";
import { GiPayMoney, GiAchievement } from "react-icons/gi";

import { IoMdSettings, IoMdVideocam, IoMdNotifications } from "react-icons/io";
import { BsFillKeyFill } from "react-icons/bs";
import { RiHome4Line, RiUserFollowLine } from "react-icons/ri";
import { AiOutlineLogout, AiOutlineTransaction } from "react-icons/ai";
import { TbEyePin, TbFileReport } from "react-icons/tb";
import Link from "next/link";
const Sidebarmenu = ({ toggleSidebar, isSidebarVisible }) => {
  let dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [hovered, setHovered] = useState(null);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleSubMenuToggle = (label) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  const handleHover = (index) => {
    setHovered(index);
  };

  const handleLeave = () => {
    setHovered(null);
  };

  useEffect(() => {
    dispatch(resetCreateLinkDataACT(true));
  }, []);
  return (
    <aside className={styles.admin_sidebar_section}>
      <div className={`${styles.sidebarHeader} text-white text-center`}>
        <img
          src="/images/twa.png"
          alt="logo"
          className="logo_section img-fluid"
          style={{ maxWidth: "100px" }}
        />
      </div>
      <main>
        <Menu style={{ color: "#7f9bcc" }}>
          <Link href="/admin/dashboard" passHref>
            <MenuItem
              icon={<RiHome4Line />}
              style={{
                color: hovered === 1 ? "White" : "White",
                backgroundColor:
                  hovered === 1 ? "rgba(255, 255, 255, 0.15)" : "transparent",
                fontSize: "16px",
              }}
              onMouseEnter={() => handleHover(1)}
              onMouseLeave={handleLeave}
            >
              Dashboard
            </MenuItem>
          </Link>
          <SubMenu
            label={"Users"}
            icon={<RiUserFollowLine />}
            open={openSubMenus["Users"]}
            onClick={() => handleSubMenuToggle("Users")}
            style={{
              color: hovered === 2 ? "White" : "white",
              backgroundColor:
                hovered === 2 ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontSize: "16px",
            }}
            onMouseEnter={() => handleHover(2)}
            onMouseLeave={handleLeave}
          >
            <Link href="/admin/users/alluser" passHref>
              <MenuItem
                style={{
                  color: hovered === 16 ? "White" : "white",
                  backgroundColor:
                    hovered === 16 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(16)}
                onMouseLeave={handleLeave}
              >
                All Users
              </MenuItem>
            </Link>
          </SubMenu>
          <SubMenu
            label={"KYC"}
            icon={<FaUserNurse />}
            open={openSubMenus["KYC"]}
            onClick={() => handleSubMenuToggle("KYC")}
            style={{
              color: hovered === 39 ? "White" : "white",
              backgroundColor:
                hovered === 39 ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontSize: "16px",
            }}
            onMouseEnter={() => handleHover(39)}
            onMouseLeave={handleLeave}
          >
            <Link href="/admin/kyc/all-kyc" passHref>
              <MenuItem
                style={{
                  color: hovered === 401 ? "White" : "white",
                  backgroundColor:
                    hovered === 40 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(40)}
                onMouseLeave={handleLeave}
              >
                All kyc status
              </MenuItem>
            </Link>
            <Link href="/admin/kyc/approved-kyc" passHref>
              <MenuItem
                style={{
                  color: hovered === 41 ? "White" : "white",
                  backgroundColor:
                    hovered === 41 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(41)}
                onMouseLeave={handleLeave}
              >
                Approved
              </MenuItem>
            </Link>
            <Link href="/admin/kyc/cancelled-kyc" passHref>
              <MenuItem
                style={{
                  color: hovered === 42 ? "White" : "white",
                  backgroundColor:
                    hovered === 42 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(42)}
                onMouseLeave={handleLeave}
              >
                Cancelled
              </MenuItem>
            </Link>
          </SubMenu>
          <SubMenu
            label={"Network"}
            icon={<FaNetworkWired />}
            open={openSubMenus["Network"]}
            onClick={() => handleSubMenuToggle("Network")}
            style={{
              color: hovered === 3 ? "White" : "white",
              backgroundColor:
                hovered === 3 ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontSize: "16px",
            }}
            onMouseEnter={() => handleHover(3)}
            onMouseLeave={handleLeave}
          >
            <Link href="/admin/team/team-generation" passHref>
              <MenuItem
                style={{
                  color: hovered === 17 ? "White" : "white",
                  backgroundColor:
                    hovered === 17 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(17)}
                onMouseLeave={handleLeave}
              >
                Generation Team
              </MenuItem>
            </Link>
            <Link href="/admin/team/team_tree" passHref>
              <MenuItem
                style={{
                  color: hovered === 18 ? "White" : "white",
                  backgroundColor:
                    hovered === 18 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(18)}
                onMouseLeave={handleLeave}
              >
                Tree
              </MenuItem>
            </Link>
            {/* <MenuItem
              style={{
                color: hovered === 43 ? "White" : "white",
                backgroundColor: hovered === 43 ? "rgb(83 98 123)" : "#172b4d",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={() => handleHover(43)}
              onMouseLeave={handleLeave}
            >
              <Link href="/admin/team/matrix" passHref>
                <a style={{ color: "inherit", textDecoration: "none" }}>
                  Matrix
                </a>
              </Link>
            </MenuItem> */}
          </SubMenu>
          <SubMenu
            label={"Franchise"}
            icon={<FaNetworkWired />}
            open={openSubMenus["Franchise"]}
            onClick={() => handleSubMenuToggle("Franchise")}
            style={{
              color: hovered === 95 ? "White" : "white",
              backgroundColor:
                hovered === 95 ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontSize: "16px",
            }}
            onMouseEnter={() => handleHover(95)}
            onMouseLeave={handleLeave}
          >
            <Link href="/admin/franchise/addFranchise" passHref>
              <MenuItem
                style={{
                  color: hovered === 94 ? "White" : "white",
                  backgroundColor:
                    hovered === 94 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(94)}
                onMouseLeave={handleLeave}
              >
                Add Franchise
              </MenuItem>
            </Link>
            <Link href="/admin/franchise/franchiseDetails" passHref>
              <MenuItem
                style={{
                  color: hovered === 96 ? "White" : "white",
                  backgroundColor:
                    hovered === 96 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(96)}
                onMouseLeave={handleLeave}
              >
                Franchise Details
              </MenuItem>
            </Link>
            <Link href="/admin/franchise/Pendingstock" passHref>
              <MenuItem
                style={{
                  color: hovered === 97 ? "White" : "white",
                  backgroundColor:
                    hovered === 97 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(97)}
                onMouseLeave={handleLeave}
              >
                Franchise Pending Stock
              </MenuItem>
            </Link>
            <Link href="/admin/franchise/franchisePurchase" passHref>
              <MenuItem
                style={{
                  color: hovered === 98 ? "White" : "white",
                  backgroundColor:
                    hovered === 98 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(98)}
                onMouseLeave={handleLeave}
              >
                Franchise Purchase
              </MenuItem>
            </Link>
            <Link href="/admin/franchise/OrderHistory" passHref>
              <MenuItem
                style={{
                  color: hovered === 99 ? "White" : "white",
                  backgroundColor:
                    hovered === 99 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(99)}
                onMouseLeave={handleLeave}
              >
                Repurchase Order History
              </MenuItem>
            </Link>
            <Link href="/admin/franchise/SaleProduct" passHref>
              <MenuItem
                style={{
                  color: hovered === 100 ? "White" : "white",
                  backgroundColor:
                    hovered === 100 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(100)}
                onMouseLeave={handleLeave}
              >
                Sale Product
              </MenuItem>
            </Link>
            <Link href="/admin/franchise/paidPayout" passHref>
              <MenuItem
                style={{
                  color: hovered === 101 ? "White" : "white",
                  backgroundColor:
                    hovered === 101 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(101)}
                onMouseLeave={handleLeave}
              >
                Paid Payout
              </MenuItem>
            </Link>
            <Link href="/admin/franchise/PendingPayout" passHref>
              <MenuItem
                style={{
                  color: hovered === 102 ? "White" : "white",
                  backgroundColor:
                    hovered === 102 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(102)}
                onMouseLeave={handleLeave}
              >
                Pending Payout
              </MenuItem>
            </Link>
            <Link href="/admin/franchise/FranchisePending" passHref>
              <MenuItem
                style={{
                  color: hovered === 103 ? "White" : "white",
                  backgroundColor:
                    hovered === 103 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(103)}
                onMouseLeave={handleLeave}
              >
                Franchise Withdrawal Pending
              </MenuItem>
            </Link>
            <Link href="/admin/franchise/FranchiseApproved" passHref>
              <MenuItem
                style={{
                  color: hovered === 104 ? "White" : "white",
                  backgroundColor:
                    hovered === 104 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(104)}
                onMouseLeave={handleLeave}
              >
                Franchise Withdrawal Approved
              </MenuItem>
            </Link>
            {/* <MenuItem
              style={{
                color: hovered === 43 ? "White" : "white",
                backgroundColor: hovered === 43 ? "rgb(83 98 123)" : "#172b4d",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={() => handleHover(43)}
              onMouseLeave={handleLeave}
            >
              <Link href="/admin/team/matrix" passHref>
                <a style={{ color: "inherit", textDecoration: "none" }}>
                  Matrix
                </a>
              </Link>
            </MenuItem> */}
          </SubMenu>
          <SubMenu
            label={"E-Pin"}
            icon={<TbEyePin />}
            open={openSubMenus["E-Pin"]}
            onClick={() => handleSubMenuToggle("E-Pin")}
            style={{
              color: hovered === 46 ? "White" : "white",
              backgroundColor:
                hovered === 46 ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontSize: "16px",
            }}
            onMouseEnter={() => handleHover(46)}
            onMouseLeave={handleLeave}
          >
            <Link href="/admin/pin/sendPin" passHref>
              <MenuItem
                style={{
                  color: hovered === 47 ? "White" : "white",
                  backgroundColor:
                    hovered === 47 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(47)}
                onMouseLeave={handleLeave}
              >
                Send
              </MenuItem>
            </Link>
            <Link href="/admin/pin/retrieve" passHref>
              <MenuItem
                style={{
                  color: hovered === 48 ? "White" : "white",
                  backgroundColor:
                    hovered === 48 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(48)}
                onMouseLeave={handleLeave}
              >
                Pin Retrieve
              </MenuItem>
            </Link>
            <Link href="/admin/pin/retrieveHistory" passHref>
              <MenuItem
                style={{
                  color: hovered === 49 ? "White" : "white",
                  backgroundColor:
                    hovered === 49 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(49)}
                onMouseLeave={handleLeave}
              >
                Pin Retrieve History
              </MenuItem>
            </Link>
            <Link href="/admin/pin/pinHistory" passHref>
              <MenuItem
                style={{
                  color: hovered === 50 ? "White" : "white",
                  backgroundColor:
                    hovered === 50 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(50)}
                onMouseLeave={handleLeave}
              >
                History
              </MenuItem>
            </Link>
            <Link href="/admin/pin/pinBox" passHref>
              <MenuItem
                style={{
                  color: hovered === 51 ? "White" : "white",
                  backgroundColor:
                    hovered === 51 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(51)}
                onMouseLeave={handleLeave}
              >
                Pin Box
              </MenuItem>
            </Link>
            <Link href="/admin/pin/package" passHref>
              <MenuItem
                style={{
                  color: hovered === 52 ? "White" : "white",
                  backgroundColor:
                    hovered === 52 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(52)}
                onMouseLeave={handleLeave}
              >
                All
              </MenuItem>
            </Link>
            <Link href="/admin/pin/GeneratePin" passHref>
              <MenuItem
                style={{
                  color: hovered === 56 ? "White" : "white",
                  backgroundColor:
                    hovered === 56 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(56)}
                onMouseLeave={handleLeave}
              >
                Create
              </MenuItem>
            </Link>
            <Link href="/admin/pin/pendingPin" passHref>
              <MenuItem
                style={{
                  color: hovered === 53 ? "White" : "white",
                  backgroundColor:
                    hovered === 53 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(53)}
                onMouseLeave={handleLeave}
              >
                Epin Request Pending
              </MenuItem>
            </Link>
            <Link href="/admin/pin/approvePin" passHref>
              <MenuItem
                style={{
                  color: hovered === 54 ? "White" : "white",
                  backgroundColor:
                    hovered === 54 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(54)}
                onMouseLeave={handleLeave}
              >
                Epin Request Approved
              </MenuItem>
            </Link>
            <Link href="/admin/pin/cancelledPin" passHref>
              <MenuItem
                style={{
                  color: hovered === 55 ? "White" : "white",
                  backgroundColor:
                    hovered === 55 ? "rgb(83 98 123)" : "#172b4d",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={() => handleHover(55)}
                onMouseLeave={handleLeave}
              >
                Epin Request Cancelled
              </MenuItem>
            </Link>
          </SubMenu>
          <SubMenu
            label={"Withdrawal"}
            icon={<BiMoneyWithdraw />}
            open={openSubMenus["Withdrawal"]}
            onClick={() => handleSubMenuToggle("Withdrawal")}
            style={{
              color: hovered === 4 ? "White" : "white",
              backgroundColor:
                hovered === 4 ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontSize: "16px",
            }}
            onMouseEnter={() => handleHover(4)}
            onMouseLeave={handleLeave}
          >
            <Link href="/admin/withdrawal/pending" passHref>
              <MenuItem
                style={{
                  color: hovered === 19 ? "White" : "white",
                  backgroundColor:
                    hovered === 19 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(19)}
                onMouseLeave={handleLeave}
              >
                Pending
              </MenuItem>
            </Link>
            <Link href="/admin/withdrawal/approved" passHref>
              <MenuItem
                style={{
                  color: hovered === 20 ? "White" : "white",
                  backgroundColor:
                    hovered === 20 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(20)}
                onMouseLeave={handleLeave}
              >
                Approved
              </MenuItem>
            </Link>
            <Link href="/admin/withdrawal/cancelled" passHref>
              <MenuItem
                style={{
                  color: hovered === 21 ? "White" : "white",
                  backgroundColor:
                    hovered === 21 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(21)}
                onMouseLeave={handleLeave}
              >
                Cancelled
              </MenuItem>
            </Link>
          </SubMenu>
          <Link href="/admin/orders/order" passHref>
            <MenuItem
              icon={<MdOutlineBorderStyle />}
              style={{
                color: hovered === 5 ? "White" : "white",
                backgroundColor:
                  hovered === 5 ? "rgba(255, 255, 255, 0.15)" : "transparent",
                fontSize: "16px",
              }}
              onMouseEnter={() => handleHover(5)}
              onMouseLeave={handleLeave}
            >
              {" "}
              Orders
            </MenuItem>
          </Link>
          <Link href="/admin/income" passHref>
            <MenuItem
              icon={<MdMonetizationOn />}
              style={{
                color: hovered === 6 ? "White" : "white",
                backgroundColor:
                  hovered === 6 ? "rgba(255, 255, 255, 0.15)" : "transparent",
                fontSize: "16px",
              }}
              onMouseEnter={() => handleHover(6)}
              onMouseLeave={handleLeave}
            >
              Income
            </MenuItem>
          </Link>
          <SubMenu
            label={"Fund"}
            icon={<SiWikimediafoundation />}
            open={openSubMenus["Fund"]}
            onClick={() => handleSubMenuToggle("Fund")}
            style={{
              color: hovered === 9 ? "White" : "white",
              backgroundColor:
                hovered === 9 ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontSize: "16px",
            }}
            onMouseEnter={() => handleHover(9)}
            onMouseLeave={handleLeave}
          >
            <Link href="/admin/fund/addFund" passHref>
              <MenuItem
                style={{
                  color: hovered === 22 ? "white" : "white",
                  backgroundColor:
                    hovered === 22 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(22)}
                onMouseLeave={handleLeave}
              >
                {" "}
                Add Fund
              </MenuItem>
            </Link>
            <Link href="/admin/fund/transferHistory" passHref>
              <MenuItem
                style={{
                  color: hovered === 23 ? "White" : "white",
                  backgroundColor:
                    hovered === 23 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(23)}
                onMouseLeave={handleLeave}
              >
                Transfer Fund History
              </MenuItem>
            </Link>
            <Link href="/admin/fund/fundRetrieve" passHref>
              <MenuItem
                style={{
                  color: hovered === 24 ? "White" : "white",
                  backgroundColor:
                    hovered === 24 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(24)}
                onMouseLeave={handleLeave}
              >
                {" "}
                Retrieve Fund
              </MenuItem>
            </Link>
            <Link href="/admin/fund/fundRetrieveHistory" passHref>
              <MenuItem
                style={{
                  color: hovered === 125 ? "White" : "white",
                  backgroundColor:
                    hovered === 125 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(125)}
                onMouseLeave={handleLeave}
              >
                {" "}
                Retrieve Fund History
              </MenuItem>
            </Link>
            <Link href="/admin/fund/pending" passHref>
              <MenuItem
                style={{
                  color: hovered === 25 ? "White" : "white",
                  backgroundColor:
                    hovered === 25 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(25)}
                onMouseLeave={handleLeave}
              >
                {" "}
                Pending Fund Request
              </MenuItem>
            </Link>
            <Link href="/admin/fund/approved" passHref>
              <MenuItem
                style={{
                  color: hovered === 26 ? "White" : "white",
                  backgroundColor:
                    hovered === 26 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(26)}
                onMouseLeave={handleLeave}
              >
                Approved Fund Request
              </MenuItem>
            </Link>
            <Link href="/admin/fund/cancelled" passHref>
              <MenuItem
                style={{
                  color: hovered === 27 ? "White" : "white",
                  backgroundColor:
                    hovered === 27 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(27)}
                onMouseLeave={handleLeave}
              >
                {" "}
                Cancelled Fund Request
              </MenuItem>
            </Link>
            {/* <Link href="/admin/fund/fundConvert" passHref>
              <MenuItem
                style={{
                  color: hovered === 44 ? "White" : "white",
                  backgroundColor:
                    hovered === 44 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(44)}
                onMouseLeave={handleLeave}
              >
                Fund Convert
              </MenuItem>
            </Link> */}
            {/* <Link href="/admin/fund/fundConvertHistory" passHref>
              <MenuItem
                style={{
                  color: hovered === 45 ? "White" : "white",
                  backgroundColor:
                    hovered === 45 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(45)}
                onMouseLeave={handleLeave}
              >
                Fund Convert History
              </MenuItem>
            </Link> */}
          </SubMenu>

          <SubMenu
            label={"Dummy Power"}
            icon={<SiPowerapps />}
            open={openSubMenus["Dummy Power"]}
            onClick={() => handleSubMenuToggle("Dummy Power")}
            style={{
              color: hovered === 10 ? "White" : "white",
              backgroundColor:
                hovered === 10 ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontSize: "16px",
            }}
            onMouseEnter={() => handleHover(10)}
            onMouseLeave={handleLeave}
          >
            <Link href="/admin/dummyPower/carry" passHref>
              <MenuItem
                style={{
                  color: hovered === 28 ? "White" : "white",
                  backgroundColor:
                    hovered === 28 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(28)}
                onMouseLeave={handleLeave}
              >
                {" "}
                Add Dummy Power
              </MenuItem>
            </Link>
            <Link href="/admin/dummyPower/carryDetail" passHref>
              <MenuItem
                style={{
                  color: hovered === 29 ? "White" : "white",
                  backgroundColor:
                    hovered === 29 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(29)}
                onMouseLeave={handleLeave}
              >
                {" "}
                Dummy Power Detail
              </MenuItem>
            </Link>
          </SubMenu>
          <SubMenu
            style={{
              color: hovered === 11 ? "White" : "white",
              backgroundColor:
                hovered === 11 ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontSize: "16px",
            }}
            onMouseEnter={() => handleHover(11)}
            onMouseLeave={handleLeave}
            label={"Support"}
            icon={<HiSupport />}
            open={openSubMenus["Support"]}
            onClick={() => handleSubMenuToggle("Support")}
          >
            <Link href="/admin/support/pendingSupport" passHref>
              <MenuItem
                style={{
                  color: hovered === 30 ? "White" : "white",
                  backgroundColor:
                    hovered === 30 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(30)}
                onMouseLeave={handleLeave}
              >
                Pending
              </MenuItem>
            </Link>
            <Link href="/admin/support/approvedSupport" passHref>
              <MenuItem
                style={{
                  color: hovered === 31 ? "White" : "white",
                  backgroundColor:
                    hovered === 31 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(31)}
                onMouseLeave={handleLeave}
              >
                Approved
              </MenuItem>
            </Link>
          </SubMenu>
          <Link href="/admin/contact/contact-us" passHref>
            <MenuItem
              icon={<FaPhone />}
              style={{
                color: hovered === 12 ? "White" : "white",
                backgroundColor:
                  hovered === 12 ? "rgba(255, 255, 255, 0.15)" : "transparent",
                fontSize: "16px",
              }}
              onMouseEnter={() => handleHover(12)}
              onMouseLeave={handleLeave}
            >
              Contact Us
            </MenuItem>
          </Link>
          <SubMenu
            label={"Settings"}
            icon={<IoMdSettings />}
            open={openSubMenus["Settings"]}
            onClick={() => handleSubMenuToggle("Settings")}
            style={{
              color: hovered === 13 ? "White" : "white",
              backgroundColor:
                hovered === 13 ? "rgba(255, 255, 255, 0.15)" : "transparent",
              fontSize: "16px",
            }}
            onMouseEnter={() => handleHover(13)}
            onMouseLeave={handleLeave}
          >
            {/* <Link href="/admin/dashboard" passHref>
              <MenuItem
                style={{
                  color: hovered === 33 ? "White" : "white",
                  backgroundColor:
                    hovered === 33 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(33)}
                onMouseLeave={handleLeave}
              >
                API Details
              </MenuItem>
            </Link> */}
            <Link href="/admin/setting/generalSetting" passHref>
              <MenuItem
                style={{
                  color: hovered === 32 ? "White" : "white",
                  backgroundColor:
                    hovered === 32 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(32)}
                onMouseLeave={handleLeave}
              >
                General Settings
              </MenuItem>
            </Link>
            <Link href="/admin/setting/advanceSetting" passHref>
              <MenuItem
                style={{
                  color: hovered === 93 ? "White" : "white",
                  backgroundColor:
                    hovered === 93 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(93)}
                onMouseLeave={handleLeave}
              >
                News & Events
              </MenuItem>
            </Link>
            {/* <Link href="/admin/dashboard" passHref>
              <MenuItem
                style={{
                  color: hovered === 79 ? "White" : "white",
                  backgroundColor:
                    hovered === 79 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(79)}
                onMouseLeave={handleLeave}
              >
                Plan Setting
              </MenuItem>
            </Link>
            <Link href="/admin/dashboard" passHref>
              <MenuItem
                style={{
                  color: hovered === 80 ? "White" : "white",
                  backgroundColor:
                    hovered === 80 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(80)}
                onMouseLeave={handleLeave}
              >
                Page setup
              </MenuItem>
            </Link>
            <Link href="/admin/dashboard" passHref>
              <MenuItem
                style={{
                  color: hovered === 81 ? "White" : "white",
                  backgroundColor:
                    hovered === 81 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(81)}
                onMouseLeave={handleLeave}
              >
                Add Pages
              </MenuItem>
            </Link>
            <Link href="/admin/dashboard" passHref>
              <MenuItem
                style={{
                  color: hovered === 82 ? "White" : "white",
                  backgroundColor:
                    hovered === 82 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(82)}
                onMouseLeave={handleLeave}
              >
                Pages Setup Details
              </MenuItem>
            </Link>
            <Link href="/admin/dashboard" passHref>
              <MenuItem
                style={{
                  color: hovered === 83 ? "White" : "white",
                  backgroundColor:
                    hovered === 83 ? "rgb(83 98 123)" : "#172b4d",
                }}
                onMouseEnter={() => handleHover(83)}
                onMouseLeave={handleLeave}
              >
                Bank Details
              </MenuItem>
            </Link> */}
          </SubMenu>
          <Link href="/admin/password/change-password" passHref>
            <MenuItem
              icon={<BsFillKeyFill />}
              style={{
                color: hovered === 14 ? "White" : "white",
                backgroundColor:
                  hovered === 14 ? "rgba(255, 255, 255, 0.15)" : "transparent",
                fontSize: "16px",
              }}
              onMouseEnter={() => handleHover(14)}
              onMouseLeave={handleLeave}
            >
              Change Password
            </MenuItem>
          </Link>
          <Link href="/adminauth/adminLogin" passHref>
            <MenuItem
              icon={<AiOutlineLogout />}
              style={{
                color: hovered === 15 ? "White" : "white",
                backgroundColor:
                  hovered === 15 ? "rgba(255, 255, 255, 0.15)" : "transparent",
                fontSize: "16px",
              }}
              onClick={() => dispatch(logoutAdmin())}
              onMouseEnter={() => handleHover(15)}
              onMouseLeave={handleLeave}
            >
              Logout
            </MenuItem>
          </Link>
        </Menu>
      </main>
    </aside>
  );
};

// export default Sidebarmenu;
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default compose(connect(mapStateToProps, null))(Sidebarmenu);
