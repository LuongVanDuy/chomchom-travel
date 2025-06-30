// Main JavaScript for Chôm Chôm Travel

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0px';
                    }
                });
                
                // Toggle current item
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.');
                form.reset();
            }
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Khởi tạo Swiper cho slider ngang Commitment (mobile/tablet dưới xl)
    let commitmentSwiperInstance = null;
    function handleCommitmentSwiper() {
        const isMobile = window.innerWidth < 1280;
        const swiperEl = document.querySelector('.commitment-swiper');
        if (swiperEl) {
            if (isMobile && !commitmentSwiperInstance) {
                commitmentSwiperInstance = new Swiper('.commitment-swiper', {
                    slidesPerView: 1.3,
                    spaceBetween: 2,
                    grabCursor: true,
                    freeMode: true,
                    centeredSlides: false,
                });
            } else if (!isMobile && commitmentSwiperInstance) {
                commitmentSwiperInstance.destroy(true, true);
                commitmentSwiperInstance = null;
                // Xóa các class và style Swiper đã thêm để trả lại layout desktop
                swiperEl.classList.remove('swiper');
                const wrapper = swiperEl.querySelector('.swiper-wrapper');
                if (wrapper) wrapper.removeAttribute('style');
                wrapper && wrapper.classList.remove('swiper-wrapper');
                swiperEl.querySelectorAll('.swiper-slide').forEach(slide => {
                    slide.classList.remove('swiper-slide');
                    slide.removeAttribute('style');
                });
            } else if (isMobile && !swiperEl.classList.contains('swiper')) {
                // Nếu quay lại mobile, thêm lại class
                swiperEl.classList.add('swiper');
                const wrapper = swiperEl.querySelector('div');
                if (wrapper) wrapper.classList.add('swiper-wrapper');
                swiperEl.querySelectorAll('div > div').forEach(slide => {
                    slide.classList.add('swiper-slide');
                });
            }
        }
    }
    window.addEventListener('resize', handleCommitmentSwiper);
    handleCommitmentSwiper();
}); 