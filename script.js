const form = document.getElementById('item-form');
const itemList = document.getElementById('item-list');

let items = JSON.parse(localStorage.getItem('items')) || [];

function renderItems() {
    itemList.innerHTML = '';
    items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name}</strong> (${item.type})<br>
            <em>${item.desc}</em><br>
            <span>Kontaktpersona: ${item.owner}</span>`;
        if (item.found) {
            li.style.textDecoration = 'line-through';
            li.style.color = '#888';
            li.innerHTML += '<br><small>Manta atgūta!</small>';
        } else {
            const btn = document.createElement('button');
            btn.textContent = 'Atzīmēt kā atgūtu';
            btn.onclick = () => {
                items[idx].found = true;
                saveItems();
            };
            li.appendChild(document.createElement('br'));
            li.appendChild(btn);
        }
        itemList.appendChild(li);
    });
}

function saveItems() {
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const desc = document.getElementById('item-desc').value;
    const owner = document.getElementById('item-owner').value;
    const type = document.getElementById('item-type').value;
    items.push({ name, desc, owner, type, found: false });
    form.reset();
    saveItems();
});

renderItems();