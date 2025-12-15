// Sistema de Autenticación Simplificado para AP Safety Admin
// IMPORTANTE: Este sistema es solo para demo/desarrollo
// En producción, implementar autenticación con backend seguro
// Credenciales por defecto: Contactar al administrador del sistema

(function() {
    'use strict';

    // Configuración - CAMBIAR ANTES DE PRODUCCIÓN
    // Las credenciales deben ser proporcionadas por el administrador
    const CONFIG = {
        sessionKey: 'apSafetySession',
        // Hash simple de las credenciales (cambiar en producción)
        credentials: 'YXBzYWZldHlfYWRtaW46QVBTYWZldHkyMDI1IQ==', // Base64
        sessionTimeout: 3600000 // 1 hora
    };

    // Decodificar credenciales
    function getCredentials() {
        try {
            const decoded = atob(CONFIG.credentials);
            const [user, pass] = decoded.split(':');
            return { username: user, password: pass };
        } catch (e) {
            return { username: '', password: '' };
        }
    }

    // Sistema de autenticación
    window.SimpleAuth = {
        // Verificar login
        login: function(username, password) {
            // Limpiar espacios
            username = username.trim();
            password = password.trim();

            const creds = getCredentials();

            // Verificar credenciales
            if (username === creds.username && password === creds.password) {
                // Crear sesión
                const session = {
                    user: username,
                    loginTime: Date.now(),
                    expires: Date.now() + CONFIG.sessionTimeout
                };

                // Guardar en localStorage
                localStorage.setItem(CONFIG.sessionKey, JSON.stringify(session));

                console.log('Login exitoso');
                return { success: true, message: 'Login exitoso' };
            } else {
                console.log('Login fallido');
                return { success: false, message: 'Usuario o contraseña incorrectos' };
            }
        },

        // Verificar si está autenticado
        isAuthenticated: function() {
            try {
                const sessionStr = localStorage.getItem(CONFIG.sessionKey);
                if (!sessionStr) return false;

                const session = JSON.parse(sessionStr);

                // Verificar si la sesión ha expirado
                if (Date.now() > session.expires) {
                    this.logout();
                    return false;
                }

                return true;
            } catch (e) {
                return false;
            }
        },

        // Cerrar sesión
        logout: function() {
            localStorage.removeItem(CONFIG.sessionKey);
            return { success: true, message: 'Sesión cerrada' };
        },

        // Obtener información de sesión
        getSession: function() {
            try {
                const sessionStr = localStorage.getItem(CONFIG.sessionKey);
                return sessionStr ? JSON.parse(sessionStr) : null;
            } catch (e) {
                return null;
            }
        },

        // Renovar sesión
        renewSession: function() {
            const session = this.getSession();
            if (session) {
                session.expires = Date.now() + CONFIG.sessionTimeout;
                localStorage.setItem(CONFIG.sessionKey, JSON.stringify(session));
                return true;
            }
            return false;
        }
    };

})();