// ===== Firebase (satu-satunya tempat inisialisasi — jangan duplikat di index.html) =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_Cbcszz3x4JfJmnQ2fohJzKP-VcMSnOI",
  authDomain: "undangan-digital-2789c.firebaseapp.com",
  projectId: "undangan-digital-2789c",
  storageBucket: "undangan-digital-2789c.firebasestorage.app",
  messagingSenderId: "1008647635621",
  appId: "1:1008647635621:web:9534353def697d366dc34c",
  measurementId: "G-44EK7S7EWP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ===== Guest name from URL, e.g. index.html?to=Budi%20Santoso =====
(function setGuestName(){
  const params = new URLSearchParams(window.location.search);
  const to = params.get('to');
  if (to) {
    document.getElementById('guestName').textContent = decodeURIComponent(to);
  }
})();

// ===== Open invitation gate =====
const openBtn = document.getElementById('openBtn');
const cover = document.getElementById('cover');
const mainContent = document.getElementById('mainContent');

openBtn.addEventListener('click', () => {
  mainContent.classList.remove('hidden');
  cover.style.transition = 'opacity .5s ease';
  cover.style.opacity = '0';
  setTimeout(() => { cover.classList.add('hidden'); }, 500);
  document.body.style.overflow = 'auto';
  window.scrollTo(0, 0);
});

// ===== Countdown =====
const weddingDate = new Date('2026-09-20T10:00:00+08:00'); // WITA = UTC+8

function updateCountdown(){
  const now = new Date();
  let diff = weddingDate - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(val).padStart(2, '0');
  };
  set('cd-days', days);
  set('cd-hours', hours);
  set('cd-mins', mins);
  set('cd-secs', secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Wishes (sekarang disimpan bersama di Firestore, koleksi "wishes") =====
const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');

function renderWish(w){
  const li = document.createElement('li');
  const name = document.createElement('span');
  name.className = 'wname';
  name.textContent = w.name;
  const msg = document.createElement('span');
  msg.className = 'wmsg';
  msg.textContent = w.msg;
  li.appendChild(name);
  li.appendChild(msg);
  wishList.appendChild(li);
}

async function loadWishes(){
  try {
    const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"), limit(50));
    const snapshot = await getDocs(q);
    wishList.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      renderWish({ name: data.Nama, msg: data.Ucapan });
    });
  } catch (error) {
    console.error("Gagal memuat ucapan dari Firestore:", error);
  }
}

wishForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('wishName');
  const msgInput = document.getElementById('wishMsg');
  const name = nameInput.value.trim();
  const msg = msgInput.value.trim();
  if (!name || !msg) return;

  try {
    await addDoc(collection(db, "wishes"), {
      Nama: name,
      Ucapan: msg,
      createdAt: serverTimestamp()
    });

    renderWish({ name, msg });
    wishList.prepend(wishList.lastElementChild);
    nameInput.value = '';
    msgInput.value = '';
  } catch (error) {
    console.error("Gagal menyimpan ke Firestore:", error);
    alert("Ucapan gagal terkirim. Coba lagi sebentar lagi.");
  }
});

loadWishes();

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.galeri-item').forEach(btn => {
  btn.addEventListener('click', () => {
    lightboxImg.src = btn.dataset.img;
    lightbox.classList.remove('hidden');
  });
});

lightboxClose.addEventListener('click', () => lightbox.classList.add('hidden'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.add('hidden');
});
