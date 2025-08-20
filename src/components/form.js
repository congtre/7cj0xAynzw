export function mountForm(el, { users, categories, onSubmit }) {
    const today = new Date().toISOString().split('T')[0];
    el.innerHTML = `
      <form id="expenseForm" class="space-y-3">
        <div>
          <label class="block text-sm mb-1">Ngày</label>
          <input type="date" name="date" value="${today}" class="w-full border rounded px-3 py-2" required>
        </div>
        <div>
          <label class="block text-sm mb-1">Người</label>
          <select name="user" class="w-full border rounded px-3 py-2" required>
            ${users
                .map((u) => `<option value="${u.name}">${u.name}</option>`)
                .join('')}
          </select>
        </div>
        <div>
          <label class="block text-sm mb-1">Loại</label>
          <select name="category" class="w-full border rounded px-3 py-2" required>
            ${categories
                .map((c) => `<option value="${c.name}">${c.name}</option>`)
                .join('')}
          </select>
        </div>
        <div>
          <label class="block text-sm mb-1">Số tiền</label>
          <input type="number" name="amount" min="0" step="1000" class="w-full border rounded px-3 py-2" required>
        </div>
        <div>
          <label class="block text-sm mb-1">Ghi chú</label>
          <textarea name="note" rows="2" class="w-full border rounded px-3 py-2"></textarea>
        </div>
        <button class="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700">Lưu</button>
      </form>
      <p id="msg" class="hidden mt-2 text-emerald-600 text-sm">Đã lưu!</p>
    `;

    const form = el.querySelector('#expenseForm');
    const msg = el.querySelector('#msg');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        data.amount = Number(data.amount || 0);
        await onSubmit(data);
        form.reset();
        msg.classList.remove('hidden');
        setTimeout(() => msg.classList.add('hidden'), 1500);
    });
}
