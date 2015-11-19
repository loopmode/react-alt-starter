import connectToStores from 'alt/utils/connectToStores';
/* eslint-disable */
/**
 * A Decorator for immutable stores that wraps `alt/utils/connectToStores`.  
 * Adds the necessary static methods `getStores()` and `getPropsFromStores()`.   
 * Makes declared fields of the store available to the component via its `props` object.  
 * Supports name aliases: you can specify 'propName as aliasName' to make 'Store.propName' available as 'props.aliasName'.
 *
 * @param {Array<{store: AltStore, props: Array<string>}>} definitions A list of objects that each define a store and a list of property names.
 *
 * @example
 * import connectToStores from 'shared/decorators/connectToImmutableStores';
 * // we are interested in the 'myProp' value from MyStore
 * const propsFromStores = [{
 *      store: MyStore,
 *      props: ['myProp']
 * }];
 * @connectToStores(propsFromStores)
 * export default class MyContent extends React.Component {
 *      render() {
 *          const image = this.props.myProp;
 *          ...
 *      }
 * }
 * // you can use aliases too:
 * const propsFromStores = [{
 *      store: ContentStore,
 *      props: ['items as contentItems']
 * }, {
 *      store: GridStore,
 *      props: ['items as gridItems']
 * }];
 * @connectToStores(propsFromStores)
 * export default class MyContent extends React.Component {
 *      render() {
 *          // this.props.contentItems, this.props.gridItems, ...
 *      }
 * }
 * @see https://github.com/goatslacker/alt/blob/master/docs/utils/immutable.md
 * @see https://github.com/goatslacker/alt/blob/master/src/utils/connectToStores.js
 */
/* eslint-enable */
function connectToImmutableStores(definitions) {
    definitions = definitions || [];
    return function(targetClass) {
        targetClass.getStores = function() {
            return definitions.map((obj) => obj.store);
        };
        targetClass.getPropsFromStores = function() {
            const result = {};
            definitions.map((obj) => {
                const data = obj.store.getState();
                obj.props.map((prop) => {
                    let propName = prop,
                        alias = prop;

                    if (propName.match(' as ')) {
                        propName = prop.split(' as ')[0];
                        alias = prop.split(' as ')[1];
                    }

                    result[alias] = data.get(propName);
                });
            });
            return result;
        };
        return connectToStores(targetClass);
    };
}
export default connectToImmutableStores;
