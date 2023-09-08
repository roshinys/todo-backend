const express = require("express");

const router = express.Router();
const todoController = require("../controller/todoController");
const middleware = require("../middleware/auth");

router.get("/todo", middleware.authenticate, todoController.getTodo);
router.post("/todo", middleware.authenticate, todoController.addTodo);
router.put("/todo", middleware.authenticate, todoController.updateTodo);
router.delete("/todo", middleware.authenticate, todoController.delTodo);

module.exports = router;
