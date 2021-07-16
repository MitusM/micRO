// const config = require('../../core/upload/config/upload.json')
module.exports = (app) => {
    app.action('article:config', async (meta, res) => {
        console.log('⚡ meta', meta)
        res.json({
            ok: meta
        });
    })
    return app
}