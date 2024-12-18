import Jwt from "jsonwebtoken";
import {
  Users,
  AdminUser,
  Campaigns,
  CampaignLink,
  CampaignLinkDetail,
  CampaignVisit,
  CampaignVisitDetail,
  CampaignPageVisit,
  CampaignPageVisitDetail,
  CampaignPage,
  CampaignSection,
  TemplatePage,
  TemplateSection,
  WalletSettings,
  Wallet,
} from "../models/DB";

const Common = {};

Common.getUserByJwt = (token) => {
  return new Promise((resolve, reject) => {
    let decoded = Jwt.verify(token, process.env.SESSION_SECRET);
    if (decoded.role === 1 || decoded.role === 3 || decoded.role === 4) {
      AdminUser.findOne({ _id: decoded.user_id })
        .then((user) => {
          resolve(user);
        })
        .catch(reject);
      return;
    }
    // Fetch the user by id
    Users.findOne({ _id: decoded.user_id })
      .then((user) => {
        resolve(user);
      })
      .catch(reject);
  });
};

Common.getShortName = (name) => {
  let s = name.split(" ");
  let nm = "";
  s.forEach((n) => {
    nm += n[0];
  });
  return nm;
};

Common.replaceItemByObj = (str = "", obj) => {
  var keys = Object.keys(obj);
  keys.forEach((e) => {
    str = str.replaceAll(e, obj[e]);
  });
  return str;
};

Common.requestFieldsValidation = async (fields, postData) => {
  let flag = { status: true, message: "" };
  if (fields.length) {
    for (let field of fields) {
      if (typeof postData[field] == "undefined" || postData[field] === "") {
        flag.status = false;
      }
    }
  }
  return flag;
};

Common.isSpecialCharsPresent = (string) => {
  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return format.test(string);
};

Common.getCurrentDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  return today;
};

Common.deleteCampaignDBData = async (params) => {
  try {
    await CampaignLink.deleteMany({ templateId: params.campaignId });
    await CampaignLinkDetail.deleteMany({ templateId: params.campaignId });
    await CampaignVisit.deleteMany({ templateId: params.campaignId });
    await CampaignVisitDetail.deleteMany({ templateId: params.campaignId });
    await CampaignPageVisit.deleteMany({ templateId: params.campaignId });
    await CampaignPageVisitDetail.deleteMany({ templateId: params.campaignId });
    await CampaignPage.deleteMany({ templateId: params.campaignId });
    await CampaignSection.deleteMany({ templateId: params.campaignId });

    return { status: "success", message: "Records deleted successfully." };
  } catch (err) {
    return { status: "error", message: err };
  }
};

Common.deleteUserDBData = async (params) => {
  try {
    await Campaigns.deleteMany({ userId: params.userId });
    await CampaignLink.deleteMany({ userId: params.userId });
    await CampaignLinkDetail.deleteMany({ userId: params.userId });
    await CampaignVisit.deleteMany({ userId: params.userId });
    await CampaignVisitDetail.deleteMany({ userId: params.userId });
    await CampaignPageVisit.deleteMany({ userId: params.userId });
    await CampaignPageVisitDetail.deleteMany({ userId: params.userId });
    await CampaignPage.deleteMany({ userId: params.userId });
    await CampaignSection.deleteMany({ userId: params.userId });

    return { status: "success", message: "Records deleted successfully." };
  } catch (err) {
    return { status: "error", message: err };
  }
};

Common.deleteTemplateDBData = async (params) => {
  try {
    await TemplatePage.deleteMany({ templateId: params.templateId });
    await TemplateSection.deleteMany({ templateId: params.templateId });

    return { status: "success", message: "Records deleted successfully." };
  } catch (err) {
    return { status: "error", message: err };
  }
};

Common.mangeWalletAmounts = async (userId, slug, amount) => {
  try {
    const currentUser = await Users.findOne({ _id: userId });
    if (!currentUser) {
      return {
        status: 0,
        message: "User not found",
      };
    }
    const walletSetting = await WalletSettings.findOne({
      slug: slug,
    });
    if (!walletSetting || !walletSetting.slug) {
      return res.json({
        status: 0,
        message: "Wallet not found",
      });
    }
    const stringWalletData = JSON.stringify(walletSetting);
    const jsonWalletData = JSON.parse(stringWalletData);
    const walletColumn = jsonWalletData["column"];
    const wallet = await Wallet.findOne({
      uCode: currentUser._id,
    });
    if (!wallet) {
      const walletData = {
        uCode: currentUser._id,
        username: currentUser.username,
      };
      walletData[walletColumn] = amount;
      const newWallet = new Wallet(walletData);
      const createNewWallet = await newWallet.save();
      if (!createNewWallet) {
        return { status: 0, message: "Wallet not created" };
      }
    } else {
      const oldAmount = wallet[walletColumn];
      let newAmount = oldAmount || 0;
      if (amount > 0) {
        newAmount = oldAmount + amount;
      } else {
        newAmount = oldAmount - Math.abs(amount);
      }
      // update wallet
      const walletUpdatedData = {
        [walletColumn]: newAmount,
      };
      const walletUpdatedResponse = await Wallet.findByIdAndUpdate(
        wallet._id,
        walletUpdatedData,
        {
          new: true,
        }
      );
      if (!walletUpdatedResponse) {
        return { status: 0, message: "Wallet not found" };
      }
    }
    return { status: 1, message: "Records Update successfully." };
  } catch (err) {
    return { status: 0, message: err };
  }
};

Common.getWalletBalance = (walletSettingTable, userWallet, walletSlug) => {
  const wallet = walletSettingTable.find((item) => item.slug === walletSlug);
  if (!wallet) {
    return 0;
  }
  const walletData = JSON.parse(JSON.stringify(wallet));
  const walletColumn = walletData["column"];
  return userWallet[walletColumn] || 0;
};

export default Common;
