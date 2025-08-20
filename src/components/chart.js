let chartRef = null;

export function renderPie(canvas, items) {
    // gom theo category
    const map = new Map();
    items.forEach((it) => {
        const key = it.category || 'Khác';
        map.set(key, (map.get(key) || 0) + Number(it.amount || 0));
    });

    const labels = [...map.keys()];
    const data = [...map.values()];

    if (chartRef) {
        chartRef.destroy();
    }
    chartRef = new Chart(canvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels,
            datasets: [{ data }],
        },
    });
}
