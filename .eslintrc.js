module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential'
        // '@vue/standard'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'space-before-function-paren': 0,

        'no-whitespace-before-property': 0,

        'eol-last': 0,
        indent: ['off'],
        'vue/multi-word-component-names': 'off',
        'keyword-spacing': [0, {
            before: true,
            after: true
        }],
        'space-before-blocks': [0, 'always'],

        'space-in-parens': [0, 'never'],
        'space-infix-ops': 0,
        'space-unary-ops': [0, {
            words: false,
            nonwords: false
        }],

        'spaced-comment': [0, 'always', {
            markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
        }]

    }
}