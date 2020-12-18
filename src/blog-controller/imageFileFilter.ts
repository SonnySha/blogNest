import { BadRequestException } from "@nestjs/common";

/* eslint-disable prettier/prettier */
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
        file.filename = Date.now() + '-' + file.originalname;
        return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};