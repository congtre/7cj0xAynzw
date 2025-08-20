const API_BASE =
    'https://script.google.com/macros/s/AKfycbzyhBuzNrjYsnRKejmJ9aR_-ruUpGlUjMk3_KrOUjP1U_lNv_YOafovD6gvTXnGPp4Z/exec'; // <-- dán URL GAS
const TOKEN = 'change-me'; // giống API_TOKEN trong GAS (hoặc '' nếu không dùng)

function buildQuery(params = {}) {
    const qs = new URLSearchParams({
        ...(TOKEN ? { token: TOKEN } : {}),
        ...params,
    });
    return `${API_BASE}?${qs.toString()}`;
}

export async function getUsers() {
    const res = await fetch(buildQuery({ resource: 'users' }));
    const data = await res.json();
    return data;
}

export async function getCategories() {
    const res = await fetch(buildQuery({ resource: 'categories' }));
    const data = await res.json();
    return data;
}

export async function getExpenses({ month, user, category } = {}) {
    const res = await fetch(
        buildQuery({ resource: 'expenses', month, user, category })
    );
    const data = await res.json();
    return data;
}

export async function getSummary({ month } = {}) {
    const res = await fetch(buildQuery({ resource: 'summary', month }));
    const data = await res.json();
    return data;
}

export async function createExpense(payload) {
    const body = new URLSearchParams({
        action: 'createExpense',
        ...(TOKEN ? { token: TOKEN } : {}),
        ...Object.fromEntries(
            Object.entries(payload).map(([k, v]) => [k, String(v ?? '')])
        ),
    });

    const res = await fetch(API_BASE, {
        method: 'POST',
        body,
    });
    return res.json();
}
