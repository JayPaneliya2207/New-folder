import { REQUIRED_FIELD } from "../../../helpers/APIConstant";
import Common from "../../../helpers/Common";
import { authMiddleware } from "../../../lib/authMiddleware";
import {
  Users,
  Transaction,
  FundTransaction,
  IncomeTransaction,
  WalletSettings,
  Wallet,
} from "../../../models/DB";

const routeHandler = {};

routeHandler.processROI = async (req, res) => {
    try {
      // Fetch allowed days for ROI processing
      const daysAllowed = await WalletSettings.findOne({ key: "roi_days" });
      if (daysAllowed) {
        const daysDecoded = JSON.parse(daysAllowed.value); // Assuming 'value' holds JSON string of days
        const today = new Date().toLocaleString('en-US', { weekday: 'long' });
  
        if (daysDecoded.includes(today)) {
          const datetime = new Date();
          const allOrders = await Orders.find({ status: 1, payout_status: 0 });
          if (allOrders.length === 0) {
            return res.json({ status: "info", message: "No eligible orders for ROI processing today" });
          }
          for (const userDetails of allOrders) {
            const source = "roi";
            const userid = userDetails.u_code;
            const tx = userDetails.id;
            const orderAmount = userDetails.order_amount;
  
            // Fetch user profile details directly from the Users model
            const userProfile = await Users.findOne({ _id: userid });
            if (userProfile && userProfile.roi_status === 1) {
              const roiPercentage = 1;
              const perDayIncome = (orderAmount * roiPercentage) / 100;
              const myPackages = await Common.getUserPackages(userid); // Placeholder for package fetching
              const cappingLimit = myPackages * 2;
  
              const totalIncome = await Transaction.aggregate([
                { $match: { u_code: userid, tx_type: "income" } },
                { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
              ]);
              const totalIncomeAmount = totalIncome[0] ? totalIncome[0].totalAmount : 0;
              const projectedIncome = perDayIncome + totalIncomeAmount;
  
              let payable;
              if (cappingLimit > projectedIncome) {
                payable = perDayIncome;
              } else if (projectedIncome > cappingLimit && cappingLimit > totalIncomeAmount) {
                payable = cappingLimit - totalIncomeAmount;
              } else {
                payable = 0;
              }
  
              if (perDayIncome > 0 && payable > 0) {
                const incomeData = {
                  u_code: userid,
                  tx_type: "income",
                  source: source,
                  debit_credit: "credit",
                  amount: payable,
                  date: datetime,
                  added_on: datetime,
                  status: 1,
                  tx_record: tx,
                  txs_res: 1,
                  wallet_type: "roi_wallet",
                  remark: `ROI income from (${orderAmount})`,
                };
  
                const incomeTransaction = await IncomeTransaction.create(incomeData);
                if (incomeTransaction) {
                  await Common.addAmountToWallet(userid, "roi", payable); // Placeholder for wallet update
                  await Common.addAmountToWallet(userid, "main_wallet", payable);
  
                  await Common.distributeDirectROI(userid, perDayIncome, 5); // Placeholder for distribution
                }
              }
            }
          }
          res.json({ status: "success", message: "ROI processed successfully" });
        } else {
          res.json({ status: "info", message: "ROI processing is not allowed today" });
        }
      } else {
        res.json({ status: "error", message: "ROI days setting not found" });
      }
    } catch (err) {
      console.error("Error processing ROI:", err);
      res.json({ status: "error", message: "Server error during ROI processing" });
    }
};



async function handler(req, res) {
  const { IncomeSlug } = req.query;
  let routeFlag = true;

  if (req.method === "POST") {
    switch (IncomeSlug) {
      case "processROI":
        await routeHandler.processROI(req, res);
        break;
      default:
        routeFlag = false;
    }
  } else {
    routeFlag = false;
  }

  if (!routeFlag) {
    res.status(404).send("No route found.");
  }
}

export default authMiddleware(handler);
