import { authMiddleware } from "../../../lib/authMiddleware";
import { Contactus } from "../../../models/DB";
import Common from "../../../helpers/Common";

const routeHandler = {};

routeHandler.addContact = async (req, res) => {
  const postData = req.body;
  try {
    const validateFields = ["name", "contactNo", "message"];
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
    const contact = new Contactus(postData);
    await contact.save();
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

routeHandler.getContacts = async (req, res) => {
  try {
    const contacts = await Contactus.find({});

    return res.json({
      status: "success",
      data: contacts,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

async function handler(req, res) {
  const { contactUsSlug } = req.query;
  let routeFlag = true;

  if (req.method === "POST") {
    switch (contactUsSlug) {
      case "addContact":
        await routeHandler.addContact(req, res);
        break;
      case "getContacts":
        await routeHandler.getContacts(req, res);
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
