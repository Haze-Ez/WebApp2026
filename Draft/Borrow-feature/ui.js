// Global cart state
let cart = [];

// Sample books data
const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" }
];

// Render books with borrow buttons
function renderBooks() {
    const container = document.getElementById('booksContainer');
    container.innerHTML = books.map(book => `
        <div class="book-card">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <button class="borrow-btn" data-id="${book.id}">
                Borrow
            </button>
        </div>
    `).join('');

    // Attach click handlers
    document.querySelectorAll('.borrow-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const bookId = parseInt(e.target.dataset.id);
            const book = books.find(b => b.id === bookId);
            addToCart(book);
        });
    });
}

// Add book to cart and update display
function addToCart(book) {
    cart.push(book);
    updateCart();
}

// Remove book from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update cart display
function updateCart() {
    // Update count
    document.getElementById('cartCount').textContent = cart.length;

    // Update cart items
    const cartContainer = document.getElementById('cartContainer');
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty">No books added yet</p>';
    } else {
        cartContainer.innerHTML = cart.map((book, index) => `
            <div class="cart-item">
                <div>
                    <p>${book.title}</p>
                    <p class="author">${book.author}</p>
                </div>
                <button class="remove-btn" data-index="${index}">✕</button>
            </div>
        `).join('');

        // Attach remove handlers
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                removeFromCart(index);
            });
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    updateCart();
});
