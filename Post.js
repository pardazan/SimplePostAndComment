module.exports = class Post {
    constructor(Post_ID) {
        this.PostID = Post_ID;
        this.UserName = "";
        this.PostText = "";
        this.PostFile = "";
        this.GetInfo();
    }

    static GetInfoFromBank(Post_ID) {
        let sql = "SELECT * FROM Posts WHERE PostID ='" + Post_ID + "'";
        return new Promise(async (Resolve, reject) => {
            var Database = require('./Database');
            await Database.RunQuery(sql).then((result, reject) => {
                //console.log(result);
                Resolve(result);
            }).catch((err) => {
                console.log("Error Getting Post!")
                //console.log(err);
                reject(err);
            });
        })
    }

    async GetInfo() {
        await Post.GetInfoFromBank(this.PostID).then((results) => {
            console.log(results);
            this.PostID = results[0].PostID;
            this.UserName = results[0].UserName;
            this.PostText = results[0].PostText;
            this.PostFile = results[0].PostFile;

        }).catch((err) => {
            console.log("Error GetPost: " + err);
        });
    }

    /* async GetInfo() {
        await this.GetInfoFromBank().then((results) => {
            console.log(results);
            try {
                this.UserName = results[0].UserName;
                this.PersonalCode = results[0].PersonalCode;
                this.FirstName = results[0].FirstName;
                this.LastName = results[0].LastName;
                this.PhoneNumber = results[0].PhoneNumber;
                this.Email = results[0].Email;
                this.BrithDate = results[0].BrithDate;
                this.Password = results[0].Password;
                this.UserType = results[0].UserType;
            }
            catch (err) {
                console.log("User not found");
                // console.log("Error: " + err); 
            }
        }).catch((err)=>{
            console.log("Error User: "+ err);
        });
    } */


    async  AddToBank() {
        return new Promise(async (resolve, reject) => {
            console.log("Adding Post");
            var sql = "INSERT INTO Posts (UserName, PostText, PostFile) VALUES ";
            sql += "('" + this.UserName + "','" + this.PostText + "','" + this.PostFile + "')"; //(for sql code "'"+"'" to define string variable: '" + UserName +"'  )   
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
        var TheResult = await this.AddToBank();
        try {
            this.PostID = await TheResult.insertId;//این آی دی در هنگام افزودن رکورد به پست جاری داده شده است
        }
        catch{ }
    }

    async GetInfo() {
        await Post.GetInfoFromBank(this.PostID).then((results) => {
            console.log(results);
            this.PostID = results[0].PostID;
            this.UserName = results[0].UserName;
            this.PostText = results[0].PostText;
            this.PostFile = results[0].PostFile;

        }).catch((err) => {
            console.log("Error GetPost: " + err);
        });
    }

    static async getPost(Post_ID) {
        return new Promise(async (resolve, reject) => {
            let sql = "SELECT * FROM Posts WHERE PostID ='" + Post_ID + "'";
            console.log(sql)
            var Database = require('./Database');
            await Database.RunQuery(sql).then((result, reject) => {
                console.log(result);
                resolve(result[0]);
            }).catch((err) => {
                console.log("Error Getting Posts!")
                //console.log(err);
                reject(err);
            });
        })
        /* await Post.GetInfoFromBank(Post_ID).then((results) => {
            console.log(results);
            return(results[0]);
            /* var tmpPost = new Post();
            tmpPost.PostID = results[0].PostID;
            tmpPost.UserName = results[0].UserName;
            tmpPost.PostText = results[0].PostText;
            tmpPost.PostFile = results[0].PostFile;
            resolve(tmpPost); 
        }).catch((err) => {
            console.log("Error GetPost: " + err);
        }); */
    }

    static async getAllPosts() {
        return new Promise(async (resolve, reject) => {
            let sql = "SELECT * FROM Posts ";
            console.log(sql)
            var Database = require('./Database');
            await Database.RunQuery(sql).then((result, reject) => {
                console.log(result);
                resolve(result);
            }).catch((err) => {
                console.log("Error Getting Posts!")
                //console.log(err);
                reject(err);
            });
        })
    }
}