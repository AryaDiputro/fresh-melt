// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Slider Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto slide
setInterval(() => {
    changeSlide(1);
}, 5000);

// Modal Functionality
const modal = document.getElementById('orderModal');
const quickOrderForm = document.getElementById('quickOrderForm');

function openOrderModal(productName, price) {
    document.getElementById('modalProduk').value = productName;
    // Store the price in a hidden field or data attribute for later use
    document.getElementById('modalProduk').dataset.price = price;
    modal.style.display = 'block';
}

function closeOrderModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        closeOrderModal();
    }
}

// Form Handling
const orderForm = document.getElementById('orderForm');
const mainOrderForm = document.getElementById('orderForm');

// Handle main order form
mainOrderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitOrder(this);
});

// Handle quick order form
quickOrderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitOrder(this);
});

function submitOrder(form) {
    const formData = new FormData(form);
    const orderData = {};
    
    for (let [key, value] of formData.entries()) {
        orderData[key] = value;
    }
    
    // Calculate total - handle both main form and modal form
    let price = 0;
    
    if (form.id === 'quickOrderForm') {
        // For modal form, get price from data attribute
        const productElement = document.getElementById('modalProduk');
        price = parseInt(productElement.dataset.price || 0);
    } else {
        // For main form, get price from form data or calculate from product selection
        price = parseInt(orderData.price || 0);
        if (price === 0) {
            // If price is not in form data, calculate from product selection
            const productSelect = document.getElementById('produk');
            if (productSelect) {
                const selectedOption = productSelect.options[productSelect.selectedIndex];
                const priceText = selectedOption.text;
                const priceMatch = priceText.match(/Rp (\d+)/);
                if (priceMatch) {
                    price = parseInt(priceMatch[1]);
                }
            }
        }
    }
    
    const quantity = parseInt(orderData.jumlah || 1);
    orderData.total = price * quantity;
    orderData.harga = price; // Store the price for email notifications
    
    // Show loading
    showLoading();
    
    // Process order
    setTimeout(async () => {
        try {
            // Simpan order dan kirim notifikasi email
            await handleNewOrder(orderData);
            
            // Sembunyikan loading
            hideLoading();
            
            // Show success message
            alert(`Pre Order Berhasil!\n\nDetail Pesanan:\n- Nama: ${orderData.nama}\n- Email: ${orderData.email}\n- Produk: ${orderData.produk}\n- Jumlah: ${orderData.jumlah}\n- Total: Rp ${orderData.total.toLocaleString()}\n\nKami akan segera menghubungi Anda via Email.`);
            
            // Reset form
            form.reset();
            closeOrderModal();
            
        } catch (error) {
            hideLoading();
            alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
            console.error('Order Error:', error);
        }
    }, 1500);
}

// Fungsi untuk menampilkan notifikasi di website
function showWebsiteNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Style untuk notifikasi
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Tambahkan CSS untuk notifikasi
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
    }
`;
document.head.appendChild(notificationStyle);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add animation classes
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Dynamic price calculation
function updatePrice(productSelect, quantityInput) {
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const priceText = selectedOption.text;
    const priceMatch = priceText.match(/Rp (\d+)/);
    
    if (priceMatch) {
        const price = parseInt(priceMatch[1]);
        const quantity = parseInt(quantityInput.value) || 1;
        return price * quantity;
    }
    return 0;
}

// Add event listeners for dynamic updates
document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('produk');
    const quantityInput = document.getElementById('jumlah');
    
    if (productSelect && quantityInput) {
        [productSelect, quantityInput].forEach(element => {
            element.addEventListener('change', function() {
                const total = updatePrice(productSelect, quantityInput);
                // You can add a display element for total if needed
            });
        });
    }
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// Dark mode toggle (optional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Loading animation
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading styles
    const style = document.createElement('style');
    style.textContent = `
        .loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #FF6B6B;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Add animation classes
    const style2 = document.createElement('style');
    style2.textContent = `
        .animate {
            animation: fadeInUp 0.6s ease-out;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style2);
});
