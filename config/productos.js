/* CATÁLOGO: duplica un objeto para agregar productos.
   categoria se utiliza para generar los filtros automáticamente. */
window.PRODUCTOS = [
  {
    id: "producto-01",
    nombre: "Producto esencial",
    categoria: "Destacados",
    precio: 25,
    descripcion: "Describe aquí los materiales, beneficios o detalles de este producto.",
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    alt: "Producto esencial",
    disponible: true,
    opciones: ["Único"]
  },
  {
    id: "producto-02",
    nombre: "Diseño clásico",
    categoria: "Novedades",
    precio: 32,
    descripcion: "Una descripción breve y útil para que el cliente pueda decidir.",
    imagen: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=85",
    alt: "Diseño clásico",
    disponible: true,
    opciones: ["Único"]
  },
  {
    id: "producto-03",
    nombre: "Favorito de clientes",
    categoria: "Destacados",
    precio: 18,
    descripcion: "Cambia este texto, el precio y la fotografía desde este archivo.",
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    alt: "Favorito de clientes",
    disponible: true,
    opciones: ["S", "M", "L"]
  }
];