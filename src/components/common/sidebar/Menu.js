import React from 'react';
import { 
  FaHome, FaChartLine, FaShoppingCart, FaRegNewspaper, FaHeadSideVirus 
} from "react-icons/fa";
import { GrUserNew } from "react-icons/gr";
import { MdAccountBalance, MdContactSupport, MdLogout } from "react-icons/md";
import { RiRefund2Line, RiTeamFill } from "react-icons/ri";
import { PiHandWithdrawBold } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";
import { GiLaurelsTrophy } from "react-icons/gi";
import { SiLimesurvey } from "react-icons/si";
import { TbMessagePin, TbFileReport } from "react-icons/tb";
import { GoGoal, GoCircle } from "react-icons/go";

export const MenuRoutes = [
    {
      href: "/dashboard",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      name: "My Account",
      icon: <MdAccountBalance />,
      subRoutes: [
        {
          circle_icon: <GoCircle />,
          href: "/user/my_account/welcome_letter",
          name: "Wellcome Letter",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/my_account/profiles",
          name: "Profiles",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/my_account/kyc",
          name: "kyc",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/my_account/vcard",
          name: "Vcard",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/my_account/account",
          name: "Accounts",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/my_account/change_ttpassword",
          name: "Change Tt Password",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/my_account/change_txpassword",
          name: "Change Tx Password",
        },
      ],
    },
    {
      name: "My Team",
      icon: <RiTeamFill />,
      subRoutes: [
        {
          circle_icon: <GoCircle />,
          href: "/user/team/Direct",
          name: "Direct",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/team/generation",
          name: "Generation",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/team/left_team",
          name: "Left Team",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/team/right_team",
          name: "Right Team",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/team/tree",
          name: "Tree",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/team/matrix",
          name: "Matrix",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/team/single_lay",
          name: "Single Lay",
        },
      ],
    },
    {
      name: "Fund",
      icon: <RiRefund2Line />,
      subRoutes: [
        {
          circle_icon: <GoCircle />,
          href: "/user/fund/addFund",
          name: "Add Fund",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/fund/addFundHistory",
          name: "Add Fund History",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/fund/fundResult",
          name: "Fund Request",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/fund/fundResultHistory",
          name: "Fund Request History",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/fund/transferFund",
          name: "Transfer Fund",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/fund/fundTransferHistory",
          name: "Fund Transfer History",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/fund/fundConvert",
          name: "Fund Convert",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/fund/fundConvertHistory",
          name: "Fund Convert History",
        },
      ],
    },
    {
      name: "Withdrawal",
      icon: <PiHandWithdrawBold />,
      subRoutes: [
        {
          circle_icon: <GoCircle />,
          href: "/user/withdrawal/withdrawal",
          name: "Withdrawal",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/withdrawal/withdrawalReport",
          name: "Withdrawal Report",
        },
      ],
    },
    {
      name: "Watch Ads",
      icon: <FaHeadSideVirus />,
      subRoutes: [
        {
          circle_icon: <GoCircle />,
          href: "/user/watchAds/watchAds",
          name: "Watch Ads",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/watchAds/watchAdsResultHistory",
          name: "Watch Ads Result History",
        },
      ],
    },
    {
      name: "E-pin",
      icon: <TbMessagePin />,
      subRoutes: [
        {
          circle_icon: <GoCircle />,
          href: "/user/epin/generatePin",
          name: "Generate Pin",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/epin/pinTransfer",
          name: "Pin Transfer",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/epin/pinReset",
          name: "Pin Request",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/epin/pinHistory",
          name: "Pin History",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/epin/pinbox",
          name: "Pin Box",
        }
      ],
    },
    {
      name: "Top Up",
      icon: <SlEnergy />,
      subRoutes: [
        {
          circle_icon: <GoCircle />,
          href: "/user/topup/topup",
          name: "Topup",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/topup/retopup",
          name: "ReTopup",
        },
      ],
    },
    {
      name: "Payout Reports",
      icon: <FaChartLine />,
      subRoutes: [
        {
          circle_icon: <GoCircle />,
          href: "/user/payoutReport/ruiIncome",
          name: "ROI Income",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/payoutReport/directIncome",
          name: "Direct Income",
        },
        {
          circle_icon: <GoCircle />,
          href: "/user/payoutReport/levelIncome",
          name: "Level Income",
        },
      ],
    },
    {
      href: "/user/orders",
      name: "Orders",
      icon: <FaShoppingCart />,
    },
    {
      href: "/registerNewUser",
      name: "Register New User",
      icon: <GrUserNew />,
    },
    {
      href: "/user/reward",
      name: "Reward",
      icon: <GiLaurelsTrophy />,
    },
    {
      href: "/user/goal",
      name: "Goal",
      icon: <GoGoal  />,
    },
    {
      href: "/user/Report",
      name: "Report",
      icon: <TbFileReport />,
    },
    {
      href: "/user/newsAndEvents",
      name: "News & Events",
      icon: <FaRegNewspaper />,
    },
    {
      href: "/user/support",
      name: "Support",
      icon: <MdContactSupport />,
    },
    {
      href: "/user/logout",
      name: "Logout",
      icon: <MdLogout />,
    },
  ];
