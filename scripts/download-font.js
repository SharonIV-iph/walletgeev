const https = require('https');
const fs = require('fs');
const path = require('path');

const fontUrl = 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400&display=swap';

// First get the CSS file to extract the font URL
https
    .get(fontUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            // Extract the font URL from the CSS
            const fontUrlMatch = data.match(/src: url\((.+?)\)/);
            if (fontUrlMatch && fontUrlMatch[1]) {
                const fontUrl = fontUrlMatch[1];
                console.log('Found font URL:', fontUrl);

                // Download the font file
                https
                    .get(fontUrl, (res) => {
                        const fontPath = path.join(__dirname, '../src/app/fonts/Vazirmatn-Regular.ttf');
                        const fileStream = fs.createWriteStream(fontPath);
                        res.pipe(fileStream);
                        fileStream.on('finish', () => {
                            fileStream.close();
                            console.log('Font downloaded successfully to:', fontPath);
                        });
                    })
                    .on('error', (err) => {
                        console.error('Error downloading font:', err);
                    });
            } else {
                console.error('Could not find font URL in CSS');
            }
        });
    })
    .on('error', (err) => {
        console.error('Error fetching CSS:', err);
    });
