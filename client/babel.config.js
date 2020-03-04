module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@babel/preset-env', { 'modules': false }],
  ],
  // presets: ["@vue/app"],
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk',
      },
    ],
  ],
  // plugins: [
  //   ['@babel/plugin-transform-modules-commonjs', {
  //     allowTopLevelThis: true,
  //   }],
  // ],
};
