```javascript
 "next-svgr": "^0.0.2"

const withSvgr = require('next-svgr')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  cssModules: true
}

module.exports = withSvgr(nextConfig)


import IconMind from '../../../public/mind.svg'
```

