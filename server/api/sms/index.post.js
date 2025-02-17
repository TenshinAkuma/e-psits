import twilio from "twilio";
const runtime = useRuntimeConfig();

// Load environment variables
const accountSid = "AC0fe97067b03dc8c4306c3d26dbb5b3b7";
const authToken = "029b8023c08db585d861003008aa2c49";

// Initialize Twilio client
const client = twilio(accountSid, authToken);

export default defineEventHandler(async (event) => {
  try {
    // const body = await readBody(event);
    // const { to, message } = body;

    // if (!to || !message) {
    //   return { success: false, error: "Missing recipient number or message" };
    // }

    const notificationOpts = {
      body: "Hello this is EPSITS",
      from: "+14128705101",
      to: "+639670289112",
    };

    // Send SMS
    const response = await client.messages.create({
      body: "Hello this is EPSITS",
      from: "+14128705101",
      to: "+639996737611",
    });

    console.log(response);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    return { success: false, error: error.message };
  }
});
