export default function(min: number, max: number, normalizedValue: number) {
    return min + (max - min) * normalizedValue;
}
