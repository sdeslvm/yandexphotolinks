module.exports = async (req, res) => {
    const { url } = req.query; // Получаем параметр URL из запроса
  
    if (!url) {
      return res.status(400).send('No URL provided'); // Если URL не передан
    }
  
    try {
      console.log(`Received URL: ${url}`); // Логируем полученный URL
  
      // Выполняем запрос на внешний сервер с правильным URL
      const imageResponse = await fetch(url);
  
      // Если ответ не успешный, возвращаем ошибку
      if (!imageResponse.ok) {
        console.error(`Failed to fetch image. Status: ${imageResponse.status}`);
        return res.status(500).send('Failed to fetch the image from the source');
      }
  
      // Получаем изображение
      const buffer = await imageResponse.buffer();
  
      // Устанавливаем правильные заголовки для изображения
      res.setHeader('Content-Type', imageResponse.headers.get('Content-Type'));
      res.send(buffer);
    } catch (error) {
      console.error(`Error occurred while fetching the image: ${error.message}`);
      return res.status(500).send('Error fetching the image');
    }
  };