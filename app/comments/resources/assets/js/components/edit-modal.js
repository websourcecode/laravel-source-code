var autosize = require('autosize');
var utils = require('../utils');

module.exports = {
    template: '#edit-modal-template',

    components: {
        alert: require('./alert'),
    },

    props: ['config', 'comment', 'onClose'],

    data() {
        return {
            status: '',
            content: '',
            authorUrl: '',
            authorName: '',
            authorEmail: '',
            success: null,
            loading: false,
            updated: false,
        }
    },

    computed: {
        user() {
            return this.comment && this.comment.user_id;
        },
    },

    ready: function() {
        $('#edit-modal').on('hide.bs.modal', () => {
            this.onClose(this.updated);

            this.success = null;
            this.loading = false;
            this.updated = false;
        });
    },

    watch: {
        comment(comment) {
            if (comment) {
                this.update(comment);

                $('#edit-modal').modal('show');

                autosize($(this.$el).find('textarea'));
            }
        },
    },

    methods: {
        update(comment) {
            this.status = comment.status;
            this.content = comment.content;
            this.authorUrl = comment.author.url;
            this.authorName = comment.author.name;
            this.authorEmail = comment.author.email;
        },

        onSubmit(e) {
            e.preventDefault();

            this.success = null;
            this.loading = true;

            this.config.api.update(this.comment.id, {
                status: this.status,
                content: this.content,
                author_url: this.authorUrl,
                author_name: this.authorName,
                author_email: this.authorEmail,
            })
            .done(comment => {
                this.update(comment);
                this.updated = true;
                this.success = 'Your changes have been saved.';
            })
            .always(() => {
                this.loading = false;
            });
        },
    },
};
