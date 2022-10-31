const multer  = require('multer');
const fs = require("fs");
const path = require('path');
const { log } = require('console');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.resolve('./uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage  })

module.exports = upload;