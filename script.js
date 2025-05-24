// Funcionalidad de navegación
function showPage(pageId) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar la página seleccionada
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Actualizar el estado activo de la navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Buscar y activar el enlace de navegación correspondiente
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink && activeLink.classList.contains('nav-link')) {
        activeLink.classList.add('active');
    }
    
    // Desplazarse hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funcionalidad de filtrado del menú
function filterMenu(category) {
    const menuCards = document.querySelectorAll('.menu-card');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // Actualizar el estado activo del botón
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Buscar y activar el botón clicado
    const activeBtn = event.target;
    activeBtn.classList.add('active');
    
    // Filtrar las tarjetas del menú
    menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'todos' || cardCategory === category) {
            card.style.display = 'block';
            // Agregar animación de aparición
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.display = 'none';
        }
    });
}

// Funcionalidad del formulario de suscripción al boletín
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('newsletterForm');
    const userName = document.getElementById('userName').value.trim();
    const userEmail = document.getElementById('userEmail').value.trim();
    const successMessage = document.getElementById('successMessage');
    
    // Validación básica
    if (!userName || !userEmail) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    
    // Simular el envío del formulario
    const submitBtn = form.querySelector('.btn-newsletter');
    const originalText = submitBtn.textContent;
    
    // Mostrar estado de carga
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simular retraso de llamada a la API
    setTimeout(() => {
        // Reiniciar el formulario
        form.reset();
        
        // Mostrar mensaje de éxito
        successMessage.style.display = 'block';
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            successMessage.style.transition = 'all 0.3s ease';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
        }, 100);
        
        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 300);
        }, 5000);
        
    }, 1500);
}


// Funcionalidad del menú móvil
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        mobileMenu.innerHTML = '<i class="fas fa-times"></i>';
    }
}

// Efecto de desplazamiento para la barra de navegación
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(255,107,53,0.95), rgba(247,147,30,0.95))';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
        navbar.style.backdropFilter = 'none';
    }
}

// Desplazamiento suave para enlaces de ancla
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Compensar la barra de navegación fija
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Observador de intersección para animaciones
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos con la clase fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// Efectos al pasar el cursor sobre las tarjetas
function initCardEffects() {
    const cards = document.querySelectorAll('.featured-card, .menu-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}


// Animación de carga para imágenes - FUNCIÓN CORREGIDA
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Verificar si la imagen ya está cargada
        if (img.complete && img.naturalHeight !== 0) {
            // La imagen ya está cargada, mostrarla inmediatamente
            img.style.opacity = '1';
            img.style.transition = 'opacity 0.3s ease';
        } else {
            // La imagen no está cargada aún, configurar eventos
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                // Reemplazar con imagen de reserva si falla la carga
                this.src = 'data:image/svg+xml;base64,...';
                this.alt = 'Imagen no disponible';
                this.style.opacity = '1';
            });
        }
    });
}

// Funcionalidad de búsqueda (función adicional)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar productos...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        display: none;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 25px;
        margin-left: 1rem;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    `;
    
    // Agregar el input de búsqueda a la barra de navegación (opcional)
    // document.querySelector('.nav-container').appendChild(searchInput);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const menuCards = document.querySelectorAll('.menu-card');
        
        menuCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Inicializar todo cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Agregar listeners de eventos
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }
    
    // Listener para evento de scroll
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Inicializar animaciones y efectos
    initScrollAnimations();
    initCardEffects();
    initImageLoading();
    initSearch();
    
    // Cerrar el menú móvil al hacer clic en un enlace de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const navLinksContainer = document.querySelector('.nav-links');
                const mobileMenuIcon = document.querySelector('.mobile-menu');
                navLinksContainer.style.display = 'none';
                mobileMenuIcon.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Manejar el redimensionamiento de la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'none';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
        }
    });
});

// Funciones utilitarias
const utils = {
    // Formatear precio
    formatPrice: function(price) {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(price);
    },
    
    // Función debounce para rendimiento
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Verificar si un elemento está en el viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Exportar funciones para acceso global (si es necesario)
window.showPage = showPage;
window.filterMenu = filterMenu;
