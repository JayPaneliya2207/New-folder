import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the settings components
const Registration = dynamic(() => import("./Registration.jsx"));
const Investment = dynamic(() => import("./Investment.jsx"));
const Withdrawal = dynamic(() => import("./Withdrawal.jsx"));
const Fund = dynamic(() => import("./Fund.jsx"));
const Profile = dynamic(() => import("./Profile.jsx"));
const Dynamicpages = dynamic(() => import("./DynamicPages.jsx"));
const ReInvestment = dynamic(() => import("./ReInvestment.jsx"));
const Account = dynamic(() => import("./Account.jsx"));
const ComingSoon = dynamic(() => import("./ComingSoon.jsx"));
const PaymentMethod = dynamic(() => import("./PaymentMethod.jsx"));
const PaymentAcceptMethod = dynamic(() => import("./PaymentAcceptMethod.jsx"));
const CompanyInfo = dynamic(() => import("./CompanyInfo.jsx"));

const SettingPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState(null); // State to store the title

  const settingsMap = {
    Registration: <Registration />,
    Investment: <Investment />,
    Withdrawal: <Withdrawal />,
    Fund: <Fund />,
    Profile: <Profile />,
    Dynamicpages: <Dynamicpages />,
    ReInvestment: <ReInvestment />,
    Account: <Account />,
    ComingSoon: <ComingSoon />,
    "Payment Method": <PaymentMethod />,
    "Payment Accept Method": <PaymentAcceptMethod />,
    "Company Info": <CompanyInfo />,
  };

  // Wait for the query parameter to be available
  useEffect(() => {
    if (router.query?.title) {
      setTitle(router.query.title);
    }
  }, [router.query]);

  const renderContent = () => {
    const normalizedTitle = title?.trim().toLowerCase();
    const normalizedMap = Object.keys(settingsMap).reduce((acc, key) => {
      acc[key.toLowerCase()] = settingsMap[key];
      return acc;
    }, {});

    if (normalizedTitle && normalizedMap[normalizedTitle]) {
      return normalizedMap[normalizedTitle];
    }

    return (
      <h1 style={{ color: "red" }}>
        {title ? `No settings available for "${title}"` : "Unknown Setting"}
      </h1>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {title ? renderContent() : <p>Loading...</p>}
    </div>
  );
};

export default SettingPage;
