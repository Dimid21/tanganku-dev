declare global {
  namespace App {
    interface Platform {
      env: {
        R2_ASSETS: R2Bucket;
      };
    }
  }
}

export {};
