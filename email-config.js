// Email Configuration File
// Configuration for email notification system

const EmailConfig = {
  // Admin email address
  adminEmail: "akral.10.sdh.b@gmail.com",

  // EmailJS configuration
  emailjs: {
    serviceID: "service_puj9wzp", // Ganti dengan Service ID EmailJS Anda
    templateID: "template_rw1019m", // Ganti dengan Template ID EmailJS Anda
    userID: "6ayfeJQ2Jh_rujieL", // Ganti dengan User ID EmailJS Anda
  },

  // Email message templates
  messages: {
    orderNotification: {
      subject: "Order Baru - {produk}",
      body: `🔔 ORDER BARU MASUK!

📋 Detail Pesanan:
• Nama: {nama}
• Email: {email}
• WhatsApp: {whatsapp}
• Produk: {produk}
• Jumlah: {jumlah} pcs
• Total: Rp {total}
• Alamat: {alamat}
• Metode Pembayaran: {pembayaran}
• Catatan: {catatan}

⏰ Waktu Order: {timestamp}

💡 Action Required:
Silakan konfirmasi order ini segera!`,
    },

    customerConfirmation: {
      subject: "Konfirmasi Order - {produk}",
      body: `Halo {nama}!

Terima kasih telah melakukan pre order di Fresh Melt.

📋 Detail Pesanan Anda:
• Produk: {produk}
• Jumlah: {jumlah} pcs
• Total: Rp {total}
• Alamat: {alamat}
• Metode Pembayaran: {pembayaran}

⏰ Status: Sedang diproses

Kami akan segera menghubungi Anda untuk konfirmasi pembayaran dan pengiriman.

Terima kasih!`,
    },
  },

  // Other settings
  settings: {
    sendAdminNotification: true,
    sendCustomerConfirmation: true,
  },
};

// Function to update configuration
function updateEmailConfig(newConfig) {
    Object.assign(EmailConfig, newConfig);
    localStorage.setItem('emailConfig', JSON.stringify(EmailConfig));
}

// Function to load configuration from localStorage
function loadEmailConfig() {
    const saved = localStorage.getItem('emailConfig');
    if (saved) {
        Object.assign(EmailConfig, JSON.parse(saved));
    }
}

// Initialize configuration
loadEmailConfig();

// Export for use in other files
window.EmailConfig = EmailConfig;
window.updateEmailConfig = updateEmailConfig;
