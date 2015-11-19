import alt from 'app/alt';
import {decorate, datasource, bind} from 'alt/utils/decorators';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

import {ImmutableStore} from 'shared/alt';

import {
    UserSource,
    UserActions
} from 'app/alt';


@decorate(alt)
@datasource(UserSource)
@immutable
class UserStore extends ImmutableStore {

    constructor() {
        super({
            users: []
        });
    }

    @bind(UserActions.handleUser)
    addUser(data) {
        const users = this.state.get('users');
        this.change({
            users: users.push(Immutable.fromJS(data))
        });
    }
    @bind(UserActions.handleUsers)
    addUsers(data) {
        const users = this.state.get('users');
        this.change({
            users: users.concat(Immutable.fromJS(data))
        });
    }
}

export default alt.createStore(UserStore, 'UserStore');

