const User = require("../Models/user.model");
const { sendOrderEmail } = require("../helpers/email");
const qr = require("qrcode");

module.exports = {
  createUser: async (req, res) => {
    const { lastName, firstName, email, telephone,activite,profession } = req.body;
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists." });
      }

      // Create new user and save in database
      const newUser = new User({
        lastName,
        firstName,
        email,
        telephone,
        activite,
        profession
      });
      const savedUser = await newUser.save();

      const userId = savedUser._id; // Use MongoDB's generated ObjectID as the unique identifier

      // Generate QR code that links to user information
      //   const qrCodeData = `https://your-website-url.com/validate-invitation/${userId}`;
      const qrCodeData = `https://invitation-wakeup.netlify.app/user?id=${userId}`;
      const qrCode = await qr.toDataURL(qrCodeData); // Convert to base64

      // Send the QR code via email
      sendOrderEmail(email, qrCode);

      // Return success response
      return res.status(201).json({
        message: "User created successfully, and QR code sent via email",
        user: savedUser,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error creating user or sending email" });
    }
  },
  validateInvitation: async (req, res) => {
    const { userId } = req.params;
    console.log(userId);

    try {
      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the user information
      return res.status(200).json({
        message: "User information retrieved successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error retrieving user information" });
    }
  },
  acceptInvitation: async (req, res) => {
    const { userId } = req.params;
    console.log("here",userId);

    try {
      // Find the user by ID
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has already accepted
      if (user.accepted) {
        return res.status(400).json({ message: "User has already accepted the invitation" });
      }

      // Update user's accepted status
      user.accepted = true;
      await user.save();

      // Return success response
      return res.status(200).json({
        message: "Invitation accepted successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error updating user acceptance status" });
    }
  },
};
