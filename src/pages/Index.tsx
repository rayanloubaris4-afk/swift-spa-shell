import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import dishBriocheSaumon from "@/assets/dish-brioche-saumon.jpg";
import dishEggsBurger from "@/assets/dish-eggs-burger.jpg";
import dishGranolaBowl from "@/assets/dish-granola-bowl.jpg";
import dishBagel from "@/assets/dish-bagel.jpg";
import dishFullBrunch from "@/assets/dish-full-brunch.jpg";
import dishHalloumi from "@/assets/dish-halloumi-mushroom.jpg";
import dishProsciutto from "@/assets/dish-prosciutto-eggs.jpg";
import drinkMatcha from "@/assets/drink-strawberry-matcha.jpg";

type MenuItem = {
  name: string;
  desc?: string;
  price: string;
  tag?: string;
  featured?: boolean;
  image?: string;
};

type Category = { id: string; label: string; items: MenuItem[] };

const CATEGORIES: Category[] = [
  {
    id: "combos",
    label: "Brunch Combos",
    items: [
      {
        name: "Hera Brunch",
        desc: "2 toasts avocado & bacon ou saumon sauce aneth, œufs brouillés · brioche sucrée mascarpone & berries · caramel beurre salé · chia pudding yaourt grec, fruits & peanut butter · boisson chaude + jus frais",
        price: "129 DH",
        tag: "Signature",
        featured: true,
        image: dishFullBrunch,
      },
      {
        name: "American Breakfast",
        desc: "2 toasts, tomates grillées, œufs brouillés, bacon, champignons frais, saucisses de bœuf & potatoes · boisson chaude + jus frais",
        price: "99 DH",
        featured: true,
        image: dishEggsBurger,
      },
      {
        name: "Assiette Fraîche",
        desc: "2 toasts, 2 œufs au plat, fromage masdam, jben, olives noires, fruits de saison, avocat & veggies · boisson chaude + jus frais",
        price: "79 DH",
      },
      {
        name: "Moroccan Rituel",
        desc: "Mssemen, harcha, pain, olives noires, jben, miel, raib à l'amlou, fleur d'oranger, œufs au cumin · thé + jus frais (supp. khlii à l'huile d'olive +12 DH)",
        price: "79 DH",
        tag: "Tradition",
      },
      {
        name: "Best Omelette",
        desc: "Omelette poireaux–parmesan, cream cheese, olives noires, pain grillé & salade",
        price: "49 DH",
      },
      {
        name: "Turkish Eggs",
        desc: "Œufs servis sur yaourt grec à l'ail, beurre au paprika, chili flakes, aneth fraîche · pain libanais",
        price: "69 DH",
        tag: "Spicy 🌶️",
      },
      {
        name: "Shakshuka ❤️",
        desc: "Œufs au plat ou brouillés mijotés dans une sauce tomate chaude, poivrons grillés au feu de bois, fêta ou fromage râpé, épices douces · pain frais à tremper",
        price: "49 DH",
      },
      {
        name: "Açai Bowl ❤️",
        desc: "Açai garni de granola, fruits de saison & beurre de cacahuète maison",
        price: "49 / 69 DH",
      },
      {
        name: "Granola Bowl",
        desc: "Yaourt grec garni de granola, fruits de saison & beurre de cacahuète maison",
        price: "39 / 59 DH",
        image: dishGranolaBowl,
      },
    ],
  },
  {
    id: "brunch-lunch",
    label: "Brunch & Lunch",
    items: [
      {
        name: "Brioche Salée Saumon ou Bacon ❤️",
        desc: "Brioche salée grillée, saumon fumé, avocat écrasé citronné, sauce aneth crémeuse maison & œufs brouillés, herbes fraîches",
        price: "70 DH",
        tag: "Best-seller",
        featured: true,
        image: dishBriocheSaumon,
      },
      {
        name: "Salty Bagel ❤️",
        desc: "Bagel multi-grains, cream cheese, avocat, œufs & sauce aneth — saumon ou bacon",
        price: "69 DH",
        featured: true,
        image: dishBagel,
      },
      {
        name: "Duo Halloumi & Mushrooms Truffle ❤️",
        desc: "Deux toasts gourmands : halloumi grillé, avocat, roquette, tomates fraîches + champignons poêlés crème truffe onctueuse",
        price: "99 DH",
        tag: "Premium",
        featured: true,
        image: dishHalloumi,
      },
      {
        name: "2× Toasts Avocado & Bacon",
        desc: "Pain toasté, feta, smashed avocado au citron, bacon croustillant, œufs & fines herbes, veggies",
        price: "65 DH",
        image: dishProsciutto,
      },
      {
        name: "Brioche Champignons & Épinards 🌿",
        desc: "Brioche grillée, épinards frais sautés, champignons poêlés, œufs brouillés onctueux & herbes fraîches",
        price: "70 DH",
      },
      {
        name: "Salmon Croffle",
        desc: "Croissant pressé au gaufrier, avocat écrasé, saumon fumé & œuf au choix, herbes fraîches",
        price: "60 DH",
      },
      {
        name: "Tuna Roll",
        desc: "Brioche, tuna mousse, pickles, herbes · servis avec potatoes aux herbes",
        price: "75 DH",
      },
      {
        name: "Croque Monsieur",
        desc: "Pain toasté, jambon, fromage fondant, béchamel légère, grillé au beurre",
        price: "49 DH",
      },
      {
        name: "Guacamole y Nachos ❤️",
        desc: "Avocat frais, oignon rouge, tomate, coriandre, citron vert, écrasé d'avocat, fines herbes & nachos",
        price: "65 DH",
      },
    ],
  },
  {
    id: "tex-mex",
    label: "Tex-Mex & Burgers",
    items: [
      {
        name: "Hera Burger",
        desc: "Beef, cheddar, oignons caramélisés, champignons frais, bacon, sauce maison · potatoes",
        price: "89 DH",
        featured: true,
      },
      {
        name: "Truffle & Brie Burger",
        desc: "Truffle & beef, brie, sauce truffle & roquette",
        price: "99 DH",
        tag: "Premium",
      },
      {
        name: "Coloslow Crispy Burger",
        desc: "Poulet crispy, salade coloslow, mayo & concombre",
        price: "79 DH",
      },
      {
        name: "Sandwich Filet de Bœuf Parmesan",
        desc: "Filet de bœuf en pain ciabatta, champignons, sauce champignons & parmesan",
        price: "90 DH",
        tag: "Chef",
      },
      {
        name: "Trio de Tacos with Nachos & Potatoes",
        desc: "Tacos viande hachée mexicains, crevettes & poulet crispy · potatoes, sauce yaourt & guacamole",
        price: "85 DH",
      },
      {
        name: "Quesadillas Viande Hachée & Potatoes",
        desc: "Servies avec potatoes, sauce yaourt & guacamole",
        price: "70 DH",
      },
      {
        name: "Chicken Wrap & Potatoes",
        desc: "Wrap, poulet crispy, laitue, citron, mayo garlic & guacamole",
        price: "60 DH",
      },
      { name: "Salade César", desc: "Iceberg, tomates cerises, croûtons aux herbes, parmesan & œufs durs", price: "65 DH" },
      { name: "Poké Bowl", desc: "Riz vinaigré, maïs, poulet, avocat, légumes & sauce savoureuse", price: "75 DH" },
      { name: "Salade Grecque", desc: "Tomates fraîches, concombre, oignon rouge, olives noires, feta, origan & huile d'olive extra vierge", price: "70 DH" },
    ],
  },
  {
    id: "sweetness",
    label: "Sweetness",
    items: [
      {
        name: "Brioche Tiramisu ❤️",
        desc: "Brioche façon tiramisu dorée à la poêle, crème mascarpone onctueuse, cacao pur, shot d'espresso & chocolat blanc",
        price: "90 DH",
        tag: "Cult favorite",
        featured: true,
      },
      {
        name: "Brioche Kunefe Dubai ❤️",
        desc: "Brioche moelleuse, Nutella & crème pistache, kunefe & boule de glace vanille",
        price: "70 DH",
        tag: "Trending",
        featured: true,
      },
      {
        name: "French Brioche Fruits ❤️",
        desc: "Brioche dorée à la poêle, fruits frais & crème mascarpone onctueuse",
        price: "65 DH",
      },
      {
        name: "Fluffy Mango & Passion Pancakes 🥭",
        desc: "Deux pancakes moelleux, mangue fraîche, coulis de fruit de la passion, mascarpone coco & amandes effilées grillées",
        price: "65 DH",
      },
      {
        name: "Berries & Choco Pancakes",
        desc: "Pancakes moelleux, pépites de chocolat, fruits rouges frais & crème mascarpone onctueuse",
        price: "65 DH",
      },
      {
        name: "Brioche Fleur d'Oranger & Amlou",
        desc: "Brioche moelleuse à la crème de fleur d'oranger, amlou onctueux",
        price: "75 DH",
      },
      {
        name: "Waffle à la Minute",
        desc: "Gaufre maison préparée à la minute · fruits frais, chocolat, Lotus ou caramel beurre salé",
        price: "55 DH",
      },
      { name: "Crêpe Sucrée", desc: "Chocolat ou caramel beurre salé · Kunefe pistache +10 DH", price: "40 DH" },
      { name: "Crêpe Salée", desc: "Poulet & champignon, sauce fromage", price: "55 DH" },
      { name: "Almonds Lemon Cake", price: "35 DH" },
      { name: "Carrot Cake / Banana Bread", price: "35 DH" },
      { name: "Cookie Kunefe", price: "35 DH" },
    ],
  },
  {
    id: "matcha",
    label: "Matcha & Iced",
    items: [
      {
        name: "Iced Matcha Strawberry",
        desc: "Cérémonial matcha, fraises fraîches & lait au choix",
        price: "59 DH",
        tag: "Best-seller",
        featured: true,
        image: drinkMatcha,
      },
      { name: "Iced Matcha Passion Fruit", price: "59 DH", tag: "Nouveau" },
      { name: "Iced Matcha Mango Vanilla", price: "65 DH", featured: true },
      { name: "Iced Matcha Vanilla", price: "55 DH" },
      { name: "Iced Matcha", price: "50 DH" },
      { name: "Matcha Latte", desc: "Cérémonial matcha & lait chaud vapeur", price: "45 DH" },
      { name: "Iced Pistachio Latte", price: "45 DH" },
      { name: "Iced Cappuccino Viennois", price: "45 DH" },
      { name: "Iced Mocha", price: "40 DH" },
      { name: "Iced White Mocha", price: "40 DH" },
      { name: "Iced Spanish Latte", price: "38 DH" },
      { name: "Iced Cappuccino", price: "35 DH" },
      { name: "Iced Latte", price: "33 DH" },
      { name: "Iced Chocolate", price: "30 DH" },
    ],
  },
  {
    id: "coffees",
    label: "Coffees & Tea",
    items: [
      { name: "Espresso", price: "18 DH" },
      { name: "Double Espresso", price: "24 DH" },
      { name: "Americano", price: "23 DH" },
      { name: "Espresso Macchiato", price: "25 DH" },
      { name: "Latte", price: "23 DH" },
      { name: "Cortado", price: "25 DH" },
      { name: "Cappuccino", price: "25 DH" },
      { name: "Hot Chocolate", price: "25 DH" },
      { name: "Spiced Chai Latte", price: "28 DH" },
      { name: "Vanilla Chai Latte", price: "28 DH" },
      { name: "Moccachino", price: "28 DH" },
      { name: "Spanish Latte", price: "28 DH" },
      { name: "Pistachio Latte", price: "35 DH", tag: "Favori" },
      { name: "Caramel ou Vanilla Latte", price: "33 DH" },
      { name: "Hazelnut Cappuccino", price: "35 DH" },
      { name: "White Chocolate Mocha", price: "33 DH" },
      { name: "Dark Chocolate Mocha", price: "33 DH" },
      { name: "Chocolat à l'Ancienne", price: "35 DH" },
      { name: "Cappuccino Viennois", price: "38 DH" },
      { name: "Thé à la Menthe", price: "20 DH" },
      { name: "Verveine", price: "18 DH" },
      { name: "Black Tea", price: "18 DH" },
      { name: "Infusion Tchaba", price: "28 DH" },
      { name: "Infusion Yogi Tea", price: "28 DH" },
    ],
  },
  {
    id: "smoothies",
    label: "Smoothies & Juice",
    items: [
      { name: "Berry Smoothie", price: "59 DH", featured: true },
      { name: "Mango Pineapple Smoothie", price: "59 DH" },
      { name: "Green Vanilla Smoothie", price: "59 DH" },
      { name: "Ice Tea Peach", price: "38 DH" },
      { name: "Ice Tea Passion", price: "38 DH" },
      { name: "Ice Tea Lemon (sugar free)", price: "38 DH" },
    ],
  },
];

const REVIEWS = [
  { stars: 5, text: "L'une des meilleures expériences brunch que j'ai eues à Rabat. Produits frais, portions généreuses, service irréprochable. Un endroit que je recommande les yeux fermés.", initials: "MR", name: "Monsieur R.", meta: "Local Guide", badge: "103 avis" },
  { stars: 5, text: "Juste incroyablement bon ! Le brunch réalisé avec des produits frais est hyper réconfortant. Au-delà d'être excellent, tout est joliment présenté. Une adresse à retenir absolument.", initials: "HF", name: "Hanane F.", meta: "Il y a 3 mois" },
  { stars: 5, text: "Très belle découverte ! L'endroit est cosy, propre et bien décoré. Les plats sont variés et savoureux. Parfait pour partager un moment spécial en famille ou entre amis.", initials: "CE", name: "Chaimae E.", meta: "Il y a un mois" },
  { stars: 5, text: "Hera est définitivement l'une des meilleures adresses pour bruncher autour de Rabat. Je reviens à chaque fois et retrouve la même qualité — les menus sont copieux et d'un délice.", initials: "LP", name: "Leila P.", meta: "Local Guide", badge: "138 avis" },
  { stars: 5, text: "Ce spot est devenu mon coup de cœur absolu. Niveau propreté, c'est nickel. Mais ce qui me fait revenir, c'est la bouffe — une tuerie ! Chaque ingrédient est travaillé avec soin.", initials: "AB", name: "Afaf B.", meta: "Il y a 6 mois" },
  { stars: 5, text: "Un vrai coup de cœur ! Le pain perdu était tellement moelleux, et le matcha à la fraise — exquis. La déco est magnifique, chaleureuse et pensée dans les moindres détails.", initials: "ZI", name: "Zineb I.", meta: "Il y a 7 mois" },
];

const SIGNATURE_DISHES = [
  { img: dishBriocheSaumon, name: "Brioche Salée Saumon", tag: "Signature", className: "gi-large" },
  { img: dishBagel, name: "Salty Bagel", tag: "Best-seller", className: "gi-medium" },
  { img: drinkMatcha, name: "Iced Matcha Strawberry", tag: "Iconic", className: "gi-medium" },
  { img: dishHalloumi, name: "Halloumi & Truffle Mushrooms", tag: "Premium", className: "gi-wide" },
  { img: dishFullBrunch, name: "American Breakfast", tag: "Generous", className: "gi-wide" },
  { img: dishGranolaBowl, name: "Granola Bowl", tag: "Healthy", className: "gi-wide" },
  { img: dishProsciutto, name: "Toast Prosciutto & Avocat", tag: "Fresh", className: "gi-medium" },
  { img: dishEggsBurger, name: "Turkish Eggs & Burger", tag: "Bold", className: "gi-medium" },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState("combos");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCat]);

  const current = CATEGORIES.find((c) => c.id === activeCat)!;

  return (
    <>
      <nav className={`hera-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#top" className="nav-logo" aria-label="Hera Brunch">
          <img src={logo} alt="Hera Brunch" className="nav-logo-img" />
        </a>
        <ul className="nav-links">
          <li><a href="#about">Notre histoire</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#reviews">Avis</a></li>
          <li><a href="#info">Infos</a></li>
          <li><a href="#contact" className="nav-cta">Réserver</a></li>
        </ul>
      </nav>

      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="hero-texture" />
        <div className="hero-photos">
          <img src={dishBriocheSaumon} alt="" />
          <img src={dishBagel} alt="" />
          <img src={drinkMatcha} alt="" />
          <img src={dishFullBrunch} alt="" />
          <img src={dishHalloumi} alt="" />
          <img src={dishGranolaBowl} alt="" />
        </div>
        <div className="hero-line-left" />
        <div className="hero-line-right" />
        <div className="hero-content">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-eyebrow"
          >
            Oulad Mtaa · Rabat · Maroc
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hero-title"
          >
            HERA<br /><em>Brunch</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="hero-subtitle-word"
          >
            Where cultures meet for brunch
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="hero-divider"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="hero-desc"
          >
            Une expérience culinaire d'exception dans un écrin cosy et raffiné. Produits frais, saveurs authentiques, moments inoubliables.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a href="#menu" className="btn-primary">Découvrir le menu</a>
            <a href="#contact" className="btn-ghost">Nous contacter</a>
          </motion.div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="marquee-section">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} style={{ display: "contents" }}>
              <span className="marquee-item">Brunch & Déjeuner</span>
              <span className="marquee-item">Produits frais</span>
              <span className="marquee-item">Ambiance cosy</span>
              <span className="marquee-item">Ouvert 7j/7</span>
              <span className="marquee-item">4.7 ★ Google</span>
              <span className="marquee-item">Le meilleur brunch de Rabat</span>
            </span>
          ))}
        </div>
      </div>

      {/* SIGNATURE GALLERY */}
      <section className="signature-gallery" id="gallery">
        <span className="section-label reveal">Nos plats signature</span>
        <h2 className="section-title reveal reveal-delay-1">
          Chaque assiette,<br /><em>une histoire à savourer</em>
        </h2>
        <div className="gold-rule center reveal reveal-delay-2" />
        <div className="gallery-grid">
          {SIGNATURE_DISHES.map((dish, i) => (
            <motion.div
              key={dish.name}
              className={`gallery-item ${dish.className}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.1 }}
            >
              <img src={dish.img} alt={dish.name} loading="lazy" />
              <div className="gallery-overlay">
                <span className="gallery-overlay-tag">{dish.tag}</span>
                <span className="gallery-overlay-name">{dish.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-visual reveal">
          <div className="about-img-stack">
            <div><img src={dishBriocheSaumon} alt="Brioche salée saumon" /></div>
            <div><img src={dishProsciutto} alt="Toast prosciutto avocat" /></div>
          </div>
          <motion.div
            className="about-img-accent float-anim"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="about-rating-num">4.7</div>
            <div className="about-rating-stars">★★★★★</div>
            <div className="about-rating-label">693 avis Google</div>
          </motion.div>
        </div>
        <div className="about-text">
          <span className="section-label reveal">Notre histoire</span>
          <h2 className="section-title reveal reveal-delay-1">Un coup de cœur<br /><em>né à Rabat</em></h2>
          <div className="gold-rule reveal reveal-delay-2" />
          <p className="reveal reveal-delay-2">
            Hera Brunch est né d'une passion simple : offrir à Rabat un espace où chaque bouchée raconte une histoire. Dans notre salle chaleureuse et soigneusement décorée d'Oulad Mtaa, nous travaillons chaque jour avec des produits frais et des recettes pensées avec amour.
          </p>
          <p className="reveal reveal-delay-2">
            Du pain perdu moelleux au matcha fraise, en passant par nos formules de brunch généreux — ici, manger est un rituel. Saveurs authentiques, recettes élaborées avec soin, chaque visite est une nouvelle découverte.
          </p>
          <div className="about-highlights reveal reveal-delay-3">
            <div className="highlight-item"><div className="highlight-num">693+</div><div className="highlight-label">Avis Google</div></div>
            <div className="highlight-item"><div className="highlight-num">4.7</div><div className="highlight-label">Note moyenne</div></div>
            <div className="highlight-item"><div className="highlight-num">100%</div><div className="highlight-label">Produits frais</div></div>
            <div className="highlight-item"><div className="highlight-num">N°1</div><div className="highlight-label">Brunch à Rabat</div></div>
          </div>
        </div>
      </section>

      <div className="experience-strip">
        <div className="strip-inner">
          {[
            { i: "☀️", t: "Brunch du matin", d: "Formules généreuses servies avec amour, du matin jusqu'à l'après-midi" },
            { i: "🍽️", t: "Déjeuner & Lunch", d: "Une carte déjeuner savoureuse pour prolonger le plaisir jusqu'en après-midi" },
            { i: "🌿", t: "Produits frais", d: "Sélection rigoureuse d'ingrédients de qualité, préparés chaque jour" },
            { i: "✨", t: "Cadre raffiné", d: "Décoration pensée dans les moindres détails, ambiance cosy et lumineuse" },
          ].map((s, idx) => (
            <div key={s.t} className={`strip-item reveal ${idx ? `reveal-delay-${idx}` : ""}`}>
              <div className="strip-icon">{s.i}</div>
              <div className="strip-title">{s.t}</div>
              <p className="strip-desc">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="menu-section" id="menu">
        <div className="menu-inner">
          <div className="menu-header">
            <span className="section-label reveal">À la carte</span>
            <h2 className="section-title reveal reveal-delay-1">Notre <em>menu complet</em></h2>
            <div className="gold-rule center reveal reveal-delay-2" />
          </div>

          <div className="menu-tabs reveal">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`menu-tab ${activeCat === c.id ? "active" : ""}`}
                onClick={() => setActiveCat(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="menu-cat-panel"
            >
              <div className="menu-real-grid">
                {current.items.map((item, i) => (
                  <div
                    key={item.name}
                    className={`menu-real-item ${item.featured ? "featured" : ""}`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="menu-real-left">
                      <div className="menu-real-name">
                        {item.name}
                        {item.tag && <span className="menu-tag">{item.tag}</span>}
                      </div>
                      {item.desc && <div className="menu-real-desc">{item.desc}</div>}
                    </div>
                    <div className="menu-real-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }} className="reveal">
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "hsl(19 58% 51% / 0.5)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Suppléments : halloumi 20 · pepperoni 15 · potatoes 15 · bacon 18 · saumon 25 · œuf 9 · cream cheese 9 · champignons 20 DH
            </p>
            <a href="#contact" className="btn-primary">Réserver une table</a>
          </div>
        </div>
      </section>

      <section className="info-section" id="info">
        <div className="info-inner">
          <div className="info-block">
            <span className="section-label reveal">Horaires</span>
            <h3 className="reveal reveal-delay-1">Nous<br />sommes ouverts</h3>
            <ul className="info-list reveal reveal-delay-2">
              <li><span className="day">Lundi</span><span className="time">Fermé</span></li>
              <li><span className="day">Mardi – Vendredi</span><span className="time">09h – 19h</span></li>
              <li><span className="day">Samedi</span><span className="time">09h – 19h</span></li>
              <li><span className="day">Dimanche</span><span className="time">09h – 19h</span></li>
            </ul>
          </div>
          <div className="info-block">
            <span className="section-label reveal">Adresse</span>
            <h3 className="reveal reveal-delay-1">Oulad Mtaa<br />Rabat</h3>
            <div className="contact-items reveal reveal-delay-2">
              <div>
                <div className="contact-item-label">Localisation</div>
                <div className="contact-item-val">Oulad Mtaa, Rabat<br />Maroc</div>
              </div>
              <div>
                <div className="contact-item-label">Livraison</div>
                <div className="contact-item-val">Disponible sur<br />Done & Glovo</div>
              </div>
            </div>
          </div>
          <div className="info-block">
            <span className="section-label reveal">Contact</span>
            <h3 className="reveal reveal-delay-1">Nous<br />contacter</h3>
            <div className="contact-items reveal reveal-delay-2">
              <div>
                <div className="contact-item-label">Téléphone</div>
                <div className="contact-item-val">
                  <a href="tel:0667474027" style={{ color: "hsl(var(--gold))", textDecoration: "none", letterSpacing: "0.05em" }}>
                    06 67 47 40 27
                  </a>
                </div>
              </div>
              <div>
                <div className="contact-item-label">Instagram</div>
                <div className="contact-item-val">@herabrunch</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reservation-section" id="contact">
        <div className="reservation-inner">
          <span className="section-label reveal" style={{ textAlign: "center", display: "block" }}>Contact</span>
          <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: "center" }}>
            Contactez<br /><em>notre équipe</em>
          </h2>
          <div className="gold-rule center reveal reveal-delay-2" />
          <p className="reveal reveal-delay-2">
            Une question, une demande spéciale ou envie de nous rejoindre pour un moment inoubliable ? N'hésitez pas à nous appeler directement — notre équipe se fera un plaisir de vous répondre.
          </p>
          <motion.div
            className="reveal reveal-delay-2"
            style={{ margin: "2.5rem 0 3rem" }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ border: "1px solid hsl(var(--gold-light))", padding: "2.5rem", background: "hsl(var(--warm-white))", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "hsl(var(--gold))", marginBottom: "1rem" }}>Téléphone</div>
              <a href="tel:0667474027" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 300, color: "hsl(var(--espresso))", textDecoration: "none", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>
                06 67 47 40 27
              </a>
              <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", fontWeight: 300, letterSpacing: "0.1em" }}>Lun – Dim · 09h – 17h</div>
            </div>
          </motion.div>
          <div className="reveal reveal-delay-2" style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:0667474027" className="btn-primary">📞 Appeler maintenant</a>
            <a href="https://www.instagram.com/herabrunch" target="_blank" rel="noreferrer" className="btn-ghost" style={{ color: "hsl(var(--espresso))", borderColor: "hsl(var(--gold))" }}>
              Instagram @herabrunch
            </a>
          </div>
          <p className="reveal" style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", marginTop: "2rem", letterSpacing: "0.05em" }}>
            Nous répondons également sur Instagram pour toute demande d'information.
          </p>
        </div>
      </section>

      <section className="reviews-section" id="reviews">
        <div className="reviews-header">
          <div>
            <span className="section-label reveal">Témoignages</span>
            <h2 className="section-title reveal reveal-delay-1">Ce que disent<br /><em>nos clients</em></h2>
            <div className="gold-rule reveal reveal-delay-2" />
          </div>
          <div style={{ textAlign: "right" }} className="reveal">
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 300, color: "hsl(var(--gold-dark))", lineHeight: 1 }}>4.7</div>
            <div style={{ color: "hsl(var(--gold))", fontSize: "1rem", letterSpacing: "0.1rem" }}>★★★★★</div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "hsl(var(--text-muted))", textTransform: "uppercase", marginTop: "0.3rem" }}>693 avis · Google Maps</div>
          </div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, idx) => (
            <motion.div
              key={r.name + idx}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="review-stars">{"★".repeat(r.stars)}</div>
              <p className="review-text">{r.text}</p>
              <div className="review-author">
                <div className="review-avatar">{r.initials}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-meta">
                    {r.meta}
                    {r.badge && <> · <span className="review-badge">{r.badge}</span></>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="hera-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <a href="#top" className="footer-logo" aria-label="Hera Brunch">
                <img src={logo} alt="Hera Brunch" className="footer-logo-img" />
              </a>
              <p className="footer-tagline" style={{ marginTop: "0.5rem" }}>Oulad Mtaa · Rabat · Maroc</p>
            </div>
            <ul className="footer-links">
              <li><a href="#about">Histoire</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#reviews">Avis</a></li>
              <li><a href="#info">Horaires</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2026 Hera Brunch · Tous droits réservés</p>
            <div className="google-rating">
              <span>★★★★★</span>
              <strong>4.7</strong>
              <span>· 693 avis Google</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
