import React, {Component} from 'react';
import {UserStore} from 'app/alt';
import {connectToStores} from 'shared/alt';
import {UserPanel} from 'app/components';
import {SimpleGrid} from 'shared/components';

import Spinner from 'react-spinner';

const Stateful = connectToStores([
    {
        store: UserStore,
        props: ['users']
    }
]);
@Stateful
export default class UsersPage extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.users !== this.props.users) {
            return true;
        }
        return false;
    }
    render() {
        const {users} = this.props;
        if (!users.size) {
            return <Spinner />;
        }
        return (
            <SimpleGrid>
                {users.map(
                    (user, idx) => <UserPanel user={user} key={idx} showPhone={Math.random() > 0.5} showUsername={Math.random() > 0.5}/>
                )}
            </SimpleGrid>
        );
    }
}
