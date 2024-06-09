import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();


const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


app.use((req, res, next) => {
    if (req.hostname === 'a.example.com') {
      const socketProxy = createProxyMiddleware({
        target: 'http://localhost:2000',
        ws: true,
        changeOrigin: true,
      })(req, res, next);
      server.on('upgrade', socketProxy.upgrade);
    } else {
      next();
    }
  });
  


