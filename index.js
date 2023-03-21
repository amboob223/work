document.getElementById("form").addEventListener("submit", function (e) {

    try {
        e.preventDefault()
        const userFiles = document.getElementById("file").files[0]; // this means we only taking one file
        const userComments = document.getElementById("comments").value
        const formData = new FormData();
        formData.append("user-file", userFiles, "user-file.jpg")//the last argument in this hash is what we are renaming the file the second id the data ad the first  is the key in the hash
        formData.append("user-comments", userComments)//form dati is an api obejcye nayove to js 


        fetch("http://httpbin.org/post", {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    } catch (error) {

    }

})

// This code sets up an Express app with two routes: / for serving the form page, and /upload for handling the form submission.The code uses the multer package to handle file uploads and saves the uploaded file to the uploads / directory.It then stores the file path and comments in a PostgreSQL database table called uploads.

// Make sure to replace the PostgreSQL connection details with your own database credentials.Additionally, make sure to create the uploads table in your PostgreSQL database:

// sql
// Copy code
// CREATE TABLE uploads(
//     id SERIAL PRIMARY KEY,
//     file_path TEXT NOT NULL,
//     comments TEXT
// );