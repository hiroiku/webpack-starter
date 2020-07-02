module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  syntax: 'scss',
  rules: {
    'color-hex-length': 'short',
    'length-zero-no-unit': true,
    'number-leading-zero': 'always',
    'shorthand-property-no-redundant-values': true,
    'string-quotes': 'single',
  },
  root: true,
};
