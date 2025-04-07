module.exports = async (req, res) => {
    const { url } = req.query; // Получаем параметр URL из запроса
  
    if (!url) {
      return res.status(400).send('No URL provided');
    }
  
    try {
      console.log(`Fetching image from URL: ${url}`); // Логируем URL, который пытаемся загрузить
  
      // Проверка, что URL корректно закодирован
      const encodedUrl = encodeURIComponent(url);
      console.log(`Encoded URL: ${encodedUrl}`);
  
      // Выполняем запрос на внешний сервер
      const imageResponse = await fetch(encodedUrl);
  
      // Проверка на успешный ответ
      if (!imageResponse.ok) {
        console.log(`Failed to fetch image. Status: ${imageResponse.status}`); // Логируем статус ошибки
        return res.status(500).send('Failed to fetch the image from the source');
      }
  
      // Получаем содержимое изображения
      const buffer = await imageResponse.buffer();
  
      // Устанавливаем правильные заголовки для контента
      res.setHeader('Content-Type', imageResponse.headers.get('Content-Type'));
      res.send(buffer);
    } catch (error) {
      console.error(`Error fetching image: ${error.message}`); // Логируем ошибку
      return res.status(500).send('Failed to fetch the image');
    }
  };