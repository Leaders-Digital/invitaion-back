const User = require("../Models/user.model");
const { sendOrderEmail } = require("../helpers/email");
const qr = require("qrcode");

module.exports = {
  createUser: async (req, res) => {
    const {
      lastName,
      firstName,
      email,
      telephone,
      activite,
      profession,
      society,
    } = req.body;
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
        profession,
        society,
      });
      const savedUser = await newUser.save();

      const userId = savedUser._id; // Use MongoDB's generated ObjectID as the unique identifier

      // Generate QR code that links to user information
      //   const qrCodeData = `https://your-website-url.com/validate-invitation/${userId}`;

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
    console.log("here", userId);

    try {
      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user has already accepted
      if (user.accepted) {
        return res
          .status(400)
          .json({ message: "User has already accepted the invitation" });
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

  getAllInvitations: async (req, res) => {
    try {
      // Find all users
      const users = await User.find();

      // Return the list of users
      return res.status(200).json({
        message: "List of all users",
        users,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error retrieving list of users" });
    }
  },

  userSendEmail: async (req, res) => {
    const { id, email } = req.body;
    try {
      // Send the QR code via email

      const qrCodeData = `https://wakupinvitation.netlify.app/user/${id}`;
      const qrCode = await qr.toDataURL(qrCodeData); // Convert to base64

      // Send the QR code via email
      sendOrderEmail(email, qrCode);
      //update user by id set valide to true
      const user = await User.findById(id);
      user.valide = true;
      await user.save();
      // Return success response
      return res.status(200).json({
        message: "QR code sent via email",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error sending email" });
    }
  },
};
