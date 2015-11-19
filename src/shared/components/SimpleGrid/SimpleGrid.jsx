import React, {Component, Children/*PropTypes*/} from 'react';
import cx from 'classnames';
import style from './SimpleGrid.scss';
export default class SimpleGrid extends Component {
    render() {
        return (
            <div className={cx(this.props.className, style.SimpleGrid, 'SimpleGrid')}>
                <ol className='grid'>
                    {Children.map(this.props.children, child => this.renderChild(child))}
                </ol>
            </div>
        );
    }
    renderChild(child) {
        return (
            <li className={'cell'}>
                <div className={'cell-content'}>
                    {child}
                </div>
            </li>
        );
    }
}
