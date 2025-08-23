// WhatsApp Configuration File
// Konfigurasi untuk sistem notifikasi WhatsApp

const WhatsAppConfig = {
    // Nomor WhatsApp Admin (gunakan format internasional: 628xxxxxxxxx)
    adminNumber: '6282333938165',
    
    // Pilihan metode notifikasi
    notificationMethods: {
        // Method 1: CallMeBot (Gratis, mudah setup)
        callmebot: {
            enabled: true,
            apiKey: '123456', // Dapatkan dari callmebot.com
            baseUrl: 'https://api.callmebot.com/whatsapp.php'
        },
        
        // Method 2: WhatsApp Cloud API (Resmi dari Meta)
        cloudapi: {
            enabled: false,
            accessToken: 'YOUR_ACCESS_TOKEN', // Dapatkan dari developers.facebook.com
            phoneNumberId: 'YOUR_PHONE_NUMBER_ID',
            apiVersion: 'v17.0'
        },
        
        // Method 3: Third-party services
        thirdparty: {
            enabled: false,
            service: 'waboxapp', // atau 'twilio', 'messagebird'
            apiKey: 'YOUR_API_KEY',
            baseUrl: 'https://api.waboxapp.com'
        }
    },
    
    // Pesan template
    messages: {
        orderNotification: {
            admin: `🔔 *ORDER BARU MASUK!*

📋 *Detail Pesanan:*
• Nama: {nama}
• WhatsApp: {whatsapp}
• Produk: {produk}
• Jumlah: {jumlah} pcs
• Total: Rp {total}
• Alamat: {alamat}
• Metode Pembayaran: {pembayaran}
• Catatan: {catatan}

⏰ *Waktu Order:* {timestamp}

💡 *Action Required:*
Silakan konfirmasi order ini segera!`,
            
            customer: `Halo {nama}!

Terima kasih telah melakukan pre order di Fresh Melt.

📋 *Detail Pesanan Anda:*
• Produk: {produk}
• Jumlah: {jumlah} pcs
• Total: Rp {total}
• Alamat: {alamat}
• Metode Pembayaran: {pembayaran}

⏰ Status: Sedang diproses

Kami akan segera menghubungi Anda untuk konfirmasi pembayaran dan pengiriman.

Terima kasih!`
        }
    },
    
    // Settings lainnya
    settings: {
        sendAdminNotification: true,
        sendCustomerConfirmation: true,
        showWebsiteNotification: true,
        autoOpenWhatsApp: true,
        delayBeforeRedirect: 2000 // milliseconds
    }
};

// Fungsi untuk update konfigurasi
function updateConfig(newConfig) {
    Object.assign(WhatsAppConfig, newConfig);
    localStorage.setItem('whatsappConfig', JSON.stringify(WhatsAppConfig));
}

// Fungsi untuk load konfigurasi dari localStorage
function loadConfig() {
    const saved = localStorage.getItem('whatsappConfig');
    if (saved) {
        Object.assign(WhatsAppConfig, JSON.parse(saved));
    }
}

// Inisialisasi konfigurasi
loadConfig();

// Export untuk digunakan di file lain
window.WhatsAppConfig = WhatsAppConfig;
window.updateConfig = updateConfig;
