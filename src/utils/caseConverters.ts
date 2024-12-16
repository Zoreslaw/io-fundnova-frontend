import { pascalCase } from "change-case";
import camelCase from "camelcase";

export const convertToPascalCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertToPascalCase(item));
  } else if (obj && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const pascalKey = pascalCase(key);
      acc[pascalKey] = convertToPascalCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};

export const convertToCamelCase = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map((item) => convertToCamelCase(item));
    } else if (obj && typeof obj === "object") {
      return Object.keys(obj).reduce((acc, key) => {
        const camelKey = camelCase(key);
        acc[camelKey] = convertToCamelCase(obj[key]);
        return acc;
      }, {} as any);
    }
    return obj;
  };