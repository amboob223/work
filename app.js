
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    })
});

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up PostgreSQL connection
const pool = new pg.Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

// Set up routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/upload', upload.single('user-file'), (req, res) => {
    const { userComments } = req.body;
    const filePath = req.file.path;

    pool.query(
        'INSERT INTO uploads (file_path, comments) VALUES ($1, $2)',
        [filePath, userComments],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal server error');
            } else {
                res.send('File uploaded successfully');
            }
        }
    );
});

// Start server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});