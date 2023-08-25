exports.to_result = (from, to) => {
    const result = { from, to };
    if (from > to) {
        result.from = to;
        result.to = from;
    }
    return result;
};
exports.value_to_offset = (value, min, max, canvas_width, handle_width) => {
    const x = ((value - min) / (max - min)) * (canvas_width - handle_width);
    return Math.round(x);
};
exports.offset_to_value = (x, min, max, canvas_width, handle_width) => {
    const value = (max - min) * (x / (canvas_width - handle_width)) + min;
    return value;
};
exports.round = (value, dec) => {
    value = parseFloat(value);
    if (!value) {
        return 0;
    }

    dec = parseInt(dec);
    if (!dec) {
        dec = 0;
    }

    const factor = Math.pow(10, dec);

    return Math.round(value * factor) / factor;
};
exports.limit = (value, min, max) => {
    if(value > max) {
        return max;
    }
    if(value < min) {
        return min;
    }
    return value;
};