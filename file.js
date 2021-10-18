const multer = require('multer');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

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

app.post('/uploads', upload.single('file'), async (req, res) => {

    // TODO: Adicionar validação pelo nome do arquivo (se termina com .zip)

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
