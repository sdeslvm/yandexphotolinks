const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).send('Нужен URL');
    }

    try {
        const response = await fetch(url);
        
        // Проверяем успешность запроса
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Устанавливаем заголовки
        res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
        
        // Передаём картинку
        return response.body.pipe(res);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Ошибка загрузки изображения');
    }
};