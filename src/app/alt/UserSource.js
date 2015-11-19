import Promise from 'promise';
import {UserActions} from 'app/alt';
import {User} from 'app/models';
import faker from 'faker';


const createRandomUser = () => new User({
    name: faker.name.findName(),
    email: faker.internet.email(),
    card: faker.helpers.createCard(),
});
const randomUsers = (n) => {
    const users = [];
    let id = 0;
    while (id++ < n) {
        users.push( createRandomUser() );
    }
    return users;
};

export default {

    loadUser() {
        return {
            success: UserActions.handleUser,
            error: UserActions.handleError,
            remote(id) {
                return new Promise(resolve => setTimeout(
                    () => resolve(createRandomUser({id})),
                    Math.random() * 500 + 50
                ));
            }
        };
    },

    loadUsers() {
        return {
            success: UserActions.handleUsers,
            error: UserActions.handleError,
            remote(state, amount=10) {
                return new Promise(resolve => setTimeout(
                    () => {
                        const users = randomUsers(amount);
                        resolve(users);
                    },
                    Math.random() * 700 + 50
                ));
            }
        };
    },

};

