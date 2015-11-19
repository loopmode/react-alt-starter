import React, {Component, /*PropTypes*/} from 'react';
import {IndexLink, Link} from 'react-router';
import cx from 'classnames';
import style from './Navigation.scss';
export default class Navigation extends Component {
    render() {
        return (
            <nav className={cx('Navigation', style.Navigation, this.props.className)}>
                <IndexLink to='/'>home</IndexLink>
                <Link to='users'>users</Link>
            </nav>
        );
    }
}
