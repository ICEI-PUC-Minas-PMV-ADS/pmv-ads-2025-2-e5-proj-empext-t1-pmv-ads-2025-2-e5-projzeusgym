module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 1. Plugins que são apenas strings (como Reanimated)
      'react-native-reanimated/plugin',
      
      // 2. Plugins que precisam de um Array de configuração
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env', 
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};