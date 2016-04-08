var Vue = require('vue');
var Events = require('minivents');

var utils = require('./utils');
var Api = require('./Api').Api;
var Listener = require('./Listener').Listener;

module.exports = function(el, config) {
    var api = new Api(config.routes);

    config.api = api;
    config.events = new Events();

    return new Vue({
        el: el,

        template: '#comments-template',

        components: {
            post: require('./components/post'),
            alert: require('./components/alert'),
            comment: require('./components/comment'),
        },

        data: {
            loading: false,
            initialized: false,
            config: config,

            sort: null,
            sortText: '',
            sortOptions: config.sortOptions,

            page: utils.param('page', 1),
            target: utils.param('comment', null),

            total: 0,
            pagination: {},
            commentList: [],
        },

        compiled() {
            this.sortBy(config.sortBy);

            if (config.broadcasting) {
                this.initListener();
            }
        },

        methods: {
            /**
             * Fetch comments.
             */
            fetch() {
                this.loading = true;

                api.get({
                    page: this.page,
                    sort: this.sort,
                    target: this.target,
                    page_id: config.pageId,
                })
                .done(this._fetchDone.bind(this));
            },

            /**
             * Fetch done callback.
             *
             * @param {object} data
             */
            _fetchDone(data) {
                data.comments.forEach(utils.hierarchical);

                this.total = data.total;
                this.pagination = data.pagination;
                this.commentList = data.comments;

                this.loading = false;
                this.initialized = true;

                // Scroll to target comment.
                if (this.target) {
                    setTimeout(() => {
                        var comment = $('#comment-' + this.target);
                        if (comment.length) {
                            utils.scroll(comment.offset().top - 15, 200);
                        }
                    }, 1);
                }
            },

            /**
             * Sort comments.
             *
             * @param {int} sort
             * @param {object} e
             */
            sortBy(sort, e) {
                if (e) {
                    e.preventDefault();

                    this.page = 1;
                    this.target = null;
                }

                if (sort !== this.sort || !e) {
                    this.sort = sort;
                    this.sortText = this.sortOptions[sort];

                    this.fetch();
                }
            },

            /**
             * Change current page.
             *
             * @param {int} page
             * @param {object} e
             */
            changePage(page, e) {
                if (page) {
                    utils.scroll($('.comments').offset().top);

                    this.page = page;
                    this.target = null;
                    this.fetch();
                } else {
                    e.preventDefault();
                }
            },

            /**
             * Initialize listener.
             */
            initListener() {
                var listener = new Listener('comment.' + this.config.pageId, this.config.broadcasting);

                listener.on('Hazzard\\Comments\\Events\\BroadcastCommentWasPosted', data => this.pushComment(data.comment));
            },

            /**
             * Push comment into the list.
             *
             * @param  {object} data
             * @return {void}
             */
            pushComment(comment) {
                if (comment.uid === this.config.uid) {
                    return;
                }

                this.total += 1;

                if (comment.parent_id) {
                    this.config.events.emit('comment.' + comment.parent_id, comment);
                } else {
                    this.commentList.unshift(comment);
                }
            },
        },
    });
};
