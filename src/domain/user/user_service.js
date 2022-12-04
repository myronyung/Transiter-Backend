const userManager = require('./internal/user_manager');
const userAuthManager = require('./internal/user_auth_manager');

module.exports = {
    user: {
        create: userManager.createUser,
        update: userManager.updateUser,
        get: userManager.getUser,
        remove: userManager.removeUser,
    },
    userAuth: {
        auth: userAuthManager.authUser,
        create: userAuthManager.createUserAuth,
        updatePassword: userAuthManager.updatePassword,
        remove: userAuthManager.removeUserAuth,
        get: userAuthManager.getUserAuth,
    }
};

