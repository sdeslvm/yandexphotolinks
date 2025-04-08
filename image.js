const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const response = await axios({
            method: 'get',
            url: req.query.url,
            responseType: 'arraybuffer',
            headers: {
                'Referer': 'https://www.dekomo.ru'
            }
        });

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}; 