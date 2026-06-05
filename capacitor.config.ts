import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yaalu.app',
  appName: '얄루',
  webDir: 'www',
  server: {
    url: 'https://yaalu-connect-culture.lovable.app',
    androidScheme: 'https'
  }
};

export default config;