const express = require("express");
const app = express();
const cron = require("node-cron");
const fs = require("fs");
const mongoose = require("mongoose");
const connectDB = require('./database')
const routes = require('./routes/users')
const User = require('./database/models/User.model')

const users = async () => {
  try{
    const data = await User.find()
    return data;
  } catch (err) {
    console.error(err.message)
  }
}

// cron.schedule('*/10 * * * * *', async () => {
//   User.find().then(res => {
//     res.forEach(d => {
//       console.log(d._id)
//       User.findOneAndUpdate({_id: d._id}, {$inc: {age: 1}}).then(res => {
//   })
//     })
//   }).catch(err => console.error(err));
//   console.log('running a task every ten seconds');
// });
cron.schedule('*/10 * * * * *', async () => {
  await users();
  const data = await users();
  if(data && data.length < 1) {
    console.log('No user found in database, please add some users for node-cron to work with...')
    setTimeout(() => {
      console.log('...waiting for your data input')
    }, 5000)
  }
  data.forEach(async d => {
    await User.findOneAndUpdate({_id: d._id}, {$inc: {age: 1}});
  })
  console.log('running a task every ten seconds');
});

app.use('/api/v1/', routes)

const port = 6000;
app.listen(port, () => {
  console.log("server started on port " + port);
});
connectDB();
