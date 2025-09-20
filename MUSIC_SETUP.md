# 🎵 Setup Musik "Tabola Bale"

## Langkah-langkah untuk menambahkan musik:

### 1. Download Lagu
Untuk menambahkan lagu "Tabola Bale" dari YouTube:

**Opsi A: Menggunakan Online Converter**
1. Buka https://ytmp3.cc/ atau https://y2mate.com/
2. Paste URL: `https://www.youtube.com/watch?v=F0d8JJUNkqo`
3. Pilih format MP3, kualitas 320kbps
4. Download file

**Opsi B: Menggunakan yt-dlp (Recommended)**
```bash
# Install yt-dlp
pip install yt-dlp

# Download audio only
yt-dlp -x --audio-format mp3 --audio-quality 320K "https://www.youtube.com/watch?v=F0d8JJUNkqo" -o "tabola-bale.%(ext)s"
```

### 2. Simpan File
1. Rename file menjadi `tabola-bale.mp3`
2. Copy ke folder `public/audio/tabola-bale.mp3`
3. (Optional) Convert ke OGG untuk browser compatibility

### 3. Verifikasi
File structure harus seperti ini:
```
public/
├── audio/
│   ├── tabola-bale.mp3
│   └── tabola-bale.ogg (optional)
└── config.json
```

### 4. Test Autoplay
1. Buka website di browser
2. Setelah 2 detik akan muncul notifikasi musik
3. Klik "Putar Musik" atau klik anywhere di website
4. Musik akan otomatis mulai diputar

## Troubleshooting:

**Jika musik tidak muncul:**
- Pastikan file `tabola-bale.mp3` ada di `public/audio/`
- Check browser console untuk error
- Pastikan format file MP3 valid
- Try refresh page (Ctrl+F5)

**Jika autoplay tidak bekerja:**
- Browser policy memblokir autoplay
- Klik tombol musik manually
- Interaksi user (click/touch) akan trigger autoplay

## Current Status:
✅ Audio player component ready
✅ Autoplay logic implemented  
✅ Volume controls added
✅ Notification system active
⏳ **Waiting for MP3 file to be added**

Setelah file MP3 ditambahkan, musik akan langsung berfungsi!
