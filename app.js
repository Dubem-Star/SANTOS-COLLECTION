document.addEventListener("DOMContentLoaded", () => {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          ink: "var(--ink)",
          onyx: "#0B080D",
          char: "#141017",
          lilac: "#C8A2C8",
          orchid: "#DCC0E4",
          plum: "var(--lum)",
          pearl: "var(--pearl)",
          smoke: "#8B7E90",
          grey: "#808080",
          pearly: "#e8e8e8",
        },
        fontFamily: {
          display: ['"Cormorant Garamond"', "serif"], // headings
          sans: ['"Manrope"', "system-ui", "sans-serif"], // body / UI
          mark: ['"Bodoni Moda"', "serif"], // brand wordmark only
        },

        screens: {
          sm: "576px", // Now matches Bootstrap's sm
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
  };
  const sidebarDropdownMenu = document.getElementById("sidebarDropdownMenu");
  const mobileGalleryNav = document.getElementById("mobileGalleryNav");
  const dropdownMobile = document.getElementById("sidebarDropdownMenu");
  mobileGalleryNav.addEventListener("click", () => {
    dropdownMobile.classList.toggle("show");
    mobileGalleryNav.innerHTML = `
    
    <svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  viewBox="0 0 16 16"
>
  <path
    fill-rule="evenodd"

    ${dropdownMobile.classList.contains("show") ? ' d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"' : ' d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"'}

   
  />
</svg>
    `;
  });

  const themeToggle = document.getElementById("themeToggle");

  themeToggle.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("clicked");
    document.body.classList.toggle("light");
  });

  /* =================================================================
   SANTOS COLLECTION — main.js  (catalogue-first)
   1) DATA          (products w/ inventory, testimonials, categories)
   2) Smooth scroll + ScrollTrigger
   3) Loader + hero
   4) Reveal + parallax
   5) Marquee
   6) SHOP: filtering + pagination + product cards + inventory states
   7) Quick view
   8) Cart + wishlist
   9) CHECKOUT + Paystack (placeholder, clearly commented)
   10) Testimonials, nav, search, menu, forms, misc
   ================================================================= */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const NGN = (n) => "₦" + Number(n).toLocaleString("en-NG");

  /* -----------------------------------------------------------------
   1) DATA
   >>> BACKEND: replace PRODUCTS with `await fetch('/api/products')`.
   Product shape (keep these keys and the UI keeps working):
     id, name, category, price (number, NGN),
     stock: 'in' | 'low' | 'out',     // inventory state
     sizes: [..], desc, img, imgAlt (hover), tag (optional ribbon)
----------------------------------------------------------------- */
  const PRODUCTS = [
    {
      id: "p01",
      name: "Aria Satin Slip Dress",
      category: "Dress",
      price: 48000,
      stock: "in",
      sizes: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",
        "6XL",
        "7XL",
        "8XL",
        "9XL",
      ],
      desc: "Bias-cut silk-satin with a whisper-fine cowl neckline.",
      color: ["orange", "black", "white"],
      img: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=700&auto=format&fit=crop",
      ],

      tag: "New",
    },
    {
      id: "p02",
      name: "Solène Wrap Midi",
      category: "Dress",
      price: 44000,
      stock: "low",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      desc: "A true-wrap midi in fluid viscose. An everyday heroine.",
      color: ["skyblue", "black", "green"],
      img: [
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "Sales",
    },
    {
      id: "p03",
      name: "Orchid Cocktail Gown",
      category: "Dress",
      price: 95000,
      stock: "out",
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      desc: "Floor-sweeping draped gown in lilac crepe with a sculpted bodice.",
      color: ["blueviolet", "yellow", "white"],
      img: [
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "New",
    },
    {
      id: "p04",
      name: "Capri Linen Two-Piece",
      category: "Two-Piece",
      price: 39000,
      stock: "in",
      sizes: [
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",
        "6XL",
        "7XL",
        "8XL",
        "9XL",
      ],
      desc: "Breathable linen set — relaxed shirt and wide-leg trouser.",
      color: ["teal", "black", "red"],
      img: [
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "",
    },
    {
      id: "p05",
      name: "Noir Tailored Set",
      category: "Set",
      price: 62000,
      stock: "in",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      desc: "Sharp-shouldered blazer paired with a fluid trouser.",
      color: ["lightcoral", "black", "lawngreen"],
      img: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "Sales",
    },
    {
      id: "p06",
      name: "Vesper Wide-Leg Jumpsuit",
      category: "Jumpsuit",
      price: 57000,
      stock: "in",
      sizes: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",
        "6XL",
        "7XL",
        "8XL",
        "9XL",
      ],
      desc: "A column jumpsuit with a plunging neckline and tie waist.",
      color: ["blue", "black", "violet"],
      img: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "New",
    },
    {
      id: "p07",
      name: "Lilac Tailored Playsuit",
      category: "Playsuit",
      price: 41000,
      stock: "low",
      sizes: ["S", "M", "L"],
      desc: "A structured playsuit in lilac twill. Effortless to style.",
      color: ["rebeccapurple", "white", "yellow"],
      img: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "",
    },
    {
      id: "p08",
      name: "Soft Linen Romper",
      category: "Romper",
      price: 33000,
      stock: "in",
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      desc: "A relaxed romper cut from washed linen for warm days.",
      color: ["saddlebrown", "black", "grey"],
      img: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "",
    },
    {
      id: "p09",
      name: "Seamless Body Suit",
      category: "Body Suit",
      price: 22000,
      stock: "in",
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      desc: "A second-skin bodysuit with a clean scoop neckline.",
      color: ["rose", "cyan", "sienna"],
      img: [
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "New",
    },
    {
      id: "p10",
      name: "Silk Camisole Top",
      category: "Tops",
      price: 26000,
      stock: "in",
      sizes: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",
        "6XL",
        "7XL",
        "8XL",
        "9XL",
      ],
      desc: "A lustrous silk camisole with adjustable straps.",
      color: ["emerald", "blue", "white"],
      img: [
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "",
    },
    {
      id: "p11",
      name: "Corset Bustier Top",
      category: "Tops",
      price: 31000,
      stock: "out",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      desc: "A boned bustier with a sculpted sweetheart neckline.",
      color: ["lilac", "black", "white"],
      img: [
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "Sales",
    },
    {
      id: "p12",
      name: "Noir Tailored Blazer",
      category: "Blazer",
      price: 62000,
      stock: "in",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
      desc: "A double-breasted wool-blend blazer, fully lined.",
      color: ["fuchsia", "zinc", "white"],
      img: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "",
    },
    {
      id: "p13",
      name: "Satin Slip Skirt",
      category: "Skirt",
      price: 29000,
      stock: "in",
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      desc: "A bias-cut satin midi skirt that catches the light.",
      color: ["gray", "black", "white"],
      img: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "Sales",
    },
    {
      id: "p14",
      name: "Tailored Wide Pant",
      category: "Pant",
      price: 36000,
      stock: "in",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      desc: "High-waisted wide-leg trousers with a pressed crease.",
      color: ["slate", "neutral", "white"],
      img: [
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "",
    },
    {
      id: "p15",
      name: "Sculpt Legging",
      category: "Leggings",
      price: 24000,
      stock: "low",
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      desc: "High-rise sculpting leggings in a buttery matte finish.",
      color: ["red", "black", "amber"],
      img: [
        "https://images.unsplash.com/photo-1542295669297-4d352b042bca?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "",
    },
    {
      id: "p16",
      name: "Rigid Denim Two-Piece",
      category: "Denim",
      price: 52000,
      stock: "in",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      desc: "A structured denim jacket and skirt in a deep indigo.",
      color: ["lime", "black", "white"],
      img: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "",
    },
    {
      id: "p17",
      name: "Strappy Heeled Sandal",
      category: "Shoes",
      price: 45000,
      stock: "in",
      sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
      desc: "A slim-strap heeled sandal with a lacquered finish.",
      color: ["green", "black", "white"],
      img: [
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "New",
    },
    {
      id: "p18",
      name: "Vesper Pearl Clutch",
      category: "Bag",
      price: 27000,
      stock: "in",
      sizes: ["One size"],
      desc: "A pearl-clasp satin clutch with a detachable chain.",
      color: ["lilac", "black", "white"],
      img: [
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=700&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=700&auto=format&fit=crop",
      ],
      tag: "Limited",
    },
  ];

  /* Filter categories (order shown in the bar). 'All' first. */
  const CATEGORIES = [
    "All",
    "New",
    "Sales",
    "Dresses",
    "Sets",
    "Jumpsuits",
    "Rompers",
    "Bodysuits",
    "Tops",
    "Blazers",
    "Skirts",
    "Pants",
    "Leggings",
    "Denims",
    "Shoes",
    "Bags",
    "Accessories",
    "Two Piece",
  ];

  const TESTIMONIALS = [
    {
      quote:
        "The fit is impeccable and the fabric feels expensive in the hand. I get stopped every time I wear the Orchid gown.",
      name: "Adaeze O.",
      loc: "Lekki, Lagos",
    },
    {
      quote:
        "Finally a Nigerian label that feels truly luxury. Packaging, delivery, the pieces themselves — all flawless.",
      name: "Zainab M.",
      loc: "Abuja",
    },
    {
      quote:
        "I ordered the Noir set for an event and it arrived in two days. The tailoring is genuinely couture-level.",
      name: "Chioma E.",
      loc: "Port Harcourt",
    },
    {
      quote:
        "Santos has become my go-to for anything important. Elegant, exclusive, and worth every naira.",
      name: "Folake A.",
      loc: "Ikoyi, Lagos",
    },
  ];

  const MARQUEE_WORDS = [
    "New Arrivals",
    "Premium Fashion",
    "Exclusive Collection",
    "Luxury Womenswear",
    "Santos Collection",
  ];

  /* Inventory label helpers (palette-safe: lilac / orchid / smoke only) */
  const STOCK = {
    in: {
      label: "In Stock",
      cls: "text-pearl/60",
      dot: "background:var(--lilac)",
    },
    low: {
      label: "Low Stock",
      cls: "text-orchid",
      dot: "background:var(--orchid)",
    },
    out: {
      label: "Sold Out",
      cls: "text-smoke",
      dot: "background:var(--smoke)",
    },
  };

  /* -----------------------------------------------------------------
   2) SMOOTH SCROLL + ScrollTrigger
----------------------------------------------------------------- */
  let lenis;
  if (!reduceMotion && typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    (function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    })();
    if (typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined")
    gsap.registerPlugin(ScrollTrigger);

  /* anchor links glide through Lenis (offset clears the sticky nav) */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis
            ? lenis.scrollTo(el, { offset: -90 })
            : el.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  /* -----------------------------------------------------------------
   3) LOADER + HERO
----------------------------------------------------------------- */
  gsap.set?.(".hero-line", { y: 36, opacity: 0 });
  function runLoader() {
    const loader = document.getElementById("loader"),
      curtain = document.getElementById("curtain");
    if (reduceMotion || typeof gsap === "undefined") {
      loader.style.display = "none";
      curtain.style.display = "none";
      startHero();
      return;
    }
    gsap
      .timeline()
      .to("#loadBar", {
        width: "100%",
        duration: 1.0,
        ease: "power2.inOut",
      })
      .to(
        "#loadMono span",
        { y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        "-=.85",
      )
      .to(
        "#loader .lname b",
        { y: 0, duration: 0.6, ease: "power3.out" },
        "-=.4",
      )
      .to("#loader .lw", {
        y: -12,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        delay: 0.2,
      })
      .set("#loader", { display: "none" })
      .to("#curtain", {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      })
      .set("#curtain", { display: "none" })
      .add(startHero, "-=.5");
  }
  function startHero() {
    if (reduceMotion || typeof gsap === "undefined") {
      document.querySelectorAll(".hero-line").forEach((el) => {
        el.style.transform = "none";
        el.style.opacity = 1;
      });
      return;
    }
    gsap.to(".hero-line", {
      y: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.08,
      ease: "power4.out",
    });
    gsap.to(".hero-orb", {
      x: 36,
      y: -26,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  /* -----------------------------------------------------------------
   4) REVEAL + PARALLAX
----------------------------------------------------------------- */
  function initReveal() {
    if (typeof ScrollTrigger === "undefined" || reduceMotion) {
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }
    gsap.utils.toArray("[data-reveal]").forEach((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => el.classList.add("is-in"),
      }),
    );
    gsap.utils.toArray("[data-parallax]").forEach((el) =>
      gsap.to(el, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }),
    );
    gsap.utils.toArray("[data-parallax-soft] img").forEach((img) =>
      gsap.fromTo(
        img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      ),
    );
  }

  /* -----------------------------------------------------------------
   5) MARQUEE
----------------------------------------------------------------- */
  function buildMarquee() {
    const wrap = document.querySelector(".marquee");
    const seq = MARQUEE_WORDS.map(
      (w) =>
        `<span class="flex items-center shrink-0"><span class="font-display text-3xl md:text-5xl px-7 md:px-10 whitespace-nowrap">${w}</span><span class="text-lilac">✦</span></span>`,
    ).join("");
    wrap.innerHTML = `<div class="flex items-center shrink-0">${seq}</div><div class="flex items-center shrink-0" aria-hidden="true">${seq}</div>`;
  }

  /* -----------------------------------------------------------------
   6) SHOP — filtering, pagination, product cards, inventory
   >>> BACKEND: perPage + filtering can move server-side; keep the
   markup contract (data-* attributes) so the JS handlers still work.
----------------------------------------------------------------- */
  const shopState = { category: "All", page: 1, perPage: 8 };

  function renderFilters() {
    const bar = document.getElementById("filterBar");

    bar.innerHTML = CATEGORIES.map(
      (c) =>
        `<button class="pill group-[.light]:border-lilac ${c === shopState.category ? "active" : ""}" data-filter="${c}">${c}</button>`,
    ).join("");

    sidebarDropdownMenu.innerHTML = CATEGORIES.map(
      (c) =>
        `
            <li  class="pill sidebar  " data-filter="${c}">${c}</li>

            
            `,
    ).join("");
  }

  function getFiltered() {
    return shopState.category === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === shopState.category);
  }

  /* Reusable product card template (the team requested explicit markers). */
  function productCard(p) {
    const s = STOCK[p.stock];
    const out = p.stock === "out";
    return `
  <!-- PRODUCT CARD START (id: ${p.id}) -->
  <article class="pcard group ${out ? "is-out" : ""}" data-id="${p.id}">
    <!-- PRODUCT IMAGE -->
    <div class="imgwrap aspect-[3/4] mb-3">
      ${p.tag && !out ? `<span class="absolute top-3 left-3 z-10 eyebrow bg-black/55 backdrop-blur px-2.5 py-1 text-[.55rem]">${p.tag}</span>` : ""}
      ${out ? `<span class="absolute top-3 left-3 z-10 eyebrow bg-black/70 backdrop-blur px-2.5 py-1 text-[.55rem] text-smoke border border-[var(--line)]">Sold Out</span>` : ""}
      <button class="wish-btn absolute top-3 right-3 z-10 w-9 h-9 grid place-items-center bg-black/45 backdrop-blur transition-colors ${wishlist.has(p.id) ? "text-lilac" : ""}" data-wish="${p.id}" aria-label="Add to wishlist">
      <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
               width="17" height="17"  
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
      </button>
      <img class="img-front w-full h-full object-cover" loading="lazy" data-quick="${p.id}" alt="${p.name}" src="${p.img[0]}" onerror="this.style.opacity=0">
      <img class="img-back w-full h-full object-cover" loading="lazy" alt="" data-quick="${p.id}" aria-hidden="true" src="${p.img[1]}" onerror="this.style.display='none'">
      <div class="pactions absolute bottom-3 inset-x-3 z-10 flex gap-2">
        <button class="btn btn-fill flex-1 py-3" data-add="${p.id}" ${out ? "disabled" : ""}>${out ? "Sold out" : "Add to cart"}</button>
        <button class="btn btn-ghost px-4 py-3 bg-black/45 backdrop-blur" data-quick="${p.id}" aria-label="Quick view">View</button>
      </div>
    </div>
    <div class="flex items-start justify-between gap-2">
      <div>
        <p class="text-[.6rem] tracking-[.2em] uppercase text-smoke mb-0.5">${p.category}</p>
        <!-- PRODUCT NAME --><h3 class="font-display text-xl leading-tight">${p.name}</h3>
        <!-- PRODUCT INVENTORY STATUS -->
        <p class="flex items-center gap-1.5 mt-1 text-[.7rem] ${s.cls}"><span class="inline-block w-1.5 h-1.5 rounded-full" style="${s.dot}"></span>${s.label}</p>
      </div>
      <!-- PRODUCT PRICE --><p class="font-display text-xl text-lilac whitespace-nowrap">${NGN(p.price)}</p>
    </div>
  </article>
  <!-- PRODUCT CARD END (id: ${p.id}) -->`;
  }

  /* Build a pagination model with ellipses: e.g. [1,'…',4,5,6,'…',12] */
  function pageModel(total, cur) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const set = new Set([1, 2, total - 1, total, cur - 1, cur, cur + 1]);
    const pages = [...set]
      .filter((n) => n >= 1 && n <= total)
      .sort((a, b) => a - b);
    const out = [];
    let prev = 0;
    pages.forEach((n) => {
      if (n - prev > 1) out.push("…");
      out.push(n);
      prev = n;
    });
    return out;
  }

  function renderPagination(total) {
    const el = document.getElementById("pagination");
    if (total <= 1) {
      el.innerHTML = "";
      return;
    }
    const cur = shopState.page;
    const arrow = (d, dis, lbl) =>
      `<button class="page-btn" data-page="${cur + d}" ${dis ? "disabled" : ""} aria-label="${lbl}">${d < 0 ? "‹" : "›"}</button>`;
    const nums = pageModel(total, cur)
      .map((n) =>
        n === "…"
          ? `<span class="page-dots">…</span>`
          : `<button class="page-btn ${n === cur ? "active" : ""}" data-page="${n}">${n}</button>`,
      )
      .join("");
    el.innerHTML =
      arrow(-1, cur === 1, "Previous") + nums + arrow(1, cur === total, "Next");
  }

  function renderShop() {
    const list = getFiltered();
    const total = Math.max(1, Math.ceil(list.length / shopState.perPage));
    if (shopState.page > total) shopState.page = total;
    const start = (shopState.page - 1) * shopState.perPage;
    const pageItems = list.slice(start, start + shopState.perPage);

    document.getElementById("shopHeading").textContent =
      shopState.category === "All" ? "All pieces" : shopState.category;
    document.getElementById("resultCount").textContent =
      `${list.length} ${list.length === 1 ? "style" : "styles"}`;

    const grid = document.getElementById("productGrid");
    const empty = document.getElementById("emptyState");
    grid.innerHTML = pageItems.map(productCard).join("");
    empty.classList.toggle("hidden", list.length !== 0);

    renderPagination(total);

    // animate cards in (respects reduced motion)
    if (!reduceMotion && typeof gsap !== "undefined") {
      gsap.fromTo(
        grid.querySelectorAll(".pcard"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  }

  function setCategory(cat) {
    shopState.category = cat;
    shopState.page = 1;
    renderFilters();
    renderShop();
  }
  function goToPage(n) {
    shopState.page = n;
    renderShop();
    // keep the grid in view when paging
    const shop = document.getElementById("shop");
    lenis
      ? lenis.scrollTo(shop, { offset: -120 })
      : shop.scrollIntoView({ behavior: "smooth" });
  }

  /* filter + pagination + category-tile clicks (delegated) */
  document.addEventListener("click", (e) => {
    const f = e.target.closest("[data-filter]");
    if (f) {
      setCategory(f.dataset.filter);
      return;
    }
    const pg = e.target.closest("[data-page]");
    if (pg && !pg.disabled) {
      goToPage(+pg.dataset.page);
      return;
    }
    const tile = e.target.closest("[data-cat]");
    if (tile) {
      setCategory(tile.dataset.cat);
      const shop = document.getElementById("shop");
      lenis
        ? lenis.scrollTo(shop, { offset: -120 })
        : shop.scrollIntoView({ behavior: "smooth" });
      return;
    }
  });

  /* -----------------------------------------------------------------
  -- DUBEM's CODES --
----------------------------------------------------------------- */
  const overlay = document.getElementById("overlay");
  const closeGuide = document.getElementById("closeGuide");
  const sizeGuideFooter = document.getElementById("sizeGuideFooter");
  const quick = document.getElementById("quickView");
  const sizeGuideImg = document.getElementById("sizeGuideImg");
  const returnAndRefundBtn = document.getElementById("returnAndRefundBtn");
  const returnAndRefund = document.getElementById("returnAndRefund");
  const sizeGuideSidebar = document.getElementById("sizeGuideSidebar");
  const faqsFooterBtn = document.getElementById("faqsFooterBtn");
  const faqContainer = document.getElementById("faqContainer");
  const faqModel = document.getElementById("faqModel");
  let qvCurrent = null;

  const faqs = [
    {
      question: "How long does delivery take?",
      answer:
        "Orders within Lagos are typically delivered within 1–3 business days, while deliveries outside Lagos usually take 3–7 business days, depending on your location.",
    },

    {
      question: "How can I track my order?",
      answer:
        "Once your order has been dispatched, you'll receive a confirmation message with your tracking details (where applicable).",
    },

    {
      question: "Can I return or exchange my order?",
      answer:
        "Yes. Eligible items can be returned or exchanged within 5 days of delivery, provided they are unworn, unwashed, and in their original condition with all tags attached. Please refer to our Return & Refund Policy for full details. ",
    },

    {
      question: "What if I receive the wrong or a damaged item?",
      answer:
        "If your order arrives damaged, defective, or incorrect, please contact us within 48 hours of delivery with your order number and clear photos of the item. We'll resolve the issue as quickly as possible.",
    },

    {
      question: "Can I cancel my order?",
      answer:
        "Orders can only be cancelled before they have been processed or shipped. Once dispatched, orders cannot be cancelled. ",
    },

    {
      question: "How do I know my size?",
      answer:
        "Please refer to our Size Guide before placing your order. If you're between sizes or need assistance, our Customer Care team will be happy to help. ",
    },

    {
      question: "What payment methods do you accept?",
      answer:
        "We accept secure payments via debit cards, bank transfers, and other payment options displayed at checkout.",
    },
    {
      question: "Do you restock sold-out items?",
      answer:
        "Some of our best-selling styles are restocked, while others are limited editions and may not return. Follow us on social media or subscribe to our newsletter to stay updated on new arrivals and restocks.",
    },
  ];

  function sideGuideShow(sg) {
    sg.addEventListener("click", (e) => {
      e.preventDefault();
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "auto";
      closeGuide.style.opacity = "1";
      closeGuide.style.pointerEvents = "auto";
      sizeGuideImg.style.display = "block";
    });
  }
  sideGuideShow(sizeGuideFooter);
  sideGuideShow(sizeGuideSidebar);

  function positionCloseBtn() {
    const rect = returnAndRefund.getBoundingClientRect();
    closeGuide.style.top = `${rect.top + 10}px`;
    closeGuide.style.left = `${rect.right - closeGuide.offsetWidth - 10}px`;
  }

  function showLegals(e, r, f, element) {
    e.preventDefault();
    positionCloseBtn();
    sizeGuideImg.style.display = "none";
    element.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (r) {
      element.style.opacity = "1";
      element.style.pointerEvents = "auto";
    } else if (f) {
      element.style.opacity = "1";
      element.style.pointerEvents = "auto";
    }
    closeGuide.style.opacity = "1";
    closeGuide.style.pointerEvents = "auto";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
  }

  returnAndRefundBtn.addEventListener("click", (e) => {
    showLegals(e, true, false, returnAndRefund);
  });

  faqsFooterBtn.addEventListener("click", (e) => {
    showLegals(e, false, true, faqModel);
  });

  closeGuide.addEventListener("click", () => {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    closeGuide.style.opacity = "0";
    closeGuide.style.pointerEvents = "none";
    returnAndRefund.style.opacity = "0";
    returnAndRefund.style.pointerEvents = "none";
    faqModel.style.opacity = "0";
    faqModel.style.pointerEvents = "none";
  });

  faqContainer.innerHTML = faqs
    .map(
      ({ question, answer }) => `
  <div class="faq-item py-6 cursor-pointer" onclick="toggleFaq(this)">
      <div class="flex items-center justify-between gap-4">
        <h3 class="text-sm md:text-base font-medium tracking-wide text-[#f6f3f7] group-[.light]:text-onyx leading-snug">
         ${question}
        </h3>
        <span class="faq-icon flex-shrink-0 w-5 h-5 accent text-xl font-light leading-none select-none">+</span>
      </div>
      <div class="faq-answer">
        <p class="text-sm text-[#8b7e90] group-[.light]:text-[#6b636e] leading-relaxed mt-4 pr-8">
          ${answer}
        </p>
      </div>
    </div>
  `,
    )
    .join("");

  /* -----------------------------------------------------------------
   7) QUICK VIEW
----------------------------------------------------------------- */

  /* ------------------------------
  Size guide display
------------------------------------*/

  function findProduct(id) {
    return PRODUCTS.find((p) => p.id === id);
  }
  function openQuick(id) {
    const p = findProduct(id);
    if (!p) return;
    qvCurrent = p;
    const out = p.stock === "out",
      s = STOCK[p.stock];

    const quickBox = document.getElementById("quickBox");
    if (quickBox) {
      quickBox.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    qvImgWrap.innerHTML = `<div class="overflow-x-auto overflow-y-hidden flex img-cont-slider  [scrollbar-width:none][-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" id="qvImgSlider">${p.img.map((i) => `<img src="${i}" alt="${p.name}" class="w-full h-full object-cover "  onerror="this.style.opacity=0">`).join("")}   </div> 
    
    
    
    <button
              class="absolute top-[50%] translate-y-[-50%] left-3 z-50 w-9 h-9 grid place-items-center bg-black/45 backdrop-blur transition-colors nav-btn"
           id="qvPrev"
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="17"
                height="17"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              class="absolute top-[50%] translate-y-[-50%] right-3 z-50 w-9 h-9 grid place-items-center bg-black/45 backdrop-blur transition-colors nav-btn"
            id="qvNext"
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="17"
                height="17"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>`;

    const slider = document.getElementById("qvImgSlider");
    const prevBtn = document.getElementById("qvPrev");
    const nextBtn = document.getElementById("qvNext");

    slider.scrollLeft === 0
      ? (prevBtn.style.opacity = "0.5")
      : (prevBtn.style.opacity = "1");

    nextBtn.addEventListener("click", () => {
      if (nextBtn.style.opacity === "0.5") return;
      slider.scrollBy({ left: slider.clientWidth, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      if (prevBtn.style.opacity === "0.5") return;
      slider.scrollBy({ left: -slider.clientWidth, behavior: "smooth" });
    });

    slider.addEventListener("scroll", () => {
      slider.scrollLeft < 1
        ? (prevBtn.style.opacity = "0.5")
        : (prevBtn.style.opacity = "1");
      slider.scrollWidth - slider.clientWidth - slider.scrollLeft < 1
        ? (nextBtn.style.opacity = "0.5")
        : (nextBtn.style.opacity = "1");
    });

    qvCat.textContent = p.category;
    qvName.textContent = p.name;
    qvPrice.textContent = NGN(p.price);
    qvStatus.innerHTML = `<span class="flex items-center gap-1.5 ${s.cls}"><span class="inline-block w-1.5 h-1.5 rounded-full" style="${s.dot}"></span>${s.label}</span>`;
    qvDesc.textContent = p.desc;
    qvSizes.innerHTML = p.sizes
      .map(
        (sz, i) =>
          `<button class="qv-size border ${i === 0 ? "border-lilac text-lilac" : "border-[var(--line-strong)] text-pearl/70"} px-3 py-1 md:px-4 md:py-2 text-xs tracking-widest hover:border-lilac transition-colors">${sz}</button>`,
      )
      .join("");
    qvSizes.querySelectorAll(".qv-size").forEach((b) =>
      b.addEventListener("click", () => {
        qvSizes
          .querySelectorAll(".qv-size")
          .forEach(
            (x) =>
              (x.className = x.className.replace(
                "border-lilac text-lilac",
                "border-[var(--line-strong)] text-pearl/70",
              )),
          );
        b.className = b.className.replace(
          "border-[var(--line-strong)] text-pearl/70",
          "border-lilac text-lilac",
        );
      }),
    );

    const qvColors = document.getElementById("qvColors");
    qvColors.innerHTML = p.color
      .map(
        (c, i) =>
          `<button class="qv-size border    ${i === 0 ? "border-lilac text-lilac" : "border-[var(--line-strong)] text-pearl/70"} px-3 py-1 md:px-4 md:py-2 text-xs tracking-widest hover:border-lilac transition-colors" style="background-color: ${c}"></button>`,
      )
      .join("");

    const sizeGuide = document.getElementById("sizeGuide");

    sideGuideShow(sizeGuide);

    qvAdd.disabled = out;
    qvAdd.textContent = out ? "Sold out" : "Add to bag";
    openOverlay(quick, ".panel");
  }
  qvAdd.addEventListener("click", () => {
    if (qvCurrent && qvCurrent.stock !== "out") {
      addToCart(qvCurrent.id);
      closeOverlay(quick, ".panel");
    }
  });
  qvWish.addEventListener("click", () => {
    if (qvCurrent) toggleWish(qvCurrent.id);
  });

  const qtyDecrement = document.getElementById("qtyDecrement");
  const qtyIncrement = document.getElementById("qtyIncrement");
  const qtyInput = document.getElementById("qtyInput");

  qtyDecrement.addEventListener("click", () => {
    const currentValue = parseInt(qtyInput.value);
    if (currentValue > 1) {
      qtyInput.value = currentValue - 1;
    }
  });

  qtyIncrement.addEventListener("click", () => {
    const currentValue = parseInt(qtyInput.value);
    qtyInput.value = currentValue + 1;
  });

  /* -----------------------------------------------------------------
   8) CART + WISHLIST  (in-memory; >>> BACKEND: persist to localStorage/API)
----------------------------------------------------------------- */
  const cart = [];
  const wishlist = new Set();

  function addToCart(id, fromEl) {
    const p = findProduct(id);
    if (!p || p.stock === "out") return;
    const line = cart.find((l) => l.id === id);
    line ? line.qty++ : cart.push({ id, qty: 1 });
    updateCart();
    flyToCart(fromEl);
    bump("cartCount");
    bump("cartCountFloat");
  }
  function removeFromCart(id) {
    const i = cart.findIndex((l) => l.id === id);
    if (i > -1) cart.splice(i, 1);
    updateCart();
  }
  function changeQty(id, d) {
    const l = cart.find((x) => x.id === id);
    if (!l) return;
    l.qty += d;
    l.qty < 1 ? removeFromCart(id) : updateCart();
  }
  function cartTotalValue() {
    return cart.reduce((s, l) => s + findProduct(l.id).price * l.qty, 0);
  }
  function cartCount() {
    return cart.reduce((s, l) => s + l.qty, 0);
  }

  function updateCart() {
    const count = cartCount();
    ["cartCount", "cartCountFloat"].forEach((id) => {
      const b = document.getElementById(id);
      b.textContent = count;
      b.classList.toggle("hidden", count === 0);
    });
    document.getElementById("cartTotal").textContent = NGN(cartTotalValue());
    const box = document.getElementById("cartItems");
    if (!cart.length) {
      box.innerHTML = `<p class="text-pearl/45 text-sm text-center mt-10">Your bag is empty.<br>Time to find something beautiful.</p>`;
      return;
    }
    box.innerHTML = cart
      .map((l) => {
        const p = findProduct(l.id);
        return `
    <div class="flex gap-4">
      <div class="w-20 h-24 bg-char overflow-hidden shrink-0"><img src="${p.img[0]}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.style.opacity=0"></div>
      <div class="flex-1">
        <h4 class="font-display text-lg leading-tight">${p.name}</h4>
        <p class="text-xs text-smoke mb-2">${p.category}</p>
        <div class="flex items-center gap-3">
          <div class="flex items-center border border-[var(--line-strong)]">
            <button class="px-2.5 py-1 hover:text-lilac" data-qty="${p.id}" data-d="-1" aria-label="Decrease">−</button>
            <span class="px-2 text-sm">${l.qty}</span>
            <button class="px-2.5 py-1 hover:text-lilac" data-qty="${p.id}" data-d="1" aria-label="Increase">+</button>
          </div>
          <button class="text-xs text-smoke hover:text-lilac uppercase tracking-widest" data-rm="${p.id}">Remove</button>
        </div>
      </div>
      <p class="font-display text-lg text-lilac whitespace-nowrap">${NGN(p.price * l.qty)}</p>
    </div>`;
      })
      .join("");
  }

  function toggleWish(id) {
    wishlist.has(id)
      ? wishlist.delete(id)
      : (wishlist.add(id), bump("wishCount"));
    const c = document.getElementById("wishCount");
    c.textContent = wishlist.size;
    c.classList.toggle("hidden", wishlist.size === 0);
    document.querySelectorAll(`[data-wish="${id}"]`).forEach((b) => {
      const on = wishlist.has(id);
      b.classList.toggle("text-lilac", on);
      b.querySelector("svg").setAttribute("fill", on ? "currentColor" : "none");
    });
  }

  function flyToCart(fromEl) {
    if (reduceMotion || !fromEl || typeof gsap === "undefined") return;
    const target = (
      document.getElementById("floatCart").offsetParent !== null
        ? document.getElementById("floatCart")
        : document.getElementById("openCart")
    ).getBoundingClientRect();
    const start = fromEl.getBoundingClientRect();
    const dot = document.createElement("div");
    dot.className = "fly";
    dot.style.left = start.left + start.width / 2 + "px";
    dot.style.top = start.top + "px";
    document.body.appendChild(dot);
    gsap.to(dot, {
      left: target.left + target.width / 2,
      top: target.top + 10,
      scale: 0.3,
      opacity: 0.4,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => dot.remove(),
    });
  }
  function bump(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");
  }

  /* delegated product/cart actions */
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add && !add.disabled) {
      addToCart(
        add.dataset.add,
        add.closest(".pcard")?.querySelector(".imgwrap"),
      );
      return;
    }
    const q = e.target.closest("[data-quick]");
    if (q) {
      openQuick(q.dataset.quick);
      return;
    }
    const w = e.target.closest("[data-wish]");
    if (w) {
      toggleWish(w.dataset.wish);
      return;
    }
    const qty = e.target.closest("[data-qty]");
    if (qty) {
      changeQty(qty.dataset.qty, +qty.dataset.d);
      return;
    }
    const rm = e.target.closest("[data-rm]");
    if (rm) {
      removeFromCart(rm.dataset.rm);
      return;
    }
  });

  /* -----------------------------------------------------------------
   
----------------------------------------------------------------- */
  const checkout = document.getElementById("checkout");

  function openCheckout() {
    if (!cart.length) return;
    // render order review
    document.getElementById("checkoutItems").innerHTML = cart
      .map((l) => {
        const p = findProduct(l.id);
        return `
    <div class="flex justify-between items-baseline text-sm">
      <span class="text-pearl/80">${p.name} <span class="text-smoke">× ${l.qty}</span></span>
      <span class="font-display text-lilac">${NGN(p.price * l.qty)}</span>
    </div>`;
      })
      .join("");
    document.getElementById("checkoutTotal").textContent =
      NGN(cartTotalValue());
    // reset to form step
    document.getElementById("checkoutForm").classList.remove("hidden");
    document.getElementById("checkoutDone").classList.add("hidden");
    document.getElementById("checkoutTitle").textContent = "Checkout";
    document.getElementById("payMsg").textContent = "";
    closeOverlay(document.getElementById("cartDrawer"), ".panel");
    setTimeout(() => openOverlay(checkout, ".panel"), 300);
  }

  document.getElementById("payForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target,
      msg = document.getElementById("payMsg");
    if (!form.checkValidity()) {
      msg.textContent = "Please complete all delivery fields.";
      return;
    }

    const order = {
      items: cart.map((l) => ({
        id: l.id,
        name: findProduct(l.id).name,
        qty: l.qty,
        price: findProduct(l.id).price,
      })),
      total: cartTotalValue(),
      customer: {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
      },
    };

    // ---- REAL PAYSTACK (uncomment after adding inline.js + your key) ----
    // if (window.PaystackPop) { /* see commented setup() block above */ return; }

    // ---- SIMULATION (default so the demo flows end-to-end) ----
    const btn = document.getElementById("payBtn");
    btn.disabled = true;
    btn.textContent = "Processing…";
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = "Pay with Paystack";
      const ref = "SC-" + Date.now().toString().slice(-8);
      // >>> BACKEND: POST `order` + `ref` to /api/orders here
      showConfirmation(ref);
    }, 1200);
  });

  function showConfirmation(ref) {
    document.getElementById("orderRef").textContent = ref;
    document.getElementById("checkoutForm").classList.add("hidden");
    document.getElementById("checkoutDone").classList.remove("hidden");
    document.getElementById("checkoutTitle").textContent = "Thank you";
    cart.length = 0;
    updateCart();
  }

  document.getElementById("goCheckout").addEventListener("click", openCheckout);
  document
    .querySelectorAll("[data-close-checkout]")
    .forEach((b) =>
      b.addEventListener("click", () => closeOverlay(checkout, ".panel")),
    );

  /* -----------------------------------------------------------------
   10) TESTIMONIALS / NAV / SEARCH / MENU / OVERLAYS / FORMS / MISC
----------------------------------------------------------------- */
  function buildTestimonials() {
    const track = document.getElementById("testiTrack"),
      dots = document.getElementById("testiDots");
    track.innerHTML = TESTIMONIALS.map(
      (t, i) => `
    <figure id="trackChild" class="tslide absolute inset-0 ${i === 0 ? "" : "opacity-0 pointer-events-none"}" data-slide="${i}">
      <div class="text-lilac text-lg mb-4 tracking-[.3em]">★★★★★</div>
      <blockquote class="display text-2xl md:text-[2.2rem] leading-snug mb-5 group-[.light]:text-onyx">"${t.quote}"</blockquote>
      <figcaption class="text-sm">
      
      <span class="text-pearl group-[.light]:text-onyx">${t.name}</span>
      <span class="text-smoke group-[.light]:text-gray"> — ${t.loc}</span
      
      ></figcaption>
    </figure>`,
    ).join("");

    dots.innerHTML = TESTIMONIALS.map(
      (_, i) =>
        `<button class="w-3 h-3 md:w-2 md:h-2 rounded-full transition-colors ${i === 0 ? "bg-lilac" : "bg-smoke/40"}" data-dot="${i}" aria-label="Testimonial ${i + 1}"></button>`,
    ).join("");
    let cur = 0;
    const slides = [...track.children],
      dotEls = [...dots.children];
    function go(n) {
      slides[cur].classList.add("opacity-0", "pointer-events-none");
      dotEls[cur].classList.replace("bg-lilac", "bg-smoke/40");
      cur = (n + TESTIMONIALS.length) % TESTIMONIALS.length;
      slides[cur].classList.remove("opacity-0", "pointer-events-none");
      dotEls[cur].classList.replace("bg-smoke/40", "bg-lilac");
    }
    dotEls.forEach((d, i) =>
      d.addEventListener("click", () => {
        go(i);
        reset();
      }),
    );
    let timer;
    const reset = () => {
      clearInterval(timer);
      timer = setInterval(() => go(cur + 1), 5500);
    };
    if (!reduceMotion) reset();
  }

  /* sticky-solid nav + back-to-top (nav itself never hides) */
  const nav = document.getElementById("nav");
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("solid", y > 40);
    const tt = document.getElementById("toTop");
    const show = y > 800;
    tt.classList.toggle("opacity-0", !show);
    tt.classList.toggle("translate-y-4", !show);
    tt.classList.toggle("pointer-events-none", !show);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  document
    .getElementById("toTop")
    .addEventListener("click", () =>
      lenis
        ? lenis.scrollTo(0)
        : window.scrollTo({ top: 0, behavior: "smooth" }),
    );

  /* overlay open/close (locks scroll) */
  function openOverlay(root, panelSel) {
    root.classList.remove("invisible");
    requestAnimationFrame(() => {
      root.querySelector(".scrim").style.opacity = 1;
      const p = root.querySelector(panelSel);
      if (p) {
        p.style.opacity = 1;
        p.style.transform = "none";
        p.classList.remove("scale-95");
      }
    });
    lenis?.stop();
    document.body.style.overflow = "hidden";
  }
  function closeOverlay(root, panelSel) {
    root.querySelector(".scrim").style.opacity = 0;
    const p = root.querySelector(panelSel);
    if (p) p.style.opacity = 0;
    const slide = root.querySelector(".panel");
    if (slide) {
      if (root.id === "cartDrawer") slide.style.transform = "translateX(100%)";
      else if (root.id === "mobileMenu")
        slide.style.transform = "translateX(-100%)";
      else slide.style.transform = "";
    }
    setTimeout(() => root.classList.add("invisible"), 480);
    // only release scroll if no other overlay is open
    const anyOpen = [
      "cartDrawer",
      "mobileMenu",
      "quickView",
      "searchOverlay",
      "checkout",
    ].some((id) => {
      const el = document.getElementById(id);
      return el !== root && !el.classList.contains("invisible");
    });
    if (!anyOpen) {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }

  /* cart (desktop + mobile float) */
  const cartDrawer = document.getElementById("cartDrawer");
  document
    .getElementById("openCart")
    .addEventListener("click", () => openOverlay(cartDrawer, ".panel"));
  document
    .getElementById("floatCart")
    .addEventListener("click", () => openOverlay(cartDrawer, ".panel"));
  document
    .querySelectorAll("[data-close-cart]")
    .forEach((b) =>
      b.addEventListener("click", () => closeOverlay(cartDrawer, ".panel")),
    );

  /* mobile menu */
  const mobileMenu = document.getElementById("mobileMenu");
  document
    .getElementById("openMenu")
    .addEventListener("click", () => openOverlay(mobileMenu, ".panel"));
  document.querySelectorAll("[data-close-menu]").forEach((b) =>
    b.addEventListener("click", () => {
      closeOverlay(mobileMenu, ".panel");
      sidebarDropdownMenu.classList.remove("show");
    }),
  );

  /* quick view close */
  document
    .querySelectorAll("[data-close-quick]")
    .forEach((b) =>
      b.addEventListener("click", () => closeOverlay(quick, ".panel")),
    );

  /* search */
  const searchOverlay = document.getElementById("searchOverlay");
  document.getElementById("openSearch").addEventListener("click", () => {
    openOverlay(searchOverlay, ".panel");
    setTimeout(() => document.getElementById("searchInput").focus(), 300);
    runSearch("");
  });
  document
    .querySelectorAll("[data-close-search]")
    .forEach((b) =>
      b.addEventListener("click", () => closeOverlay(searchOverlay, ".panel")),
    );
  document
    .getElementById("searchInput")
    .addEventListener("input", (e) => runSearch(e.target.value));
  function runSearch(q) {
    q = q.trim().toLowerCase();
    const res = PRODUCTS.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
    const box = document.getElementById("searchResults");
    box.innerHTML = res.length
      ? res
          .map(
            (p) => `
    <button class="text-left group" data-quick="${p.id}">
      <div class="aspect-[3/4] overflow-hidden bg-char mb-2"><img src="${p.img[0]}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onerror="this.style.opacity=0"></div>
      <p class="font-display text-base leading-tight">${p.name}</p><p class="text-lilac text-xs">${NGN(p.price)}</p>
    </button>`,
          )
          .join("")
      : `<p class="text-pearl/45 col-span-full text-center py-8">No pieces match “${q}”.</p>`;
  }
  document.getElementById("searchResults").addEventListener("click", (e) => {
    const b = e.target.closest("[data-quick]");
    if (b) {
      closeOverlay(searchOverlay, ".panel");
      setTimeout(() => openQuick(b.dataset.quick), 300);
    }
  });

  /* ESC closes the top-most overlay */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      [
        "checkout",
        "quickView",
        "searchOverlay",
        "cartDrawer",
        "mobileMenu",
      ].forEach((id) => {
        const el = document.getElementById(id);
        if (!el.classList.contains("invisible")) closeOverlay(el, ".panel");
      });
    }
  });

  /* FOOTER */

  /* simple forms */
  function handleForm(formId, msgId, okText) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById(msgId);
      if (!form.checkValidity()) {
        msg.textContent = "Please complete the highlighted fields.";
        msg.style.color = "#e8a0a0";
        return;
      }
      msg.textContent = okText;
      msg.style.color = "var(--lilac)";
      form.reset();
      setTimeout(() => (msg.textContent = ""), 5000);
    });
  }
  handleForm("newsForm", "newsMsg", "Welcome to the Inner Circle ✦");
  handleForm(
    "contactForm",
    "contactMsg",
    "Thank you — we'll be in touch shortly.",
  );

  document.getElementById("year").textContent = new Date().getFullYear();

  /* -------------------------- INIT -------------------------- */
  window.addEventListener("DOMContentLoaded", () => {
    renderFilters();
    renderShop(); // products visible almost immediately
    buildMarquee();
    buildTestimonials();
    updateCart();
    initReveal();
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  });
  window.addEventListener("load", runLoader);
});
