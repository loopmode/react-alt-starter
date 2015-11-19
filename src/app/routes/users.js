const UserStore = require('app/alt/UserStore');
module.exports = {
    path: 'users',
    onEnter() {
        console.log('ok');
        UserStore.loadUsers(20);
    },
    onLeave() {
        UserStore.flush();
    },
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('app/pages/UsersPage'));
        });
    }
};
