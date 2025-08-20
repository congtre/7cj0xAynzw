document
    .getElementById('expenseForm')
    .addEventListener('submit', async function (e) {
        e.preventDefault();

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
            alert('Kết nối thất bại: ' + err.message);
        }
    });
