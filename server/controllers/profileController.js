import Register from "../models/register.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await Register.findById(req.user.id).select("-password -otp -otpExpires");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    await Register.findByIdAndUpdate(req.user.id, { email });
    res.json({ message: "Email updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const uploadProfilePic = async (req, res) => {
  try {
    const filePath = req.file.path;
    await Register.findByIdAndUpdate(req.user.id, { profilePic: filePath });
    res.json({ message: "Profile picture uploaded", path: filePath });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};