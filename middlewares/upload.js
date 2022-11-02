const multer  = require('multer');
const fs = require("fs");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.resolve('./product_images/uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, "./product_images/uploads");
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    req.body.img_product = "uploads/" + filename;
    cb(null, filename);
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if( (/image\/(jpeg|tiff|png|webp|bmp|jpg)$/gi).test(file.mimetype) ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
})

module.exports = upload;