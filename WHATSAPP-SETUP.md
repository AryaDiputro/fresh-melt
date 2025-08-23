# WhatsApp Notification Setup Guide

Panduan lengkap untuk setup notifikasi WhatsApp ketika ada order masuk di website Fresh Melt.

## Cara Kerja
Ketika customer mengisi form pre order, sistem akan:
1. Mengirim notifikasi ke WhatsApp admin
2. Menyimpan order ke localStorage
3. Mengirim konfirmasi otomatis ke customer via WhatsApp

## Setup WhatsApp Notification

### Method 1: CallMeBot (Recommended - Gratis)
1. **Daftar di CallMeBot**
   - Buka https://www.callmebot.com/blog/free-whatsapp-sms/
   - Follow instruksi untuk setup
   - Dapatkan API key gratis

2. **Update Konfigurasi**
   - Buka file `whatsapp-config.js`
   - Update `adminNumber` dengan nomor WhatsApp Anda
   - Update `apiKey` dengan API key dari CallMeBot

3. **Test Notifikasi**
   - Lakukan test order di website
   - Cek WhatsApp Anda untuk notifikasi

### Method 2: WhatsApp Cloud API (Lebih Profesional)
1. **Setup Meta Developer Account**
   - Daftar di https://developers.facebook.com
   - Buat app baru
   - Dapatkan access token dan phone number ID

2. **Update Konfigurasi**
   - Enable `cloudapi` di `whatsapp-config.js`
   - Masukkan access token dan phone number ID

3. **Verifikasi Webhook**
   - Setup webhook URL di Meta dashboard
   - Verifikasi domain dan SSL certificate

### Method 3: Third-party Services
- Twilio
- MessageBird
- Waboxapp
- Atau layanan WhatsApp API lainnya

## Konfigurasi File

### File yang perlu diupdate:
1. `whatsapp-config.js` - Konfigurasi utama
2. `whatsapp-notif.js` - Logic notifikasi
3. `script.js` - Integrasi dengan form

### Parameter yang bisa diubah:
- `adminNumber`: Nomor WhatsApp admin
- `notificationMethods`: Pilih metode yang digunakan
- `messages`: Template pesan
- `settings`: Pengaturan tambahan

## Testing

### Test Order
1. Isi form pre order di website
2. Submit order
3. Cek WhatsApp admin untuk notifikasi
4. Cek WhatsApp customer untuk konfirmasi

### Debug Mode
- Buka console browser (F12)
- Cek log untuk melihat proses notifikasi
- Pastikan tidak ada error di console

## Troubleshooting

### Notifikasi tidak masuk
1. Cek koneksi internet
2. Pastikan nomor WhatsApp sudah benar
3. Cek API key atau access token
4. Cek console untuk error log

### Format nomor WhatsApp
- Gunakan format internasional: 628xxxxxxxxx
- Tanpa tanda + atau spasi

### Rate limiting
- CallMeBot: Maksimal 30 pesan per menit
- WhatsApp Cloud API: Sesuai dengan limit Meta

## Security Tips
1. Jangan commit API key ke repository
2. Gunakan environment variables untuk production
3. Validasi semua input dari user
4. Implementasi rate limiting untuk menghindir spam

## Support
Jika ada masalah atau pertanyaan:
- Cek console browser untuk error log
- Pastikan semua file sudah di-include dengan benar
- Test dengan nomor WhatsApp yang berbeda

## Update Otomatis
Sistem akan otomatis:
- Menyimpan konfigurasi di localStorage
- Update template pesan sesuai kebutuhan
- Backup order ke localStorage
