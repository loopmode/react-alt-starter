var uid = 0;
export default (data) => ({
    ...data,
    uid: (uid++)
});
