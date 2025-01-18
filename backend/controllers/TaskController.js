const TaskModel = require("../Models/TaskMOdel")

const createTask=async(req,res)=>{
    const data=req.body
    try {
        const model=new TaskModel(data)
        await model.save()
        res.status(201).json({
            message:'Task is Created',
            success:true
        })
        
    } catch (error) {
        res.status(500).json({
            messagge:'failed to craete task',
            success:false
        })
        
    }
}

const fetchAllTask=async(req,res)=>{
    // const data=req.body
    try {
        const data=await TaskModel.find({})
        // await model.save()
        res.status(200).json({
            message:'All Tasks',
            success:true,
            data
        })
        
    } catch (error) {
        res.status(500).json({
            messagge:'failed to get all task',
            success:false
        })
        
    }
}

const updateTaskId=async(req,res)=>{
    // const data=req.body
    try {
        const id=req.params.id
        const body=req.body
        const obj={$set:{...body}}
        await TaskModel.findByIdAndUpdate(id,obj)
        // await model.save()
        res.status(200).json({
            message:'Task updated',
            success:true,
            // data
        })
        
    } catch (error) {
        res.status(500).json({
            messagge:'failed to get all update task',
            success:false
        })
        
    }
}

const deleteTaskById=async(req,res)=>{
   
    // const data=req.body
    try {
        const id=req.params.id
        await TaskModel.findByIdAndDelete(id)
        res.status(200).json({
            message:'Task is deleted',
            success:true,
            // data
        })
        
    } catch (error) {
        res.status(500).json({
            messagge:'failed to delete task',
            success:false
        })
        
    }
}
module.exports={
    createTask,
    fetchAllTask,
    updateTaskId,
    deleteTaskById
}