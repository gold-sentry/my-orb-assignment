export const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export const formatCompact = (value: number, maxFractionDigits: number = 2): string => {
    if (value < 1000) {
        return value.toLocaleString(undefined, {
            maximumFractionDigits: maxFractionDigits,
        });
    }

    return value.toLocaleString(undefined, {
        notation: 'compact',
        maximumFractionDigits: maxFractionDigits,
    });
};

export const formatDecimal = (value: number): string => {
    return value.toFixed(2);
};


export const formatDateRange = (isoString?: string): string => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};