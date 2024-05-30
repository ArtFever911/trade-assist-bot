const { readFileSync, writeFileSync } = require('fs');

const FILE_PATH = `${process.cwd()}/storages/tickers.json`;

const loadFile = () => {
    const data = readFileSync(FILE_PATH);
    return JSON.parse(data);
}

const saveFile = (data) => {
    if (!data) {
        throw new Error('Data is empty')
    }
    const jsonData = JSON.stringify(data);
    writeFileSync(FILE_PATH, jsonData);
}

const addTicker = (ticker) => {
    const { symbol, ...data } = ticker;
    const { list = {} } = loadFile();
    list[symbol] = { symbol, ...data };
    saveFile({ list });
}

const getTickers = () => {
    const { list = {} } = loadFile();
    return list;
}

const removeTicker = (symbol) => {
    if (!symbol) {
        throw new Error('Symbol is empty');
    }
    const { list = {} } = loadFile();
    delete list[symbol];
    saveFile({ list });
}

module.exports = {
    getTickers,
    addTicker,
    removeTicker
}