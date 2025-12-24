document.addEventListener('DOMContentLoaded', function() {
    
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (slider && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
        
        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        let slideInterval = setInterval(nextSlide, 5000);
        
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
        
        updateSlider();
    }
    
    const dropdown = document.querySelector('.dropdown');
    const navItemWithDropdown = document.querySelector('.nav-item:has(.dropdown)');
    
    if (dropdown && navItemWithDropdown) {
        let dropdownTimer;
        
        navItemWithDropdown.addEventListener('mouseenter', function() {
            clearTimeout(dropdownTimer);
            dropdown.style.display = 'block';
        });
        
        navItemWithDropdown.addEventListener('mouseleave', function() {
            dropdownTimer = setTimeout(function() {
                dropdown.style.display = 'none';
            }, 200);
        });
        
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(dropdownTimer);
            dropdown.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownTimer = setTimeout(function() {
                dropdown.style.display = 'none';
            }, 100);
        });
        
        dropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); 
                
                dropdown.style.display = 'none';
                
                const serviceName = this.textContent;
                let message = '';
                
                switch(serviceName) {
                    case 'Подбор авто':
                        message = 'Вы выбрали услугу "Подбор авто". Мы найдем для вас идеальный автомобиль по вашим критериям!';
                        break;
                    case 'Проверка':
                        message = 'Вы выбрали услугу "Проверка автомобиля". Мы проведем полную диагностику и проверку истории авто!';
                        break;
                    case 'Trade-in':
                        message = 'Вы выбрали услугу "Trade-in". Обменяем ваш старый автомобиль на новый на выгодных условиях!';
                        break;
                    case 'Автокредит':
                        message = 'Вы выбрали услугу "Автокредит". Поможем оформить кредит на автомобиль на лучших условиях!';
                        break;
                    default:
                        message = 'Вы выбрали услугу ' + serviceName;
                }
                
                alert(message);
                
                setTimeout(() => {
                    openModal();
                }, 300);
            });
        });
    }
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const contactBtn = document.getElementById('contact-btn');
    const mainOrderBtn = document.getElementById('main-order-btn');
    const mobileContactBtn = document.getElementById('mobile-contact-btn');
    
    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    if (contactBtn) contactBtn.addEventListener('click', openModal);
    if (mainOrderBtn) mainOrderBtn.addEventListener('click', openModal);
    
    if (mobileContactBtn) {
        mobileContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            openModal();
        });
    }
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    const mainForm = document.getElementById('mainForm');
    const callbackForm = document.getElementById('callbackForm');
    
    if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                alert('Заявка отправлена! Мы свяжемся с вами в течение 15 минут.');
                mainForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.modal-submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                alert('Заявка на звонок принята! Мы позвоним вам в течение 5 минут.');
                callbackForm.reset();
                closeModal();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
    
    document.querySelectorAll('.btn-price').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.pricing-card');
            const tariffName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            alert(`Вы выбрали тариф "${tariffName}" за ${price}. Откроем форму для оформления заказа...`);
            
            openModal();
        });
    });
});
