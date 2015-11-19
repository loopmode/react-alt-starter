import React, {Component, PropTypes} from 'react';
export default class TreePanel extends Component {
    static propTypes = {
        data: PropTypes.shape({
            children: PropTypes.array
        })
    }
    render() {
        return (
            <div>
            </div>
        );
    }
}
