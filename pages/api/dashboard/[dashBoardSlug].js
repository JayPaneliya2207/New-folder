import { authMiddleware } from "../../../lib/authMiddleware";
import { Users } from "../../../models/DB";

const routeHandler = {};

routeHandler.getAdminDashboard = async (req, res) => {
  const vsuser = req.vsuser;
  try {
    if (!req._IS_ADMIN_ACCOUNT) {
      return res.json({
        status: "error",
        message: "You are not authorized to perform this action",
      });
    }
    const activeUsers = await Users.find({ status: 1 });
    const inactiveUsers = await Users.find({ status: 0 });
    const data = {
      activeUsers: activeUsers.length,
      inactiveUsers: inactiveUsers.length,
    };
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
  const { dashBoardSlug } = req.query;
  let routeFlag = true;

  if (req.method === "POST") {
    switch (dashBoardSlug) {
      case "getAdminDashboard":
        await routeHandler.getAdminDashboard(req, res);
        break;
      case "getUserDashboard":
        await routeHandler.getAdminDashboard(req, res);
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
