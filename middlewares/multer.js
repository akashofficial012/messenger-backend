import multer from "multer";

const multerUpload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    },
});

const singleAvatar = multerUpload.single("avatar");

export { singleAvatar };
