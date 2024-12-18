import { authMiddleware } from "../../../lib/authMiddleware";
import { FundTransaction, Wallet, WalletSettings } from "../../../models/DB";
import Common from "../../../helpers/Common";
import { REQUIRED_FIELD } from "../../../helpers/APIConstant";
import { isEmpty } from "lodash";

const routeHandler = {};

routeHandler.createRequest = async (req, res) => {
  const vsuser = req.vsuser;
  const postData = req.body;
  try {
    const validateFields = ["txType", "debitCredit", "amount", "walletType"];

    const response = await Common.requestFieldsValidation(
      validateFields,
      postData
    );

    if (!response.status) {
      return res.json({
        status: "error",
        data: REQUIRED_FIELD,
      });
    }

    const data = {
      uCode: vsuser._id,
    };
    if (postData.txUCode) {
      data.txUCode = postData.txUCode;
    }

    [
      "txType",
      "debitCredit",
      "amount",
      "walletType",
      "method",
      "paymentSlip",
      "txNumber",
    ].forEach((item) => {
      if (postData[item] != undefined && postData[item] != "") {
        data[item] = postData[item];
      }
    });

    const walletSettingTable = await WalletSettings.find({});
    if (!walletSettingTable.length) {
      return res.json({
        status: 0,
        message: "Wallet not found",
      });
    }
    const userWallet = await Wallet.findOne({
      uCode: vsuser._id,
    });
    if (!userWallet) {
      return res.json({
        status: "error",
        message: "Wallet not found",
      });
    }
    const walletType = postData.walletType;
    const currentWalletBalance = Common.getWalletBalance(
      walletSettingTable,
      userWallet,
      walletType
    );

    if (postData.amount > currentWalletBalance) {
      return res.json({
        status: "error",
        message: "Insufficient balance",
      });
    }
    //
    const transferAmount = 0 - postData.amount;
    const mangeTransaction = await Common.mangeWalletAmounts(
      vsuser._id,
      walletType,
      transferAmount
    );
    if (!mangeTransaction.status) {
      return res.json({
        status: "error",
        message: mangeTransaction.message,
      });
    }

    data.postWalletBalance = currentWalletBalance;

    data.currentWalletBalance = currentWalletBalance - postData.amount;
    const transaction = new FundTransaction(data);
    const newTransaction = await transaction.save();
    return res.json({
      status: "success",
      data: newTransaction,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
};

routeHandler.updateTransactions = async (req, res) => {
  const postData = req.body;
  try {
    const id = postData.id;
    let validateFields = ["id"];
    let response = await Common.requestFieldsValidation(
      validateFields,
      postData
    );
    if (!response.status) {
      return res.json({
        status: "error",
        message: REQUIRED_FIELD,
      });
    }
    const transaction = await FundTransaction.findOne({
      _id: id,
    });
    if (!transaction) {
      return res.json({
        status: "error",
        message: "Transaction not found",
      });
    }
    const userId = transaction.uCode;
    const walletType = transaction.walletType;
    if (postData.status === 2) {
      const mangeTransaction = await Common.mangeWalletAmounts(
        userId,
        walletType,
        transaction.amount
      );
      if (!mangeTransaction.status) {
        return res.json({
          status: "error",
          message: mangeTransaction.message,
        });
      }
    }
    let where = {
      _id: id,
    };

    let set = {};

    ["status"].forEach((item) => {
      if (postData[item] != undefined && postData[item] != "") {
        set[item] = postData[item];
      }
    });

    await FundTransaction.findOneAndUpdate(
      where,
      {
        $set: set,
      },
      { new: true }
    ).then(async (result) => {
      res.json({
        status: "success",
        message: "We have updated withdrawal transaction successfully.",
        data: result,
      });
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

routeHandler.getTransactions = async (req, res) => {
  const vsuser = req.vsuser;
  const postData = req.body;
  try {
    if (req._IS_ADMIN_ACCOUNT) {
      if (isEmpty(postData)) {
        const allTransactions = await FundTransaction.find({
          txType: "withdrawal",
        })
          .populate("txUCode", "name email contactNumber username")
          .populate("uCode", "name email contactNumber username");
        return res.json({
          status: "success",
          data: allTransactions,
        });
      } else {
        const allTransactions = await FundTransaction.find({
          txType: "withdrawal",
          status: postData.status,
        })
          .populate("txUCode", "name email contactNumber username")
          .populate("uCode", "name email contactNumber username");
        return res.json({
          status: "success",
          data: allTransactions,
        });
      }
    }
    const allTransactions = await FundTransaction.find({
      txType: "withdrawal",
      uCode: vsuser._id,
    })
      .populate("txUCode", "name email contactNumber username")
      .populate("uCode", "name email contactNumber username");

    return res.json({
      status: "success",
      data: allTransactions,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

routeHandler.deleteTransaction = async (req, res) => {
  const postData = req.body;
  try {
    const validateFields = ["id"];

    const response = await Common.requestFieldsValidation(
      validateFields,
      postData
    );

    if (!response.status) {
      return res.json({
        status: "error",
        data: REQUIRED_FIELD,
      });
    }

    if (postData.id) {
      await FundTransaction.findOneAndDelete({ _id: postData.id });
      return res.json({
        status: "success",
        data: "success",
      });
    } else {
      return res.json({
        status: "success",
        data: "id is required",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

async function handler(req, res) {
  const { withdrawalSlug } = req.query;
  let routeFlag = true;

  if (req.method === "POST") {
    switch (withdrawalSlug) {
      case "createRequest":
        await routeHandler.createRequest(req, res);
        break;
      case "updateTransactions":
        await routeHandler.updateTransactions(req, res);
        break;
      case "getTransactions":
        await routeHandler.getTransactions(req, res);
        break;
      case "deleteTransaction":
        await routeHandler.deleteTransaction(req, res);
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
