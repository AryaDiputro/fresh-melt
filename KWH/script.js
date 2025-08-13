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
    
    // Calculate total
    const price = parseInt(orderData.price || 0);
    const quantity = parseInt(orderData.jumlah || 1);
    orderData.total = price * quantity;
    
    // Show success message
    alert(`Pre Order Berhasil!\n\nDetail Pesanan:\n- Nama: ${orderData.nama}\n- Produk: ${orderData.produk}\n- Jumlah: ${orderData.jumlah}\n- Total: Rp ${orderData.total.toLocaleString()}\n\nKami akan segera menghubungi Anda via WhatsApp.`);
    
    // Reset form
    form.reset();
    closeOrderModal();
    
    // Send to WhatsApp (optional)
    sendToWhatsApp(orderData);
}

function sendToWhatsApp(orderData) {
    const message = `Halo, saya ingin pre order:\n\n` +
        `Nama: ${orderData.nama}\n` +
        `Produk: ${orderData.produk}\n` +
        `Jumlah: ${orderData.jumlah}\n` +
        `Total: Rp ${orderData.total?.toLocaleString() || 0}\n` +
        `Alamat: ${orderData.alamat}\n` +
        `WhatsApp: ${orderData.whatsapp}\n` +
        `Catatan: ${orderData.catatan || '-'}`;
    
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    
    // Optional: open WhatsApp
    // window.open(whatsappUrl, '_blank');
}

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
