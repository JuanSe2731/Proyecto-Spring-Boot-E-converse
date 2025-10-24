package backend.application.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity  // Marca esta clase como una Entidad de BD
@Table(name = "usuarios")  // Indica la tabla a la que se mapeará
public class Usuario {

    @Id  // Clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    // Estrategia de autoincremento (PostgreSQL usa SERIAL/BIGSERIAL)
    private Long idUsuario;

    @ManyToOne  // Muchos usuarios pueden tener un mismo rol
    @JoinColumn(name = "id_rol", nullable = false)  
    // Crea la FK "id_rol" hacia la tabla Rol
    private Rol rol;
    
    @JsonIgnore  // Evita serialización circular
    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Carrito carrito;
    
    @JsonIgnore  // Evita serialización circular
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pedido> pedidos;

    @Column(nullable = false, length = 100)  
    private String nombre;

    @Column(nullable = false, unique = true, length = 150)  
    private String correo;

    @Column(nullable = false)  
    private String contrasena;

    @Column(length = 255)  
    private String direccion;

    @Column(nullable = false)  
    private Boolean estado;

    // Constructor vacío (requerido por JPA)
    public Usuario() {}

    // Constructor con parámetros
    public Usuario(Long idUsuario, Rol rol, String nombre, String correo, String contrasena, String direccion, Boolean estado) {
        this.idUsuario = idUsuario;
        this.rol = rol;
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.direccion = direccion;
        this.estado = estado;
    }

    // Getters y setters
    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }

    public Rol getRol() { return rol; }
    public void setRol(Rol rol) { this.rol = rol; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public Boolean getEstado() { return estado; }
    public void setEstado(Boolean estado) { this.estado = estado; }

    public Carrito getCarrito() { return carrito; }
    public void setCarrito(Carrito carrito) { this.carrito = carrito; }

    public List<Pedido> getPedidos() { return pedidos; }
    public void setPedidos(List<Pedido> pedidos) { this.pedidos = pedidos; }
}