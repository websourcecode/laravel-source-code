module.exports = {
    /**
     * Build comment tree.
     *
     * @param  {object} comment
     * @return {object}
     */
    hierarchical(comment) {
        comment.replies = buildTree(comment.replies, comment.id);
    },

    /**
     * Convert to a human readable date.
     *
     * @param  {string} selector
     * @return {string}
     */
    timeago(selector) {
        jQuery(selector).find('time').timeago();
    },

    /**
     * Scroll to given position.
     *
     * @param {int} scrollTop
     * @param {int} speed
     */
    scroll(scrollTop, speed) {
        $('body, html').animate({scrollTop: scrollTop}, speed || 400);
    },

    /**
     * Get url param.
     *
     * @param  {string} name
     * @param  {mixed} _default
     * @return {mixed}
     */
    param(name, _default) {
        var fragment = extractParam('_escaped_fragment_', window.location.search),
            str = fragment ? '#' + fragment : window.location.hash.replace('#!', '#');

        return parseInt(extractParam(name, str, true)) || _default;
    },

    /**
     * Highlight code blocks.
     *
     * @param {string} element
     */
    highlight(element) {
        if (window.Prism) {
            $(element).find('pre code').each((i, block) => {
                Prism.highlightElement(block);
            });
        }
    },

    /**
     * Add csrf token in the headers.
     *
     * @param {object} jq
     * @param {string} token
     */
    csrfToken(jq, token) {
        jq.ajaxSetup({headers: {'X-CSRF-TOKEN': token}});
    },

    /**
     * Add custom functions to Vue.
     *
     * @param {object} Vue
     */
    vueExtra(Vue) {
        // Vue.config.debug = true;
        Vue.config.silent = true;

        Vue.directive('loading', {
            update(value) {
                var state, text = 'Loading...';

                if (typeof value === 'boolean') {
                    state = value;
                } else {
                    state = value.state;
                    text = value.text || text;
                }

                this.el.disabled = !!state;

                var $el = $(this.el);

                if (state) {
                    this.originalText = $el.text();
                    $el.text(text);
                } else if (this.originalText) {
                    $el.text(this.originalText);
                }
            }
        });

        Vue.directive('disable', function(value) {
            this.el.disabled = !!value
        });

        Vue.transition('fade', {
            enter(el, done) {
                $(el).css('opacity', 0)
                     .animate({ opacity: 1 }, 300, done);
            },
            enterCancelled(el) {
                $(el).stop()
            },
            leave(el, done) {
                $(el).animate({ opacity: 0 }, 300, done);
            },
            leaveCancelled(el) {
                $(el).stop();
            }
        });

        Vue.filter('emoji', function(content) {
            if (window.twemoji) {
                return twemoji.parse(content, {size: 36});
            }

            return content;
        });
    }
};

/**
 * Extract param from query or hash.
 *
 * @param  {string}  name
 * @param  {string}  str
 * @param  {boolean} isHash
 * @return {string|null}
 */
var extractParam = (name, str, isHash) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

    var regex = new RegExp((isHash ? '[\\#]' : '[\\?&]') + name + '=([^&#]*)'),
        results = regex.exec(str);

    return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : null;
}

/**
 * Build replies tree.
 *
 * @param  {array} comments
 * @param  {int}   parentId
 * @return {array}
 */
var buildTree = (comments, parentId) => {
    var result = [];

    comments.forEach(comment => {
        if (comment.parent_id === parentId) {
            comment.replies = buildTree(comments, comment.id);
            result.push(comment);
        }
    });

    return result;
}
