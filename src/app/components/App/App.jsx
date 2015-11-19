import css from './App.scss';
import cx from 'classnames';
import React, {Component} from 'react';
import {UserStore} from 'app/alt';
import {connectToStores} from 'shared/alt';
import {Navigation} from 'app/components';
const StatefulApp = connectToStores([
    {
        store: UserStore,
        props: ['currentUser']
    }
]);
@StatefulApp
export default class App extends Component {
    render() {
        const {currentUser} = this.props;
        console.info(currentUser);
        return (
            <div className={cx('App', css.App)}>
                <Navigation />
                <div className='PageContainer'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
