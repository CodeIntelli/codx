import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { S3 } from 'aws-sdk';
@Injectable()
export class AwsService {
    constructor() { }

    // @Service: Upload File In Bucket
    uploadFile(folderName: string, folderPath: string, file: any) {
        const s3 = new S3();
        let uploadParams;
        if (folderPath) {
            uploadParams = {
                Bucket: process.env.AWS_BUCKET + `/${folderName}/${folderPath}`,
                Body: file.buffer,
                Key: file.originalname,
                ACL: 'public-read',
            };
        }
        return s3.upload(uploadParams).promise();
    }

    // @Service: Read File In Bucket
    async getFile(fileKey: string) {
        const s3 = new S3();
        const downloadParmas = {
            Key: fileKey,
            Bucket: process.env.AWS_BUCKET,
        };
        return s3.getObject(downloadParmas).createReadStream();
    }

    // @Service: GetSignedURL

    async getSignedUrl(fileKey: string) {
        const s3 = new S3();
        const signedUrlExpireSeconds = 18000;
        try {
            const url = s3.getSignedUrl("getObject", {
                Bucket: process.env.AWS_BUCKET,
                Key: fileKey,
                Expires: signedUrlExpireSeconds,
            });
            return url;
        } catch (headErr) {
            if (headErr.code === "NotFound") {
                return false;
            }
        }
    }

    // @Service: Remove Object/Folder Inside Bucket

    async removeFolder(folderName: string) {
        const s3 = new S3();
        const listParams = {
            Bucket: process.env.AWS_BUCKET,
            Prefix: `${folderName}/`,
        };
        const listedObjects = await s3.listObjectsV2(listParams).promise();

        if (listedObjects.Contents.length === 0) return;

        const deleteParams = {
            Bucket: process.env.AWS_BUCKET,
            Delete: { Objects: [] },
        };

        listedObjects.Contents.forEach(({ Key }) => {
            deleteParams.Delete.Objects.push({ Key });
        });

        await s3.deleteObjects(deleteParams).promise();

        if (listedObjects.IsTruncated) {
            await this.removeObj(folderName)
        };
    }

    async removeObj(fileKey: string) {
        const s3 = new S3();
        var params = { Bucket: process.env.AWS_BUCKET, Key: `images/${fileKey}` };
        return await s3.deleteObject(params, function (err, data) {
            if (err) {
                console.log(err);
            }
        });
    }
}
