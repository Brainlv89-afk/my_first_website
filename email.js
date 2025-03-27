function handleEnquiry() {
    const emailInput = document.getElementById('emailInput');
    const message = document.getElementById('message');
    const email = emailInput.value.trim();
    
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous messages
    message.style.display = 'none';
    emailInput.classList.remove('is-invalid');

    // Validate email format
    if (!emailPattern.test(email)) {
        emailInput.classList.add('is-invalid');
        message.style.display = 'block';
        message.style.color = 'red';
        message.textContent = '❌ Please enter a valid email address';
        return;
    }

    // Encode special characters for mailto link
    const subject = encodeURIComponent('Website Enquiry');
    const body = encodeURIComponent(`Please contact us at: marketplace@scanum.co.uk\n\n [Your message here]`);
    
    // Create mailto link
    const mailtoLink = `mailto:marketplace@scanum.co.uk?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    message.style.display = 'block';
    message.style.color = 'green';
    message.textContent = '✅ Email client opened - please send your enquiry';
    
    // Clear input after 2 seconds
    setTimeout(() => {
        emailInput.value = '';
        message.style.display = 'none';
    }, 2000);
}