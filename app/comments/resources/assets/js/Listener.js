class Listener {
    /**
     * Create a new instance.
     *
     * @param  {string} channel
     * @param  {object} config
     * @return {void}
     */
    constructor(channel, config) {
        this.channel  = channel;
        this.driver   = config.driver;
        this.instance = this.createDriver(config);
    }

    /**
     * Listen for events.
     *
     * @param  {string}   event
     * @param  {Function} callback
     * @return {object}
     */
    on(event, callback) {
        switch(this.driver) {
            case 'pusher':
                return this.instance.subscribe(this.channel).bind(event, callback);

            case 'redis':
                return this.instance.on(this.channel + ':' + event, callback);
        }
    }

    /**
     * Create a new driver instance.
     *
     * @param  {object} config
     * @return {object}
     */
    createDriver(config) {
        switch(config.driver) {
            case 'pusher':
                return new Pusher(config.pusherKey);

            case 'redis':
                return io(config.socket);
        }
    }
}

module.exports.Listener = Listener;
