const multer =  require('multer');
const path =  require('path');
const crypto =  require('crypto');
module.exports = {
   dest:path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
   storage:multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
      },
      filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, hash)=>{
            if(err) cb(err);

            fileName = `${hash.toString('hex')}-${file.originalname}`;
            cb(null, fileName)
        })
      }
    
   }),
   limits:{
       fileSize: 2 * 1024 * 1024,
   },
   fileFilter:(req, file, cb) =>{
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/jpg'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error('invalid format type'))
        }
   }
      
     
};