export function renderTable(tbodyEl, totalEl, items) {
    const rows = items
        .map(
            (it) => `
      <tr>
        <td class="border px-3 py-2">${it.date}</td>
        <td class="border px-3 py-2">${it.user}</td>
        <td class="border px-3 py-2">${it.category}</td>
        <td class="border px-3 py-2 text-right">${formatVND(it.amount)}</td>
        <td class="border px-3 py-2">${it.note || ''}</td>
      </tr>
    `
        )
        .join('');
    tbodyEl.innerHTML = rows;
    const total = items.reduce((s, x) => s + (Number(x.amount) || 0), 0);
    totalEl.textContent = formatVND(total);
}

function formatVND(n) {
    return (Number(n) || 0).toLocaleString('vi-VN');
}
