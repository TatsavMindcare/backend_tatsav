const { ToolContextImpl } = require("twilio/lib/rest/assistants/v1/tool");
// const nodemailer = require("../config/mailer");
const twilioClient = require("../config/twilio");
const nodemailer = require("nodemailer");

exports.sendContactMessage = async (req, res) => {
  const { name, mobileNo, email, message } = req.body;

  //   const queryrecieve = ` recieved query from name:${name} mail:id ${email} , recieved query for ${message}`;
  const queryrecieve = `<!DOCTYPE html>
<html>
<head>
    <title>Query Received</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        .header {
            background-color: #007bff;
            color: #fff;
            text-align: center;
            padding: 10px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
            background-color: #fff;
            border-radius: 0 0 5px 5px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            margin-top: 20px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Query Received</h2>
        </div>
        <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Mobile No:</strong> ${mobileNo}</p>

            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p>We have received your query and will get back to you shortly.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
  const to = "tatsavmindcare@gmail.com";
  try {
    sendEmail(to, name, queryrecieve);
    // Send Email
    // await nodemailer.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: "Souravmishra5116@gmail.com",
    //   subject: `New Contact Message from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    // });

    // Send SMS
    // await twilioClient.messages.create({
    //   body: `New Message from ${name}\n${message}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: "8872045992", // Replace with recipient number
    // });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message", error });
  }
};

function sendEmail(to, subject, queryrecieve) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      to,
      subject,
      html: queryrecieve,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
