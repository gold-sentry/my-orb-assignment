export const colors = {
    emerald: {
        500: '#10b981',
        600: '#0d9488',
    },
    slate: {
        200: '#e2e8f0',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
    },
    white: '#ffffff',
} as const;

export const chartTheme = {
    gradient: {
        start: colors.emerald[500],
        end: colors.emerald[600],
    },
    axis: {
        stroke: colors.slate[400],
        tickFill: colors.slate[500],
        lineStroke: colors.slate[200],
    },
    grid: {
        stroke: colors.slate[200],
    },
    tooltip: {
        background: colors.white,
        border: colors.slate[200],
        text: colors.slate[700],
        highlight: colors.emerald[500],
    },
    cursor: {
        fill: 'rgba(16, 185, 129, 0.05)',
    },
} as const;