const express = require("express");
const Bookmark = require("../models/bookmark");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all bookmarks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user.userId,
    });

    return res.status(200).json({
      bookmarks,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// Add bookmark
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, url, category } = req.body;

    const bookmark = new Bookmark({
      user: req.user.userId,
      title,
      url,
      category,
    });

    await bookmark.save();

    return res.status(201).json({
      message: "Bookmark saved successfully",
      bookmark,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// Update bookmark
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, url, category } = req.body;

    const bookmark = await Bookmark.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        title,
        url,
        category,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!bookmark) {
      return res.status(404).json({
        message: "Bookmark not found",
      });
    }

    return res.status(200).json({
      message: "Bookmark updated successfully",
      bookmark,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// Delete bookmark
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!bookmark) {
      return res.status(404).json({
        message: "Bookmark not found",
      });
    }

    return res.status(200).json({
      message: "Bookmark deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;