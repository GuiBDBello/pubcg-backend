const express = require('express');
const cors = require('cors');
const multer = require('multer');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    limits: {
        fileSize: 100000000 // 100 MB
    },
    storage: storage,
});

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return;
    console.log(req.file);

    const { originalname, filename } = req.file;
    console.log(originalname, " | ", filename);

    res.send({
        upload: true,
        files: req.files,
    });

    let fileName = res.req.file.filename;
    console.log(fileName);

    fs.createReadStream(path.resolve('uploads', fileName))
        .pipe(unzipper.Extract({ path: path.resolve('public', 'games', fileName) }));
});

app.listen(8080, () => {
    console.log('App running on http://localhost:8080');
});
