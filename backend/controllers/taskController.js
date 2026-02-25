const Task = require("../models/Task");
const { encrypt, decrypt } = require("../utils/encryption");

exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  const encryptedDesc = description ? encrypt(description) : "";

  const task = await Task.create({
    title,
    description: encryptedDesc,
    user: req.user._id,
  });

  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const query = { user: req.user._id };

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: "i" };
  }

  const total = await Task.countDocuments(query);
  const tasks = await Task.find(query).skip(skip).limit(limit);

  const decryptedTasks = tasks.map((task) => ({
    ...task._doc,
    description: task.description ? decrypt(task.description) : "",
  }));

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    tasks: decryptedTasks,
  });
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Forbidden");
  }

  task.title = req.body.title || task.title;
  task.status = req.body.status || task.status;

  if (req.body.description) {
    task.description = encrypt(req.body.description);
  }

  await task.save();
  res.json({ message: "Task updated" });
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Forbidden");
  }

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};