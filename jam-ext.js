function tampilanjam() {
            const waktu = new Date( ) ;
            document.getElementById("jam").innerHTML = waktu.toLocaleTimeString();
            document.title = waktu.toLocaleTimeString();
        }

        setInterval(tampilanjam, 1000)

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
