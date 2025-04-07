module.exports = async (req, res) => {
    const { url } = req.query; // Получаем параметр url из запроса
  
    if (!url) {
      return res.status(400).send('No URL provided');
    }
  
    try {
      // Выполняем запрос на внешний сервер
      const imageResponse = await fetch(url);
      const buffer = await imageResponse.buffer();
  
      // Возвращаем картинку с корректным заголовком
      res.setHeader('Content-Type', imageResponse.headers.get('Content-Type'));
      res.send(buffer);
    } catch (error) {
      return res.status(500).send('Failed to fetch the image');
    }
  };