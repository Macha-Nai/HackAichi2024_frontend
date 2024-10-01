export const safeEnv = {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string,
  VITE_MOCK_ENABLED: import.meta.env.VITE_MOCK_ENABLED as string,
  VITE_ALLOW_CRAWLER: import.meta.env.VITE_ALLOW_CRAWLER as string,
} as const;

Object.keys(safeEnv).forEach((key) => {
  if (safeEnv[key as keyof typeof safeEnv] === undefined) {
    throw new Error(`環境変数${key}が設定されていません`);
  }
});
