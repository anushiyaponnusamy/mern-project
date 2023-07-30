const UserSchema=require('./model')
const dbHelper={}

dbHelper.create=(req)=>{
    try {
        const obj=new UserSchema(req);
        return obj.save();
    } catch (error) {
        return  Promise.reject(error)
    }
}

dbHelper.emailExists=async(email)=>{
    try {
      return await UserSchema.findOne({ email });   
    } catch (error) {
        return  Promise.reject(error)   
    }
}
dbHelper.updateById=(userId,viewModel)=>{
    try {
        return UserSchema.updateOne({_id:userId},{$set:{...viewModel}})
    } catch (error) {
        return  Promise.reject(error)
    }
}

dbHelper.getAllUsers=(pageNumber,pagePerSize)=>{
    try {
      return UserSchema.find({active:true}).select({
        userName:1,_id:1,
      }).sort({createdDate:-1}).skip((pageNumber-1)*pagePerSize).limit(pagePerSize);
    } catch (error) {
        return  Promise.reject(error)
    }
}

dbHelper.getUserByUserId=(userId)=>{
    try {
      return UserSchema.findOne({_id:userId,active:true});
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getUserByUserId=(userId)=>{
    try {
      return UserSchema.findOne({_id:userId,active:true});
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.deleteUserByUserId=(userId)=>{
    try {
      return UserSchema.updateOne({_id:userId},{active:false});
    } catch (error) {
        Promise.reject(error)
    }
}

module.exports=dbHelper;