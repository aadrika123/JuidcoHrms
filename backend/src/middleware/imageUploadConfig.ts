import multer from 'multer';

const storage = multer.memoryStorage()

// const upload = multer({ dest: 'uploads/item/images' });
const upload = multer({ storage: storage });

export default upload