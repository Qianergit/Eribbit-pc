const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
    transpileDependencies: [
        'vuetify'
    ],
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.join(__dirname, './src/assets/style/variables.less'),
                path.join(__dirname, './src/assets/style/mixins.less')
            ]
        }
    },
   
})
