const { createProxyServer } = require('ims-proxy');
const express = require('express')
const app = express();
app.use(createProxyServer());
app.listen(80, '0.0.0.0');