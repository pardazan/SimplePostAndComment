module.exports = class Database {
    static mysql = require('mysql');
    static SiteLogs = require("./SiteLogs");
    static Exists = false;
    static Connection;

 /*    //akbarnode@janmail.org (https://temp-mail.org/en)
    static HostName = "remotemysql.com";
    static DatabaseName = "gsAWGLUdAi";
    static UserName = "gsAWGLUdAi";
    static UserPassword = "cFfgzZuY4X";
    static Port = 3306;
 */
        
        //andishepersian@gmail.com
        static HostName = "remotemysql.com";
        static DatabaseName = "Z9zJQqN8im";
        static UserName = "Z9zJQqN8im";
        static UserPassword = "3clXAamwK1";
    
    /* 
        static HostName = "localhost";
        static DatabaseName = "spr_post";
        static UserName = "root";
        static UserPassword = "";
    
     */
    // constructor سازنده کلاس جایی است که فیلد ها را مشخص میکند

    constructor() {

        console.log("DB Name: " + Database.DatabaseName);
    }

    InitDatabase() {
        console.log("Start Initializing... ");
        try {
            console.log("Creating Database... ");
            Database.CreateDatabaseIfNot();
        } catch{ }

    }

    static async Connect() {
        Database.Connection = Database.mysql.createConnection({
            host: Database.HostName,
            user: Database.UserName,
            password: Database.UserPassword,
            database: Database.DatabaseName
        })
    }

    static CreateDatabase() {
        return new Promise((resolve, reject) => {
            Database.Connection = Database.mysql.createConnection({
                host: Database.HostName,
                user: Database.UserName,
                password: Database.UserPassword
            });
            const sql = "CREATE DATABASE '" + Database.DatabaseName + "'";
            console.log(sql);
            Database.Connection.query(sql, function (err, result) {
                Database.Connection.end();
                if (err) {
                    console.log("Creation Error: " + err);
                    reject(err);
                }
                if (result.length > 0) {
                    console.log("Database Created");
                    console.log(result);
                    resolve(result);
                }
                else {
                    console.log("Connection OK but creation error")
                    resolve(result);
                }
            })
        })
    }

    static CheckExistance() {
        return new Promise((resolve, reject) => {
            var Connection = Database.mysql.createConnection({
                host: Database.HostName,
                user: Database.UserName,
                password: Database.UserPassword
            });
            const sql = "SHOW DATABASES LIKE '" + Database.DatabaseName + "'";
            Connection.query(sql, function (err, result) {
                Connection.end();
                if (err) {
                    console.log("Server Error: " + err);
                    Database.Exists = true;
                    reject(err);
                }
                else {
                    if (result.length > 0) {
                        console.log("Database Exists");
                        console.log(result);
                        Database.Exists = true;
                        resolve(result)
                    }
                    else {
                        console.log("Database Must Be Created")
                        Database.Exists = false;
                        resolve(result)
                    }
                }
            })
        })
    }

    /* static async IsExists() {
        await Database.CheckExistance().then((result) => {
            if (result.length > 0) {
                console.log("DB Exists OK");
                console.log(result);
                Database.Exists = true;
            }
            else {
                console.log("Server OK bur database is not exists ");
                Database.Exists = false;
            }
        }).catch((err) => {
            console.log("Error: Not EXist" + err);
            Database.Exists = false;
        })
    }
 */
    static async CreateDatabaseIfNot() {
        await Database.CheckExistance();
        if (!Database.Exists) {
            await CreateDatabase().then((result) => {
                CreateTables();
            }).catch((err) => {

            })
        }
    }
    /* static CreateDatabase() {
        return new Promise((resolve, reject) => {
            var sql = "CREATE TABLE SiteLogs (";
            sql += "id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,";
            sql += "UserName VARCHAR(15) CHARACTER SET utf8 COLLATE utf8_persian_ci,";
            sql += "LoginDate DATETIME DEFAULT CURRENT_TIMESTAMP, ";
            sql += "LogoutDate DATETIME DEFAULT CURRENT_TIMESTAMP";
            sql += ")";
 
            console.log(sql)
            var Database = require('./Database');
            var DB = new Database();
            DB.con.query(sql, function (err, result, fields) {
                DB.con.end();
                if (err) {
                    console.log("Creating SiteLogs Error: " + err);
                    reject(err);
                }
                else {
                    console.log(result);
                    console.log("SiteLog Table Created.")
                    resolve(result);
                }
            });
        })
    }
 */
    static async CreateTables() {
        console.log("Create Tables starting...")
        await Database.CreateUsersTable();
        await Database.CreatePostsTable();
        await Database.CreateCommentsTable();
        await Database.CreateUploadedFilesTable();
        await Database.SiteLogs.CreateTable();

    }

    static async CreateUsersTable() {
        var sql = "CREATE TABLE Users (";
        //sql += "id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,";
        sql += "UserName VARCHAR(15) CHARACTER SET utf8 COLLATE utf8_persian_ci  PRIMARY KEY,";
        sql += "PersonalCode INT(10) UNSIGNED ,";
        sql += "FirstName VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_persian_ci  NOT NULL,";
        sql += "LastName VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,";
        sql += "PhoneNumber VARCHAR(30) NOT NULL,";
        sql += "Email VARCHAR(50),";
        sql += "BrithDate DATETIME DEFAULT CURRENT_TIMESTAMP,";
        sql += "Password VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_persian_ci ,";
        sql += "UserType VARCHAR(3))";
        await Database.RunQuery(sql).then((result, reject) => {
            console.log("Users Table Created.")
            console.log(result);
        }).catch((err) => {
            console.log("Error Creating Users table:")
            // console.log(err);
        });

        /* Database.Connect();
        Database.Connection.query(sql, function (err, result) {
            Database.Connection.end();
            if (err) {
                console.log("Create Table Error: " + err);
            }
            else {
                if (result) {
                    console.log("Users Table Created.")
                }
            }
        });
         */
    }

    static async CreatePostsTable() {
        console.log("Post Table start.")
        /* tmpConnection = Database.mysql.createConnection({
            host: Database.HostName,
            user: Database.UserName,
            password: Database.UserPassword,
            database: Database.DatabaseName
        }); */
        var sql = "CREATE TABLE Posts (";
        sql += "PostID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,";
        sql += "UserName VARCHAR(15) CHARACTER SET utf8 COLLATE utf8_persian_ci ,";
        // sql += "PersonalCode INT(10) UNSIGNED ,";
        sql += "PostText VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_persian_ci  NOT NULL,";
        sql += "PostFile VARCHAR(30))";
        await Database.RunQuery(sql).then((result, reject) => {
            console.log("Posts Table Created.")
            console.log(result);
        }).catch((err) => {
            console.log("Error Creating Posts table:")
            //console.log(err);
        });


        /* console.log(sql);
        Database.Connect();
        Database.Connection.query(sql, function (err, result) {
            Database.Connection.end()
            if (err) {
                console.log("Create Posts Table Error: " + err);
            }
            else {
                if (result) {
                    console.log("Posts Table Created.")
                }
            }
        });
 */

    }

    static async CreateCommentsTable() {
        var sql = "CREATE TABLE Comments (";
        sql += "CommentID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,";
        sql += "PostID INT(6) UNSIGNED ,";
        sql += "UserName VARCHAR(15) CHARACTER SET utf8 COLLATE utf8_persian_ci ,";
        // sql += "PersonalCode INT(10) UNSIGNED ,";
        sql += "CommentText VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL)";

        await Database.RunQuery(sql).then((result, reject) => {
            console.log("Comments Table Created.")
            console.log(result);
        }).catch((err) => {
            console.log("Error Creating Comments table:")
            //console.log(err);
        });

        /* 
        Database.Connect();
        Database.Connection.query(sql, function (err, result) {
            Database.Connection.end();
            if (err) {
                console.log("Create Comments Table Error: " + err);
            }
            else {
                if (result) {
                    console.log("Comments Table Created.")
                }
            }
        });
         */
    }

    static async CreateUploadedFilesTable() {
        var sql = "CREATE TABLE UploadFiles (";
        sql += "UploadFileID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,";
        sql += "PostID INT(6) UNSIGNED ,";
        sql += "UserName VARCHAR(15) CHARACTER SET utf8 COLLATE utf8_persian_ci ,";
        sql += "UploadFileText VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL)";
        await Database.RunQuery(sql).then((result, reject) => {
            console.log("UploadedFiles Table Created.")
            console.log(result);
        }).catch((err) => {
            console.log("Error Creating UploadedFiles table:")
            //console.log(err);
        });
    }

    static async RunQuery(sql) {
      var Connection = Database.mysql.createConnection({
            host: Database.HostName,
            user: Database.UserName,
            password: Database.UserPassword,
            database: Database.DatabaseName
        })
        console.log("Run SQL: " + sql); 
        return new Promise((Resolve, Reject) => {                     
            Connection.query(sql, function (err, result, fields) {
                Connection.end();
                if (err) {
                    console.log("Run Query Error: " + err);
                    Reject(err);
                }
                else {
                   //console.log(result);
                    Resolve(result);
                }
            });
        });
    }

}