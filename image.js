const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).send('No URL provided');
    }

    try {
        const imageRes = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'Referer': 'https://www.dekomo.ru/',
                'Origin': 'https://www.dekomo.ru'
            }
        });

        if (!imageRes.ok) {
            throw new Error(`Image fetch failed with status ${imageRes.status}`);
        }

        const contentType = imageRes.headers.get('content-type');
        const arrayBuffer = await imageRes.arrayBuffer();
        
        res.setHeader('Content-Type', contentType || 'image/jpeg');
        res.send(Buffer.from(arrayBuffer));
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send(error.message);
    }
}; 