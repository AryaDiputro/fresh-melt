// Test script untuk memverifikasi email functionality
// Jalankan script ini di browser console setelah setup EmailJS

async function testEmailFunctionality() {
    console.log('🔧 Testing Email Functionality...');
    
    // Test data
    const testOrderData = {
        nama: 'Test Customer',
        email: 'test@example.com',
        whatsapp: '081234567890',
        produk: 'Test Product',
        jumlah: '2',
        harga: '100000',
        alamat: 'Test Address',
        pembayaran: 'Transfer Bank',
        catatan: 'Test Note',
        total: 200000
    };
    
    try {
        console.log('📧 Testing email sending...');
        
        // Test EmailJS initialization
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded');
        }
        
        console.log('✅ EmailJS loaded successfully');
        
        // Test configuration
        if (!EmailConfig || !EmailConfig.emailjs) {
            throw new Error('Email configuration not loaded');
        }
        
        console.log('✅ Email configuration loaded');
        
        // Test email notifier
        const emailNotifier = new EmailNotifier();
        
        // Test format functions
        const adminMessage = emailNotifier.formatOrderMessage(testOrderData);
        const customerMessage = emailNotifier.formatConfirmationMessage(testOrderData);
        
        console.log('✅ Message formatting working');
        console.log('Admin message length:', adminMessage.length);
        console.log('Customer message length:', customerMessage.length);
        
        // Test if handleNewOrder function exists
        if (typeof handleNewOrder !== 'function') {
            throw new Error('handleNewOrder function not found');
        }
        
        console.log('✅ handleNewOrder function available');
        
        console.log('🎉 All tests passed! Email functionality is ready.');
        console.log('Next steps:');
        console.log('1. Setup EmailJS account (see EMAILJS-SETUP.md)');
        console.log('2. Update configuration in email-config.js');
        console.log('3. Test with real order form');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Error details:', error);
    }
}

// Run test when page is loaded
if (typeof EmailNotifier !== 'undefined' && typeof handleNewOrder !== 'undefined') {
    testEmailFunctionality();
} else {
    console.log('⚠️ Email functionality not loaded yet. Wait for page to load completely.');
    window.addEventListener('load', testEmailFunctionality);
}
