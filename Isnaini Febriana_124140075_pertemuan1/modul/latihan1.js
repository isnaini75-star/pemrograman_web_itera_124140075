const nama = "Isnaini Febriana";
let umur = 20;
const kotaAsal = "Bandar Lampung";

document.getElementById("dataDiri").innerHTML =
    "Nama: " + nama + "<br>" +
    "Umur: " + umur + " tahun<br>" +
    "Kota Asal: " + kotaAsal;

let nilai = 80;

if (nilai >= 70) {
    document.getElementById("kelulusan").innerHTML =
        "Nilai: " + nilai + " → Lulus";
} else {
    document.getElementById("kelulusan").innerHTML =
        "Nilai: " + nilai + " → Tidak Lulus";
}


if (umur < 12) {
    document.getElementById("kategoriUmur").innerHTML =
        "Kategori umur: Anak";
} else if (umur >= 12 && umur <= 17) {
    document.getElementById("kategoriUmur").innerHTML =
        "Kategori umur: Remaja";
} else if (umur >= 18 && umur <= 59) {
    document.getElementById("kategoriUmur").innerHTML =
        "Kategori umur: Dewasa";
} else {
    document.getElementById("kategoriUmur").innerHTML =
        "Kategori umur: Lansia";
}


let angkaHari = 3;
let namaHari;

switch (angkaHari) {
    case 1:
        namaHari = "Monday";
        break;
    case 2:
        namaHari = "Tuesday";
        break;
    case 3:
        namaHari = "Wednesday";
        break;
    case 4:
        namaHari = "Thursday";
        break;
    case 5:
        namaHari = "Friday";
        break;
    case 6:
        namaHari = "Saturday";
        break;
    case 7:
        namaHari = "Sunday";
        break;
    default:
        namaHari = "Angka hari tidak valid";
}

document.getElementById("namaHari").innerHTML =
    "Angka " + angkaHari + " = " + namaHari;

let nilaiGrade = 85;

let grade = nilaiGrade >= 90 ? "A" :
            nilaiGrade >= 80 ? "B" :
            nilaiGrade >= 70 ? "C" :
            nilaiGrade >= 60 ? "D" : "E";

document.getElementById("grade").innerHTML =
    "Nilai: " + nilaiGrade + " → Grade: " + grade;
