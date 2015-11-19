import Immutable from 'immutable';

export default class ImmutableStore {
    constructor(data) {
        this.init(data);
        this.exportPublicMethods({
            getItemById: this.getItemById,
            getIndexById: this.getIndexById,
            flush: this.flush,
        });
    }
    flush = () => {
        return this.setState(Immutable.fromJS(this.initialData));
    }
    init(data) {
        this.initialData = data;
        this.state = Immutable.fromJS(data);
        return this.state;
    }

    getItemById = (id, listName) => {
        return this.find(listName || 'items', {id});
    }

    getIndexById = (id, listName) => {
        listName = listName || 'items';
        const list = this.state.get(listName);
        if (list) {
            return list.indexOf(this.find(listName, {id}));
        }
        return -1;
    }

    /**
     * Changes a property to a new value.
     * There are three modes of calling this function:
     *
     * __change('key', value)__
     * changes one property of the state object.
     * @see https://facebook.github.io/immutable-js/docs/#/Map/set
     *
     * __change({key: value, ...})__
     * changes any number of state properties at once
     * @see https://facebook.github.io/immutable-js/docs/#/Map/mergeDeep
     *
     * __change({id:5}, {key: value})__
     * changes any number of properties on any matching item within a list
     * @see {@link #changeItem()}
     * @see https://facebook.github.io/immutable-js/docs/#/Map/mergeDeep
     */
    change(prop, value) {
        if (arguments.length === 2 && typeof prop !== 'string') {
            this.changeItem(prop, value);
        } else
        if (arguments.length === 2) {
            this.setState(this.state.set(prop, Immutable.fromJS(value)));
        } else {
            this.setState(this.state.merge(Immutable.fromJS(prop)));
        }
    }

    /**
     * Changes a specific item in a list within the state object.
     *
     * @param {object} filter - An object that specifies key/value pairs that must be matched by list items
     * @param {string} [filter.list] - The name of the list to search in. Defaults to 'items'
     * @param {object} data - An object containing key/value pairs for data to be set at matched items
     * @returns {number} The number of items that matched the filter
     */
    changeItem(filter, data) {
        const listName = filter.list || 'items';
        const matches = this.find(listName, filter.item);
        const list = this.state.get(listName).merge(
            matches.map((item) => item.merge(data))
        );
        this.change(listName, list);
        return matches.size;
    }

    /**
     * Returns a list of items that match a filter.
     *
     * @param {string} listName - The name of the list within the state object.
     * @param {object} filter - An object with key/value pairs to test items against
     * @returns {List} A new immutable list that only contains items that matched all key/value pairs of `filter`
     */
    find(listName, filter) {
        return this.state.get(listName).find((item) => {
            let match = true;
            Object.keys(filter).map((prop) => {
                if (match && item.get(prop) !== filter[prop]) {
                    match = false;
                }
            });
            return match;
        });
    }

    useApi() {
        return this.getInstance();
    }
}

