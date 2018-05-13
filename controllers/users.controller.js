const mongoose = require('mongoose');
const User = require('../models/user.model');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        next(new ApiError('User already registered', 400));
      } else {
        user = new User(req.body);
        user.save()
          .then(() => {
            res.json(user);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              next(new ApiError(error.message, 400, error.errors));
            } else {
              next(error);
            }
          });
      }
    }).catch(error => next(new ApiError('User already registered', 400)));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id

  User.findById(id)
    .then( user => {
      if (user) {
        res.json(user);
      } else {
        next(new ApiError(`User not found`, 404));
      }
    })
    .catch(error => next(error));
}

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  const { name, email, birthDate, address } = req.body;
  let updates = { name, email, birthDate, address };

  User.findByIdAndUpdate(id, { $set: updates }, { new: true })
    .then( user => {
      if (user) {
        res.status(201).json(user)
      } else {
        next(new ApiError(`User not found`, 404));
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}

module.exports.destroy = (req, res, next) => {
   const id = req.params.id;

   User.findByIdAndRemove(id)
   .then(user => res.status(204).json())
   .catch(error => next(new ApiError(error.message, 404)));
};
