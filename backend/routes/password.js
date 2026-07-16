const express = require("express");
const crypto = require("crypto");
const Password = require("../models/password");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "utf-8");
    
function encrypt(text) {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");

    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;
}

function decrypt(text) {
    const parts = text.split(":");

    const iv = Buffer.from(parts[0], "hex");

    const encryptedText = parts[1];

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encryptedText, "hex", "utf8");

    decrypted += decipher.final("utf8");

    return decrypted;
}

router.get("/", authMiddleware, async (req, res) => {
    try {
        const passwords = await Password.find({
            user: req.user.userId,
        });

        const decryptedPasswords = passwords.map((password) => ({
            ...password.toObject(),
            password: decrypt(password.password),
        }));

        return res.status(200).json({
            passwords: decryptedPasswords,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, username, password } = req.body;

        const encryptedPassword = encrypt(password);

        const newPassword = new Password({
            user: req.user.userId,
            title,
            username,
            password: encryptedPassword,
        });

        await newPassword.save();

        return res.status(201).json({
            message: "Password Saved Successfully",
            password: newPassword,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title, username, password } = req.body;

        const encryptedPassword = encrypt(password);

        const updatedPassword = await Password.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId,
            },
            {
                title,
                username,
                password: encryptedPassword,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedPassword) {
            return res.status(404).json({
                message: "Password not found",
            });
        }

        updatedPassword.password = decrypt(updatedPassword.password);

        return res.status(200).json({
            message: "Password updated successfully",
            password: updatedPassword,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const password = await Password.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!password) {
            return res.status(404).json({
                message: "Password not found",
            });
        }

        return res.status(200).json({
            message: "Password deleted successfully",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
});

module.exports = router;