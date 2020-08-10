const webpack = require('webpack')

module.exports = {
    webpack: (config, { dev }) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
            })
        )
        return config
    },
    env: {
        AIR_TABLE_BASE_ID: process.env.AIR_TABLE_BASE_ID,
        AIR_TABLE_API_KEY: process.env.AIR_TABLE_API_KEY
    }
}