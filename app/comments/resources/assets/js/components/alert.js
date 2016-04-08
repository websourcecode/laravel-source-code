module.exports = {
    template: '#alert-template',

    props: ['success', 'errors'],

    data() {
        return {
            success: null,
            errors: null,
        };
    },

    computed: {
        text() {
            return typeof this.errors === 'string';
        },
    },

    methods: {
        close() {
            this.errors = null;
            this.success = null;
        }
    }
};
