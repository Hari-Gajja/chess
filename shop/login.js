class LoginForm {
    constructor() {
        this.form = document.getElementById('loginFormElement');
        this.emailInput = document.getElementById('loginEmail');
        this.passwordInput = document.getElementById('loginPassword');
        this.forgotPasswordLink = document.querySelector('.forgot-password');
        this.initializeEvents();
    }

    initializeEvents() {
        this.form?.addEventListener('submit', (e) => this.handleLogin(e));
        this.forgotPasswordLink?.addEventListener('click', (e) => this.handleForgotPassword(e));
        
        // Add handlers for login links and buttons
        document.querySelectorAll('.login-btn, #openLoginModal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginModal();
            });
        });

        // Add handler for switch to signup
        document.getElementById('switchToSignup')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToSignup();
        });

        // Close modal handler
        document.querySelector('.close-modal')?.addEventListener('click', () => {
            this.closeModal();
        });
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        if (!this.validateForm(email, password)) return;

        try {
            // Check demo account
            if (email === 'demo@example.com' && password === 'gemini@clone5') {
                this.loginSuccess({
                    name: 'Demo User',
                    email: 'demo@example.com'
                });
                return;
            }

            // Get user from IndexedDB
            const user = await db.getUser(email);
            if (user && user.password === password) {
                this.loginSuccess(user);
            } else {
                this.showError('Invalid email or password');
            }
        } catch (error) {
            this.showError('Login failed. Please try again.');
            console.error('Login error:', error);
        }
    }

    validateForm(email, password) {
        if (!email || !password) {
            this.showError('Please fill in all fields');
            return false;
        }
        return true;
    }

    loginSuccess(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.showSuccess('Login successful! Redirecting...');
        setTimeout(() => window.location.href = 'index.html', 1500);
    }

    handleForgotPassword(e) {
        e.preventDefault();
        const email = this.emailInput.value;
        if (email) {
            alert(`Password reset link would be sent to: ${email}`);
        } else {
            alert('Please enter your email address first');
            this.emailInput.focus();
        }
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

    reset() {
        this.form.reset();
        this.form.querySelector('.error-container').style.display = 'none';
    }

    showLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.switchTab('login');
        }
    }

    closeModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.reset();
        }
    }

    switchToSignup() {
        this.switchTab('signup');
    }

    switchTab(tab) {
        document.querySelectorAll('.auth-tab').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-tab') === tab);
        });
        document.querySelectorAll('.auth-form').forEach(f => {
            f.classList.toggle('active', f.id === `${tab}Form`);
        });
    }
}

// Initialize login form
new LoginForm();
