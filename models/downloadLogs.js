const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const DownloadLogs = sequelize.define('download-logs',{
    fileUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    date:{
        type:Sequelize.STRING
    }
})
module.exports = DownloadLogs;