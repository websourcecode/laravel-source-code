var Vue = require('vue');
var utils = require('./utils');
var Api = require('./Api').Api;

var config = window.adminConfig;

utils.vueExtra(Vue);
utils.csrfToken($, config.csrfToken);

var api = new Api(config.routes);

config.api = api;
config.statuses = ['all', 'pending', 'approved', 'spam', 'trash'];

new Vue({
    el: '#comments',
    components: {
        editModal: require('./components/edit-modal'),
    },
    data: {
        init: false,
        comments: [],
        page: 1,
        status: 'all',
        pageId: null,
        fetchRoute: null,
        pagination: {},
        statusCount: {},
        loading: true,
        redirected: false,
        bulkAction: 0,
        markedAll: false,
        editComment: null,
        config: config,
    },
    compiled() {
        this.init = true;
        this.fetch();
    },
    methods: {
        fetch() {
            this.loading = true;

            api.get({
                    page: this.page,
                    status: this.status,
                    pageId: this.pageId,
                })
                .done(data => this._fetchDone(data));
        },
        _fetchDone(data) {
            if (!data.comments.length && this.page > 1) {
                this.page = this.redirected ? 1 : this.page - 1;
                this.redirected = true;
                return this.fetch();
            }

            data.comments.forEach(comment => comment.mark = false);

            this.loading = false;
            this.comments = data.comments;
            this.pageCount = data.page_count;
            this.pagination = data.pagination;
            this.statusCount = data.status_count;

            setTimeout(() => {
                $(this.$el).find('[data-toggle="tooltip"]').tooltip();

                var id = utils.param('edit');

                if (id) {
                    api.find(id)
                       .done(comment => {
                            this.editComment = comment;
                        });
                }
            }, 1);
        },
        onCloseEdit(updated) {
            if (updated) {
                this.fetch();
            }

            this.editComment = null;

            window.location.hash = '';
        },
        markAll() {
            this.comments.forEach(comment => comment.mark = this.markedAll);
        },
        mark() {
            this.markedAll = this.comments.length === this.marked().length;
        },
        bulkUpdate(e) {
            e.preventDefault();

            var ids = this.marked().map(comment => comment.id);

            if (this.bulkAction && ids.length) {
                api.update('', {
                        ids: ids,
                        status: this.bulkAction,
                    })
                    .done(() => {
                        this.markedAll = false;
                        this.bulkAction = 0;
                        this.fetch();
                    });
            }
        },
        marked() {
            return this.comments.filter(comment => comment.mark);
        },
        updateStatus(comment, status, e) {
            this.highlight(e, status);

            api.update(comment.id, {status: status})
               .done(() => this.fetch());
        },
        destroy(comment, e) {
            this.highlight(e, 'trash');

            api.destroy(comment.id)
               .done(() => this.fetch());
        },
        highlight(e, status) {
            e.preventDefault();

            var tr = $(e.target).closest('tr');

            switch (status) {
                case 'trash':
                case 'spam':
                    return tr.addClass('danger');

                case 'pending':
                    return tr.addClass('warning');

                case 'approved':
                    return tr.removeClass('warning').addClass('success');
            }
        },
        highlighted(comment) {
            return comment.status === 'pending' && this.status !== 'pending';
        },
    }
});

new Vue({
    el: '#settings',
    components: {
        alert: require('./components/alert'),
    },
    data: {
        success: null,
        loading: false,
    },
    ready() {
        $(this.$el).find('.nav-tabs a').on('click', () => {
            this.success = null;
        });
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();

            this.loading = true;

            api.updateSettings($(e.target).serializeArray())
               .done(() => {
                    this.success = 'Your changes have been saved.';
               })
               .always(() => {
                    this.loading = false;
               });
        },
    }
});
