import fs from 'fs';

const configFile = fs.readFileSync('config.json', 'utf-8');
const config = JSON.parse(configFile);

export default config;