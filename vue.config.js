const webpack = require('webpack');
module.exports  = {
    devServer: {
        proxy: {
            '/users/': {
                target: 'http://gift.cbuyok.com',
                changeOrigin: true,
            }
        }
    },
    configureWebpack: {
        externals: {         // 使用CDN数据
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vant': 'vant'
        },
        entry: {
            common: './src/assets/js/area.js',
            app: './src/main.js'
        },
        plugins: [
            new webpack.optimization.splitChunks({
                name: 'common'
            })
        ]
    }
}
