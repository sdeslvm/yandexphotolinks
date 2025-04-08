const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).send('URL required');
    }
  
    try {
      const response = await fetch(url);
      const buffer = await response.buffer();
      
      res.setHeader('Content-Type', response.headers.get('content-type'));
      res.send(buffer);
    } catch (error) {
      res.status(500).send('Error loading image');
    }
};