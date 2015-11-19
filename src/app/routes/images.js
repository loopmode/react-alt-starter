module.exports = {
    path: 'images',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('app/pages/ImagesPage'));
        });
    }
};
