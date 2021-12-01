const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.apiVersions = {
    s3: '2006-03-01',
};

function getContentType(filePath) {
    if (filePath.endsWith('.css')) return 'text/css';
    else if (filePath.endsWith('.gif')) return 'image/gif';
    else if (filePath.endsWith('.html')) return 'text/html';
    else if (filePath.endsWith('.ico')) return 'image/x-icon';
    else if (filePath.endsWith('.js')) return 'application/javascript';
    else if (filePath.endsWith('.json')) return 'application/json';
    else if (filePath.endsWith('.png')) return 'image/png';
    else if (filePath.endsWith('.unityweb')) return 'binary/octet-stream';
    else return '';
}

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        let filePath = path.join(currentDirPath, name);
        let stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

module.exports = {
    async uploadFile(fileName, filePath, mimeType) {
        AWS.config.update({
            "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
            "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
            "region": process.env.AWS_REGION
        });
        const s3 = new AWS.S3({ region: process.env.AWS_REGION });

        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileName,
            Body: fs.readFileSync(filePath),
            ACL: 'public-read',
            // ContentType: getContentType(filePath),
            //ContentType: mimeType//geralmente se acha sozinho
        };

        const data = await s3.upload(params).promise();
        return data.Location;
    },
    async uploadFolder(s3Path, dirName) {
        AWS.config.update({
            "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
            "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
            "region": process.env.AWS_REGION
        });
        const s3 = new AWS.S3({ region: process.env.AWS_REGION });

        walkSync(s3Path, async function (filePath/*, stat*/) {
            // console.log('filePath', filePath);

            let bucketPath = filePath.substring(s3Path.length + 1).replace(/\\/g, '/');
            // console.log('bucketPath', bucketPath);

            let params = {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: `public/games/${dirName}/${bucketPath}`,
                Body: fs.readFileSync(filePath),
                ACL: 'public-read',
                ContentType: getContentType(filePath)
            };
            // console.log(params);

            await s3.putObject(params).promise()
                .then((data) => {
                    console.log(data);
                    console.log('Successfully uploaded ' + bucketPath + ' to ' + process.env.AWS_S3_BUCKET);
                    return data;
                }).catch((err) => {
                    console.error(err);
                    return err;
                });
        });
    }
}
