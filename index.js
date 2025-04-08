const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).send('Нужен URL');
    }

    try {
        const response = await fetch(url);
        
        // Берём тип контента из оригинального ответа
        const contentType = response.headers.get('content-type');
        res.setHeader('Content-Type', contentType);
        
        // Просто передаём поток данных напрямую
        response.body.pipe(res);
        
    } catch (error) {
        res.status(500).send('Ошибка');
    }
};