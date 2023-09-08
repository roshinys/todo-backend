const Todo = require("../model/Todo");

const addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (title && title.length === 0) {
      return res.json({ success: false, message: "Todo Task Cannot be empty" });
    }
    const todo = await Todo.create({
      title,
      userId: req.user._id,
    });
    return res.json({
      success: true,
      message: "Successfully Added todo",
      todo,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something Went Wrong" });
  }
};

const getTodo = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const quantity = 4;
    const skip = (page - 1) * quantity;
    const totalTodos = await Todo.countDocuments({ userId: req.user._id });
    const hasNext = skip + quantity < totalTodos;
    const hasPrev = page > 1;
    const todos = await Todo.find({ userId: req.user._id })
      .skip(skip)
      .limit(quantity);
    return res.json({
      success: true,
      message: "Fetched Todos",
      todos,
      hasPrev,
      hasNext,
      page,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something Went Wrong" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { todoId, title, completed } = req.body;
    if (!todoId) {
      return res.json({ success: false, message: "Todo Id is required" });
    }
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { title, completed },
      { new: true }
    );
    if (!todo) {
      return res.json({
        success: false,
        message: "Failed to update Todo",
      });
    }
    return res.json({
      success: true,
      message: "Successfully updated todo",
      todo,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something Went Wrong" });
  }
};

const delTodo = async (req, res) => {
  try {
    const { todoId } = req.body;
    if (!todoId) {
      return res.json({ success: false, message: "TodoId is required" });
    }
    const todo = await Todo.findOne({ _id: todoId, userId: req.user._id });
    if (!todo) {
      return res.json({
        success: false,
        message: "Failed to delete the todo",
      });
    }
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.json({ success: false, message: "Failed to delete the todo" });
    }
    return res.json({ success: true, message: "Successfully deleted todo" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something Went Wrong" });
  }
};

module.exports = { addTodo, getTodo, updateTodo, delTodo };
