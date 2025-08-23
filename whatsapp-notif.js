// Email Notification System
// Fungsi untuk mengirim notifikasi order ke email admin

class EmailNotifier {
    constructor() {
        this.adminEmail = 'akral.10.sdh.b@gmail.com';
        this.isEnabled = true;
    }

    // Fungsi untuk mengirim notifikasi order ke admin
    async sendOrderNotification(orderData) {
        if (!this.isEnabled) return;

        try {
            // Kirim email ke admin
            await this.sendEmailToAdmin(orderData);
            
            // Kirim konfirmasi ke customer
            if (orderData.email) {
                await this.sendCustomerConfirmation(orderData);
            }
            
            console.log('Notifikasi email berhasil dikirim!');
        } catch (error) {
            console.error('Gagal mengirim notifikasi email:', error);
        }
    }

    // Format pesan order untuk admin
    formatOrderMessage(orderData) {
        const timestamp = new Date().toLocaleString('id-ID');
        
        return `🔔 ORDER BARU MASUK!

📋 Detail Pesanan:
• Nama: ${orderData.nama}
• Email: ${orderData.email || '-'}
• WhatsApp: ${orderData.whatsapp}
• Produk: ${orderData.produk}
• Jumlah: ${orderData.jumlah} pcs
• Total: Rp ${(parseInt(orderData.harga || 0) * parseInt(orderData.jumlah || 1)).toLocaleString('id-ID')}
• Alamat: ${orderData.alamat}
• Metode Pembayaran: ${orderData.pembayaran}
• Catatan: ${orderData.catatan || '-'}

⏰ Waktu Order: ${timestamp}

💡 Action Required:
Silakan konfirmasi order ini segera!`;
    }

    // Format pesan konfirmasi untuk customer
    formatConfirmationMessage(orderData) {
        return `Halo ${orderData.nama}!

Terima kasih telah melakukan pre order di Fresh Melt.

📋 Detail Pesanan Anda:
• Produk: ${orderData.produk}
• Jumlah: ${orderData.jumlah} pcs
• Total: Rp ${(parseInt(orderData.harga || 0) * parseInt(orderData.jumlah || 1)).toLocaleString('id-ID')}
• Alamat: ${orderData.alamat}
• Metode Pembayaran: ${orderData.pembayaran}

⏰ Status: Sedang diproses

Kami akan segera menghubungi Anda untuk konfirmasi pembayaran dan pengiriman.

Terima kasih!`;
    }

    // Menggunakan EmailJS untuk mengirim email
    async sendEmailToAdmin(orderData) {
        // Pastikan EmailJS sudah dimuat
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS belum dimuat. Pastikan script EmailJS sudah ditambahkan.');
            return;
        }

        try {
            const templateParams = {
                to_email: this.adminEmail,
                subject: `Order Baru - ${orderData.produk}`,
                message: this.formatOrderMessage(orderData),
                customer_name: orderData.nama,
                customer_email: orderData.email || '',
                customer_whatsapp: orderData.whatsapp,
                product: orderData.produk,
                quantity: orderData.jumlah,
                total: `Rp ${(parseInt(orderData.harga || 0) * parseInt(orderData.jumlah || 1)).toLocaleString('id-ID')}`,
                address: orderData.alamat,
                payment_method: orderData.pembayaran,
                notes: orderData.catatan || '-'
            };

            // Kirim email menggunakan EmailJS
            await emailjs.send(
                EmailConfig.emailjs.serviceID,
                EmailConfig.emailjs.templateID,
                templateParams,
                EmailConfig.emailjs.userID
            );
            
            console.log('Email ke admin berhasil dikirim');
        } catch (error) {
            console.error('Error mengirim email ke admin:', error);
            throw error;
        }
    }

    // Kirim konfirmasi ke customer
    async sendCustomerConfirmation(orderData) {
        if (!orderData.email) return;

        try {
            const templateParams = {
                to_email: orderData.email,
                subject: `Konfirmasi Order - ${orderData.produk}`,
                message: this.formatConfirmationMessage(orderData),
                customer_name: orderData.nama,
                product: orderData.produk,
                quantity: orderData.jumlah,
                total: `Rp ${(parseInt(orderData.harga || 0) * parseInt(orderData.jumlah || 1)).toLocaleString('id-ID')}`,
                address: orderData.alamat,
                payment_method: orderData.pembayaran
            };

            // Kirim email menggunakan EmailJS
            await emailjs.send(
                EmailConfig.emailjs.serviceID,
                EmailConfig.emailjs.templateID,
                templateParams,
                EmailConfig.emailjs.userID
            );
            
            console.log('Email konfirmasi ke customer berhasil dikirim');
        } catch (error) {
            console.error('Error mengirim email konfirmasi:', error);
        }
    }
}

// Inisialisasi Email Notifier
const emailNotifier = new EmailNotifier();

// Fungsi untuk handle order baru
async function handleNewOrder(orderData) {
    // Simpan order ke localStorage/database
    saveOrderToStorage(orderData);
    
    // Kirim notifikasi email
    await emailNotifier.sendOrderNotification(orderData);
    
    // Update UI
    updateOrderList();
}

// Simpan order ke localStorage
function saveOrderToStorage(orderData) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orderData.id = Date.now();
    orderData.timestamp = new Date().toISOString();
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Ambil semua order dari localStorage
function getAllOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

// Update tampilan daftar order
function updateOrderList() {
    const orders = getAllOrders();
    const orderList = document.getElementById('orderList');
    
    if (orderList) {
        orderList.innerHTML = orders.map(order => `
            <div class="order-item">
                <h4>${order.produk} - ${order.nama}</h4>
                <p>Jumlah: ${order.jumlah} pcs</p>
                <p>Total: Rp ${(parseInt(order.harga || 0) * parseInt(order.jumlah || 1)).toLocaleString('id-ID')}</p>
                <p>Status: ${order.status || 'Baru'}</p>
            </div>
        `).join('');
    }
}

// Fungsi untuk kirim notifikasi email sebagai backup
async function sendEmailNotification(orderData) {
    const emailData = {
        to: 'akral.10.sdh.b@gmail.com',
        subject: `Order Baru - ${orderData.produk}`,
        body: whatsappNotifier.formatOrderMessage(orderData)
    };
    
    // Implementasi email service (misalnya EmailJS)
    console.log('Email notification:', emailData);
}

// Export untuk digunakan di file lain
window.WhatsAppNotifier = WhatsAppNotifier;
window.handleNewOrder = handleNewOrder;
