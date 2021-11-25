const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.apiVersions = {
    s3: '2006-03-01',
};

function uploadArtifactsToS3(folderPath, bucketPath, bucketFolderName) {
    const s3 = new AWS.S3({ region: process.env.AWS_REGION });

    const walkSync = (dirPath, callback) => {
        const dirs = fs.readdirSync(dirPath);
        console.log('dirs', dirs);
        dirs.forEach((name) => {
            console.log('dirPath', dirPath);
            console.log('name', name);
            const filePath = path.join(dirPath, name);
            console.log('filePath', filePath);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                console.log('isDirectory');
                walkSync(filePath, callback);
            } else if (stat.isFile()) {
                console.log('isFile');
                callback(filePath, stat);
            }
        });
    };

    const splitTest = (str) => {
        return str.split('\\').pop().split('/').pop();
    }

    const callbackFunction = async (filePath) => {
        console.log('folderPath', folderPath);
        console.log('bucketPath', bucketPath);
        console.log('bucketFolderName', bucketFolderName);
        const fileName = splitTest(filePath);
        console.log('fileName', fileName);
        let params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `${bucketPath}/${bucketFolderName}/${fileName}`,
            Body: fs.readFileSync(filePath)
        };
        try {
            await s3.putObject(params).promise();
            console.log(`Successfully uploaded ${bucketFolderName} to s3 bucket`);
        } catch (error) {
            console.error(error);
            console.error(`error in uploading ${bucketFolderName} to s3 bucket`);
            throw new Error(`error in uploading ${bucketFolderName} to s3 bucket`);
        }
    };

    walkSync(folderPath, callbackFunction);
}

const uploadFolderToS3 = function (s3Path, dirName, bucketName) {

    let s3 = new AWS.S3({ region: process.env.AWS_REGION });

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

    function getContentType(filePath) {
        if (filePath.endsWith('.css')) return 'text/css';
        else if (filePath.endsWith('.html')) return 'text/html';
        else if (filePath.endsWith('.ico')) return 'image/x-icon';
        else if (filePath.endsWith('.js')) return 'application/javascript';
        else if (filePath.endsWith('.json')) return 'application/json';
        else if (filePath.endsWith('.png')) return 'image/png';
        else if (filePath.endsWith('.unityweb')) return 'binary/octet-stream';
        else return '';
    }

    walkSync(s3Path, function (filePath, stat) {
        console.log('filePath', filePath);
        let bucketPath = filePath.substring(s3Path.length + 1).replace(/\\/g, '/');
        console.log('bucketPath', bucketPath);
        let contentType = getContentType(bucketName);
        let params = {
            Bucket: bucketName,
            Key: `public/games/${dirName}/${bucketPath}`,
            Body: fs.readFileSync(filePath),
            ACL: 'public-read',
            ContentType: contentType
        };
        console.log(params);
        s3.putObject(params, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully uploaded ' + bucketPath + ' to ' + bucketName);
            }
        });
    });
};

module.exports = {
    uploadFolderToS3
}
