const express = require("express");
const multer = require("multer");
const User = require("../model/user");

const sharp = require("sharp");
const router = express.Router();
const auth = require("../middleware/auth");

const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
//#region USER ENDPOINTS

router.post("/users", async (req, res) => {
  //   console.log("req:: ", req.body);

  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log("error: ", e.message);
    res.status(400).send(e);
  }
  //   user
  //     .save()
  //     .then((result) => res.status(201).send(result))
  //     .catch((error) => {
  //       res.status(400).send(error);
  //       // res.send(error)
  //     });
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (e) {
    console.log("msg: ", e.message);
    res.status(500).send(e.message);
  }
});

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//you can pass a middleware like second argument::
router.get("/users", auth, async (req, res) => {
  try {
    const result = await User.find({});

    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }

  //   User.find({})
  //     .then((users) => res.send(users))
  //     .catch((error) => res.status(500).send(error));
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }

  //   User.findById(_id)
  //     .then((user) => {
  //       if (!user) {
  //         return res.status(404).send();
  //       }

  //       res.send(user);
  //     })
  //     .catch((error) => res.status(500).send(error));
});

//this actio could be only performance by auth users
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // const user = await User.findById(req.params.id);

    // if (!user) {
    //   return res.status(404).send();
    // }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    //   const user = await User.findByIdAndDelete(req.user._id);
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    console.log('Error:::', e.message)
    res.status(500).send();
  }
});

// router.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

const upload = multer({
  //dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Select a valid file (jpg, jpeg, png)"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    //req.file.buffer solo podemos obtener este valor si no hemos seteado el dest: "avatars" en la config
    // req.user.avatar = req.file.buffer;
    console.log("llegue::: ", req.file.buffer);
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;

    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;

  await req.user.save();
  res.send({ message: "profile imagen deleted" });
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    // res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

//#endregion USER ENDPOINTS
//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
module.exports = router;
