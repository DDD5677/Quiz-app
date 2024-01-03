const multer = require("multer");

exports.upload = (folderName) => {
   const FILE_TYPE_MAP = {
      "image/png": "png",
      "image/jpeg": "jpeg",
      "image/jpg": "jpg",
   };

   const storage = multer.diskStorage({
      destination: function (req, file, cb) {
         const isValid = FILE_TYPE_MAP[file.mimetype];
         let uploadError = new Error("invalid image type");
         if (isValid) {
            uploadError = null;
         }
         cb(uploadError, folderName);
      },
      filename: function (req, file, cb) {
         const fileName = file.originalname.split(" ").join("-");
         const extension = FILE_TYPE_MAP[file.mimetype];
         cb(null, `${fileName}-${Date.now()}.${extension}`);
      },
   });

   return multer({ storage: storage });
};
