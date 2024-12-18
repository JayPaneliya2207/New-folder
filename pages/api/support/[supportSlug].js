import { authMiddleware } from "../../../lib/authMiddleware";
import { Support } from "../../../models/DB";
import Common from "../../../helpers/Common";

const routeHandler = {};

routeHandler.addSupport = async (req, res) => {
  const postData = req.body;
  try {
    const support = new Support(postData);
    await support.save();
    return res.json({
      status: "success",
      data: "success",
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
};

routeHandler.updateSupport = async (req, res) => {
  let supportData = req.body;
  const id = req.body.id;
  try {
    let validateFields = ["id"];
    let response = await Common.requestFieldsValidation(
      validateFields,
      supportData
    );
    if (response.status) {
      let where = {
        _id: id,
      };

      let set = {};

      [
        "uCode",
        "message",
        "firstName",
        "lastName",
        "email",
        "contactNo",
        "subject",
        "ticket",
        "msgBy",
        "approvedDate",
        "reply",
        "status",
        "replyStatus",
      ].forEach((item) => {
        if (supportData[item] != undefined && supportData[item] != "") {
          set[item] = supportData[item];
        }
      });

      await Support.findOneAndUpdate(
        where,
        {
          $set: set,
        },
        { new: true }
      ).then(async (result) => {
        res.json({
          status: "success",
          message: "We have updated support successfully.",
          data: result,
        });
      });
    } else {
      res.json({
        status: "error",
        message: "Something went wrong.",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

routeHandler.getSupports = async (req, res) => {
  try {
    const supports = await Support.find({});

    return res.json({
      status: "success",
      data: supports,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

routeHandler.deleteSupport = async (req, res) => {
  const postData = req.body;
  try {
    if (postData.id) {
      await Support.findOneAndDelete({ _id: postData.id });
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
  const { supportSlug } = req.query;
  let routeFlag = true;

  if (req.method === "POST") {
    switch (supportSlug) {
      case "addSupport":
        await routeHandler.addSupport(req, res);
        break;
      case "updateSupport":
        await routeHandler.updateSupport(req, res);
        break;
      case "getSupports":
        await routeHandler.getSupports(req, res);
        break;
      case "deleteSupport":
        await routeHandler.deleteSupport(req, res);
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
