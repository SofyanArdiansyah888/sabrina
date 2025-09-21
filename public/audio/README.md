# Audio Files untuk Website Undangan

## File yang Dibutuhkan:

1. **tabola-bale.mp3** - Lagu utama "Tabola Bale"
   - Format: MP3, 320kbps (recommended)
   - Durasi: Sesuai lagu asli
   - Source: https://www.youtube.com/watch?v=F0d8JJUNkqo

2. **tabola-bale.ogg** - Format alternatif untuk kompatibilitas browser
   - Format: OGG Vorbis
   - Kualitas: High quality

## Cara Menambahkan File:

1. Download lagu "Tabola Bale" dari YouTube menggunakan:
   - YouTube to MP3 converter
   - yt-dlp tool
   - Online converter tools

2. Simpan file di folder `public/audio/` dengan nama:
   - `tabola-bale.mp3`
   - `tabola-bale.ogg` (optional)

3. File akan otomatis dapat diakses di:
   - `/audio/tabola-bale.mp3`
   - `/audio/tabola-bale.ogg`

## Alternatif Sementara:

Jika belum ada file MP3, sistem akan menggunakan fallback:
- Wedding march sample dari soundjay.com
- Browser akan mencoba source pertama, lalu fallback

## Autoplay Behavior:

- Musik akan otomatis mulai setelah user berinteraksi dengan website
- Volume default: 30%
- Loop: Enabled
- Controls: Play/Pause dan Volume slider
