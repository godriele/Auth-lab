const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

// ------------------------- Find a user by Github ID -------------------------

  findByGithubId: (githubId) => {
    const user = database.find((user) => user.githubId === githubId)
    if (user) {
      return user;
    }
    throw new Error(`Cannot find user with Github ID : ${githubId}`);
  },

  // Add a new user (for github login or local user)
  create: (newUser) => {
    // Simulate auto-incrementing user ID for simplicity
    const newId = database.length + 1;
    newUser.id = newId;
    return newUser
  },
  
};
module.exports = { database, userModel };
