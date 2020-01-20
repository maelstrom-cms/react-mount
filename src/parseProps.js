import toCamel from './toCamel';

const parseProps = function (props, field, fallback) {
    let value = props[field];

    if (typeof value === 'undefined') {
        value = props[toCamel(field)];

        if (typeof value === 'undefined') {
            return fallback
        }
    }

    if (Array.isArray(value)) {
        return [ ...value ]
    }

    if (typeof value === 'object') {
        return { ...value }
    }

    try {
        return JSON.parse(value)
    } catch (error) {
        return `${value}`
    }
};

export default parseProps;
