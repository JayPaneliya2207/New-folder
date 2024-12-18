import { authMiddleware } from "../../../lib/authMiddleware";
import { PaymentMethod, PaymentReceivingMethod } from "../../../models/DB";

const routeHandler = {};

routeHandler.getPaymentMethods = async (req, res) => {
  try {
    const data = await PaymentMethod.find({});

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

routeHandler.getPaymentReceivingMethods = async (req, res) => {
  try {
    const data = await PaymentReceivingMethod.find({});

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

async function handler(req, res) {
  const { generalSettingsSlug } = req.query;
  let routeFlag = true;

  if (req.method === "POST") {
    switch (generalSettingsSlug) {
      case "getPaymentMethods":
        await routeHandler.getPaymentMethods(req, res);
        break;
      case "getPaymentReceivingMethods":
        await routeHandler.getPaymentReceivingMethods(req, res);
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
