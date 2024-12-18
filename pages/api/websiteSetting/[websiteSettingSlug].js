import { authMiddleware } from "../../../lib/authMiddleware";
import { WebsiteSettings } from "../../../models/DB";

const routeHandler = {};

routeHandler.getWebsiteSettings = async (req, res) => {
  try {
    const settings = await WebsiteSettings.find({});

    return res.json({
      status: "success",
      data: settings,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Server error",
    });
  }
};

async function handler(req, res) {
  const { websiteSettingSlug } = req.query;
  let routeFlag = true;

  if (req.method === "POST") {
    switch (websiteSettingSlug) {
      case "getWebsiteSettings":
        await routeHandler.getWebsiteSettings(req, res);
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
