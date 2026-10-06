document.getElementById("btn-kali").addEventListener("click", function () {
    let angka = Number(document.getElementById("in-kali").value);
    let hasil = "";

    for (let i = 1; i <= 10; i++) {
        hasil += angka + " x " + i + " = " + (angka * i) + "\n";
    }

    document.getElementById("out-kali").textContent = hasil;
});


function hitungFaktorial(angka) {
    let hasil = 1;

    for (let i = 1; i <= angka; i++) {
        hasil *= i;
    }

    return hasil;
}

document.getElementById("btn-faktorial").addEventListener("click", function () {
    let angka = Number(document.getElementById("in-faktorial").value);

    if (angka < 0) {
        document.getElementById("out-faktorial").textContent =
            "Faktorial tidak dapat menggunakan angka negatif.";
    } else {
        let hasil = hitungFaktorial(angka);

        document.getElementById("out-faktorial").textContent =
            angka + "! = " + hasil;
    }
});


function periksaBilanganPrima(angka) {
    if (angka < 2) {
        return false;
    }

    for (let pembagi = 2; pembagi < angka; pembagi++) {
        if (angka % pembagi === 0) {
            return false;
        }
    }

    return true;
}

document.getElementById("btn-prima").addEventListener("click", function () {
    let angka = Number(document.getElementById("in-prima").value);

    if (periksaBilanganPrima(angka)) {
        document.getElementById("out-prima").textContent =
            angka + " adalah bilangan prima.";
    } else {
        document.getElementById("out-prima").textContent =
            angka + " bukan bilangan prima.";
    }
});


function hitungBMI(berat, tinggi) {
    let tinggiMeter = tinggi / 100;

    return berat / (tinggiMeter * tinggiMeter);
}

document.getElementById("btn-bmi").addEventListener("click", function () {
    let beratBadan = Number(document.getElementById("in-berat").value);
    let tinggiBadan = Number(document.getElementById("in-tinggi").value);

    if (beratBadan <= 0 || tinggiBadan <= 0) {
        document.getElementById("out-bmi").textContent =
            "Masukkan berat dan tinggi yang valid.";
        return;
    }

    let nilaiBMI = hitungBMI(beratBadan, tinggiBadan);
    let kategoriBMI;

    if (nilaiBMI < 18.5) {
        kategoriBMI = "Berat badan kurang";
    } else if (nilaiBMI < 25) {
        kategoriBMI = "Berat badan normal";
    } else if (nilaiBMI < 30) {
        kategoriBMI = "Berat badan berlebih";
    } else {
        kategoriBMI = "Obesitas";
    }

    document.getElementById("out-bmi").textContent =
        "BMI = " + nilaiBMI.toFixed(2) +
        " (" + kategoriBMI + ")";
});


document.getElementById("btn-fizzbuzz").addEventListener("click", function () {
    let hasilFizzBuzz = "";

    for (let angka = 1; angka <= 100; angka++) {

        if (angka % 3 === 0 && angka % 5 === 0) {
            hasilFizzBuzz += "FizzBuzz\n";

        } else if (angka % 3 === 0) {
            hasilFizzBuzz += "Fizz\n";

        } else if (angka % 5 === 0) {
            hasilFizzBuzz += "Buzz\n";

        } else {
            hasilFizzBuzz += angka + "\n";
        }
    }

    document.getElementById("out-fizzbuzz").textContent =
        hasilFizzBuzz;
});
