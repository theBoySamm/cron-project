const express = require("express");
const router = express.Router();
const User = require("../database/models/User.model");

router.get("/", (req, res) => {
  res.send("Hello from index");
});

router.post("/user", async (req, res) => {
  try {
    const data = {
      name: "Jane Doe",
      email: "janedoe@email.com",
      password: "123456",
      age: 12,
    };
    const { name, email, password, age } = data;
    const user = new User({
      name,
      email,
      password,
      age,
    });
    const created_user = await user.save();
    res.json({
      message: "User created successfully",
      user: created_user,
      status: "successful",
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id)
    if (!id) {
      res.status(400).json({
        message: "Bad query parameter",
        status: "successful"
      })
      return;
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: "User does not exist in our records",
        status: "successful",
      });
      return;
    }
    return res.status(200).json({
      message: "User retrieved successfully",
      data: user,
      status: "successful",
    });
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/user/update/:id', async (req, res) => {
    try {
      const id = await req.params.id
      
      const user = await User.findById(id);
     
      if(!user) {
        res.status(404).json({
          message: "Cannot update a non-existing user",
          status: "successfull"
        })
        throw new Error('Cannot get a user without an id')
        return
      }
      const updated_user = await User.findOneAndUpdate({_id: id}, {$inc: {age: 1}});
      return res.status(200).json({
        message: "User details updated successfully",
        data: updated_user,
        status: "successful"
      })
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;
