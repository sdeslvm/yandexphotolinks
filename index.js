const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const response = await fetch(req.query.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://www.dekomo.ru/'
            }
        });
        const buffer = await response.buffer();
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(buffer);
    } catch (error) {
        res.status(500).send('Error');
    }
};