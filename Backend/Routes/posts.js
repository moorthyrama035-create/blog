const express = require("express");
const Routes = express.Router();
const postmodel = require("../models/postmodel");
const categorymodel = require("../models/categorymodel");
Routes.post("/", async (req, res) => {
  try {
    const category = await categorymodel.findOne({ name: req.body.category });
    let categoryId;
    if (!category) {
      const categoryname = new categorymodel({
        name: req.body.category,
      });
      await categoryname.save();
      categoryId = categoryname._id;
    } else {
      categoryId = category._id;
    }
    const doc = new postmodel({
      title: req.body.title,
      description: req.body.description,
      category: categoryId,
      image: req.file ? req.file.path : null,
      author: req.user.id,
    });
    await doc.save();
    console.log(doc);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

Routes.get("/", async (req, res) => {
  try {
    const { page, limit, sort } = req.query;
    const sortOrder = sort === "oldest" ? 1 : -1;
    let totalpage = await postmodel.countDocuments();
    totalpage = Math.ceil(totalpage / limit);
    console.log(totalpage);
    let skip = (page - 1) * limit;
    console.log(skip);

    const data = await postmodel
      .find({})
      .populate("author", "name")
      .populate("category", "name")
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);
    console.log(data);

    res.status(200).json({
      data,
      totalpage,
      currentpage: page,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
Routes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await postmodel
      .findById(id)
      .populate("category")
      .populate("author", "name")
      .populate("comments.user", "name");
    console.log(data);
    if (!data) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
Routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postmodel.findById(id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    if (!post.author || post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .send({ message: "You can only edit your own posts" });
    }

    const categoryName = req.body.category?.trim();
    if (categoryName) {
      let category = await categorymodel.findOne({ name: categoryName });
      if (!category) {
        category = await categorymodel.create({ name: categoryName });
      }
      post.category = category._id;
    }
    post.title = req.body.title;
    post.description = req.body.description;
    if (req.file) {
      post.image = req.file.path;
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});
Routes.post("/:id/comments", async (req, res) => {
  try {
    const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
    if (!text) {
      return res.status(400).send({ message: "Comment cannot be empty" });
    }

    const post = await postmodel.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    post.comments.push({ user: req.user.id, text });
    await post.save();
    await post.populate("comments.user", "name");
    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
Routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postmodel.findById(id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    if (!post.author || post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .send({ message: "You can only delete your own posts" });
    }
    await post.deleteOne();
    res.status(200).send({ message: "deleted successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = Routes;
