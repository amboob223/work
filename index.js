const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }// this gives efvery file a unie name 
}) // in this file it goes inn the multer middleware and determines the specification of the file like diplicates or whatever and when using middleware we make in  a varible upload

const upload = multer({ storage: storage })

app.set("view engine", "ejs");

// app.get("/upload", (req, res) => {
//     res.render("upload")
// })

app.post("/upload", upload.single("image"), (req, res) => {
    res.send("Image uploaded")
})

app.listen(3001, () => {
    console.log("3002 poiint")
})






// document.getElementById("form").addEventListener("submit", function (e) {

//     try {
//         e.preventDefault()
//         const userFiles = document.getElementById("file").files[0]; // this means we only taking one file
//         const userComments = document.getElementById("comments").value
//         const formData = new FormData();
//         formData.append("user-file", userFiles, "user-file.jpg")//the last argument in this hash is what we are renaming the file the second id the data ad the first  is the key in the hash
//         formData.append("user-comments", userComments)//form dati is an api obejcye nayove to js 


//         fetch("http://localhost:5000/clubs/photos", {
//             method: "POST",
//             body: formData,
//         })
//             .then(res => res.json())
//             .then(data => console.log(data))
//             .catch(err => console.log(err))
//     } catch (error) {
//         console.log(error)
//     }

// })

// // This code sets up an Express app with two routes: / for serving the form page, and /upload for handling the form submission.The code uses the multer package to handle file uploads and saves the uploaded file to the uploads / directory.It then stores the file path and comments in a PostgreSQL database table called uploads.

// // Make sure to replace the PostgreSQL connection details with your own database credentials.Additionally, make sure to create the uploads table in your PostgreSQL database:

// // sql
// // Copy code
// // CREATE TABLE uploads(
// //     id SERIAL PRIMARY KEY,
// //     file_path TEXT NOT NULL,
// //     comments TEXT
// // );