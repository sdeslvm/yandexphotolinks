module.exports = async (req, res) => {
    const { url } = req.query; // Получаем параметр URL из запроса
  
    if (!url) {
      return res.status(400).send('No URL provided'); // Если URL не передан
    }
  
    try {
      console.log(`Received URL: ${url}`); // Логируем полученный URL
  
      // Добавляем заголовки для имитации обычного браузера
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
  
      // Если ответ не успешный, возвращаем ошибку
      if (!response.ok) {
        console.error(`Failed to fetch image. Status: ${response.status}`);
        return res.status(response.status).send('Failed to fetch the image from the source');
      }
  
      // Получаем изображение
      const buffer = await response.buffer();
  
      // Устанавливаем заголовки для правильной отдачи изображения
      res.setHeader('Content-Type', response.headers.get('Content-Type'));
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      // Отправляем изображение
      res.send(buffer);
    } catch (error) {
      console.error(`Error occurred while fetching the image: ${error.message}`);
      return res.status(500).send('Error fetching the image');
    }
  };