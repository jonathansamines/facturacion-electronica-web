export const credenciales = (req) => {
  if (req && req.cookies) {
    return {
      headers: {
        'cookie': `SESSION-ID=${req.cookies['SESSION-ID']}`
      }
    };
  }
};
