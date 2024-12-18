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

routeHandler.getAllTransactions = async (req, res) => {
  try {
    if (req._IS_ADMIN_ACCOUNT) {
      const allTransactions = await Transaction.find({})
        .populate("txUCode", "name email contactNumber username")
        .populate("uCode", "name email contactNumber username");

      return res.json({
        status: "success",
        data: allTransactions,
      });
    } else {
      res.json({
        message: "There was an error!",
        status: "error",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

routeHandler.createFundTransactionRequest = async (req, res) => {
  const vsuser = req.vsuser;
  const postData = req.body;
  try {
    const validateFields = [
      "txType",
      "debitCredit",
      "amount",
      "walletType",
      "method",
    ];
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
    if (postData.txUCode) {
      const user = await Users.findOne({ _id: postData.txUCode });
      if (!user) {
        return res.json({
          status: "error",
          data: "user not found",
        });
      }
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
    data.currentWalletBalance = 0;
    const lastTransaction = await FundTransaction.findOne({
      uCode: vsuser._id,
    }).sort({
      createdAt: -1,
    });

    if (lastTransaction) {
      data.postWalletBalance = lastTransaction.currentWalletBalance;
      data.currentWalletBalance = lastTransaction.currentWalletBalance;
    } else {
      data.postWalletBalance = 0;
    }

    if (postData.debitCredit === "DEBIT") {
      data.currentWalletBalance = data.currentWalletBalance - postData.amount;
    } else {
      data.currentWalletBalance = data.currentWalletBalance + postData.amount;
    }

    if (data.currentWalletBalance < 0) {
      return res.json({
        status: "error",
        data: "Insufficient Balance",
      });
    }

    const newFundTransaction = new FundTransaction(data);
    const tResponse = await newFundTransaction.save();

    // Optionally, update user balance or perform other operations
    // const user = await User.findById(fundRequestData.uCode);
    // if (user) {
    //   user.walletBalance += fundRequestData.amount; // Adjust logic as necessary
    //   await user.save();
    // }

    return res.json({
      status: "success",
      data: tResponse,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
      // "Server error",
    });
  }
};

routeHandler.getAllFundTransactions = async (req, res) => {
  const postData = req.body;
  try {
    if (req._IS_ADMIN_ACCOUNT) {
      if (postData?.status === 1) {
        const allTransactions = await FundTransaction.find({ status: 1 })
          .populate("txUCode", "name email contactNumber username")
          .populate("uCode", "name email contactNumber username");

        return res.json({
          status: "success",
          data: allTransactions,
        });
      } else if (postData?.status === 2) {
        const allTransactions = await FundTransaction.find({ status: 2 })
          .populate("txUCode", "name email contactNumber username")
          .populate("uCode", "name email contactNumber username");

        return res.json({
          status: "success",
          data: allTransactions,
        });
      } else if (postData?.status === 0) {
        const allTransactions = await FundTransaction.find({ status: 0 })
          .populate("txUCode", "name email contactNumber username")
          .populate("uCode", "name email contactNumber username");

        return res.json({
          status: "success",
          data: allTransactions,
        });
      }
      const allTransactions = await FundTransaction.find({})
        .populate("txUCode", "name email contactNumber username")
        .populate("uCode", "name email contactNumber username");

      return res.json({
        status: "success",
        data: allTransactions,
      });
    } else {
      res.json({
        message: "There was an error!",
        status: "error",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

routeHandler.updateFundTransaction = async (req, res) => {
  const vsuser = req.vsuser;
  const postData = req.body;
  try {
    console.log("postData :", postData);
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
    const currentTransaction = await FundTransaction.findById(postData.id);
    if (!currentTransaction) {
      return res.json({
        status: "error",
        data: "Transaction not found",
      });
    }
    if (req._IS_ADMIN_ACCOUNT) {
      const user = await Users.findById(currentTransaction.uCode);
      if (!user) {
        return res.json({
          status: "error",
          data: "user not found",
        });
      }
      const data = {
        status: postData.status,
      };
      if (
        postData?.status !== currentTransaction.status &&
        postData?.status === 1
      ) {
        const fundWallet = await WalletSettings.findOne({
          slug: "fund_wallet",
        });
        if (!fundWallet || !fundWallet.type) {
          return res.json({
            status: "error",
            message: "Fund wallet not found",
          });
        }
        const stringFundData = JSON.stringify(fundWallet);
        const jsonFundData = JSON.parse(stringFundData);
        const walletColumn = jsonFundData["column"];
        const wallet = await Wallet.findOne({
          uCode: user._id,
        });
        if (!wallet) {
          // create wallet
          const walletData = {
            uCode: user._id,
            username: user.username,
          };
          walletData[walletColumn] = currentTransaction.amount;
          const newWallet = new Wallet(walletData);
          await newWallet.save();
        } else {
          const oldAmount = wallet[walletColumn];
          let newAmount = oldAmount;
          if (currentTransaction.debitCredit === "CREDIT") {
            newAmount = oldAmount + currentTransaction.amount;
            // update wallet
            const walletUpdatedData = {
              [walletColumn]: newAmount,
            };
            await Wallet.findByIdAndUpdate(wallet._id, walletUpdatedData, {
              new: true,
            });
          } else {
            newAmount = oldAmount - currentTransaction.amount;
            if (newAmount < 0) {
              return res.json({
                status: "error",
                message: "Insufficient Balance",
              });
            }
            // update wallet
            const walletUpdatedData = {
              [walletColumn]: newAmount,
            };
            await Wallet.findByIdAndUpdate(wallet._id, walletUpdatedData, {
              new: true,
            });
          }
        }

        const tResponse = await FundTransaction.findByIdAndUpdate(
          postData.id,
          data,
          {
            new: true,
          }
        );
        return res.json({
          status: "success",
          message: "Approved Successfully",
          data: tResponse,
        });
      } else if (postData?.status === 2) {
        const tResponse = await FundTransaction.findByIdAndUpdate(
          postData.id,
          data,
          {
            new: true,
          }
        );

        return res.json({
          status: "success",
          message: "Rejected Successfully",
          data: tResponse,
        });
      } else {
        return res.json({
          status: "success",
          message: "Already Approved",
        });
      }
    }
    return res.json({
      status: "error",
      message: "You are not authorized to perform this action",
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: "Server error",
    });
  }
};

routeHandler.getFundTransactionsByUser = async (req, res) => {
  const vsuser = req.vsuser;
  try {
    const allTransactions = await FundTransaction.find({ uCode: vsuser._id })
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

routeHandler.getAllIncomeTransactions = async (req, res) => {
  try {
    if (req._IS_ADMIN_ACCOUNT) {
      const allTransactions = await IncomeTransaction.find({})
        .populate("txUCode", "name email contactNumber username")
        .populate("uCode", "name email contactNumber username");

      return res.json({
        status: "success",
        data: allTransactions,
      });
    } else {
      res.json({
        message: "There was an error!",
        status: "error",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

routeHandler.directFundTransfer = async (req, res) => {
  const vsuser = req.vsuser;
  const postData = req.body;
  try {
    const validateFields = ["userId", "amount", "debitCredit", "walletType"];
    const response = await Common.requestFieldsValidation(
      validateFields,
      postData
    );
    const userId = postData.userId;
    if (!response.status) {
      return res.json({
        status: "error",
        data: REQUIRED_FIELD,
      });
    }

    const currentUser = await Users.findOne({ _id: userId });
    if (!currentUser) {
      return res.json({
        status: "error",
        message: "User not found",
      });
    }
    if (!req._IS_ADMIN_ACCOUNT)
      return res.json({
        status: "error",
        message: "You are not authorized to perform this action",
      });

    if (postData.isRetrieveFund && postData.debitCredit === "DEBIT") {
      const walletSettingTable = await WalletSettings.find({});
      if (!walletSettingTable.length) {
        return res.json({
          status: 0,
          message: "Wallet not found",
        });
      }
      const userWallet = await Wallet.findOne({
        uCode: currentUser._id,
      });
      if (!userWallet) {
        return res.json({
          status: "error",
          message: "Wallet not found",
        });
      }

      let data = { mainWalletBalance: 0, fundWalletBalance: 0 };
      data.mainWalletBalance = Common.getWalletBalance(
        walletSettingTable,
        userWallet,
        "main_wallet"
      );
      data.fundWalletBalance = Common.getWalletBalance(
        walletSettingTable,
        userWallet,
        "fund_wallet"
      );
      if (
        postData.walletType === "fund_wallet" &&
        data.fundWalletBalance < postData.amount
      ) {
        return res.json({
          status: "error",
          message: "Insufficient balance",
        });
      }
      if (
        postData.walletType === "main_wallet" &&
        data.mainWalletBalance < postData.amount
      ) {
        return res.json({
          status: "error",
          message: "Insufficient balance",
        });
      }
    }

    const transactionPayload = {
      txUCode: userId,
      uCode: vsuser._id,
      txType: postData?.txType || "direct_fund_transfer",
      debitCredit: postData.debitCredit,
      walletType: postData.walletType,
      amount: postData.amount,
      method: "ONLINE",
      state: 1,
      isRetrieveFund: postData.isRetrieveFund || false,
      tsxType: postData?.tsxType,
    };

    const lastTransaction = await FundTransaction.findOne({
      uCode: vsuser._id,
    }).sort({
      createdAt: -1,
    });

    if (lastTransaction) {
      transactionPayload.postWalletBalance =
        lastTransaction.currentWalletBalance;
      transactionPayload.currentWalletBalance =
        lastTransaction.currentWalletBalance;
    } else {
      transactionPayload.postWalletBalance = 0;
    }

    if (postData.debitCredit === "DEBIT") {
      transactionPayload.currentWalletBalance =
        transactionPayload.currentWalletBalance - postData.amount;
    } else {
      transactionPayload.currentWalletBalance =
        transactionPayload.currentWalletBalance + postData.amount;
    }

    const newTransaction = new FundTransaction(transactionPayload);
    const tResponse = await newTransaction.save();
    if (!tResponse) {
      return res.json({
        status: "error",
        message: "Server error",
      });
    }
    let transferAmount = postData.amount;
    if (postData.debitCredit === "DEBIT") {
      transferAmount = 0 - postData.amount;
    }
    const mangeTransaction = await Common.mangeWalletAmounts(
      userId,
      postData.walletType,
      transferAmount
    );

    if (!mangeTransaction.status) {
      return res.json({
        status: "error",
        message: "Server error",
      });
    }

    return res.json({
      status: "success",
      message: "Transaction created successfully",
      data: tResponse,
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: "Server error",
    });
  }
};

routeHandler.getUserWalletBalance = async (req, res) => {
  const vsuser = req.vsuser;
  const postData = req.body;
  try {
    const validateFields = ["userId"];
    const response = await Common.requestFieldsValidation(
      validateFields,
      postData
    );
    const userId = postData.userId;
    if (!response.status) {
      return res.json({
        status: "error",
        data: REQUIRED_FIELD,
      });
    }
    const currentUser = await Users.findOne({ _id: userId });
    if (!currentUser) {
      return res.json({
        status: "error",
        message: "User not found",
      });
    }
    if (!req._IS_ADMIN_ACCOUNT)
      return res.json({
        status: "error",
        message: "You are not authorized to perform this action",
      });

    const walletSettingTable = await WalletSettings.find({});
    if (!walletSettingTable.length) {
      return res.json({
        status: 0,
        message: "Wallet not found",
      });
    }
    const userWallet = await Wallet.findOne({
      uCode: currentUser._id,
    });
    if (!userWallet) {
      return res.json({
        status: "error",
        message: "Wallet not found",
      });
    }

    let data = { mainWalletBalance: 0, fundWalletBalance: 0 };
    data.mainWalletBalance = Common.getWalletBalance(
      walletSettingTable,
      userWallet,
      "main_wallet"
    );
    data.fundWalletBalance = Common.getWalletBalance(
      walletSettingTable,
      userWallet,
      "fund_wallet"
    );
    return res.json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

routeHandler.getRetrieveFunds = async (req, res) => {
  const vsuser = req.vsuser;
  try {
    if (!req._IS_ADMIN_ACCOUNT)
      return res.json({
        status: "error",
        message: "You are not authorized to perform this action",
      });

    const allTransactions = await FundTransaction.find({ isRetrieveFund: true })
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

routeHandler.userFundTransfer = async (req, res) => {
  const vsuser = req.vsuser;
  const postData = req.body;
  try {
    const validateFields = ["userId", "amount", "walletType"];
    const response = await Common.requestFieldsValidation(
      validateFields,
      postData
    );
    const userId = postData.userId;
    if (!response.status) {
      return res.json({
        status: "error",
        data: REQUIRED_FIELD,
      });
    }

    const currentUser = await Users.findOne({ _id: userId });
    if (!currentUser) {
      return res.json({
        status: "error",
        message: "User not found",
      });
    }

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
    const userToWallet = await Wallet.findOne({
      uCode: userId,
    });
    if (!userWallet) {
      return res.json({
        status: "error",
        message: "Wallet not found",
      });
    }

    if (!userToWallet) {
      const walletData = {
        uCode: userId,
        username: userToWallet.username,
      };
      const newWallet = new Wallet(walletData);
      await newWallet.save();
    }

    let data = { mainWalletBalance: 0, fundWalletBalance: 0 };
    data.mainWalletBalance = Common.getWalletBalance(
      walletSettingTable,
      userWallet,
      "main_wallet"
    );
    data.fundWalletBalance = Common.getWalletBalance(
      walletSettingTable,
      userWallet,
      "fund_wallet"
    );

    if (
      postData.walletType === "fund_wallet" &&
      data.fundWalletBalance < postData.amount
    ) {
      return res.json({
        status: "error",
        message: "Insufficient balance",
      });
    }
    if (
      postData.walletType === "main_wallet" &&
      data.mainWalletBalance < postData.amount
    ) {
      return res.json({
        status: "error",
        message: "Insufficient balance",
      });
    }

    const transactionPayload = {
      txUCode: userId,
      uCode: vsuser._id,
      txType: "ONLINE",
      debitCredit: "DEBIT",
      walletType: postData.walletType,
      amount: postData.amount,
      method: "ONLINE",
      state: 1,
      isRetrieveFund: postData.isRetrieveFund || false,
      tsxType: postData?.tsxType,
    };

    const lastTransaction = await FundTransaction.findOne({
      uCode: vsuser._id,
    }).sort({
      createdAt: -1,
    });

    if (lastTransaction) {
      transactionPayload.postWalletBalance =
        lastTransaction.currentWalletBalance;
      transactionPayload.currentWalletBalance =
        lastTransaction.currentWalletBalance;
    } else {
      transactionPayload.postWalletBalance = 0;
    }

    // if (postData.debitCredit === "DEBIT") {
    transactionPayload.currentWalletBalance =
      transactionPayload.currentWalletBalance - postData.amount;
    // } else {
    //   transactionPayload.currentWalletBalance =
    //     transactionPayload.currentWalletBalance + postData.amount;
    // }

    const newTransaction = new FundTransaction(transactionPayload);
    const tResponse = await newTransaction.save();
    if (!tResponse) {
      return res.json({
        status: "error",
        message: "Server error",
      });
    }

    const mangeTransaction = await Common.mangeWalletAmounts(
      userId,
      postData.walletType,
      postData.amount
    );

    // transfer amount to user
    const transferAmount = postData.amount;
    const senderUserAmount = 0 - transferAmount;
    const senderUserMangeTransaction = await Common.mangeWalletAmounts(
      vsuser._id,
      postData.walletType,
      senderUserAmount
    );

    if (!senderUserMangeTransaction.status) {
      return res.json({
        status: "error",
        message: "Server error",
      });
    }

    if (!mangeTransaction.status) {
      return res.json({
        status: "error",
        message: "Server error",
      });
    }

    return res.json({
      status: "success",
      message: "Transaction created successfully",
      data: tResponse,
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: "Server error",
    });
  }
};

async function handler(req, res) {
  const { TransactionSlug } = req.query;
  let routeFlag = true;

  if (req.method === "POST") {
    switch (TransactionSlug) {
      case "getAllTransactions":
        await routeHandler.getAllTransactions(req, res);
        break;
      case "getAllFundTransactions":
        await routeHandler.getAllFundTransactions(req, res);
        break;
      case "getFundTransactionsByUser":
        await routeHandler.getFundTransactionsByUser(req, res);
        break;
      case "getAllIncomeTransactions":
        await routeHandler.getAllIncomeTransactions(req, res);
        break;
      case "createFundTransactionRequest":
        await routeHandler.createFundTransactionRequest(req, res);
        break;
      case "updateFundTransaction":
        await routeHandler.updateFundTransaction(req, res);
        break;
      case "directFundTransfer":
        await routeHandler.directFundTransfer(req, res);
        break;
      case "getRetrieveFunds":
        await routeHandler.getRetrieveFunds(req, res);
        break;
      case "userFundTransfer":
        await routeHandler.userFundTransfer(req, res);
        break;
      case "getUserWalletBalance":
        await routeHandler.getUserWalletBalance(req, res);
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
