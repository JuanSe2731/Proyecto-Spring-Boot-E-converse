package backend.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import backend.application.seguridad.CustomUserDetailsService;
import backend.application.seguridad.JwtTokenUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "http://127.0.0.1:5500"}, allowCredentials = "true")
public class AuthController {
	
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    /**
     * Endpoint para obtener información del usuario autenticado.
     * Requiere token JWT válido.
     */
    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extraer el token del header (eliminar "Bearer ")
            String token = authHeader.substring(7);
            
            // Validar el token y obtener el username
            String username = jwtTokenUtil.getUsernameFromToken(token);
            if (username == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Token inválido"));
            }

            // Cargar los detalles del usuario
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            // Validar si el token es válido para este usuario
            if (!jwtTokenUtil.validateToken(token, userDetails)) {
                return ResponseEntity.badRequest().body(Map.of("message", "Token inválido"));
            }

            // Crear respuesta con información del usuario
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("username", userDetails.getUsername());
            userInfo.put("roles", userDetails.getAuthorities());
            userInfo.put("isEnabled", userDetails.isEnabled());

            return ResponseEntity.ok(userInfo);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error al obtener información del usuario"));
        }
    }

    /**
     * Endpoint para autenticación de usuarios.
     * Valida credenciales y genera un token JWT si son correctas.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Autenticación de usuario
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            // Carga del usuario desde base de datos
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

            // Generación del JWT
            String token = jwtTokenUtil.generateToken(userDetails);

            // Respuesta de autenticación exitosa
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("usuario", userDetails.getUsername());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Credenciales inválidas o error de autenticación
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Credenciales inválidas");
            return ResponseEntity.status(401).body(error);
        }
    }

    /**
     * DTO interno para la solicitud de login
     */
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }
        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class RegisterRequest {
    private String nombre;
    private String nombreUsuario;
    private String correo;
    private String contrasena;
    private String direccion;

    // Getters y setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
}

}
