export const pick = (object: { [x: string]: any; }, keys: any[]) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
    }, {})
}