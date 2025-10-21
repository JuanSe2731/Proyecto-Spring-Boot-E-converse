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
@CrossOrigin(origins = "*")
public class AuthController {
	
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

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

}
