// Import fungsi postJSON
import { postJSON } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js';

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".submit-btn");

    if (loginButton) {
        loginButton.addEventListener("click", function (event) {
            event.preventDefault(); // Mencegah reload halaman

            const email = document.querySelector("input[name='email']").value || "";
            const password = document.querySelector("#password").value || "";

            if (!email || !password) {
                alert("Mohon isi email dan kata sandi.");
                return;
            }

            const data = { email, password };
            const target_url = "https://asia-southeast2-pdfulbi.cloudfunctions.net/pdfmerger/pdfm/login";

            postJSON(
                target_url,
                "Content-Type",
                "application/json",
                data,
                function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        const token = response.data.token;

                        // Simpan token ke localStorage
                        localStorage.setItem("authToken", token);
                        alert("Login berhasil!");

                        // Redirect ke homepage
                        window.location.href = "https://pdfmulbi.github.io/";
                    } else {
                        alert("Gagal login: " + (response.data.message || "Kesalahan tidak diketahui"));
                    }
                }
            ).catch((error) => {
                console.error("Error:", error);
                alert("Terjadi kesalahan. Silakan coba lagi.");
            });
        });
    }
});
