const { readFileSync, writeFileSync } = require('fs');

const FILE_PATH = `${process.cwd()}/storages/notifiers.json`;

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

const isIdSubscribed = (id) => {
    if (!id) return false;
    const { list = [] } = loadFile();
    return list.includes(String(id))
}

const addNotification = (id) => {
    if (!id) {
        throw new Error('ID is empty')
    }
    const { list = [] } = loadFile();
    list.push(String(id));
    saveFile({ list });
}

const getNotifiers = () => {
    const { list = [] } = loadFile();
    return list;
}

const removeNotification = (id) => {
    if (!id) {
        throw new Error('ID is empty');
    }
    const { list = [] } = loadFile();
    const newList = list.filter(item => item != id);
    saveFile({ list: newList });
}

module.exports = {
    getNotifiers,
    isIdSubscribed,
    addNotification,
    removeNotification
}