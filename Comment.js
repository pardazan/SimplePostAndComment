module.exports = class Comment {
    constructor(CommentID) {
        this.CommentID = CommentID;
        this.PostID = 0;
        this.UserName = "";
        this.CommentText = "";
        this.GetInfo();
    }


    AddToBank() {
        return new Promise(async(resolve, reject) => {
            console.log("Adding Comment");
            var sql = "INSERT INTO  Comments (PostID, UserName, CommentText) VALUES ";
            sql += "(" + this.PostID + ",'" + this.UserName + "','" + this.CommentText + "')"; //(for sql code "'"+"'" to define string variable: '" + UserName +"'  )
            const Database = require("./Database");
            await Database.RunQuery(sql).then((result, reject) => {
                console.log("Post Added.")
                console.log(result);
                resolve(result);
            }).catch((err) => {
                console.log("Error Adding Post!")
                //console.log(err);
                reject(err);
            });
        })
    }

    async Add() {
        await this.AddToBank()       
    }

    GetInfoFromBank() {
        return new Promise(async(resolve, reject) => {
            let sql = "SELECT * FROM Comments WHERE PostID ='" + this.PostID + "'";
             const Database = require("./Database");
            await Database.RunQuery(sql).then((result, reject) => {
                console.log("Post Added.")
                console.log(result);
                resolve(result);
            }).catch((err) => {
                console.log("Get Comment Info Error: " + err)
                //console.log(err);
                reject(err);
            });
        })
       
    }

    async GetInfo() {
        await this.GetInfoFromBank().then((results)=>{
            try {
                this.PostID = results[0].PostID;
                this.CommentID = results[0].CommentID;
                this.UserName = results[0].UserName;
                this.CommentText = results[0].CommentText;
            }
            catch{ }
        }).catch((err)=>{
            console.log("Error Reading Comment")
        });             
    }

    static getAllComments(Post_ID) {
        return new Promise(async(resolve, reject) => {
            let sql = "SELECT * FROM Comments WHERE  PostID=" + Post_ID;
             const Database = require("./Database");
            await Database.RunQuery(sql).then((result, reject) => {                
                console.log(result);
                resolve(result);
            }).catch((err) => {
                console.log("Get Comment Info Error: " + err)
                //console.log(err);
                reject(err);
            });
        })               
    }
}