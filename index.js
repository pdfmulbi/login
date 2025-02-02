// Import fungsi postJSON
// import {postJSON} from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js';

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".submit-btn");

    if (loginButton) {
        loginButton.addEventListener("click", async function (event) {
            event.preventDefault();

            const email = document.querySelector("input[name='email']").value.trim();
            const password = document.querySelector("#password").value.trim();

            if (!email || !password) {
                alert("Mohon isi email dan kata sandi.");
                return;
            }

            const data = { email, password };
            const target_url = "https://asia-southeast2-pdfulbi.cloudfunctions.net/pdfmerger/pdfm/login";

            try {
                const response = await postJSON(target_url, "Content-Type", "application/json", data);

                if (response.status >= 200 && response.status < 300) {
                    const { token, userName, isAdmin } = response.data;

                    // Simpan ke localStorage
                    localStorage.setItem("authToken", token);
                    localStorage.setItem("userName", userName);
                    localStorage.setItem("isAdmin", isAdmin ? "true" : "false");

                    alert("Login berhasil!");

                    // Redirect berdasarkan status admin
                    if (isAdmin) {
                        window.location.href = "https://pdfmulbi.github.io/dashboard";
                    } else {
                        window.location.href = "https://pdfmulbi.github.io/";
                    }
                } else {
                    alert("Gagal login: " + (response.data.message || "Kesalahan tidak diketahui"));
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Terjadi kesalahan saat login. Silakan coba lagi.");
            }
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
