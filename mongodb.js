/**
 * 
 * esto es si no usamos mongodb, podemos usar mongoose que es mas facil de usar 
 */


// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const { MongoClient, ObjectId } = require("mongodb");

const conectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";
//para crear nuestro propio id de mongo, o tambien usamos para parsear un id y omologarlo al tipo de id en ;a db (no es solo el string)
// const id = new ObjectId()
// console.log(id);

// console.log(id.getTimestamp())

console.log("start");
//conection to the server
const client = new MongoClient(conectionURL);
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(databaseName);

  //para insertar ::::
  //   const collection = db.collection("users");
  //   const insertResult = await collection
  //     .insertMany([
  //       {
  //         _id: id,
  //         name: "Id mio",
  //         age: 37,
  //       },
  //     ])
  //     .catch((error) => console.log("Error: ", error))
  //     .then((data) => console.log("then: ", data));
  //   console.log("Inserted documents =>", insertResult);

  //   await db.collection("tasks").insertMany([
  //       {
  //         description: "Clean the house",
  //         completed: true,
  //       },
  //       {
  //         description: "Renew inspection",
  //         completed: false,
  //       },
  //       {
  //         description: "Pot plants",
  //         completed: false,
  //       },
  //     ])
  //     .catch((error) => console.log("Error: ", error))
  //     .then((data) => console.log("then: ", data));

  //para buscar
//   await db
//     .collection("users")
//     .findOne({ _id: new ObjectId("63dd8928c46d8ad325eae789") })
//     .then((data) => console.log("find:: ", data))
//     .catch((error) => console.log("error:: ", error));

//   await db
//     .collection("users")
//     .find({ age: 27 })
//     .toArray()
//     .then((data) => console.log("data::: ", data));

//   await db
//     .collection("users")
//     .find({ age: 27 })
//     .count()
//     .then((data) => console.log("data::: ", data));

//   await db
//     .collection("tasks")
//     .find({ completed: false })
//     .toArray()
//     .then((data) => console.log("tasks::: ", data));

//   await db
//     .collection("tasks")
//     .findOne({ _id: new ObjectId("63dd8928c46d8ad325eae78c") })
//     .then((data) => console.log("data:::::", data));


//update

// await db.collection('tasks').updateMany({completed: false},{ $set: { completed: true}}).then(result=>{
// console.log(result.modifiedCount)
// }).catch(error=>{
//     console.log(error)
// })

//delete

// await db.collection('users').deleteMany({
//     age:37
// }).then(result=>{
//     console.log(result)
//     }).catch(error=>{
//         console.log(error)
//     })

    await db.collection('tasks').deleteMany({
description: 'Clean the house'
    }).then(result=>{
        console.log(result)
        }).catch(error=>{
            console.log(error)
        })

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
