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
        AIR_TABLE_API_KEY: process.env.AIR_TABLE_API_KEY,
        NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        AIR_TABLE_BASE_ID_STATION: process.env.AIR_TABLE_BASE_ID_STATION,
        AIR_TABLE_API_KEY_STATION: process.env.AIR_TABLE_API_KEY_STATION,
        AIR_TABLE_BASE_ID_BRAND_BUSINESS: process.env.AIR_TABLE_BASE_ID_BRAND_BUSINESS
    }
}