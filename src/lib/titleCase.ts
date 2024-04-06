export function titleCase(str: string): string {
    return str.toLowerCase().replace(/(^|\s+)\S/g, t => t.toUpperCase());
}
