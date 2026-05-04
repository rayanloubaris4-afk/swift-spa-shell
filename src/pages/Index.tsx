import { useEffect, useState } from "react";
import brunchImg from "@/assets/brunch.jpg";

type MenuItem = {
  name: string;
  desc?: string;
  price: string;
  tag?: string;
  featured?: boolean;
};

type Category = { id: string; label: string; items: MenuItem[] };

const CATEGORIES: Category[] = [
  {
    id: "salé",
    label: "Salé",
    items: [
      { name: "Best Omelette", desc: "2 toasts grillés, omelette aux poireaux et parmesan, Jben, olives noires avec une petite salade", price: "59 MAD" },
      { name: "Granola Bowl", desc: "Yaourt grec, homemade granola, fruits de saison, peanut butter, chia", price: "59 MAD" },
      { name: "Brioche Salée", desc: "Avocat, œufs brouillés, saumon, sauce aneth", price: "79 MAD", tag: "Signature", featured: true },
      { name: "American Breakfast", desc: "Saucisses de bœuf, œufs brouillés, tomates grillées, bacon, champignons frais, toasts & potatoes", price: "129 MAD" },
      { name: "Turkish Eggs", desc: "Œufs sur yaourt grec à l'ail, beurre au paprika, chili flakes, aneth fraîche, pain libanais ou normal", price: "79 MAD" },
      { name: "Bagels Saumon ou Bacon", desc: "Bagels aux céréales, cream cheese, avocat, saumon ou bacon", price: "80 MAD" },
      { name: "Shakshuka", desc: "Œufs au plat dans une sauce tomate fraîche, poivrons, oignons et épices douces, pain frais", price: "59 MAD" },
      { name: "Hera Brunch", desc: "2× toasts avocat (cream cheese, œufs brouillés, bacon) + chia pudding + boisson + jus + brioche sucrée mascarpone", price: "154 MAD", tag: "Best-seller", featured: true },
      { name: "2× Toasts Avocado & Bacon", desc: "Toast au seigle, cream cheese, smashed avocado, œufs brouillés, petite salade", price: "75 MAD" },
      { name: "Açaí Bowl", desc: "Açaí & banane, blueberry, fruits de saison, peanut butter, homemade granola, chia", price: "69 MAD" },
      { name: "Moroccan Rituel", desc: "Mssemen, harcha, olives, jben, mkhamer, thym, fromage râpé, raib, amlou, œufs brouillés + thé/café + jus", price: "79 MAD", tag: "Tradition", featured: true },
    ],
  },
  {
    id: "sucré",
    label: "Sucré",
    items: [
      { name: "Crème Brûlée Maison à la Vanille", desc: "Crème onctueuse parfumée à la vanille, fine croûte de sucre caramélisé à la flamme", price: "35 MAD" },
      { name: "Brioche Kunefe Dubai", desc: "Brioche moelleuse, Nutella, crème pistache, Kunefe & boule de glace", price: "85 MAD", tag: "Trending", featured: true },
      { name: "Brioche Tiramisu", desc: "Crème mascarpone, cacao pur, shot espresso et chocolat blanc", price: "105 MAD" },
      { name: "Fluffy Pancakes Berries & Chocolat", desc: "2 pancakes moelleux, fruits rouges frais, crème mascarpone, pépites de chocolat", price: "75 MAD" },
      { name: "Gaufre à la Minute", desc: "Gaufre maison cuite à la commande, croustillante à l'extérieur, fondante à l'intérieur", price: "65 MAD" },
      { name: "Brioche Perdue", desc: "Brioche dorée à la poêle, fruits frais et crème mascarpone onctueuse", price: "75 MAD", tag: "Signature", featured: true },
    ],
  },
  {
    id: "chaud",
    label: "Boissons Chaudes",
    items: [
      { name: "Espresso", price: "16 MAD" },
      { name: "Double Espresso", price: "25 MAD" },
      { name: "Cappuccino", desc: "Café espresso avec lait moussé", price: "25 MAD" },
      { name: "Latte", desc: "Café espresso avec lait vapeur", price: "25 MAD" },
      { name: "Cortado", desc: "Café espresso avec lait chaud", price: "26 MAD" },
      { name: "Chocolat Chaud", desc: "Boisson chaude au chocolat et lait", price: "25 MAD" },
      { name: "Moccachino", desc: "Cappuccino au chocolat", price: "30 MAD" },
      { name: "Spanish Latte", desc: "Latte avec lait concentré sucré", price: "30 MAD" },
      { name: "White Mocca", desc: "Café au chocolat blanc et lait", price: "35 MAD" },
      { name: "Cappuccino Viennois", desc: "Cappuccino avec crème chantilly", price: "33 MAD" },
      { name: "Matcha Latté", desc: "Thé matcha avec lait chaud", price: "40 MAD", tag: "Favori", featured: true },
      { name: "Thé Marocain à la Menthe", desc: "Thé vert à la menthe fraîche", price: "25 MAD" },
      { name: "Verveine", price: "22 MAD" },
      { name: "Tchaba ou Yogi Tea", desc: "Infusion Tchaba ou Yogi Tea", price: "35 MAD" },
    ],
  },
  {
    id: "froid",
    label: "Boissons Froides",
    items: [
      { name: "Ice Latte", desc: "Café glacé avec lait froid", price: "25 MAD" },
      { name: "Ice Mocca", desc: "Café glacé au chocolat", price: "30 MAD" },
      { name: "Ice Spanish Latte", desc: "Spanish latte servi glacé", price: "50 MAD" },
      { name: "Ice Matcha", desc: "Thé matcha glacé avec lait", price: "69 MAD" },
      { name: "Ice Matcha Strawberry", desc: "Matcha glacé aux fraises", price: "79 MAD", tag: "Best-seller", featured: true },
      { name: "Ice Matcha Passion", desc: "Matcha glacé aux fruits de la passion", price: "79 MAD", tag: "Nouveau", featured: true },
    ],
  },
  {
    id: "jus",
    label: "Jus Frais",
    items: [
      { name: "Jus d'Orange", desc: "Jus d'orange frais sans sucre", price: "35 MAD" },
      { name: "Jus de Mangue", price: "35 MAD" },
      { name: "Jus d'Ananas", price: "35 MAD" },
      { name: "Jus de Carotte", desc: "Jus de carotte frais, base orange, sans sucre", price: "35 MAD" },
      { name: "Jus de Citron/Gingembre", price: "28 MAD" },
      { name: "Jus de Fraise", price: "39 MAD" },
      { name: "Jus de Fruits Rouges", price: "42 MAD", tag: "Favori", featured: true },
    ],
  },
  {
    id: "déjeuner",
    label: "Déjeuner",
    items: [
      { name: "Salade Grecque", desc: "Ice berg, feta, concombre, olives noires, poivrons rouges, noix", price: "65 MAD" },
      { name: "Salade César", desc: "Poulet, croutons, iceberg, cerises, parmesan, sauce césar", price: "70 MAD" },
      { name: "Chicken Wrap & Potatoes", desc: "Poulet, sauce yaourt, citron, ail, guacamole & potatoes", price: "70 MAD" },
      { name: "Quesadillas Viande Hachée & Potatoes", desc: "Potatoes, guacamole, sauce yaourt", price: "85 MAD" },
      { name: "Tuna Roll", desc: "Brioche tuna mousse, pickles, potatoes aux herbes", price: "90 MAD" },
      { name: "Coloslow Crispy Burger", desc: "Poulet crispy, coloslow salade, mayo & concombre, potatoes", price: "90 MAD" },
      { name: "Hera Burger 100g", desc: "Viande hachée, cheddar, oignons caramélisés, champignons, bacon, sauce maison, potatoes", price: "99 MAD" },
      { name: "Trio Tacos & Potatoes", desc: "Viande hachée, crevettes, poulet — guacamole & sauce yaourt", price: "105 MAD" },
      { name: "Sandwich Filet de Bœuf & Parmesan", desc: "Filet de bœuf parmesan, potatoes et sauce champignons", price: "109 MAD", tag: "Chef", featured: true },
      { name: "Truffle & Brie Burger", desc: "Burger truffe & bœuf, brie, potatoes aux herbes", price: "120 MAD", tag: "Premium", featured: true },
      { name: "Duo Halloumi & Mushrooms Truffle", desc: "2× toasts : halloumi cheese toast + avocat & crème truffe et champignons", price: "129 MAD" },
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

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState("salé");

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
        <a href="#top" className="nav-logo">Hera</a>
        <ul className="nav-links">
          <li><a href="#about">Notre histoire</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#reviews">Avis</a></li>
          <li><a href="#info">Infos</a></li>
          <li><a href="#contact" className="nav-cta">Contact</a></li>
        </ul>
      </nav>

      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="hero-texture" />
        <div className="hero-line-left" />
        <div className="hero-line-right" />
        <div className="hero-content">
          <span className="hero-eyebrow">Oulad Mtaa · Rabat · Maroc</span>
          <h1 className="hero-title">HERA<br /><em>Brunch</em></h1>
          <p className="hero-subtitle-word">L'art du brunch</p>
          <div className="hero-divider" />
          <p className="hero-desc">
            Une expérience culinaire d'exception dans un écrin cosy et raffiné. Produits frais, saveurs authentiques, moments inoubliables.
          </p>
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

      <section className="about" id="about">
        <div className="about-visual reveal">
          <div className="about-img-main">
            <img src={brunchImg} alt="Hera Brunch — nos plats" width={1280} height={1280} />
          </div>
          <div className="about-img-accent">
            <div className="about-rating-num">4.7</div>
            <div className="about-rating-stars">★★★★★</div>
            <div className="about-rating-label">693 avis Google</div>
          </div>
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

          <div className="menu-cat-panel">
            <div className="menu-real-grid">
              {current.items.map((item) => (
                <div key={item.name} className={`menu-real-item ${item.featured ? "featured" : ""}`}>
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
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }} className="reveal">
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "hsl(19 58% 51% / 0.5)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Menu susceptible de changer selon la saison
            </p>
            <a href="#contact" className="btn-primary">Nous contacter</a>
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
                <div className="contact-item-label">Accès</div>
                <div className="contact-item-val">Retrouvez-nous sur<br />Google Maps</div>
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
          <div className="reveal reveal-delay-2" style={{ margin: "2.5rem 0 3rem" }}>
            <div style={{ border: "1px solid hsl(var(--gold-light))", padding: "2.5rem", background: "hsl(var(--warm-white))", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "hsl(var(--gold))", marginBottom: "1rem" }}>Téléphone</div>
              <a href="tel:0667474027" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 300, color: "hsl(var(--espresso))", textDecoration: "none", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>
                06 67 47 40 27
              </a>
              <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", fontWeight: 300, letterSpacing: "0.1em" }}>Lun – Dim · 09h – 17h</div>
            </div>
          </div>
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
            <div key={r.name + idx} className={`review-card reveal ${idx % 3 === 1 ? "reveal-delay-1" : idx % 3 === 2 ? "reveal-delay-2" : ""}`}>
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
            </div>
          ))}
        </div>
      </section>

      <footer className="hera-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <a href="#top" className="footer-logo">Hera</a>
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
            <p className="footer-copy">© 2025 Hera Brunch · Tous droits réservés</p>
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
