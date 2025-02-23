export function pad(num, size) {
    let s = num.toString();
    while (s.length < size) s = "0" + s;
    return s;
}