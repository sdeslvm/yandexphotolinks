const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).send('URL required');
    }
  
    try {
      const response = await fetch(url, {
        // Добавляем базовые заголовки, чтобы сайт не блокировал запрос
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
          'Accept': 'image/*'
        }
      });

      if (!response.ok) {
        console.error(`Failed to fetch image. Status: ${response.status}`);
        return res.status(response.status).send(`Failed to fetch image. Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('image')) {
        return res.status(400).send('URL does not point to an image');
      }

      const buffer = await response.buffer();
      
      // Явно указываем тип контента и отключаем кэширование
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Length', buffer.length);
      res.end(buffer);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send(`Error loading image: ${error.message}`);
    }
};