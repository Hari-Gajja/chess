// IndexedDB setup
const db = {
    dbInstance: null,
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('UserDatabase', 1);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('users')) {
                    db.createObjectStore('users', { keyPath: 'email' });
                }
            };
            request.onsuccess = (event) => {
                this.dbInstance = event.target.result;
                resolve();
            };
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    },
    async addUser(user) {
        return new Promise((resolve, reject) => {
            const transaction = this.dbInstance.transaction('users', 'readwrite');
            const store = transaction.objectStore('users');
            const request = store.add(user);
            request.onsuccess = () => resolve();
            request.onerror = (event) => reject(event.target.error);
        });
    },
    async getUser(email) {
        return new Promise((resolve, reject) => {
            const transaction = this.dbInstance.transaction('users', 'readonly');
            const store = transaction.objectStore('users');
            const request = store.get(email);
            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(event.target.error);
        });
    },
    async updateUser(user) {
        return new Promise((resolve, reject) => {
            const transaction = this.dbInstance.transaction('users', 'readwrite');
            const store = transaction.objectStore('users');
            const request = store.put(user);
            request.onsuccess = () => resolve();
            request.onerror = (event) => reject(event.target.error);
        });
    },
    async deleteUser(email) {
        return new Promise((resolve, reject) => {
            const transaction = this.dbInstance.transaction('users', 'readwrite');
            const store = transaction.objectStore('users');
            const request = store.delete(email);
            request.onsuccess = () => resolve();
            request.onerror = (event) => reject(event.target.error);
        });
    }
};

// Initialize IndexedDB
db.init().catch(error => {
    console.error('Failed to initialize IndexedDB:', error);
});

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginTab = document.querySelector('[data-tab="login"]');
const signupTab = document.querySelector('[data-tab="signup"]');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Switch between login and signup forms
function switchForm(formType) {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(`${formType}Form`).classList.add('active');
    document.querySelector(`[data-tab="${formType}"]`).classList.add('active');
}

// Event Listeners
loginTab?.addEventListener('click', () => switchForm('login'));
signupTab?.addEventListener('click', () => switchForm('signup'));
switchToSignup?.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm('signup');
});
switchToLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm('login');
});

// Helper Functions
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = input.nextElementSibling;
    if (errorElement?.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.style.borderColor = 'var(--secondary-color)';
    }
}

function showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.textContent = message;
    
    const form = document.querySelector('.auth-form.active');
    form.insertBefore(alert, form.firstChild);
    
    setTimeout(() => alert.remove(), 3000);
}

// Clear errors on input
document.querySelectorAll('.auth-form input').forEach(input => {
    input.addEventListener('input', () => {
        const errorElement = input.nextElementSibling;
        if (errorElement?.classList.contains('error-message')) {
            errorElement.style.display = 'none';
            input.style.borderColor = '#ddd';
        }
    });
});

// Add logout functionality
function addLogoutButton() {
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', async (e) => {
        if (sessionStorage.getItem('currentUser')) {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            updateUIForLoggedOutUser();
        }
    });
}

// UI update functions
function updateUIForLoggedInUser(user) {
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    loginBtn.textContent = user.name;
    loginBtn.title = 'Click to logout';
    signupBtn.style.display = 'none';
}

function updateUIForLoggedOutUser() {
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    loginBtn.textContent = 'Login';
    loginBtn.title = '';
    signupBtn.style.display = 'inline-block';
    window.location.reload();
}

// Initialize
window.addEventListener('load', async () => {
    addLogoutButton();
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        updateUIForLoggedInUser(currentUser);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = new LoginForm();
    const signupForm = new SignupForm();
    
    // Handle modal visibility and form switching
    const closeButtons = document.querySelectorAll('.close-modal');
    const loginModal = document.getElementById('loginModal');
    
    // Close modal handlers
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.auth-modal');
            if (modal) {
                modal.style.display = 'none';
                loginForm.reset();
                signupForm.reset();
            }
        });
    });
    
    // Tab switching
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const formType = tab.dataset.tab;
            switchForm(formType);
        });
    });
    
    function switchForm(formType) {
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.getElementById(`${formType}Form`).classList.add('active');
        document.querySelector(`[data-tab="${formType}"]`).classList.add('active');
        
        // Reset forms when switching
        loginForm.reset();
        signupForm.reset();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const loginModal = document.getElementById('loginModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const openLoginBtn = document.getElementById('openLoginModal');
    const openSignupBtn = document.getElementById('openSignupModal');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const socialBtns = document.querySelectorAll('.social-btn');
    const forgotPasswordLink = document.querySelector('.forgot-password');

    // Modal Open/Close
    openLoginBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
        switchToAuthTab('login');
    });

    openSignupBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
        switchToAuthTab('signup');
    });

    // Close buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.auth-modal, .watch-modal');
            if (modal) {
                modal.style.display = 'none';
                resetForms();
            }
        });
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('auth-modal')) {
            e.target.style.display = 'none';
            resetForms();
        }
    });

    // Form switching
    switchToSignup?.addEventListener('click', (e) => {
        e.preventDefault();
        switchToAuthTab('signup');
    });

    switchToLogin?.addEventListener('click', (e) => {
        e.preventDefault();
        switchToAuthTab('login');
    });

    // Social login
    socialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = btn.title.includes('Google') ? 'Google' : 'Facebook';
            handleSocialLogin(provider);
        });
    });

    // Forgot password
    forgotPasswordLink?.addEventListener('click', (e) => {
        e.preventDefault();
        handleForgotPassword();
    });

    // Add password toggle functionality
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Helper Functions
    function switchToAuthTab(tab) {
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.querySelectorAll('.auth-tab').forEach(t => {
            t.classList.remove('active');
        });
        
        document.getElementById(`${tab}Form`).classList.add('active');
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    }

    function resetForms() {
        document.querySelectorAll('.auth-form form').forEach(form => {
            form.reset();
        });
        document.querySelectorAll('.error-message, .error-container').forEach(err => {
            err.style.display = 'none';
        });
    }

    function handleSocialLogin(provider) {
        // For demo purposes, show an alert
        alert(`${provider} login functionality would be implemented here`);
    }

    function handleForgotPassword() {
        const email = document.getElementById('loginEmail').value;
        if (email) {
            alert(`Password reset link would be sent to: ${email}`);
        } else {
            alert('Please enter your email address first');
            document.getElementById('loginEmail').focus();
        }
    }
});

// User Authentication Class
class UserAuth {
    constructor() {
        this.loginForm = document.getElementById('loginFormElement');
        this.signupForm = document.getElementById('signupFormElement');
        this.initializeAuth();
    }

    initializeAuth() {
        // Handle Login Form
        this.loginForm?.addEventListener('submit', (e) => this.handleLogin(e));

        // Handle Signup Form
        this.signupForm?.addEventListener('submit', (e) => this.handleSignup(e));

        // Initialize stored users if not exists
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.showSuccess('loginForm', 'Login successful!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            this.showError('loginForm', 'Invalid email or password');
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            this.showError('signupForm', 'Passwords do not match');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            this.showError('signupForm', 'Email already exists');
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            joined: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        this.showSuccess('signupForm', 'Account created successfully!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    showError(formId, message) {
        const form = document.getElementById(formId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    showSuccess(formId, message) {
        const form = document.getElementById(formId);
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.textContent = message;
        form.insertBefore(successDiv, form.firstChild);
        setTimeout(() => successDiv.remove(), 3000);
    }
}

// Update authentication state
function updateAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authButtons = document.querySelector('.auth-buttons');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const userIcon = document.getElementById('userIcon');

    if (currentUser) {
        authButtons.style.display = 'none';
        
        userIcon.innerHTML = `
            <div class="user-menu">
                <i class="fas fa-user-circle"></i>
                <div class="dropdown-content">
                    <span class="user-info">
                        <span class="user-name">${currentUser.name}</span>
                        <span class="user-email">${currentUser.email}</span>
                    </span>
                    <a href="profile.html">Profile</a>
                    <a href="#" class="logout-link">Logout</a>
                </div>
            </div>
        `;

        // Update logout handler
        const logoutLink = userIcon.querySelector('.logout-link');
        logoutLink?.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });

        // Update profile link handler
        const profileLink = userIcon.querySelector('a[href="profile.html"]');
        profileLink?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    } else {
        authButtons.style.display = 'flex';
        userIcon.innerHTML = '<i class="fas fa-user"></i>';
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateAuthState);

// Initialize auth functionality
document.addEventListener('DOMContentLoaded', () => {
    new UserAuth();
});
