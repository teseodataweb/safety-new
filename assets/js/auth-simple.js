// Sistema de Autenticación Simplificado para AP Safety Admin
// Versión funcional para desarrollo/demo

(function() {
    'use strict';

    // Configuración simple
    const CONFIG = {
        sessionKey: 'apSafetySession',
        username: 'admin',
        password: 'admin123',
        sessionTimeout: 3600000 // 1 hora
    };

    // Sistema de autenticación
    window.SimpleAuth = {
        // Verificar login
        login: function(username, password) {
            // Limpiar espacios
            username = username.trim();
            password = password.trim();

            console.log('Intentando login con:', username, '/', password);
            console.log('Credenciales esperadas:', CONFIG.username, '/', CONFIG.password);

            // Verificar credenciales directamente
            if (username === CONFIG.username && password === CONFIG.password) {
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