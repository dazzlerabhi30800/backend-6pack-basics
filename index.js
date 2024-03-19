const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connected successfull");
  })
  .catch((err) => console.log(err));

const student = new mongoose.Schema({
  name: String,
  height: Number,
  workout: Boolean,
});

const Student = new mongoose.model("stats", student);

const adder = async () => {
  // const ss = new Student({
  //     name: "Abhishek",
  //     height: 5.8,
  //     workout: true,
  // });

  // await ss.save();
  const ss = await Student.create({
    name: "Michel",
    height: 6.1,
    workout: true,
  });

  //   const find = await Student.findOne({ height: { $eq: 5.9 } });
  const find = await Student.findOne({ height: { $gt: 5.9 } });
  console.log(find);
};
adder();
