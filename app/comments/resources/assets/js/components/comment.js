var utils = require('../utils');
var autosize = require('autosize');

var UP = 'up', DOWN = 'down', REMOVE = 'remove';

module.exports = {
    template: '#comment-template',

    props: ['config', 'parent', 'target', 'total'],

    data() {
        return {
            collapsed: false,
            showEdit: false,
            showReply: false,
            content: '',
            errors: null,
            loading: false,
        };
    },

    created() {
        this.config.events.on('comment.' + this.comment.id, comment => {
            this.comment.replies.unshift(comment);
        });
    },

    ready() {
        utils.timeago(this.$el);
        utils.highlight(this.$el);

        // var iframe = $(this.$el).find('iframe');
        // iframe.addClass('embed-responsive-item');
        // iframe.wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    },

    computed: {
        moderate() {
            return this.config.user && this.config.user.admin;
        },
        editable() {
            return (this.comment.canEdit && this.comment.status === 'approved') || this.moderate;
        },
        upvoted() {
            return this.comment.voted === UP;
        },
        downvoted() {
            return this.comment.voted === DOWN;
        },
    },

    methods: {
        /**
         * Toggle reply form.
         */
        reply(e) {
            e.preventDefault();

            this.showReply = !this.showReply;
        },

        /**
         * Show edit form.
         */
        edit(e) {
            e.preventDefault();
            this.showEdit = true;

            if (this.showReply) {
                this.showReply = false;
            }

            setTimeout(() => {
                autosize($(this.$el).find('textarea'));
            }, 1);
        },

        /**
         * Save comment.
         */
        save(e) {
            e.preventDefault();

            this.loading = true;

            this.config.api.update(this.comment.id, {content: this.content})
            .done(comment => {
                this.showEdit = false;
                this.errors = null;
                this.content = '';
                this.comment.content = comment.content;
                this.comment.contentHTML = comment.contentHTML;
                this.comment.status = comment.status;

                setTimeout(() => {
                    utils.highlight(this.$el);
                }, 1);
            })
            .always(() => {
                this.loading = false;
            })
            .fail((jqXHR) => {
                this.errors = jqXHR.responseJSON || 'Unexpected error.';
            });
        },

        /**
         * Upvote comment.
         */
        upvote(e) {
            this.vote(UP, e);
        },

        /**
         * Downvote comment.
         */
        downvote(e) {
            this.vote(DOWN, e);
        },

        /**
         * Vote comment.
         *
         * @param {string} type
         */
        vote(type, e) {
            e.preventDefault();

            if (!this.config.user) {
                alert('You must be logged in to vote!');
                return;
            }

            var api = this.config.api;

            // Remove vote.

            if (this.comment.voted === type) {
                this.comment.voted = null;

                if (type === UP) {
                    this.comment.upvotes -= 1;
                } else {
                    this.comment.downvotes -= 1;
                }

                api.vote(this.comment.id, REMOVE);

                return;
            }

            // Vote.

            if (this.comment.voted === UP && type === DOWN) {
                this.comment.upvotes -= 1;
            } else if (this.comment.voted === DOWN && type === UP) {
                this.comment.downvotes -= 1;
            }

            this.comment.voted = type;

            if (type === UP) {
                this.comment.upvotes += 1;
            } else {
                this.comment.downvotes += 1;
            }

            api.vote(this.comment.id, type);
        }
    }
};
