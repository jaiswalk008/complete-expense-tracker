const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const downloadLogs = new Schema({
    fileUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        
    }
})

module.exports = mongoose.model('Report', downloadLogs);

// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const DownloadLogs = sequelize.define('download-logs',{
//     fileUrl:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     date:{
//         type:Sequelize.STRING
//     }
// })
// module.exports = DownloadLogs;