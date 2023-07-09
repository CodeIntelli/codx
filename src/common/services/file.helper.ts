export const imageFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        req.fileValidationError = 'only image files allowed';
        return callback(null, false);
    }
    callback(null, true);
};

export const docFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(doc|docx|pdf|ppt|pptx|pptm|csv|psd|rar|zip|txt|xls|zip|ts|js|html|css|java)$/)) {
        req.fileValidationError = 'only image files allowed';
        return callback(null, false);
    }
    callback(null, true);
};