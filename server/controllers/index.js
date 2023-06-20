const Task = require("../models/task.js");
const express = require("express");
const mongoose = require("mongoose");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    throw error;
  }
};

exports.addTask = async (req, res) => {
  try {
    const body = req.body;
    const task = new Task({
      id: body.id,
      title: body.title,
      status: body.status,
      priority: body.priority,
      progress: body.progress,
    });
    const newTask = await task.save();
    const allTasks = await Task.find();
    res
      .status(201)
      .json({ message: "Task added", task: newTask, notes: allTasks });
  } catch (error) {
    throw error;
  }
};

exports.updateTask = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTask = await Task.findByIdAndUpdate({ _id: id }, body);
    const allTasks = await Task.find();
    res.status(200).json({
      message: "Task updated",
      task: updateTask,
      tasks: allTasks,
    });
  } catch (error) {
    throw error;
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndRemove(req.params.id);
    const allTasks = await Task.find();
    res.status(200).json({
      message: "Task deleted",
      task: deletedTask,
      task: allTasks,
    });
  } catch (error) {
    throw error;
  }
};
