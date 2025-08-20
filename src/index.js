document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
});

document.getElementById('amount').addEventListener('input', function (e) {
    let value = e.target.value;

    value = value.replace(/\D/g, '');

    if (value) {
        value = Number(value).toLocaleString('en-US');
    }

    e.target.value = value;
});

document
    .getElementById('expenseForm')
    .addEventListener('submit', async function (e) {
        e.preventDefault();

        showOverlay();

        const form = e.target;
        const data = {
            date: form.date.value,
            user: form.user.value,
            category: form.category.value,
            amount: form.amount.value,
            note: form.note.value,
        };

        try {
            const res = await fetch(
                'https://script.google.com/macros/s/AKfycby133CB0Ty5RzavOQ5BWKj1HumRpBuVzaq9QVoIHOBhMrAhzEPXG2co-FzVFqraws2j/exec',
                {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const json = await res.json();
            if (json.status === 'success') {
                alert('Lưu thành công! ID = ' + json.id);
                form.reset();
            } else {
                alert('Có lỗi: ' + json.message);
            }
        } catch (err) {
            hideOverlay();
            alert(
                'Lưu thành công! Kiểm tra Google Sheet để xem dữ liệu đã được lưu chưa.'
            );
        }
    });

function showOverlay() {
    document.getElementById('overlay').classList.remove('hidden');
}
function hideOverlay() {
    document.getElementById('overlay').classList.add('hidden');
}
