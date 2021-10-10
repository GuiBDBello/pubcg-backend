const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());

const upload = multer({
    dest: './uploads/',
    limits: {
        fileSize: 100000000 // 100 MB
    },
});

app.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.file);

    const { originalName, fileName } = req.file;
    console.log(originalName, " | ", fileName);
    
    res.send({
        upload: true,
        files: req.files,
    });
});

app.listen(8080, () => {
    console.log('App running on http://localhost:8080');
});
