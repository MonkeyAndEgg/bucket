const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = file.mimetype && file.mimetype.split('/')[0] === 'image';
    let error = new Error('Invalid image type');
    if (isValid) {
      error = null;
    }
    callback(error, 'images');
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];
    callback(null, Date.now() + '.' + ext);
  }
});

module.exports = multer({ storage }).single("image");
