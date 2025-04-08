const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).send('Нужен URL');
    }

    try {
        const response = await fetch(url);
        const data = await response.blob();
        const arrayBuffer = await data.arrayBuffer();
        res.send(Buffer.from(arrayBuffer));
    } catch (error) {
        res.status(500).send('Ошибка');
    }
};