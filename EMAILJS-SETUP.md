# EmailJS Setup Guide

## Langkah-langkah Setup EmailJS

### 1. Daftar Akun EmailJS
1. Kunjungi [EmailJS](https://www.emailjs.com/)
2. Klik "Sign Up" dan buat akun gratis
3. Verifikasi email Anda

### 2. Setup Service
1. Setelah login, klik "Email Services"
2. Pilih "Add New Service"
3. Pilih provider email yang ingin digunakan (Gmail, Outlook, dll.)
4. Ikuti petunjuk untuk menghubungkan email Anda
5. Catat **Service ID** yang diberikan

### 3. Buat Email Template
1. Klik "Email Templates"
2. Klik "Create New Template"
3. Buat template dengan format berikut:

**Subject:**
```
Order Baru - {{product}}
```

**Body:**
```
🔔 ORDER BARU MASUK!

📋 Detail Pesanan:
• Nama: {{customer_name}}
• Email: {{customer_email}}
• WhatsApp: {{customer_whatsapp}}
• Produk: {{product}}
• Jumlah: {{quantity}}
• Total: {{total}}
• Alamat: {{address}}
• Metode Pembayaran: {{payment_method}}
• Catatan: {{notes}}

⏰ Waktu Order: {{time}}

💡 Action Required:
Silakan konfirmasi order ini segera!
```

4. Catat **Template ID** yang diberikan

### 4. Dapatkan User ID
1. Klik "Integration" di sidebar
2. Copy **User ID** (Public Key)

### 5. Update Konfigurasi
Buka file `email-config.js` dan ganti nilai berikut:

```javascript
emailjs: {
    serviceID: 'YOUR_SERVICE_ID_HERE', // Ganti dengan Service ID
    templateID: 'YOUR_TEMPLATE_ID_HERE', // Ganti dengan Template ID
    userID: 'YOUR_USER_ID_HERE' // Ganti dengan User ID
}
```

### 6. Update HTML
Buka file `index.html` dan ganti User ID di script initialization:

```javascript
emailjs.init("YOUR_USER_ID_HERE"); // Ganti dengan User ID Anda
```

## Testing
1. Buka website toko online
2. Isi form pre order
3. Submit order
4. Cek email admin (akral.10.sdh.b@gmail.com) untuk notifikasi order baru
5. Customer akan menerima email konfirmasi jika email mereka valid

## Troubleshooting
- Pastikan semua ID (Service, Template, User) sudah benar
- Pastikan email service sudah terhubung dengan benar
- Cek console browser untuk error messages
- Pastikan internet tersambung

## Fitur EmailJS
- ✅ Gratis untuk 200 email/bulan
- ✅ Tidak perlu backend server
- ✅ Mudah diintegrasikan
- ✅ Support multiple email providers
- ✅ Template yang dapat dikustomisasi

## Support
Jika mengalami masalah, kunjungi:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Community](https://community.emailjs.com/)
