const mongoose = require('mongoose');
const User = mongoose.model('User');
const sha256 = require('js-sha256');
const jwt = require('jwt-then');

exports.register = async (req, res) => {
  const {name, email, password} = req.body;

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com|@bk.ru|@mail.ru/;

  if (!emailRegex.test(email))
    throw new Error(
      'Email is not supported from your domain. ' +
        'We supported only : @gmail.com, @mail.ru, @bk.ru, @hotmail.com, @live.com'
    );
  if (password.length < 6) throw new Error('Password must be atleast 6 characters long.');

  const userExists = await User.findOne({
    email,
  });

  if (userExists) throw new Error('User with same email already exits.');

  const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
  });

  await user.save();

  res.json({
    message: 'User [' + name + '] registered successfully!',
  });
};

exports.login = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (!user) throw new Error('Email and Password did not match.');

  const token = await jwt.sign({id: user.id}, process.env.SECRET);

  res.json({
    message: 'User logged in successfully!',
    token,
    userId: user.id
  });
};

exports.update = async function (req, res) {
  const updated = {
    name: req.body.name,
    lastName: req.body.lastName,
    description: req.body.description,
    imageSrc: {
      format: req.body.imageSrc.format,
      dataUrl: req.body.imageSrc.dataUrl,
    },
  }

  try {
    const user = await User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: updated},
        {new: true}
    )
    res.status(200).json(user)
  } catch (e) {
    throw Error(`Can't update a user data`);
  }
}

exports.getInfo = async function (req, res) {
  try {
    const articles = await User.find({_id: req.params.id})
    res.status(200).json(articles)
  } catch (e) {
    throw Error(`Can't find a user`);
  }
}

