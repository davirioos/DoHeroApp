// src/declarations.d.ts

// Mantenha o que já existe no arquivo
declare module "*.json" {
  const value: any;
  export default value;
}

// Adicione a declaração para módulos SVG
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
