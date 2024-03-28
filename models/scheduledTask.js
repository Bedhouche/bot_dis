const mongoose = require('mongoose');

const scheduledTaskSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Group' }, // Référence au groupe associé
    task: { type: String, required: true },
    time: { type: String, required: true },
});

const ScheduledTask = mongoose.model('ScheduledTask', scheduledTaskSchema);

module.exports = ScheduledTask;