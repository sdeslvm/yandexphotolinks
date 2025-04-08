const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const imageRes = await fetch(req.query.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://www.dekomo.ru/',
                'Accept': 'image/*'
            }
        });
        
        const buffer = await imageRes.buffer();
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(buffer);
    } catch (e) {
        res.status(500).send('Error');
    }
}; 