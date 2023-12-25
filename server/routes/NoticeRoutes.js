const express = require("express")
const router = express.Router();

const NoticeController = require('../controllers/NoticeController');


router.post('/notices-create', NoticeController.addNotice);

router.get('/notices-list', NoticeController.getNotice);

router.post('/update-notices', NoticeController.updateNotice);

router.post('/delete-notices-data', NoticeController.deleteNotice);

        
module.exports = router;