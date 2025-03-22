function submitEmail() {
    let email = document.getElementById("emailInput").value.trim();
    let message = document.getElementById("message");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

    if (email === "") {
        message.style.display = "block";
        message.style.color = "red";
        message.innerHTML = "❌ Please enter your email address.";
        return;
    } 
    if (!emailPattern.test(email)) {
        message.style.display = "block";
        message.style.color = "red";
        message.innerHTML = "❌ Please enter a valid email address.";
        return;
    } 

    // FormSubmit API integration
    let formData = new FormData();
    formData.append("email", email);
    formData.append("_subject", "New Email Inquiry!");
    formData.append("_autoresponse", "Thank you! Our representative will be in touch soon.");
    formData.append("_captcha", "false"); // Disables Captcha
    formData.append("_template", "table"); // Formats the email nicely

    fetch("https://formsubmit.co/ajax/marketplace@scanum.co.uk", {
        method: "POST",
        body: formData
    })
    .then(response => response.json()) // Process response as JSON
    .then(data => {
        if (data.success) {
            message.style.display = "block";
            message.style.color = "green";
            message.innerHTML = "✅ Thank you! Our representative will be in touch soon.";
            document.getElementById("emailInput").value = ""; // Clear input after successful submission
        } else {
            throw new Error("Submission failed.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        message.style.display = "block";
        message.style.color = "red";
        message.innerHTML = "❌ Something went wrong. Please try again.";
    });
}
