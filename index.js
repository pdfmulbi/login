// Import fungsi postJSON
import {postJSON} from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js';

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

            const data = {
                email,
                password
            };
            const target_url = "https://asia-southeast2-pdfulbi.cloudfunctions.net/pdfmerger/pdfm/login";

            postJSON(
                target_url,
                "Content-Type",
                "application/json",
                data,
                function (response) {
                    if (response.status >= 200 && response.status < 300) {
                        const token = response.data.token;
                        const userName = response.data.userName;

                        // Simpan token ke localStorage
                        localStorage.setItem("authToken", token);
                        localStorage.setItem("userName", data.userName);
                        localStorage.setItem("isAdmin", data.isAdmin);
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

document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    const toggleIcon = togglePasswordButton.querySelector('i');

    // Add event listener to the toggle button
    togglePasswordButton.addEventListener('click', () => {
        // Check current state
        const isPasswordVisible = passwordInput.type === 'text';

        // Toggle password visibility
        passwordInput.type = isPasswordVisible ? 'password' : 'text';

        // Toggle the icon
        toggleIcon.classList.toggle('fa-eye', !isPasswordVisible);
        toggleIcon.classList.toggle('fa-eye-slash', isPasswordVisible);
    });
});