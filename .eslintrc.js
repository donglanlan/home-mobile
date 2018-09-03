// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential'],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 要求箭头函数的参数使用圆括号
    'arrow-parens': 0,
    // 函数中 * 号周围有空格
    'generator-star-spacing': 0,
    'semi': [2, 'never'],
    'no-tabs': 0,
    // 强制使用一致的缩进
    indent: 0,
    // 方法括号前面的空格
    'space-before-function-paren': 0
  }
}
