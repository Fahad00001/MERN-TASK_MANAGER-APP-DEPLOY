const { createTask, fetchAllTask, updateTaskId, deleteTaskById } = require('../controllers/TaskController')

const router=require('express').Router()
// to get all the task 
router.get('/',fetchAllTask)

// to create a task we nedd post metod
router.post('/',createTask)
// to update a atask 
router.put('/:id',updateTaskId)

// to delete a atsk 
router.delete('/:id',deleteTaskById)


module.exports=router