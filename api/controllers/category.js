const User = require('../models/User')
const mongoose = require("mongoose");
const Category = mongoose.model('articles');

exports.getAll = async function (req, res) {

  try {
    const articles = await Category.find()
    res.status(200).json(articles)
  } catch (e) {
    throw new Error(`Can't find articles`);

  }
}

exports.getById = async function (req, res) {

  try {
    const category = await Category.find({
      'user.id': req.params.id
    })
    res.status(200).json(category)
  } catch (e) {
    throw new Error(`Can't find an article`);
  }
}

exports.getByIdOneArt = async function (req, res) {

  try {
    const category = await Category.find({_id: req.params.id})
    res.status(200).json(category)
  } catch (e) {
    throw new Error(`Can't find an article`);
  }
}

exports.remove = async function (req, res) {

  try {
    await Category.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Category was deleted'
    })
  } catch (e) {
    throw new Error(`Can't delete an article`);
  }
}

exports.create = async (req, res) => {
    const user = await User.findById(req.body.id)
    const category = new Category({
      title: req.body.title,
      textArt: req.body.textArt,
      user: {
        name: user.name,
        lastName: user.lastName,
        id: req.body.id,
        imageSrc: {
          format: user.imageSrc.format,
          dataUrl: user.imageSrc.dataUrl,
        },
      },
      imageSrc: {
        format: req?.body?.imageSrc?.format,
        dataUrl: req?.body?.imageSrc?.dataUrl,
      },
      category: '#' + req.body.category,
      count: req.body.count,
      data: req.body.data,
    })
    await category.save()
  res.json({
    message: 'Article was created successfully',
  });
}

exports.update = async function (req, res) {

  const updated = {
    title: req.body.title,
    textArt: req.body.textArt,
    category: req.body.category,
    moderation: req.body.moderation
  }

  if (req.file) {
    updated.imageSrc = req.file.path
  }

  try {
    const category = await Category.findOneAndUpdate(
      {_id: req.body.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(category)
  } catch (e) {
    throw Error(`Can't update an article`);
  }
}

exports.countWatch = async function (req, res) {

  const myArticle = await Category.find({_id: req.params.id})

  let updated = {
    count: myArticle[0].count + 1
  }

  try {
    const category = await Category.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(category)
  } catch (e) {
    throw Error(`Can't update an article`);
  }
}
