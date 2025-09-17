// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

// Carrega a configuração padrão do Expo
const config = getDefaultConfig(__dirname);

// Adiciona o transformador para arquivos SVG
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

// Modifica as extensões de arquivo para que o SVG seja tratado como código
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");

// Exporta a configuração corrigida e completa
module.exports = config;
