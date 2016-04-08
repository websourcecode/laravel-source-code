class Api {
    /**
     * Create a new api instance.
     *
     * @param  {object} routes
     * @return {void}
     */
    constructor(routes) {
        this.routes = routes;
    }

    /**
     * Retrieve comments.
     *
     * @param  {object} args
     * @return {object}
     */
    get(args) {
        return this.req(this.route('index'), 'GET', args);
    }

    /**
     * Store a comment.
     *
     * @param  {object} data
     * @return {object}
     */
    store(data) {
        return this.req(this.route('store'), 'POST', data);
    }

    /**
     * Find a comment by id.
     *
     * @param  {int} id
     * @return {object}
     */
    find(id) {
        return this.req(this.route('show', {id: id}), 'GET');
    }

    /**
     * Update a comment.
     *
     * @param  {int} id
     * @param  {object} data
     * @return {object}
     */
    update(id, data) {
        var route = this.route('update', {id: id});

        if (!id) {
            route = route.substr(0, route.length - 1);
        }

        return this.req(route, 'PUT', data);
    }

    /**
     * Delete a comment.
     *
     * @param  {int} id
     * @return {object}
     */
    destroy(id) {
        return this.req(this.route('destroy', {id: id}), 'DELETE');
    }

    /**
     * Vote a comment.
     *
     * @param  {int} id
     * @param  {int} type
     * @return {object}
     */
    vote(id, type) {
        return this.req(this.route('vote', {id: id}), 'POST', {type: type});
    }

    /**
     * Update settings.
     *
     * @param  {array} settings
     * @return {object}
     */
    updateSettings(settings) {
        return this.req(this.route('settings'), 'PUT', {settings: settings});
    }

    /**
     * Get the URL to a named route.
     *
     * @param  {string} name
     * @param  {object} params
     * @return {string}
     */
    route(name, params) {
        var route = this.routes[name] || '';

        if (params) {
            for (var key in params) {
                route = route.replace(':' + key, params[key]);
            }
        }

        return route;
    }

    /**
     * Perform an ajax request.
     *
     * @param  {string} route
     * @param  {string} type
     * @param  {object} data
     * @return {object}
     */
    req(route, type, data) {
        data = data || {};

        if (['POST', 'GET'].indexOf(type) < 0) {
            data._method = type;
            type = 'POST';
        }

        return $.ajax({
            url: route,
            type: type,
            data: data,
            dataType: 'json',
        });
    };
}

module.exports.Api = Api;
