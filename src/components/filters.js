export function mountFilters(
    el,
    { users, categories, defaultMonth, onChange }
) {
    el.innerHTML = `
      <div class="grid gap-4 md:flex items-center gap-3">
        <div class="flex-1">
          <label class="block text-sm mb-1">Tháng</label>
          <input id="f-month" type="month" value="${defaultMonth}" class="w-full border rounded px-3 py-2">
        </div>
        <div class="flex-1 flex items-center gap-3">
          <div class="flex-1">
            <label class="block text-sm mb-1">Người</label>
            <select id="f-user" class="w-full border rounded px-3 py-2">
              <option value="">Tất cả</option>
              ${users
                  .map((u) => `<option value="${u.name}">${u.name}</option>`)
                  .join('')}
            </select>
          </div>
          <div class="flex-1">
            <label class="block text-sm mb-1">Loại</label>
            <select id="f-cate" class="w-full border rounded px-3 py-2">
              <option value="">Tất cả</option>
              ${categories
                  .map((c) => `<option value="${c.name}">${c.name}</option>`)
                  .join('')}
            </select>
          </div>
        </div>
        <div class="pt-3 md:pt-6">
          <button id="f-apply" class="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Áp dụng</button>
        </div>
      </div>
    `;

    el.querySelector('#f-apply').addEventListener('click', () => {
        onChange({
            month: el.querySelector('#f-month').value,
            user: el.querySelector('#f-user').value,
            category: el.querySelector('#f-cate').value,
        });
    });
}
