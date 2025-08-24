const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { totp } = require("otplib");
const nodemailer = require("nodemailer");
totp.options = { step: 60 * 2 };

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_CODE,
  },
});

const SendOTP = (req, res) => {
  const { email } = req.body;

  const checkUser = "SELECT * FROM user WHERE email = ? LIMIT 1";
  db.query(checkUser, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length == 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = totp.generate(email + process.env.SECRET_KEY);

    emailTransporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verification code",
      text: `Your OTP code: ${otp}`,
    });

    res.json({ message: `Otp sent to ${email}` });
  });
};

const VerifyOTP = (req, res) => {
  const { otp, email } = req.body;

  const isValid = totp.check(otp, email + process.env.SECRET_KEY);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const querySelect = "SELECT * FROM user WHERE email = ? LIMIT 1";
  db.query(querySelect, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length == 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const queryUpdate = "UPDATE user SET is_active = true WHERE email = ?";
    db.query(queryUpdate, [email], (error) => {
      if (error)
        return res.status(500).json({ message: "Error updating user" });

      return res
        .status(200)
        .json({ message: "OTP verified, successfully changed your status." });
    });
  });
};

const Register = (req, res) => {
  const { name, phone_number, email, password, role, address } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  const RegisterQuery = `
    INSERT INTO user (name, phone_number, email, password, is_active, role, address)
    VALUES (?, ?, ?, ?, false, ?, ?)
  `;

  db.query(
    RegisterQuery,
    [name, phone_number, email, hash, role, address],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding user" });
      }

      return res.status(201).json({
        message:
          "User created successfully, To keep your account active, please verify it using your email address.",
        user: {
          id: results.insertId,
          name,
          phone_number,
          email,
          is_active: false,
          role,
          address,
        },
        status: 201,
      });
    }
  );
};

const Login = (req, res) => {
  const { email, password } = req.body;

  const LoginQuery = "SELECT * FROM user WHERE email = ? LIMIT 1";
  db.query(LoginQuery, [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length == 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  });
};

const getuser = (req, res) => {
  const getQuery = `SELECT * FROM user`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting user",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "user s retrieved successfully",
      data: result,
    });
  });
};

const getOneuser = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM user WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one user",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a user retrieved successfully",
      data: result[0],
    });
  });
};

const updateuser = (req, res) => {
  const id = req.params.id;
  const { name, phone_number, email, password, is_active, role, address } =
    req.body;

  const updateQuery = `UPDATE user SET name = ?, phone_number = ?, email = ?, password = ?, is_active = ?, role = ?, address = ? WHERE id = ?`;

  const hash = bcrypt.hashSync(password, 10);

  db.query(
    updateQuery,
    [name, phone_number, email, hash, is_active, role, address, id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error updating one user",
          error: "Internal Server Error",
        });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "user not found" });
      }

      res.json({ message: "a user updated successfully" });
    }
  );
};

const deleteuser = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM user where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one user",
        error: "Internal Server Error",
      });
    }

    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json({ message: "a user deleted successfully" });
  });
};

module.exports = {
  Register,
  Login,
  getuser,
  getOneuser,
  updateuser,
  deleteuser,
  SendOTP,
  VerifyOTP,
};
