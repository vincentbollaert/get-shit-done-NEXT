/* eslint-env node */
export default (phase, { defaultConfig }) => {
  const config = {
    ...defaultConfig,
    compiler: {
      styledComponents: true,
    },
  };

  return config;
};
