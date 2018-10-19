export const credenciales = (req) => {
  if (!req) return undefined;

  return {
    headers: {
      'cookie': `SESSION-ID=${req.cookies['SESSION-ID']}`
    }
  }
};
