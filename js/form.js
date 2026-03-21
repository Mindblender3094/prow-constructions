/* ==================================
   PROW CONSTRUCTIONS — form.js
   Contact form validation & submission
   ================================== */

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (!form) return;

    function showError(fieldId, errorId, msg) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        if (!field || !error) return;
        field.parentElement.classList.add('has-error');
        error.textContent = msg;
    }

    function clearError(fieldId, errorId) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        if (!field || !error) return;
        field.parentElement.classList.remove('has-error');
        error.textContent = '';
    }

    function validateForm() {
        let valid = true;
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const service = document.getElementById('form-service').value;
        const message = document.getElementById('form-message').value.trim();

        clearError('form-name', 'error-name');
        clearError('form-email', 'error-email');
        clearError('form-service', 'error-service');
        clearError('form-message', 'error-message');

        if (!name) { showError('form-name', 'error-name', 'Please enter your full name.'); valid = false; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('form-email', 'error-email', 'Please enter a valid email address.'); valid = false;
        }
        if (!service) { showError('form-service', 'error-service', 'Please select a service.'); valid = false; }
        if (!message || message.length < 20) {
            showError('form-message', 'error-message', 'Please describe your project (at least 20 characters).'); valid = false;
        }

        return valid;
    }

    // Live validation on blur
    ['form-name', 'form-email', 'form-service', 'form-message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('blur', () => validateForm());
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!validateForm()) return;

        const submitBtn = document.getElementById('form-submit');
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;

        // =====================================================================
        // EMAIL SETUP — Web3Forms (free, no backend needed)
        // HOW TO SET UP:
        //   1. Go to https://web3forms.com
        //   2. Enter YOUR email address → click "Create Access Key"
        //   3. Copy the Access Key you receive
        //   4. Replace "YOUR_ACCESS_KEY_HERE" below with your actual key
        //   5. Save the file — you will now receive all form submissions by email!
        // =====================================================================
        const WEB3FORMS_ACCESS_KEY = '57d16b26-b54e-48ca-85ea-7e8f8927e41d';

        const formData = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: 'New Quote Request — Prow Constructions Inc.',
            from_name: 'Prow Constructions Website',
            name: document.getElementById('form-name').value.trim(),
            email: document.getElementById('form-email').value.trim(),
            phone: document.getElementById('form-phone').value.trim() || 'Not provided',
            service: document.getElementById('form-service').value,
            message: document.getElementById('form-message').value.trim(),
        };

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                form.reset();
                formSuccess.textContent = '✅ Thank you! We\'ll be in touch within 1 business day.';
                formSuccess.style.color = '#50c878';
                formSuccess.classList.add('show');
                setTimeout(() => formSuccess.classList.remove('show'), 6000);
            } else {
                formSuccess.textContent = '⚠️ Something went wrong. Please call us directly or try again.';
                formSuccess.style.color = '#e05555';
                formSuccess.style.background = 'rgba(224,85,85,0.1)';
                formSuccess.style.borderColor = 'rgba(224,85,85,0.3)';
                formSuccess.classList.add('show');
                setTimeout(() => formSuccess.classList.remove('show'), 6000);
            }
        } catch (err) {
            formSuccess.textContent = '⚠️ Network error. Please check your connection and try again.';
            formSuccess.style.color = '#e05555';
            formSuccess.classList.add('show');
            setTimeout(() => formSuccess.classList.remove('show'), 6000);
        } finally {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });

});
