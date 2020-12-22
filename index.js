const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const mongoose = require("mongoose");
const User = require("./models/UserModel");
const path = require("path");
const pug = require("pug");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors("*"));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

mongoose.connect(
  "mongodb+srv://Ayan:1234ayan@contactkeeper.lc9s0.mongodb.net/TechFest?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB connected..");
    }
  }
);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Yoyoyoyoyoy");
});

app.get("/pugtest", (req, res) => {
  res.render("index", { email: "asasa", link: "/confirmed" });
});

app.post("/sendmail", (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let name = req.body.name;
  let mobile = req.body.mobile;
  let event = req.body.event;

  const token = jwt.sign(
    {
      email: email,
      event: event,
    },
    "secret",
    { expiresIn: "1h" }
  );

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ayanadhya1999@gmail.com",
      pass: "1234ayan",
    },
  });

  let mailOptions = {
    from: "ayanadhya1999@gmail.com",
    to: email,
    subject: "Test123",
    html: pug.renderFile(`${__dirname}/views/index.pug`, {
      email: email,
      event: event,
      name: name,
      mobile: mobile,
      link: `http://localhost:5000/confirmed/${token}`,
    }),
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error che la", err);
      res.send({
        status: "true",
      });
    } else {
      User.findOne({ email, event }).then((user) => {
        if (user) {
          return res.status(400).json({
            msg: "User already is registered",
          });
        }

        const newUser = new User({
          name,
          email,
          mobile,
          event,
        });

        newUser
          .save()
          .then(() => {
            console.log("User saved");
            res.send({
              status: "true",
            });
          })
          .catch((err) => {
            console.log("User not saved", err);
            res.send({
              status: "false",
            });
          });
      });

      console.log("Thai gayu la");
    }
  });
});

app.get("/confirmed/:token", async (req, res) => {
  const token = req.params.token;

  jwt.verify(token, "secret", (err, decoded) => {
    console.log(decoded);

    if (err) {
      console.log(err);
      res.redirect("http://localhost:3000");
    } else {
      const email = decoded.email;
      const event = decoded.event;
      User.findOneAndUpdate(
        { email, event },
        {
          registered: true,
        }
      )
        .then(() => {
          console.log("User registered");
        })
        .catch((err) => {
          console.log("User registeration failed");
        });

      console.log("Hogaya, sahi hai");
      res.redirect("http://localhost:3000");
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
