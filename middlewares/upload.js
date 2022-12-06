const multer  = require('multer');
const fs = require("fs");
const path = require('path');
const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

const generateMulter = imgFolderName => multer({
  storage: multer.diskStorage({
      destination: (req, file, cb) => {
          const dir_img = path.resolve(`./images/${imgFolderName}/uploads`);
          if (!fs.existsSync(dir_img)) {
              fs.mkdirSync(dir_img);
          }
          cb(null, `./images/${imgFolderName}/uploads`)
      },
      filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          switch(imgFolderName) {
              case 'users_images':
                  req.body.user_img = "users_images/uploads/" + filename;
                  break;
              case 'products_images':
                  req.body.img_product= "products_images/uploads/" + filename;
                  break;
              case 'reviews_images':
                  req.body.review_img = "reviews_images/uploads/" + filename;
                  break;
          }
          cb(null, filename)
      }
  }),
  fileFilter: (req, file, cb) => {
      if (mimetypes.includes(file.mimetype)) cb(null, true)
      else cb(null, false)
  }
});

const uploadUserImages = generateMulter('users_images');
const uploadProductImages = generateMulter('products_images');
const uploadReviewImages = generateMulter('reviews_images');

module.exports = { uploadUserImages, uploadProductImages, uploadReviewImages };