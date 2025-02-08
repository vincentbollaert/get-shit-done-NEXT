/* eslint-env node */
module.exports = (phase, { defaultConfig }) => {
  const config = {
    ...defaultConfig,
    compiler: {
      styledComponents: true,
    },
    swcMinify: true, // use swc over terser for up to 7x faster minify
  };

  return config;
};
