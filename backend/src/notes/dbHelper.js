const NoteSchema=require('./model')
const dbHelper={}

dbHelper.create=(req)=>{
    try {
        const obj=new NoteSchema(req);
        return obj.save();
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.updateById=(userId,notesId,viewModel)=>{
    try {
        return NoteSchema.updateOne({_id:notesId,userId},{$set:{...viewModel}})
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.getUserByUserId=(userId)=>{
    try {
      return NoteSchema.findOne({_id:userId,active:true});
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.getNotesByNotesIdAndUserId=(userId,notesId)=>{
    try {
      return NoteSchema.findOne({_id:notesId,userId,active:true});
    } catch (error) {
        Promise.reject(error)
    }
}
dbHelper.getNotesByUserId=(userId)=>{
    try {
      return NoteSchema.findOne({_id:userId,active:true});
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.deleteNotesByUserId=(userId)=>{
    try {
      return NoteSchema.updateMany({_id:userId},{active:false});
    } catch (error) {
        Promise.reject(error)
    }
}

dbHelper.deleteNotesByNotesIdAndUserId=(userId)=>{
    try {
      return NoteSchema.updateMany({_id:userId},{active:false});
    } catch (error) {
        Promise.reject(error)
    }
}

module.exports=dbHelper;