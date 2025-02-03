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
                fetch(target_url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (!response.ok) throw new Error("Login gagal.");
                    return response.json();
                })
                .then(result => {
                    localStorage.setItem("authToken", result.token);
                    localStorage.setItem("userName", result.userName);
                    localStorage.setItem("isAdmin", result.isAdmin ? "true" : "false");
                    
                    alert("Login berhasil!");
                    window.location.href = "https://pdfmulbi.github.io/";
                })
                .catch(error => {
                    console.error("Error saat login:", error);
                    alert("Terjadi kesalahan saat fetch data. Silakan coba lagi.");
                });
            } catch (error) {
                console.error("Error saat login:", error);
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
