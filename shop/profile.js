document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Update profile information
    document.querySelector('.user-name').textContent = currentUser.name;
    document.querySelector('.user-email').textContent = currentUser.email;
    document.querySelector('.join-date').textContent = new Date(currentUser.joined).toLocaleDateString();
    
    // Set form values
    document.getElementById('profileName').value = currentUser.name;
    document.getElementById('profileEmail').value = currentUser.email;

    // Handle profile updates
    document.getElementById('profileForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedName = document.getElementById('profileName').value;
        
        currentUser.name = updatedName;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Show success message
        alert('Profile updated successfully!');
    });

    // Load orders
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = orders.filter(order => order.userId === currentUser.id);
    const ordersTab = document.getElementById('orders');
    
    if (userOrders.length > 0) {
        ordersTab.innerHTML = userOrders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <h3>Order #${order.id}</h3>
                    <span>${new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p>₹${item.price.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    Total: ₹${order.total.toLocaleString('en-IN')}
                </div>
            </div>
        `).join('');
    } else {
        ordersTab.innerHTML = '<p class="empty-message">No orders yet</p>';
    }

    // Load wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const userWishlist = wishlist.filter(item => item.userId === currentUser.id);
    const wishlistTab = document.getElementById('wishlist');
    
    if (userWishlist.length > 0) {
        wishlistTab.innerHTML = userWishlist.map(item => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toLocaleString('en-IN')}</p>
                    <button class="btn" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    } else {
        wishlistTab.innerHTML = '<p class="empty-message">Your wishlist is empty</p>';
    }

    // Handle tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Add logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', async function() {
        if (confirm('Are you sure you want to logout?')) {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';
            this.disabled = true;
            
            // Simulate logout process
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Clear user data
            localStorage.removeItem('currentUser');
            
            // Redirect to home page
            window.location.href = 'index.html';
        }
    });
});

function addToCart(itemId) {
    // Implementation for adding wishlist item to cart
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const item = wishlist.find(i => i.id === itemId);
    if (item) {
        cart.push({...item, quantity: 1});
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Remove from wishlist
        const updatedWishlist = wishlist.filter(i => i.id !== itemId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        
        // Refresh page
        location.reload();
    }
}
