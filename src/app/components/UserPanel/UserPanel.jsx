import React, {Component} from 'react';
import {Panel, Button} from 'shared/components';

export default class UserPanel extends Component {
    static defaultProps = {
        showPhone: false,
        showUsername: false
    }
    render() {
        const {user, showUsername, showPhone} = this.props;
        const catchPhrase = user.getIn(['card', 'company', 'catchPhrase']);
        const bs = user.getIn(['card', 'company', 'bs']);
        return (
            <Panel className={'UserPanel'} title={`User ${user.get('uid')}`}>
                <h3>{catchPhrase}</h3>
                <p><i>{bs}</i></p>
                <ul>
                    {showUsername && <li>Username: <b>{user.getIn(['card', 'username'])}</b></li>}
                    <li>Name: {user.get('name')}</li>
                    <li>Email: {user.get('email')}</li>
                    {showPhone && <li>Phone: {user.getIn(['card', 'phone'])}</li>}
                </ul>
                <Button>button</Button>
                &nbsp;
                <Button disabled={true}>button</Button>
            </Panel>
        );
    }
}
