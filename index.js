import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const imageRes = await fetch(req.query.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'Referer': 'https://www.dekomo.ru/'
            }
        });

        const imageBuffer = await imageRes.arrayBuffer();
        res.setHeader('Content-Type', imageRes.headers.get('content-type'));
        res.send(Buffer.from(imageBuffer));
    } catch {
        res.status(500).end();
    }
}