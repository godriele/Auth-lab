const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}


// ---------------------- New Functions for Github Authentication ---------------------------------


const getUserByGithubID = (githubID) => {
  return userModel.findOne ({ githubID: githubID});
};

const createUser = (newUser, callback) => {
  userModel.create(newUser, (err, createdUser) => {
    if (err) return callback(err, null);
    callback(null, createdUser);
  });
}

// -----------------------------------------------------------------------------------------------
module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGithubID,
  createUser
};
