const API_URL = 'http://127.0.0.1:8000/api';

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function removeToken() {
    localStorage.removeItem('token');
}

function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) {
        existing.remove();
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    // Fade out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

async function fetchWithAuth(endpoint, options = {}) {
    const token = getToken();
    const headers = options.headers || {};
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }
    
    options.headers = headers;
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        if (response.status === 401) {
            removeToken();
            window.location.href = 'index.html';
            return null;
        }
        return response;
    } catch (error) {
        console.error("API call error:", error);
        showToast("Network error. Please make sure the backend is running.", "error");
        throw error;
    }
}

async function checkAuth(requiredAdmin = false) {
    const token = getToken();
    const pathParts = window.location.pathname.split('/');
    const currentPage = pathParts[pathParts.length - 1];
    
    const isAuthPage = currentPage === 'index.html' || currentPage === 'register.html' || currentPage === '';
    
    if (!token) {
        if (!isAuthPage) {
            window.location.href = 'index.html';
        }
        return null;
    }
    
    try {
        const response = await fetchWithAuth('/users/me');
        if (!response || !response.ok) {
            removeToken();
            if (!isAuthPage) {
                window.location.href = 'index.html';
            }
            return null;
        }
        
        const user = await response.json();
        
        if (isAuthPage) {
            window.location.href = 'dashboard.html';
            return user;
        }
        
        if (requiredAdmin && !user.is_admin) {
            showToast("Access Denied: Administrator role required.", "error");
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            return null;
        }
        
        return user;
    } catch (e) {
        console.error("Auth guard error:", e);
        removeToken();
        if (!isAuthPage) {
            window.location.href = 'index.html';
        }
        return null;
    }
}

function logout() {
    removeToken();
    window.location.href = 'index.html';
}
