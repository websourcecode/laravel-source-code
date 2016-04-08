var utils = require('../utils');
var autosize = require('autosize');

module.exports = {
    template: '#form-template',

    props: ['config', 'focus', 'show', 'parent', 'commentList', 'total'],

    data() {
        return {
            show: true,
            focus: false,
            loading: false,
            errors: null,
            parent: null,
            commentList: [],

            reWidgetId: null,
            content: '',
            authorName: '',
            authorEmail: '',
            authorUrl: '',
        };
    },

    attached() {
        this.recallAuthor();

        if (this.focus) {
            this.onFocus();
        }
    },

    watch: {
        focus(val) {
            if (val) {
                this.onFocus();
            }
        }
    },

    methods: {
        onFocus() {
            var $el = $(this.$el),
                $textarea = $el.find('textarea');

            autosize($textarea);

            $textarea.focus();

            if (this.config.captchaRequired) {
                this.renderRecaptcha($el.find('#recaptcha')[0]);
            }
        },

        onSubmit(e) {
            e.preventDefault();

            this.errors = null;
            this.loading = true;

            this.config.api.store({
                content: this.content,
                author_name: this.authorName,
                author_email: this.authorEmail,
                author_url: this.authorUrl,
                page_id: this.config.pageId,
                parent_id: this.parent ? this.parent.id : null,
                root_id: this.parent ? (this.parent.root_id || this.parent.id) : null,
                permalink: this.config.permalink,
                'g-recaptcha-response': this.recaptchaResponse(),
            })
            .done(comment => this.onSuccess(comment))
            .fail(jqXHR => this.onError(jqXHR))
            .always(() => {
                this.loading = false;
            });
        },
        onSuccess(comment) {
            if (this.parent) {
                this.parent.replies.unshift(comment);
            } else {
                this.commentList.unshift(comment);
            }

            this.total += 1;

            if (this.parent) {
                this.show = false;
            } else {
                this.focus = false;
            }

            this.errors = null;
            this.content = '';

            this.rememberAuthor();
        },
        onError(jqXHR) {
            this.errors = jqXHR.responseJSON || 'Unexpected error.';

            if (this.reWidgetId !== null) {
                grecaptcha.reset(this.reWidgetId);
            }
        },

        cancel() {
            this.errors = null;

            if (this.parent) {
                this.show = false;
            } else {
                this.focus = false;
                this.content = '';
            }

            autosize.destroy($(this.$el).find('textarea'));
        },

        /**
         * Recall the author name, email and url from the browser local storage.
         */
        recallAuthor() {
            var author = window.localStorage.getItem(this.config.storageKey);

            try {
                author = JSON.parse(author);
            } catch (error) {}

            if (!author) return;

            if (author.name) {
                this.authorName = author.name;
            }

            if (author.email) {
                this.authorEmail = author.email;
            }

            if (author.url) {
                this.authorUrl = author.url;
            }
        },

        /**
         * Remember the author name, email and url in the browser local storage.
         */
        rememberAuthor() {
            window.localStorage.setItem(this.config.storageKey, JSON.stringify({
                name:  this.authorName,
                email: this.authorEmail,
                url:   this.authorUrl,
            }));
        },

        /**
         * Render reCAPTCHA widget.
         *
         * @param {string} container
         */
        renderRecaptcha(container) {
            this.reWidgetId = grecaptcha.render(container, {
                sitekey : this.config.recaptcha
            });
        },

        /**
         * Get reCAPTCHA response.
         *
         * @return {string}
         */
        recaptchaResponse() {
            if (this.reWidgetId === null) {
                return;
            }

            try {
                return grecaptcha.getResponse(this.reWidgetId);
            } catch (err) {}
        },
    }
};
