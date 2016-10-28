require('babel-polyfill');

const environment = {
    development: {
        isProduction: false,
        api: 'http://127.0.0.1:8000/api'
    },
    production: {
        isProduction: true,
        api: '/api'
    }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
    apiHost: process.env.APIHOST || 'admin.karambacars.com',
    apiPort: process.env.APIPORT || '8000',
    app: {
        title: 'Karambacars',
        description: 'Karambacars description.',
        head: {
            titleTemplate: '%s | Karambacars',
            meta: [
                {name: 'description', content: 'Karambacars description.'},
                {charset: 'utf-8'}
            ]
        }
    }
}, environment);
