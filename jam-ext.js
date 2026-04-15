function tampilanjam() {
    const waktu = new Date();
    const seconds = waktu.getSeconds();
    
    document.getElementById("jam").innerHTML = waktu.toLocaleTimeString();
    document.title = waktu.toLocaleTimeString();
    
    // Update background based on time
    updateBackground(waktu.getHours());
    
    // Add pulse effect every second
    const jamElement = document.getElementById("jam");
    jamElement.style.animation = 'none';
    setTimeout(() => {
        jamElement.style.animation = 'glow 2s ease-in-out infinite alternate, pulse-sec 0.3s ease-out';
    }, 10);
    
    // Create particle effect on tick
    createTickParticle();
}

function createTickParticle() {
    const particle = document.createElement('div');
    particle.className = 'tick-particle';
    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.transform = `translate(-50%, -50%) translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 600);
}

function updateBackground(hour) {
    let gradient;
    if (hour >= 5 && hour < 11) {
        // Pagi - Orange to yellow
        gradient = 'linear-gradient(135deg, #FF8C42 0%, #FFD700 100%)';
    } else if (hour >= 11 && hour < 15) {
        // Siang - Blue
        gradient = 'linear-gradient(135deg, #00BFFF 0%, #87CEEB 100%)';
    } else if (hour >= 15 && hour < 18) {
        // Sore - Orange to pink
        gradient = 'linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%)';
    } else {
        // Malam - Dark blue to purple
        gradient = 'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)';
    }
    document.body.style.background = gradient;
}

function getGreeting(hour) {
    if (hour >= 5 && hour < 11) {
        return "🌅 Selamat Pagi!";
    } else if (hour >= 11 && hour < 15) {
        return "☀️ Selamat Siang!";
    } else if (hour >= 15 && hour < 18) {
        return "🌅 Selamat Sore!";
    } else {
        return "🌙 Selamat Malam!";
    }
}

function createBackgroundElements() {
    const body = document.body;
    const hour = new Date().getHours();
    
    // Clear existing elements
    const existingElements = document.querySelectorAll('.star, .sun, .cloud');
    existingElements.forEach(el => el.remove());
    
    if (hour >= 5 && hour < 18) {
        // Siang - Create sun
        const sun = document.createElement('div');
        sun.className = 'sun';
        sun.style.top = '10%';
        sun.style.right = '10%';
        body.appendChild(sun);
    } else {
        // Malam - Create stars
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            const sizes = ['small', 'medium', 'large'];
            star.className = 'star ' + sizes[Math.floor(Math.random() * sizes.length)];
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            body.appendChild(star);
        }
    }
}

setInterval(tampilanjam, 1000);

let day;
switch (new Date().getDay()) {
    case 0: day = "Minggu"; break;
    case 1: day = "Senin"; break;
    case 2: day = "Selasa"; break;
    case 3: day = "Rabu"; break;
    case 4: day = "Kamis"; break;
    case 5: day = "Jumat"; break;
    case 6: day = "Sabtu"; break;
}

let sekarang = new Date();
let tanggal = sekarang.getDate();
let bulan = sekarang.getMonth();
let tahun = sekarang.getFullYear();

let namabulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

function getTanggalJawa(){
    let hariMinggu = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    let pasaran = ["Wage", "Kliwon", "Legi", "Pahing", "Pon"];

    let msPerHari = 24 * 60 * 60 * 1000;
    let jumlahHari = Math.floor(sekarang.getTime() / msPerHari);

    let indexPasaran = jumlahHari % 5;

    let namaHari = hariMinggu[sekarang.getDay()];
    let namaPasaran = pasaran[indexPasaran];

    return `${namaHari} ${namaPasaran}`;
}

let tanggalJawa = getTanggalJawa();

document.getElementById("tanggal").innerHTML =
"Hari " + tanggalJawa + ", Tanggal " + tanggal + " " + namabulan[bulan] + " " + tahun;

// Add greeting
document.getElementById("greeting").innerHTML = getGreeting(sekarang.getHours());

// Update greeting and background every minute
setInterval(() => {
    const now = new Date();
    document.getElementById("greeting").innerHTML = getGreeting(now.getHours());
    updateBackground(now.getHours());
    createBackgroundElements();
}, 60000);

// Initial background setup
updateBackground(sekarang.getHours());
createBackgroundElements();

// Update background elements every 3 hours
setInterval(createBackgroundElements, 3 * 60 * 60 * 1000);

// Mouse tracking for floating elements
document.addEventListener('mousemove', (e) => {
    const kotak = document.querySelector('.kotak');
    const rect = kotak.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const distance = 15;
    
    kotak.style.setProperty('--mouse-x', Math.cos(angle) * distance + 'px');
    kotak.style.setProperty('--mouse-y', Math.sin(angle) * distance + 'px');
});

// Floating particles on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.8) {
        createFloatingParticle(e.clientX, e.clientY);
    }
});

function createFloatingParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.innerHTML = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = (8 + Math.random() * 8) + 'px';
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Click animation
document.addEventListener('click', (e) => {
    createClickRipple(e.clientX, e.clientY);
});

function createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}
