/* Atlas Coffee: меню, корзина, форма, появление блоков */

const header = document.getElementById("header");
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const toast = document.getElementById("toast");

/* Тень шапки при скролле */

function onScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Мобильное меню */

if (burger) {
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    burger.setAttribute("aria-label", open ? "Открыть меню" : "Закрыть меню");
    nav.classList.toggle("is-open", !open);
    document.body.style.overflow = open ? "" : "hidden";
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Открыть меню");
      nav.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  });
}

/* Мини-корзина */

const cartCount = document.getElementById("cartCount");
let total = 0;
let toastTimer;

document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => {
    total += 1;
    cartCount.textContent = total;
    cartCount.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.5)" },
        { transform: "scale(1)" },
      ],
      { duration: 320, easing: "ease-out" }
    );

    toast.textContent = `${button.dataset.add} — в корзине. Всего: ${total}`;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  });
});

/* Подписка */

const form = document.getElementById("subscribeForm");
const success = document.getElementById("formSuccess");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = form.querySelector("#email");
    if (!email.value.trim() || !email.checkValidity()) {
      email.focus();
      email.reportValidity();
      return;
    }

    success.textContent = `Готово! Первый пакет отправим на ${email.value.trim()} — осталось подтвердить адрес в письме.`;
    success.classList.add("is-visible");
    form.reset();

    setTimeout(() => success.classList.remove("is-visible"), 6000);
  });
}

/* Появление блоков */

const items = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px" }
  );

  items.forEach((item) => observer.observe(item));
} else {
  items.forEach((item) => item.classList.add("is-visible"));
}

/* Страховка: верхние блоки видны сразу */
window.addEventListener("load", () => {
  items.forEach((item) => {
    if (item.getBoundingClientRect().top < window.innerHeight) {
      item.classList.add("is-visible");
    }
  });
});
