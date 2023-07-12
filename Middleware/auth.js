export function authorize(req, res, next) {
    if (!req.signedCookies.user) {
      // User is not authenticated via cookie
      const authorizeHeader = req.headers.authorization;
      if (!authorizeHeader) {
        const err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
      }
      const auth = Buffer.from(authorizeHeader.split(' ')[1], 'base64').toString().split(':');
      const name = auth[0];
      const password = auth[1];
      if (name === 'Muhammad Bilal Arshad' && password === 'password456') {
        res.cookie('user', 'admin', { signed: true }); // Set the signed cookie
        return next();
      } else {
        const err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
      }
    } else {
      if (req.signedCookies.user === 'admin') {
        return next();
      } else {
        const err = new Error('You are not authenticated');
        err.status = 401;
        return next(err);
      }
    }
  }