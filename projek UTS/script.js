let currentCartCount = 0;
let activeCategory = 'all';

const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sort-select');
const cartCountEl = document.getElementById('cart-count');
const cards = Array.from(document.querySelectorAll('.product-card'));
const productGrid = document.getElementById('product-grid');

// Modal Elements
const modal = document.getElementById('quick-view-modal');
const closeModal = document.querySelector('.close-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');

// 1. Fitur Search & Filter Kategori
function filterAndSortProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.getAttribute('data-title').toLowerCase();

        const matchesCategory = activeCategory === 'all' || category === activeCategory;
        const matchesSearch = title.includes(searchTerm);

        if (matchesCategory && matchesSearch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    // Fitur Sorting Harga
    if (sortSelect) {
        const sortValue = sortSelect.value;
        if (sortValue !== 'default') {
            const visibleCards = cards.filter(card => card.style.display !== 'none');
            visibleCards.sort((a, b) => {
                const priceA = parseInt(a.getAttribute('data-price'));
                const priceB = parseInt(b.getAttribute('data-price'));
                return sortValue === 'low-high' ? priceA - priceB : priceB - priceA;
            });
            visibleCards.forEach(card => productGrid.appendChild(card));
        }
    }
}

// Event Listeners
if (filterBtns) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeCategory = e.target.getAttribute('data-category');
            filterAndSortProducts();
        });
    });
}

if (searchInput) searchInput.addEventListener('input', filterAndSortProducts);
if (sortSelect) sortSelect.addEventListener('change', filterAndSortProducts);

// 2. Tambah Keranjang
function addToCart() {
    currentCartCount++;
    if (cartCountEl) cartCountEl.textContent = currentCartCount;
}

// 3. Pop-up Detail (Membaca Gambar & Data dari HTML)
cards.forEach(card => {
    const detailBtn = card.querySelector('.btn-detail');
    if (detailBtn) {
        detailBtn.addEventListener('click', () => {
            const imgSrc = card.querySelector('.product-img').src;
            const title = card.getAttribute('data-title');
            const category = card.getAttribute('data-category');
            const price = card.querySelector('.price').textContent;
            const desc = card.querySelector('.desc-hidden').textContent;

            modalImg.innerHTML = `<img src="${imgSrc}" style="max-width:100%; max-height:180px; object-fit:contain; border-radius:8px;">`;
            modalTitle.textContent = title;
            modalCategory.textContent = category;
            modalPrice.textContent = price;
            modalDesc.textContent = desc;

            modal.style.display = 'flex';
        });
    }
});

if (closeModal) closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
};
