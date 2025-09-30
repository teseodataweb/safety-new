// Sistema de Autenticación Simple para AP Safety Admin
// Este sistema usa localStorage para mantener la sesión (adecuado para un prototipo)
// Para producción, se recomienda implementar autenticación del lado del servidor

(function() {
    'use strict';

    // Configuración de seguridad
    const AUTH_CONFIG = {
        sessionKey: 'apSafetyAdminSession',
        credentialsKey: 'apSafetyAdminCreds',
        sessionDuration: 3600000, // 1 hora en milisegundos
        maxAttempts: 3,
        lockoutDuration: 900000, // 15 minutos de bloqueo
        // Credenciales por defecto (CAMBIAR EN PRODUCCIÓN)
        defaultCredentials: {
            username: 'admin',
            // Password: admin123 (hasheado con función simple para el demo)
            passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9' // Cambiar a hash real en producción
        }
    };

    // Clase principal del sistema de autenticación
    class AuthSystem {
        constructor() {
            this.attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
            this.lockoutTime = parseInt(localStorage.getItem('lockoutTime') || '0');
        }

        // Verificar si el usuario está autenticado
        isAuthenticated() {
            const session = this.getSession();
            if (!session) return false;

            // Verificar si la sesión ha expirado
            if (Date.now() > session.expiresAt) {
                this.logout();
                return false;
            }

            return true;
        }

        // Obtener sesión actual
        getSession() {
            try {
                const sessionData = localStorage.getItem(AUTH_CONFIG.sessionKey);
                return sessionData ? JSON.parse(sessionData) : null;
            } catch (e) {
                return null;
            }
        }

        // Verificar si la cuenta está bloqueada
        isLockedOut() {
            if (this.lockoutTime && Date.now() < this.lockoutTime) {
                const remainingTime = Math.ceil((this.lockoutTime - Date.now()) / 60000);
                return {
                    locked: true,
                    message: `Cuenta bloqueada. Intente de nuevo en ${remainingTime} minutos.`
                };
            }
            return { locked: false };
        }

        // Iniciar sesión
        login(username, password) {
            // Verificar bloqueo
            const lockStatus = this.isLockedOut();
            if (lockStatus.locked) {
                return { success: false, message: lockStatus.message };
            }

            // Obtener credenciales almacenadas o usar las por defecto
            const storedCreds = this.getStoredCredentials();

            // Hashear la contraseña ingresada (usar librería crypto real en producción)
            const hashedPassword = this.simpleHash(password);

            // Verificar credenciales
            if (username === storedCreds.username && hashedPassword === storedCreds.passwordHash) {
                // Login exitoso
                this.createSession(username);
                this.resetAttempts();
                return { success: true, message: 'Login exitoso' };
            } else {
                // Login fallido
                this.handleFailedAttempt();
                return {
                    success: false,
                    message: `Credenciales incorrectas. ${AUTH_CONFIG.maxAttempts - this.attempts} intentos restantes.`
                };
            }
        }

        // Crear sesión
        createSession(username) {
            const session = {
                username: username,
                loginTime: Date.now(),
                expiresAt: Date.now() + AUTH_CONFIG.sessionDuration,
                token: this.generateToken()
            };
            localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(session));
        }

        // Cerrar sesión
        logout() {
            localStorage.removeItem(AUTH_CONFIG.sessionKey);
            return { success: true, message: 'Sesión cerrada exitosamente' };
        }

        // Manejar intento fallido
        handleFailedAttempt() {
            this.attempts++;
            localStorage.setItem('loginAttempts', this.attempts.toString());

            if (this.attempts >= AUTH_CONFIG.maxAttempts) {
                this.lockoutTime = Date.now() + AUTH_CONFIG.lockoutDuration;
                localStorage.setItem('lockoutTime', this.lockoutTime.toString());
            }
        }

        // Resetear intentos
        resetAttempts() {
            this.attempts = 0;
            this.lockoutTime = 0;
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('lockoutTime');
        }

        // Obtener credenciales almacenadas
        getStoredCredentials() {
            try {
                const creds = localStorage.getItem(AUTH_CONFIG.credentialsKey);
                return creds ? JSON.parse(creds) : AUTH_CONFIG.defaultCredentials;
            } catch (e) {
                return AUTH_CONFIG.defaultCredentials;
            }
        }

        // Cambiar contraseña
        changePassword(currentPassword, newPassword) {
            if (!this.isAuthenticated()) {
                return { success: false, message: 'No autenticado' };
            }

            const creds = this.getStoredCredentials();
            const hashedCurrent = this.simpleHash(currentPassword);

            if (hashedCurrent !== creds.passwordHash) {
                return { success: false, message: 'Contraseña actual incorrecta' };
            }

            // Validar nueva contraseña
            if (newPassword.length < 8) {
                return { success: false, message: 'La contraseña debe tener al menos 8 caracteres' };
            }

            // Guardar nueva contraseña
            creds.passwordHash = this.simpleHash(newPassword);
            localStorage.setItem(AUTH_CONFIG.credentialsKey, JSON.stringify(creds));

            return { success: true, message: 'Contraseña actualizada exitosamente' };
        }

        // Hash simple (REEMPLAZAR con bcrypt o similar en producción)
        simpleHash(text) {
            // Este es un hash muy simple, NO usar en producción
            // En producción usar bcrypt, argon2, o similar
            // Para el demo, usar un hash SHA-256 simulado simple
            let hash = 0;
            for (let i = 0; i < text.length; i++) {
                const char = text.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            // Crear un hash más largo y consistente
            const hashStr = Math.abs(hash).toString(16);
            // Pad y repetir para simular SHA-256
            return hashStr.padEnd(64, hashStr).substring(0, 64);
        }

        // Generar token aleatorio
        generateToken() {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        }

        // Renovar sesión
        renewSession() {
            if (this.isAuthenticated()) {
                const session = this.getSession();
                session.expiresAt = Date.now() + AUTH_CONFIG.sessionDuration;
                localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(session));
                return true;
            }
            return false;
        }

        // Obtener tiempo restante de sesión
        getSessionTimeRemaining() {
            const session = this.getSession();
            if (!session) return 0;
            const remaining = session.expiresAt - Date.now();
            return remaining > 0 ? remaining : 0;
        }
    }

    // Middleware para proteger páginas
    class AuthMiddleware {
        constructor(authSystem) {
            this.auth = authSystem;
        }

        // Proteger página (redirigir si no está autenticado)
        protectPage(loginUrl = 'login.html') {
            if (!this.auth.isAuthenticated()) {
                window.location.href = loginUrl;
                return false;
            }
            return true;
        }

        // Verificar autenticación sin redirigir
        checkAuth() {
            return this.auth.isAuthenticated();
        }

        // Mostrar información de sesión
        displaySessionInfo(elementId) {
            const element = document.getElementById(elementId);
            if (!element) return;

            const session = this.auth.getSession();
            if (session) {
                const timeRemaining = Math.ceil(this.auth.getSessionTimeRemaining() / 60000);
                element.innerHTML = `
                    <div style="padding: 10px; background: #f0f8f6; border-radius: 5px; margin-bottom: 20px;">
                        <i class="fa fa-user-shield"></i> Usuario: <strong>${session.username}</strong> |
                        Sesión expira en: <strong>${timeRemaining} minutos</strong>
                        <button onclick="APAuth.logout(); location.reload();" style="float: right; background: #dc3545; color: white; border: none; padding: 5px 15px; border-radius: 3px; cursor: pointer;">
                            <i class="fa fa-sign-out-alt"></i> Cerrar Sesión
                        </button>
                    </div>
                `;
            }
        }

        // Auto-renovar sesión con actividad
        enableAutoRenew() {
            let activityTimer;
            const renewSession = () => {
                this.auth.renewSession();
                clearTimeout(activityTimer);
                activityTimer = setTimeout(() => {
                    if (!this.auth.isAuthenticated()) {
                        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                        window.location.href = 'login.html';
                    }
                }, AUTH_CONFIG.sessionDuration);
            };

            // Renovar con actividad del usuario
            ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
                document.addEventListener(event, renewSession, { passive: true });
            });

            renewSession(); // Iniciar timer
        }
    }

    // Exportar sistema globalmente
    window.APAuth = new AuthSystem();
    window.APAuthMiddleware = new AuthMiddleware(window.APAuth);

    // Funciones de utilidad para formularios
    window.APAuthUI = {
        // Crear formulario de login
        createLoginForm: function(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = `
                <div style="max-width: 400px; margin: 0 auto; padding: 30px; background: white; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                    <h3 style="text-align: center; color: var(--ap-verde-corporativo); margin-bottom: 30px;">
                        <i class="fa fa-lock"></i> Acceso Administrativo
                    </h3>
                    <form id="loginForm">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Usuario:</label>
                            <input type="text" id="username" required style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 5px;">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Contraseña:</label>
                            <input type="password" id="password" required style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 5px;">
                        </div>
                        <div id="loginMessage" style="margin-bottom: 20px;"></div>
                        <button type="submit" style="width: 100%; padding: 12px; background: var(--ap-verde-corporativo); color: white; border: none; border-radius: 5px; font-weight: 600; cursor: pointer;">
                            <i class="fa fa-sign-in-alt"></i> Iniciar Sesión
                        </button>
                    </form>
                    <div style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
                        <p>Credenciales por defecto:</p>
                        <p>Usuario: <strong>admin</strong></p>
                        <p>Contraseña: <strong>admin123</strong></p>
                    </div>
                </div>
            `;

            // Manejar envío del formulario
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const messageDiv = document.getElementById('loginMessage');

                const result = window.APAuth.login(username, password);

                if (result.success) {
                    messageDiv.innerHTML = `<div style="color: green;"><i class="fa fa-check"></i> ${result.message}</div>`;
                    setTimeout(() => {
                        window.location.href = 'admin-products.html';
                    }, 1000);
                } else {
                    messageDiv.innerHTML = `<div style="color: red;"><i class="fa fa-times"></i> ${result.message}</div>`;
                }
            });
        }
    };

})();