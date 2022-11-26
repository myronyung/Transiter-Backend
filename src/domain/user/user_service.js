const userManager = require('./internal/user_manager');

module.exports = {
    user: {
        create: userManager.createUser,
        update: userManager.updateUser,
        get: userManager.getUser,
        remove: userManager.removeUser,
    }
};

