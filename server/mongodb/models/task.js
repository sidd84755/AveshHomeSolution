import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    nickname: { type: String, required: true},
    description: { type: String, required: true},
    taskType: { type: String, required: true},
    collaborators: { type: String, required: true},
    deadline: { type: String, required: true},
    photo: { type: String, required: true},
});

const taskModel = mongoose.model('Products', TaskSchema);

export default taskModel;