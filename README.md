# Undangan Pernikahan — Sri & Ikhwan

Website undangan digital statis (HTML/CSS/JS murni, tanpa build tool), siap diupload ke GitHub Pages.

## Struktur file
```
index.html    -> halaman undangan
style.css     -> tampilan
script.js     -> nama tamu di URL, hitung mundur, buku ucapan, galeri
images/       -> foto prewedding
```

## Cara upload ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `undangan-sri-ikhwan`.
2. Upload semua isi folder ini (`index.html`, `style.css`, `script.js`, folder `images/`) ke repository tersebut — bisa lewat web (tombol "Add file" -> "Upload files") atau lewat git:
   ```
   git init
   git add .
   git commit -m "Undangan pernikahan Sri & Ikhwan"
   git branch -M main
   git remote add origin https://github.com/USERNAME/undangan-sri-ikhwan.git
   git push -u origin main
   ```
3. Di GitHub, buka repo -> **Settings** -> **Pages**.
4. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu 1-2 menit, GitHub akan memberikan alamat seperti:
   `https://USERNAME.github.io/undangan-sri-ikhwan/`

## Mengirim nama tamu berbeda per orang

Tambahkan `?to=NamaTamu` di akhir link, contoh:
```
https://USERNAME.github.io/undangan-sri-ikhwan/?to=Bapak%20Ahmad
```
Nama akan otomatis muncul di halaman sampul undangan.

## Catatan tentang buku ucapan

Kolom "Doa & Ucapan" saat ini hanya menyimpan pesan di browser pengunjung masing-masing (localStorage) — bukan ke server bersama, karena situs ini statis (tanpa backend). Artinya ucapan yang dikirim seorang tamu hanya akan terlihat di perangkat tamu itu sendiri, bukan tampil ke semua orang. Kalau butuh buku ucapan yang datanya tergabung untuk semua tamu, perlu ditambahkan layanan backend gratis seperti Google Form/Google Sheet, atau Firebase — beri tahu saya kalau ini diperlukan, saya bisa bantu sambungkan.

## Mengganti isi

- Ganti teks di `index.html` sesuai kebutuhan (nama, tanggal, lokasi, urutan acara).
- Ganti foto di folder `images/` (pertahankan nama file yang sama, atau ubah juga rujukannya di `index.html`).
- Warna dan font diatur di bagian atas `style.css` (`:root { ... }`).
