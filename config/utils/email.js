const config = require("../config");
const emailjs = require("@emailjs/nodejs");

/*
 * Helper function to send magic link emailjs
 * via emailjs api
 */
exports.sendMagicLink = async (destination, href) => {
  try {
    const templateParams = {
      to_name: "dear",
      from_name: "ChatEdith",
      recipient: destination,
      message: `${config.server_url}${href}`,
    };
    const serviceID = "service_fm6oh5d";
    const templateID = "template_khaw44j";
    const userID = {
      publicKey: "B87nKNqTv4CqpQ1Z6",
      privateKey: "wpMq-jUQ0F7ARW_3208Z9",
    };
    const response = await emailjs.send(
      serviceID,
      templateID,
      templateParams,
      userID,
    );
    console.log(
      destination,
      "verify email send success",
      response.status,
      response.text,
    );
    return true;
  } catch (err) {
    console.log(destination, "verify email send failed", err);
    return false;
  }
};
