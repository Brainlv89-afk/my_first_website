async function submitEmail() {
    const emailInput = document.getElementById("emailInput");
    const message = document.getElementById("message");
    const btn = document.getElementById("submitButton");
    const email = emailInput.value.trim();
    
    // Clear previous states
    message.style.display = "none";
    btn.disabled = true;
    emailInput.classList.remove('is-invalid');

    try {
        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("Please enter a valid email address");
        }

        // Configure request parameters
        const formData = new FormData();
        formData.append("_captcha", "false");
        formData.append("_template", "table");
        formData.append("_subject", "New Website Inquiry");
        formData.append("email", email);
        formData.append("_autoresponse", "Thank you for contacting us!");

        // Show loading state
        message.style.display = "block";
        message.style.color = "#666";
        message.textContent = "⏳ Sending your inquiry...";

        // Make request with timeout handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch("https://formsubmit.co/ajax/marketplace@scanum.co.uk", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            },
            signal: controller.signal,
            mode: "cors",
            referrerPolicy: "no-referrer-when-downgrade"
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Server error");
        }

        // Success handling
        message.style.color = "green";
        message.textContent = "✅ Inquiry sent! Check your email";
        emailInput.value = "";
    } catch (error) {
        console.error("Submission error:", error);
        message.style.color = "red";
        message.textContent = `❌ Error: ${error.message.replace('Failed to fetch', 'Network error - please check connection')}`;
        emailInput.classList.add('is-invalid');
    } finally {
        btn.disabled = false;
        setTimeout(() => {
            message.style.display = "none";
        }, 5000);
    }
}