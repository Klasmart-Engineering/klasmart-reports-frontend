module.exports = function (api) {
  api.cache(true);
  const presets = [
      [
          `@babel/preset-env`,
          {
              targets: {
                  edge: `17`,
                  firefox: `60`,
                  chrome: `67`,
                  safari: `11.1`,
                  ie: `11`,
              },
          },
      ],
      `@babel/preset-react`,
      `@babel/preset-typescript`,
  ];

  const plugins = [];

  return {
      presets,
      plugins,
  };
};