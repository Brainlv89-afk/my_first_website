class EnquiryHandler {
    constructor() {
        this.emailInput = document.getElementById('emailInput');
        this.message = document.getElementById('message');
        this.submitButton = document.getElementById('submitButton');
        this.setupHandler();
    }

    setupHandler() {
        if (this.emailInput && this.submitButton) {
            this.submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleEnquiry();
            });
        }
    }

    handleEnquiry() {
        const email = this.emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        this.message.style.display = 'none';
        this.emailInput.classList.remove('is-invalid');

        if (!emailPattern.test(email)) {
            this.emailInput.classList.add('is-invalid');
            this.message.style.display = 'block';
            this.message.style.color = 'red';
            this.message.textContent = '❌ Please enter a valid email address';
            return;
        }

        const subject = encodeURIComponent('Sales Enquiry our Email: marketplace@scanum.co.uk');
        const body = encodeURIComponent(`Please contact us at: ${email} \n\n [Your message here]`);
        const mailtoLink = `mailto:marketplace@scanum.co.uk?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;

        this.message.style.display = 'block';
        this.message.style.color = 'green';
        this.message.textContent = '✅ Email client opened - please send your enquiry';

        setTimeout(() => {
            this.emailInput.value = '';
            this.message.style.display = 'none';
        }, 2000);
    }
}