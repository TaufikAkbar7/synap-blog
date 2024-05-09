module.exports = {
  webpack(config) {
    // config svgr
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    return config
  }
}
