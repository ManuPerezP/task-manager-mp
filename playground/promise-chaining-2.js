require("../src/db/mongoose");
const Tasks = require("../src/models/tasks");

// Tasks.findByIdAndDelete("_id")
//   .then((task) => {
//     console.log(task);
//     return Tasks.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });


const deleteTaskAndCount = async (id)=>{
  const task = await Tasks.findByIdAndDelete(id);
  const count = await task.countDocuments({completed: false})

  return count
}

deleteTaskAndCount('_id').then(count=>{
  console.log(count)
}).catch(e=>{
  console.log(e)
})