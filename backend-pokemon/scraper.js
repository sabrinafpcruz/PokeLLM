const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePage(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const contentDiv = $('#mw-content-text .mw-parser-output');

    let info = '';
    contentDiv.find('p').each((index, element) => {
      const paragraph = $(element).text().trim();
      if (paragraph) {
        info += paragraph + '\n';
        if (index >= 1) return false;
      }
    });

    return info;

  } catch (error) {
    console.error('Erro ao realizar scraping:', error);
    return null;
  }
}

module.exports = { scrapePage };
