export function camel2Dash(_str: string) {
    const str = _str[0].toLowerCase() + _str.substr(1);
    return str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
}

export function camel2Underline(_str: string) {
    const str = _str[0].toLowerCase() + _str.substr(1);
    return str.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);
}

export function winPath(path: string) {
    return path.replace(/\\/g, '/');
}