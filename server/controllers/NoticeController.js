const { NoticeModel } = require("../models/NoticeModel");

exports.addNotice = async function (req, res) {
    try {
        const { message } = req.body;

        // Create a new instance of the NoticeModel
        const newNotice = new NoticeModel({
            message
        });

        // Save the new Notice to the database
        const savedNotice = await newNotice.save();

        // Respond with the saved Notice data
        res.status(201).json({msg: "notice data add successfuly", savedNotice, status: "success"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getNotice = async function (rea, res) {
    try {
        // Fetch all tournament from the database
        const notice = await NoticeModel.find();

        // Respond with the list of notice
        res.status(200).json({ msg: 'sucessfull', notice });  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

exports.updateNotice = async function (req, res) {

    try {
        const noticeId = req.body.noticeId;
        const { message } = req.body;
    
        // Find the notice by ID
        let notice = await NoticeModel.findById(noticeId);
    
        if(notice) {
            // Update the notice field
            notice.message = message; 
            await notice.save();
    
            return res.status(200).json({ success: true, message: 'notice updated successfully.', noticeId: notice._id, status: 'success' });
        } else {
            return res.status(400).json({ success: false, message: 'notice not found.' });
        }
    } catch (error) {
        console.error('Error updating notice details:', error);
        res.status(500).json({ success: false, message: 'Failed to update notice details .', error: error.message });
    }
}

exports.deleteNotice = async function (req, res) {
    try {
        const noticeId = req.body.noticeId
    
        const deletedNotice = await NoticeModel.findByIdAndDelete(noticeId);     
    
        if(!deletedNotice) {
            return res.status(404).json({ status: 'error', msg: 'Notice not found' });
        }
    
        return res.status(200).json({ status: 'success', msg: 'Notice deleted successfully', deletedNotice });
    } catch (error) {  
        console.error(error);
        return res.status(500).json({ status: 'error', msg: 'Internal server error', error });
    }

}

