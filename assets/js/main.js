// Main JavaScript for Chôm Chôm Travel

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", function () {
        const isOpen = item.classList.contains("open");

        // Close all other items
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("open");
          const otherAnswer = otherItem.querySelector(".faq-answer");
          if (otherAnswer) {
            otherAnswer.style.maxHeight = "0px";
          }
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add("open");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });

  // Form validation
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("border-red-500");
        } else {
          field.classList.remove("border-red-500");
        }
      });

      if (isValid) {
        // Show success message
        alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.");
        form.reset();
      }
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Khởi tạo Swiper cho slider ngang Commitment (mobile/tablet dưới xl)
  let commitmentSwiperInstance = null;
  function handleCommitmentSwiper() {
    const isMobile = window.innerWidth < 1280;
    const swiperEl = document.querySelector(".commitment-swiper");
    if (swiperEl) {
      if (isMobile && !commitmentSwiperInstance) {
        commitmentSwiperInstance = new Swiper(".commitment-swiper", {
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
        swiperEl.classList.remove("swiper");
        const wrapper = swiperEl.querySelector(".swiper-wrapper");
        if (wrapper) wrapper.removeAttribute("style");
        wrapper && wrapper.classList.remove("swiper-wrapper");
        swiperEl.querySelectorAll(".swiper-slide").forEach((slide) => {
          slide.classList.remove("swiper-slide");
          slide.removeAttribute("style");
        });
      } else if (isMobile && !swiperEl.classList.contains("swiper")) {
        // Nếu quay lại mobile, thêm lại class
        swiperEl.classList.add("swiper");
        const wrapper = swiperEl.querySelector("div");
        if (wrapper) wrapper.classList.add("swiper-wrapper");
        swiperEl.querySelectorAll("div > div").forEach((slide) => {
          slide.classList.add("swiper-slide");
        });
      }
    }
  }
  window.addEventListener("resize", handleCommitmentSwiper);
  handleCommitmentSwiper();

  // A-Team Slider Data & Logic
  const aTeamMembers = [
    {
      name: "Dorothée Perrault Le Hunsec",
      role: "Founder & Director",
      img: "../assets/images/about-us/about-us-card-4.jpg",
      desc: [
        "Develop and maintain company's vision, operations and strategic plan",
        "Develop relationships with partners and local guides",
        "Identify new opportunities for revenue growth & sustainable tourism development",
      ],
    },
    {
      name: "Nguyen Thi Mai",
      role: "Adventure Coordinator",
      img: "../assets/images/about-us/about-us-card-5.jpg",
      desc: [
        "Crafts unique itineraries and ensures smooth travel logistics",
        "Your go-to for all trip questions and support",
      ],
    },
    {
      name: "Tran Quoc Bao",
      role: "Local Guide",
      img: "../assets/images/about-us/about-us-card-6.jpg",
      desc: [
        "Shares local insights and hidden gems",
        "Connects you with authentic Vietnamese culture",
      ],
    },
    {
      name: "Le Thi Thu",
      role: "Marketing Specialist",
      img: "../assets/images/about-us/about-us-card1.jpg",
      desc: [
        "Spreads the Chôm Chôm spirit to the world",
        "Creates engaging content and campaigns",
      ],
    },
    {
      name: "Pham Van An",
      role: "Operations Manager",
      img: "../assets/images/about-us/about-us-card2.jpg",
      desc: [
        "Ensures every journey runs smoothly",
        "Handles logistics and partner coordination",
      ],
    },
    {
      name: "Nguyen Bao Chau",
      role: "Customer Care",
      img: "../assets/images/about-us/about-us-card3.jpg",
      desc: [
        "Supports travelers before, during, and after trips",
        "Always ready to help with a smile",
      ],
    },
    {
      name: "Le Minh Tuan",
      role: "Experience Designer",
      img: "../assets/images/avatar1.png",
      desc: [
        "Designs immersive and memorable activities",
        "Focuses on sustainability and local impact",
      ],
    },
  ];

  let aTeamCurrent = 0;

  function renderATeamSlider() {
    const slider = document.getElementById("a-team-slider");
    const content = document.getElementById("a-team-content");
    const dots = document.getElementById("a-team-dots");
    if (!slider || !content || !dots) return;

    // Responsive: show only 1 avatar on xl and below
    const isXLOrBelow = window.innerWidth <= 1280;
    slider.innerHTML = "";
    if (isXLOrBelow) {
      // Only show the main avatar
      const idx = aTeamCurrent;
      let avatarClass = "a-team-avatar a-team-avatar-main";
      const div = document.createElement("div");
      div.className = avatarClass;
      div.setAttribute("aria-current", "true");
      div.innerHTML = `<img src="${aTeamMembers[idx].img}" alt="${aTeamMembers[idx].name}" />`;
      slider.appendChild(div);
    } else {
      // Avatars: center = main, 3 left, 3 right (hide if out of range)
      for (let i = -3; i <= 3; i++) {
        const idx =
          (aTeamCurrent + i + aTeamMembers.length) % aTeamMembers.length;
        let avatarClass = "a-team-avatar";
        if (i === 0) avatarClass += " a-team-avatar-main";
        else if (Math.abs(i) === 1 || Math.abs(i) === 2 || Math.abs(i) === 3)
          avatarClass += " a-team-avatar-side";
        if (Math.abs(i) > 3) avatarClass += " a-team-avatar-hidden";
        const div = document.createElement("div");
        div.className = avatarClass;
        if (i === 0) div.setAttribute("aria-current", "true");
        div.innerHTML = `<img src="${aTeamMembers[idx].img}" alt="${aTeamMembers[idx].name}" />`;
        if (i !== 0) {
          div.onclick = () => {
            aTeamCurrent = idx;
            renderATeamSlider();
          };
        }
        slider.appendChild(div);
      }
    }

    // Content
    const member = aTeamMembers[aTeamCurrent];
    content.innerHTML = `
      <h3 class="text-2xl text-dark_primary font-bold mb-2">${member.name}</h3>
      <div class="flex justify-center mt-2 mb-4">
        <span class="text-white font-bold px-5 py-2 rounded-lg" style="background-image: url('../assets/images/bg-btn-inquire.png'); background-repeat: no-repeat; background-size: cover; background-position: center; display: inline-block;">${
          member.role
        }</span>
      </div>
      <ul class="text-lg text-dark_primary font-medium space-y-1">
        ${member.desc.map((line) => `<li>${line}</li>`).join("")}
      </ul>
    `;

    // Dots
    dots.innerHTML = "";
    for (let i = 0; i < aTeamMembers.length; i++) {
      const dot = document.createElement("span");
      dot.className = "a-team-dot" + (i === aTeamCurrent ? " active" : "");
      dot.onclick = () => {
        aTeamCurrent = i;
        renderATeamSlider();
      };
      dots.appendChild(dot);
    }
  }

  // Next/Prev
  function aTeamNext() {
    aTeamCurrent = (aTeamCurrent + 1) % aTeamMembers.length;
    renderATeamSlider();
  }
  function aTeamPrev() {
    aTeamCurrent =
      (aTeamCurrent - 1 + aTeamMembers.length) % aTeamMembers.length;
    renderATeamSlider();
  }

  // Khởi tạo slider nếu có section
  if (document.getElementById("a-team-slider-section")) {
    renderATeamSlider();
    document.getElementById("a-team-next").onclick = aTeamNext;
    document.getElementById("a-team-prev").onclick = aTeamPrev;
  }
});
