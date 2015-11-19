import React, {Component} from 'react';
import {connectToStores} from 'shared/alt';
import {SimpleGrid} from 'shared/components';
const Stateful = connectToStores([
]);
@Stateful
export default class ImagesPage extends Component {
    render() {
        return (
            <div>
                <h1>Images</h1>
                <SimpleGrid />
            </div>
        );
    }
}
