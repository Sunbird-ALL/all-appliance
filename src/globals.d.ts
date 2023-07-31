// globals.d.ts

declare global {
    interface Window {
      context: any; // Replace 'any' with the type of 'context'
      config: any; // Replace 'any' with the type of 'config'
    }
  }
  
  // Export an empty object to avoid "isolatedModules" error
  export {};
  