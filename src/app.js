import {
    getUsers,
    getCategories,
    getExpenses,
    getSummary,
    createExpense,
} from './services/api.js';
import { mountFilters } from './components/filters.js';
import { mountForm } from './components/form.js';
import { renderTable } from './components/table.js';
import { renderPie } from './components/chart.js';

const $ = (s, r = document) => r.querySelector(s);

function currentMonth() {
    const d = new Date();
    return (
        String(d.getFullYear()) +
        '-' +
        String(d.getMonth() + 1).padStart(2, '0')
    );
}

let state = {
    month: currentMonth(),
    user: '',
    category: '',
};

async function bootstrap() {
    const [users, categories] = await Promise.all([
        getUsers(),
        getCategories(),
    ]);

    // Filters
    mountFilters($('#filters'), {
        users,
        categories,
        defaultMonth: state.month,
        onChange: async (f) => {
            state = { ...state, ...f };
            await refresh();
        },
    });

    // Form
    mountForm($('#formMount'), {
        users,
        categories,
        onSubmit: async (data) => {
            await createExpense(data);
            await refresh(); // reload sau khi thêm
        },
    });

    await refresh();
}

async function refresh() {
    const items = await getExpenses(state);
    const summary = await getSummary({ month: state.month });

    // summary badges
    $('#summary').innerHTML = `
    <div class="bg-white rounded-2xl shadow p-4">
      <div class="text-sm text-gray-500">Tổng chi tháng ${state.month}</div>
      <div class="text-2xl font-semibold mt-1">${formatVND(
          summary.total || 0
      )} đ</div>
    </div>
    <div class="bg-white rounded-2xl shadow p-4">
      <div class="text-sm text-gray-500">Số giao dịch</div>
      <div class="text-2xl font-semibold mt-1">${summary.count || 0}</div>
    </div>
    <div class="bg-white rounded-2xl shadow p-4">
      <div class="text-sm text-gray-500">Người chi nhiều nhất</div>
      <div class="text-lg mt-1">${topKey(summary.byUser || {})}</div>
    </div>
  `;

    // table
    renderTable($('#tableBody'), $('#tableTotal'), items);

    // chart
    renderPie($('#chartCanvas'), items);
}

function topKey(obj) {
    let bestK = '-',
        bestV = -1;
    for (const k in obj) {
        const v = Number(obj[k] || 0);
        if (v > bestV) {
            bestV = v;
            bestK = `${k} (${formatVND(v)} đ)`;
        }
    }
    return bestK;
}

function formatVND(n) {
    return (Number(n) || 0).toLocaleString('vi-VN');
}

bootstrap();
