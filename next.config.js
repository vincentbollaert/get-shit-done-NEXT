/* eslint-env node */
module.exports = (phase, { defaultConfig }) => {
  const config = {
    ...defaultConfig,
    compiler: {
      styledComponents: true,
    },
  };

  return config;
};
