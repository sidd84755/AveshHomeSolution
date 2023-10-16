import Property from '../mongodb/models/task.js';
// import User from '../mongodb/models/user.js';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,    
});

const getAllTasks = async (req, res) => {

    try {
        const tasks = await Property.find();
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
      }
};



const createTask = async (req, res) => {
    const {
        title,
        nickname,
        description,
        taskType,
        collaborators,
        deadline,
        photo,
      } = req.body;
    
      const newTask = new Property({
        title,
        nickname,
        description,
        taskType,
        collaborators,
        deadline,
        photo,
      });
    
      try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
      } catch (error) {
        res.status(400).json({ message: "Failed to create a task", error: error.message });
      }
    
};



const deleteTask = async (req, res) => {
    const taskId = req.params.id; // Get the task ID from the URL parameter

  try {
    const deletedTask = await Property.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the task", error: error.message });
  }
};

export {
    getAllTasks,
    
    createTask,
    
    deleteTask,
}