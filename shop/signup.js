class SignupForm {
    constructor() {
        this.form = document.getElementById('signupFormElement');
        this.nameInput = document.getElementById('signupName');
        this.emailInput = document.getElementById('signupEmail');
        this.passwordInput = document.getElementById('signupPassword');
        this.confirmPasswordInput = document.getElementById('confirmPassword');
        this.initializeEvents();
    }

    initializeEvents() {
        this.form?.addEventListener('submit', (e) => this.handleSignup(e));
        
        // Add handlers for signup links and buttons
        document.querySelectorAll('.signup-btn, #openSignupModal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSignupModal();
            });
        });

        // Add handler for switch to login
        document.getElementById('switchToLogin')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToLogin();
        });
    }

    async handleSignup(e) {
        e.preventDefault();
        if (!this.validateForm()) return;

        try {
            const newUser = {
                id: Date.now(),
                name: this.nameInput.value,
                email: this.emailInput.value,
                password: this.passwordInput.value,
                joined: new Date().toISOString()
            };

            // Check if email exists in IndexedDB
            const existingUser = await db.getUser(newUser.email);
            if (existingUser) {
                this.showError('Email already exists');
                return;
            }

            // Add user to IndexedDB
            await db.addUser(newUser);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            this.showSuccess('Account created successfully! Redirecting...');
            setTimeout(() => window.location.href = 'index.html', 1500);
        } catch (error) {
            this.showError('Signup failed. Please try again.');
            console.error('Signup error:', error);
        }
    }

    validateForm() {
        if (!this.nameInput.value || !this.emailInput.value || !this.passwordInput.value) {
            this.showError('Please fill in all fields');
            return false;
        }

        if (this.passwordInput.value !== this.confirmPasswordInput.value) {
            this.showError('Passwords do not match');
            return false;
        }

        return true;
    }

    showSignupModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.switchTab('signup');
        }
    }

    switchToLogin() {
        this.switchTab('login');
    }

    switchTab(tab) {
        document.querySelectorAll('.auth-tab').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-tab') === tab);
        });
        document.querySelectorAll('.auth-form').forEach(f => {
            f.classList.toggle('active', f.id === `${tab}Form`);
        });
    }

    showError(message) {
        const errorContainer = this.form.querySelector('.error-container');
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    }

    showSuccess(message) {
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.textContent = message;
        this.form.insertBefore(successMessage, this.form.firstChild);
    }
}

// Initialize signup form
new SignupForm();
