// const webpack = require('webpack'); 
// module.exports = function override(config) { 
// 		const fallback = config.resolve.fallback || {}; 
// 		Object.assign(fallback, { 
//     	"crypto": require.resolve("crypto-browserify"), 
//       "stream": require.resolve("stream-browserify"), 
//       "assert": require.resolve("assert"), 
//       "http": require.resolve("stream-http"), 
//       "https": require.resolve("https-browserify"), 
//       "os": require.resolve("os-browserify"), 
//       "url": require.resolve("url") 
//       }) 
//    config.resolve.fallback = fallback; 

//    config.resolve.fallback = { "path": require.resolve("path-browserify") }
//    resolve.fallback = { "os": false }

//    config.plugins = (config.plugins || []).concat([ 
//    	new webpack.ProvidePlugin({ 
//     	process: 'process/browser', 
//       Buffer: ['buffer', 'Buffer'] 
//     }) 
//    ]) 
//    return config; }



// https://dev.to/marcinwosinek/how-to-add-resolve-fallback-to-webpack-5-in-nextjs-10-i6j
// module.exports = {
//     future: {
//       webpack5: true,
//     },
//     webpack: (config) => {
//       config.resolve.fallback = { fs: false };
  
//       return config;
//     },
//   };