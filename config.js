/* =====================================================
   ✏️ EDIT FILE INI SAJA untuk mengganti isi web
   ===================================================== */
const CONFIG = {

  // Nama
  nama: "Sayang",   // nama / panggilan kekasihmu
  dari: "Arif",      // namamu

  // 🎵 LAGU: nama file mp3 (mis. "lagu/lagu-kita.mp3") atau link mp3 langsung
  lagu: "SelamatUlangtahun.mp3",

  // 📷 GALERI 3D: daftar foto (kosong = tanda tempat foto). Boleh tambah/kurangi.
  galeri: ["Foto1.jpeg", "Foto2.jpeg", "Foto3.jpeg", "Foto4.jpeg", "Foto5.jpeg", "Foto6.jpeg"],

  // 📅 TIMELINE KENANGAN: tgl = tanggal, txt = cerita, img = foto (kosong = tanda tempat foto)
  timeline: [
    { tgl: "Hari pertama kita bertemu", txt: "Awal dari semua cerita indah kita 💕", img: "1.jpeg" },
    { tgl: "Jalan-jalan sekalin ke Kiara",  txt: "Hari ketika Mewujudkan salah satu wishlistmu 🥰", img: "2.jpeg" },
    { tgl: "Momen favoritku",           txt: "Setiap Senyummu adalah hal terbaik buatku ✨", img: "3.jpeg" }
  ],

  // 💌 SURAT: {nama} dan {dari} otomatis diganti
  surat:
    "Hai {nama} 💕\n\n" +
    "Selamat ulang tahun ya! Makasih sudah hadir dan bikin hari-hariku lebih berwarna.\n\n" +
    "Semoga semua mimpimu tercapai, sehat selalu, dan makin bahagia. Aku akan selalu ada di sampingmu.\n\n" +
    "I love you! 🥰\n\n" +
    " {dari}",

  // 🎉 Ucapan penutup di galeri
  penutup: "Terima kasih sudah jadi kamu. Selamat ulang tahun, {nama}! 🎉💖",

  // ⏱️ Pengaturan waktu (milidetik)
  waktu: {
    ketikPerHuruf: 90,     // kecepatan mengetik surat (makin besar = makin lambat)
    ketikBarisBaru: 700,   // jeda saat pindah baris
    bacaSurat: 8000,       // waktu baca setelah surat selesai
    perKartuTimeline: 2600 // lama tiap kartu timeline
  }
};
