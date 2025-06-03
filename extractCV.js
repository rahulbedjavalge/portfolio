import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('RahulBedjavalge.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(error) {
    console.error('Error extracting text from PDF:', error);
});
