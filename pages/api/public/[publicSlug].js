import { Contactus } from "../../../models/DB";
import Common from "../../../helpers/Common";
import dbConnect from "../../../lib/dbConnect";

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
    const newContact = new Contactus(postData);
    const contactDetails = await newContact.save();
    return res.json({
      status: "success",
      data: contactDetails,
    });
  } catch (err) {
    console.log("err--> :", err);
    res.json({
      status: "error",
      message: err,
    });
  }
};

async function handler(req, res) {
  const { publicSlug } = req.query;
  let routeFlag = true;
  await dbConnect();

  if (req.method === "POST") {
    switch (publicSlug) {
      case "addContact":
        await routeHandler.addContact(req, res);
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

export default handler;
