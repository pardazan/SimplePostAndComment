module.exports = class SiteLogs {
    constructor(User_Name, Login_Date ) {
        //متغیر های زیر فیلد های کلاس  می باشند
        this.UserName = User_Name;
        this.LoginDate = Login_Date ;
        this.LogoutDate = Login_Date;
    }
    
    AddToBank() {
        return new Promise((resolve, reject) => {
            console.log("Adding SiteLog");
            var sql = "INSERT INTO SiteLogs (UserName, LoginDate, LogoutDate ) VALUES ";
            sql += "('" + this.UserName + "','" + this.LoginDate + "','" + this.LogoutDate + "')"; //(for sql code "'"+"'" to define string variable: '" + firstName +"'  )
            const Database = require("./Database");
            Database.RunQuery(sql).then((result, reject) => {
                console.log("Log Added.")
                console.log(result);
                resolve(result);
            }).catch((err) => {
                console.log("Error Adding Log!")
                //console.log(err);
                reject(err);
            });
        })
    }

    async Add() {
        await this.AddToBank().then((result) => {
            console.log("Add Log OK ");
            this.Authenticated = true;
        }).catch((err) => {
            console.log("Error: Add Log Failed ");
            this.Authenticated = false;
        })
    }

    static async CreateTable() {
        return new Promise((resolve, reject) => {
            var sql = "CREATE TABLE SiteLogs (";
            sql += "id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,";
            sql += "UserName VARCHAR(15) CHARACTER SET utf8 COLLATE utf8_persian_ci,";
            sql += "LoginDate DATETIME DEFAULT CURRENT_TIMESTAMP, ";
            sql += "LogoutDate DATETIME DEFAULT CURRENT_TIMESTAMP";
            sql += ")";
            var Database = require('./Database');
            Database.RunQuery(sql).then((result, reject) => {
                console.log("SiteLogs Table Created.")
                console.log(result);
            }).catch((err) => {
                console.log("Error Creating SiteLogs table:")
                // console.log(err);
            });
        })
    }

}