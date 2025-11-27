// src/config.ts
interface Config {
  apiUrl: string;
}

const getConfig = (): Config => {
  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  
  if (!apiUrl) {
    console.warn('VITE_API_URL is not defined, using fallback URL');
  }

  return {
    apiUrl: apiUrl || 'https://my-json-server.typicode.com/ouzzatDev/tanstack-react-query/',
  };
};

const config = getConfig();

export default config;