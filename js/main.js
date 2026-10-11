(() => {
  "use strict";
  const business = window.NEGOCIO || {};
  const products = Array.isArray(window.PRODUCTOS) ? window.PRODUCTOS : [];
  const $ = (selector) => document.querySelector(selector);
  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const money = (value) => (business.simboloMoneda || "$") + Number(value || 0).toFixed(2);
  const cartKey = "plantilla-cart-" + String(business.nombre || "negocio").toLowerCase().replace(/[^a-z0-9]+/g,"-");
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(cartKey) || "[]"); if (!Array.isArray(cart)) cart = []; } catch (_) { cart = []; }
  const saveCart = () => { localStorage.setItem(cartKey, JSON.stringify(cart)); renderCartCount(); };
  const applyBusiness = () => {
    document.title = business.nombre || "Catálogo";
    const root = document.documentElement;
    const colors = business.colores || {};
    if (colors.fondo) root.style.setProperty("--bg", colors.fondo);
    if (colors.texto) root.style.setProperty("--text", colors.texto);
    if (colors.primario) root.style.setProperty("--primary", colors.primario);
    if (colors.acento) root.style.setProperty("--accent", colors.acento);
    if (colors.tarjeta) root.style.setProperty("--card", colors.tarjeta);
    $("#brand").textContent = business.nombre || "Tu negocio";
    $("#hero-eyebrow").textContent = business.eslogan || "Bienvenido";
    $("#hero-title").textContent = business.nombre || "Tu negocio";
    $("#hero-description").textContent = business.descripcion || "";
    $("#catalog-title").textContent = business.tituloCatalogo || "Productos";
    $("#about-title").textContent = business.tituloNosotros || "Conócenos";
    $("#about-text").textContent = business.textoNosotros || "";
    $("#footer-name").textContent = business.nombre || "Tu negocio";
    $("#footer-note").textContent = business.notaPie || "";
    $("#contact-link").href = "https://wa.me/" + String(business.whatsapp || "").replace(/\D/g,"");
    $("#hero-image").style.backgroundImage = "url('" + String(business.imagenPortada || "").replace(/'/g,"%27") + "')";
  };
  const renderFilters = () => {
    const categories = ["Todos", ...new Set(products.map(p => p.categoria).filter(Boolean))];
    $("#filters").innerHTML = categories.map((category,i) => '<button class="filter '+(!i?'active':'')+'" data-category="'+escapeHTML(category)+'">'+escapeHTML(category)+'</button>').join("");
    $("#filters").addEventListener("click", event => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      $("#filters").querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === button));
      renderProducts(button.dataset.category);
    });
  };
  const renderProducts = (category = "Todos") => {
    const visible = products.filter(p => p.disponible !== false && (category === "Todos" || p.categoria === category));
    $("#products").innerHTML = visible.length ? visible.map(p => `<article class="product-card"><img class="product-image" src="${escapeHTML(p.imagen)}" alt="${escapeHTML(p.alt || p.nombre)}" loading="lazy"><div class="product-info"><span class="product-category">${escapeHTML(p.categoria || "Producto")}</span><h3>${escapeHTML(p.nombre)}</h3><p>${escapeHTML(p.descripcion)}</p><div class="product-bottom"><span class="price">${money(p.precio)}</span><button class="add-button" data-product="${escapeHTML(p.id)}">Ver / agregar</button></div></div></article>`).join("") : '<p class="empty">No hay productos en esta categoría todavía.</p>';
  };
  const renderCartCount = () => { $("#cart-count").textContent = cart.reduce((sum,item) => sum + item.cantidad, 0); };
  const addToCart = (product, option) => {
    const existing = cart.find(item => item.id === product.id && item.opcion === option);
    if (existing) existing.cantidad += 1;
    else cart.push({id:product.id,nombre:product.nombre,precio:Number(product.precio)||0,opcion:option,cantidad:1});
    saveCart();
  };
  $("#products").addEventListener("click", event => {
    const button = event.target.closest("[data-product]");
    if (!button) return;
    const product = products.find(p => p.id === button.dataset.product);
    if (!product) return;
    const options = Array.isArray(product.opciones) && product.opciones.length ? product.opciones : ["Único"];
    $("#dialog-content").innerHTML = `<img class="dialog-product-image" src="${escapeHTML(product.imagen)}" alt="${escapeHTML(product.alt || product.nombre)}"><p class="eyebrow">${escapeHTML(product.categoria || "")}</p><h2>${escapeHTML(product.nombre)}</h2><p>${escapeHTML(product.descripcion)}</p><strong>${money(product.precio)}</strong><p><label for="product-option">Opción:</label><br><select id="product-option" class="option-select">${options.map(option=>'<option>'+escapeHTML(option)+'</option>').join("")}</select></p><button class="primary-button" id="confirmar-agregar">Agregar al pedido</button>`;
    $("#product-dialog").showModal();
    $("#confirmar-agregar").addEventListener("click", () => { addToCart(product, $("#product-option").value); $("#product-dialog").close(); });
  });
  const renderCart = () => {
    $("#cart-items").innerHTML = cart.length ? cart.map((item,index)=>`<div class="cart-line"><div><strong>${escapeHTML(item.nombre)}</strong><br><small>${escapeHTML(item.opcion)} · ${item.cantidad} × ${money(item.precio)}</small></div><div>${money(item.precio*item.cantidad)}<br><button data-remove="${index}">Quitar</button></div></div>`).join("") : '<p class="empty">Todavía no agregaste productos.</p>';
    $("#cart-total").textContent = "Total: " + money(cart.reduce((sum,item)=>sum+item.precio*item.cantidad,0));
    $("#enviar-pedido").disabled = cart.length === 0;
  };
  $("#cart-items").addEventListener("click",event => { const button=event.target.closest("[data-remove]"); if(!button)return; cart.splice(Number(button.dataset.remove),1); saveCart(); renderCart(); });
  $("#ver-carrito").addEventListener("click",()=>{renderCart();$("#cart-dialog").showModal();});
  $("#cerrar-dialogo").addEventListener("click",()=>$("#product-dialog").close());
  $("#cerrar-carrito").addEventListener("click",()=>$("#cart-dialog").close());
  $("#enviar-pedido").addEventListener("click",()=>{
    if(!cart.length)return;
    const lines = cart.map(item=>`• ${item.nombre} (${item.opcion}) x${item.cantidad}: ${money(item.precio*item.cantidad)}`);
    const total = cart.reduce((sum,item)=>sum+item.precio*item.cantidad,0);
    const message = `Hola, quiero realizar este pedido en ${business.nombre || "su negocio"}:\n\n${lines.join("\n")}\n\nTotal estimado: ${money(total)}`;
    const phone = String(business.whatsapp || "").replace(/\D/g,"");
    if (!phone) { alert("Configura el número de WhatsApp en config/negocio.js"); return; }
    // Abrir WhatsApp con el pedido preparado y vaciar el carrito local.
    // WhatsApp no permite a esta página confirmar si el mensaje se envió realmente.
    const whatsappUrl = "https://wa.me/"+phone+"?text="+encodeURIComponent(message);
    const whatsappWindow = window.open(whatsappUrl,"_blank");
    if (!whatsappWindow) {
      // Si el navegador bloquea la ventana, no perder los productos del cliente.
      alert("Permite abrir WhatsApp para continuar. Tu carrito sigue guardado.");
      return;
    }
    cart = [];
    saveCart();
    renderCart();
    $("#cart-dialog").close();
  });
  applyBusiness(); renderFilters(); renderProducts(); renderCartCount();
})();