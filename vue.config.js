module.exports  = {
    devServer: {
        proxy: {
            '/users/': {
                target: 'http://gift.cbuyok.com',
                changeOrigin: true,
            }
        }
    }
}
