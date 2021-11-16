const path = require('path');

function urlPathFromFilePath(filePath) {
    const pathObject = path.parse(filePath);
    const parts = pathObject.dir.split(path.sep).filter(Boolean);
    if (pathObject.name !== 'index') {
        parts.push(pathObject.name);
    }
    const urlPath = parts.join('/').toLowerCase();
    urlPath.substr(-1) === '/' ? urlPath.slice(0, -1) : urlPath;
    return '/' + urlPath;
}

function cssClassesFromFilePath(filePath) {
    const pathObject = path.parse(filePath);
    const cssClasses = [];
    const parts = pathObject.dir.split(path.sep).filter(Boolean);

    let css = 'page';
    parts.forEach((part) => {
        css += '-' + part;
        cssClasses.push(css);
    });
    cssClasses.push(`${css}-${pathObject.name}`);

    return cssClasses;
}

module.exports = {
    urlPathFromFilePath,
    cssClassesFromFilePath
};
