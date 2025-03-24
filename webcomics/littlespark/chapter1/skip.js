const fs = require('fs');
const path = require('path');

const directoryPath = '.webcomics/littlespark/chapter1'; // Replace with your directory path

function getLastHtmlFile() {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }
        const htmlFiles = files.filter(file => path.extname(file) === '.html');
        if (htmlFiles.length === 0) {
            console.log('No HTML files found.');
            return;
        }
        const lastHtmlFile = htmlFiles.sort().pop();
        console.log('Last HTML file:', lastHtmlFile);
    });
}

fs.watch(directoryPath, (eventType, filename) => {
    if (filename && path.extname(filename) === '.html') {
        console.log(`New HTML file detected: ${filename}`);
        getLastHtmlFile();
    }
});

getLastHtmlFile();