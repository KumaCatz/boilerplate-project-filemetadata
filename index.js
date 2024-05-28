var express = require('express');
const multer = require('multer')
// const upload = multer({dest: 'uploads/'})
var cors = require('cors');
require('dotenv').config()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const originalFilename = file.originalname
    const fileExtension = originalFilename.split('.').pop()
    const uniqueSuffix =  Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension)
  }
})

const upload = multer({ storage: storage })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const { originalname, mimetype, size } = req.file
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send({
    name: originalname,
    type: mimetype,
    size: size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
