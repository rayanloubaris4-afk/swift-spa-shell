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
import dishTacosLunch from "@/assets/dish-tacos-lunch.jpg";
import dishShakshuka from "@/assets/dish-shakshuka.jpg";
import dishHalloumiDuo from "@/assets/dish-halloumi-duo.jpg";
import dishGuacNachos from "@/assets/dish-guacamole-nachos.jpg";
import dishShakshuka2 from "@/assets/dish-shakshuka-2.jpg";
import dishHeraBurger from "@/assets/dish-hera-burger.jpg";
import { t, CAT_LABELS, ITEM_AR, TAG_AR, type Lang } from "@/i18n";

type MenuItem = {
  name: string;
  desc?: { fr: string; ar?: string };
  price: string;
  tag?: string;
  featured?: boolean;
  image?: string;
};

type Category = { id: string; items: MenuItem[] };

const CATEGORIES: Category[] = [
  {
    id: "combos",
    items: [
      {
        name: "Hera Brunch",
        desc: {
          fr: "2 toasts avocat & bacon ou saumon sauce aneth, œufs brouillés · brioche sucrée mascarpone & fruits rouges · caramel beurre salé · pudding chia yaourt grec, fruits & beurre de cacahuète · boisson chaude + jus frais",
          ar: "توستان بالأفوكادو والبايكون أو السلمون مع صلصة الشبت، بيض مخفوق · بريوش حلوة بالماسكاربوني والتوت · كراميل بالزبدة المالحة · بودينغ شيا بالزبادي اليوناني والفواكه وزبدة الفول السوداني · مشروب ساخن + عصير طازج",
        },
        price: "129 DH",
        tag: "Signature",
        featured: true,
        image: dishFullBrunch,
      },
      {
        name: "American Breakfast",
        desc: {
          fr: "2 toasts, tomates grillées, œufs brouillés, bacon, champignons frais, saucisses de bœuf & potatoes · boisson chaude + jus frais",
          ar: "توستان، طماطم مشوية، بيض مخفوق، بايكون، فطر طازج، نقانق البقر وبطاطا · مشروب ساخن + عصير طازج",
        },
        price: "99 DH",
        featured: true,
        image: dishEggsBurger,
      },
      {
        name: "Assiette Fraîche",
        desc: {
          fr: "2 toasts, 2 œufs au plat, fromage masdam, jben, olives noires, fruits de saison, avocat & légumes · boisson chaude + jus frais",
          ar: "توستان، بيضتان مقليتان، جبن ماسدام، جبن، زيتون أسود، فواكه الموسم، أفوكادو وخضروات · مشروب ساخن + عصير طازج",
        },
        price: "79 DH",
      },
      {
        name: "Moroccan Rituel",
        desc: {
          fr: "Msemen, harcha, pain, olives noires, jben, miel, raïb à l'amlou, fleur d'oranger, œufs au cumin · thé + jus frais (supp. khlii à l'huile d'olive +12 DH)",
          ar: "مسمن، حرشة، خبز، زيتون أسود، جبن، عسل، رايب بالأملو، ماء الزهر، بيض بالكمون · أتاي + عصير طازج (إضافة خليع بزيت الزيتون +12 درهم)",
        },
        price: "79 DH",
        tag: "Tradition",
      },
      {
        name: "Best Omelette",
        desc: { fr: "Omelette poireaux–parmesan, fromage frais, olives noires, pain grillé & salade", ar: "أومليت بالكراث والبارميزان، جبن طري، زيتون أسود، خبز محمص وسلطة" },
        price: "49 DH",
      },
      {
        name: "Turkish Eggs",
        desc: { fr: "Œufs servis sur yaourt grec à l'ail, beurre au paprika, piment, aneth fraîche · pain libanais", ar: "بيض يُقدَّم على زبادي يوناني بالثوم، زبدة بالبابريكا، فلفل، شبت طازج · خبز لبناني" },
        price: "69 DH",
        tag: "Spicy 🌶️",
      },
      {
        name: "Shakshuka ❤️",
        desc: { fr: "Œufs au plat ou brouillés mijotés dans une sauce tomate, poivrons grillés au feu de bois, fêta ou fromage râpé, épices douces · pain frais à tremper", ar: "بيض مقلي أو مخفوق في صلصة طماطم، فلفل مشوي على الحطب، فيتا أو جبن مبشور، توابل خفيفة · خبز طازج" },
        price: "49 DH",
        image: dishShakshuka,
      },
      {
        name: "Açai Bowl ❤️",
        desc: { fr: "Açai garni de granola, fruits de saison & beurre de cacahuète maison", ar: "أساي مع غرانولا، فواكه الموسم وزبدة الفول السوداني المنزلية" },
        price: "49 / 69 DH",
      },
      {
        name: "Granola Bowl",
        desc: { fr: "Yaourt grec garni de granola, fruits de saison & beurre de cacahuète maison", ar: "زبادي يوناني مع غرانولا، فواكه الموسم وزبدة الفول السوداني المنزلية" },
        price: "39 / 59 DH",
        image: dishGranolaBowl,
      },
    ],
  },
  {
    id: "brunch-lunch",
    items: [
      {
        name: "Brioche Salée Saumon ou Bacon ❤️",
        desc: { fr: "Brioche salée grillée, saumon fumé, avocat écrasé citronné, sauce aneth crémeuse maison & œufs brouillés, herbes fraîches", ar: "بريوش مالحة مشوية، سلمون مدخن، أفوكادو مهروس بالليمون، صلصة الشبت الكريمية المنزلية، بيض مخفوق وأعشاب طازجة" },
        price: "70 DH",
        tag: "Best-seller",
        featured: true,
        image: dishBriocheSaumon,
      },
      {
        name: "Salty Bagel ❤️",
        desc: { fr: "Bagel multi-grains, fromage frais, avocat, œufs & sauce aneth — saumon ou bacon", ar: "بايغل متعدد الحبوب، جبن طري، أفوكادو، بيض وصلصة الشبت — سلمون أو بايكون" },
        price: "69 DH",
        featured: true,
        image: dishBagel,
      },
      {
        name: "Duo Halloumi & Mushrooms Truffle ❤️",
        desc: { fr: "Deux toasts gourmands : halloumi grillé, avocat, roquette, tomates fraîches + champignons poêlés crème truffe onctueuse", ar: "توستان فاخران: حلومي مشوي، أفوكادو، جرجير، طماطم طازجة + فطر مقلي بكريمة الكمأ" },
        price: "99 DH",
        tag: "Premium",
        featured: true,
        image: dishHalloumiDuo,
      },
      {
        name: "2× Toasts Avocat & Bacon",
        desc: { fr: "Pain toasté, fêta, avocat écrasé au citron, bacon croustillant, œufs & fines herbes, légumes", ar: "خبز محمص، فيتا، أفوكادو مهروس بالليمون، بايكون مقرمش، بيض وأعشاب، خضروات" },
        price: "65 DH",
        image: dishProsciutto,
      },
      {
        name: "Brioche Champignons & Épinards 🌿",
        desc: { fr: "Brioche grillée, épinards frais sautés, champignons poêlés, œufs brouillés onctueux & herbes fraîches", ar: "بريوش مشوية، سبانخ طازج، فطر مقلي، بيض مخفوق وأعشاب طازجة" },
        price: "70 DH",
      },
      {
        name: "Croffle au Saumon",
        desc: { fr: "Croissant pressé au gaufrier, avocat écrasé, saumon fumé & œuf au choix, herbes fraîches", ar: "كرواسون مضغوط على شكل وافل، أفوكادو مهروس، سلمون مدخن وبيض حسب الاختيار، أعشاب طازجة" },
        price: "60 DH",
      },
      {
        name: "Roulé au Thon",
        desc: { fr: "Brioche, mousse de thon, cornichons, herbes · servi avec potatoes aux herbes", ar: "بريوش، موس التونة، مخللات، أعشاب · يُقدَّم مع بطاطا بالأعشاب" },
        price: "75 DH",
      },
      {
        name: "Croque Monsieur",
        desc: { fr: "Pain toasté, jambon, fromage fondant, béchamel légère, grillé au beurre", ar: "خبز محمص، جامبون، جبن ذائب، بشاميل خفيف، مشوي بالزبدة" },
        price: "49 DH",
      },
      {
        name: "Guacamole y Nachos ❤️",
        desc: { fr: "Avocat frais, oignon rouge, tomate, coriandre, citron vert, écrasé d'avocat, fines herbes & nachos", ar: "أفوكادو طازج، بصل أحمر، طماطم، كزبرة، ليمون أخضر، مهروس الأفوكادو، أعشاب ونتشوس" },
        price: "65 DH",
        image: dishGuacNachos,
      },
    ],
  },
  {
    id: "tex-mex",
    items: [
      {
        name: "Hera Burger",
        desc: { fr: "Bœuf, cheddar, oignons caramélisés, champignons frais, bacon, sauce maison · potatoes", ar: "لحم بقر، شيدر، بصل مكرمل، فطر طازج، بايكون، صلصة منزلية · بطاطا" },
        price: "89 DH",
        featured: true,
        image: dishHeraBurger,
      },
      {
        name: "Burger Truffe & Brie",
        desc: { fr: "Truffe & bœuf, brie, sauce truffe & roquette", ar: "كمأ ولحم بقر، جبن بري، صلصة الكمأ وجرجير" },
        price: "99 DH",
        tag: "Premium",
      },
      {
        name: "Burger Crispy Coleslaw",
        desc: { fr: "Poulet crispy, salade coleslaw, mayo & concombre", ar: "دجاج مقرمش، سلطة كولسلو، مايونيز وخيار" },
        price: "79 DH",
      },
      {
        name: "Sandwich Filet de Bœuf Parmesan",
        desc: { fr: "Filet de bœuf en pain ciabatta, champignons, sauce champignons & parmesan", ar: "فيليه البقر في خبز تشاباتا، فطر، صلصة الفطر وبارميزان" },
        price: "90 DH",
        tag: "Chef",
      },
      {
        name: "Trio de Tacos avec Nachos & Potatoes",
        desc: { fr: "Tacos viande hachée mexicains, crevettes & poulet crispy · potatoes, sauce yaourt & guacamole", ar: "تاكوس باللحم المفروم المكسيكي، روبيان ودجاج مقرمش · بطاطا، صلصة الزبادي وغواكامولي" },
        price: "85 DH",
        featured: true,
        image: dishTacosLunch,
      },
      {
        name: "Quesadillas Viande Hachée & Potatoes",
        desc: { fr: "Servies avec potatoes, sauce yaourt & guacamole", ar: "تُقدَّم مع بطاطا، صلصة الزبادي وغواكامولي" },
        price: "70 DH",
      },
      {
        name: "Wrap au Poulet & Potatoes",
        desc: { fr: "Wrap, poulet crispy, laitue, citron, mayo à l'ail & guacamole", ar: "راب، دجاج مقرمش، خس، ليمون، مايونيز بالثوم وغواكامولي" },
        price: "60 DH",
      },
      { name: "Salade César", desc: { fr: "Iceberg, tomates cerises, croûtons aux herbes, parmesan & œufs durs", ar: "خس آيسبرغ، طماطم كرزية، خبز محمص بالأعشاب، بارميزان وبيض مسلوق" }, price: "65 DH" },
      { name: "Poké Bowl", desc: { fr: "Riz vinaigré, maïs, poulet, avocat, légumes & sauce savoureuse", ar: "أرز بالخل، ذرة، دجاج، أفوكادو، خضروات وصلصة لذيذة" }, price: "75 DH" },
      { name: "Salade Grecque", desc: { fr: "Tomates fraîches, concombre, oignon rouge, olives noires, fêta, origan & huile d'olive extra vierge", ar: "طماطم طازجة، خيار، بصل أحمر، زيتون أسود، فيتا، زعتر وزيت زيتون بكر" }, price: "70 DH" },
    ],
  },
  {
    id: "sweetness",
    items: [
      {
        name: "Brioche Tiramisu ❤️",
        desc: { fr: "Brioche façon tiramisu dorée à la poêle, crème mascarpone onctueuse, cacao pur, shot d'espresso & chocolat blanc", ar: "بريوش على طريقة التيراميسو محمصة بالمقلاة، كريمة الماسكاربوني، كاكاو نقي، إسبريسو وشوكولاتة بيضاء" },
        price: "90 DH",
        tag: "Cult favorite",
        featured: true,
      },
      {
        name: "Brioche Kunefe Dubai ❤️",
        desc: { fr: "Brioche moelleuse, Nutella & crème de pistache, kunefe & boule de glace vanille", ar: "بريوش طرية، نوتيلا وكريمة الفستق، كنافة وكرة آيس كريم بالفانيلا" },
        price: "70 DH",
        tag: "Trending",
        featured: true,
      },
      {
        name: "Brioche Française aux Fruits ❤️",
        desc: { fr: "Brioche dorée à la poêle, fruits frais & crème mascarpone onctueuse", ar: "بريوش محمصة بالمقلاة، فواكه طازجة وكريمة الماسكاربوني" },
        price: "65 DH",
      },
      {
        name: "Pancakes Mangue & Passion 🥭",
        desc: { fr: "Deux pancakes moelleux, mangue fraîche, coulis de fruit de la passion, mascarpone coco & amandes effilées grillées", ar: "بانكيكان طريان، مانغو طازج، صلصة فاكهة العاطفة، ماسكاربوني بجوز الهند ولوز محمص" },
        price: "65 DH",
      },
      {
        name: "Pancakes Fruits Rouges & Chocolat",
        desc: { fr: "Pancakes moelleux, pépites de chocolat, fruits rouges frais & crème mascarpone onctueuse", ar: "بانكيك طري، رقائق شوكولاتة، توت طازج وكريمة الماسكاربوني" },
        price: "65 DH",
      },
      {
        name: "Brioche Fleur d'Oranger & Amlou",
        desc: { fr: "Brioche moelleuse à la crème de fleur d'oranger, amlou onctueux", ar: "بريوش طرية بكريمة ماء الزهر، أملو" },
        price: "75 DH",
      },
      {
        name: "Gaufre à la Minute",
        desc: { fr: "Gaufre maison préparée à la minute · fruits frais, chocolat, Lotus ou caramel beurre salé", ar: "وافل منزلي يُحضَّر فوراً · فواكه طازجة، شوكولاتة، لوتس أو كراميل بالزبدة المالحة" },
        price: "55 DH",
      },
      { name: "Crêpe Sucrée", desc: { fr: "Chocolat ou caramel beurre salé · Kunefe pistache +10 DH", ar: "شوكولاتة أو كراميل بالزبدة المالحة · كنافة بالفستق +10 درهم" }, price: "40 DH" },
      { name: "Crêpe Salée", desc: { fr: "Poulet & champignon, sauce fromage", ar: "دجاج وفطر، صلصة الجبن" }, price: "55 DH" },
      { name: "Cake Citron Amande", price: "35 DH" },
      { name: "Carrot Cake / Banana Bread", price: "35 DH" },
      { name: "Cookie Kunefe", price: "35 DH" },
    ],
  },
  {
    id: "matcha",
    items: [
      {
        name: "Matcha Glacé Fraise",
        desc: { fr: "Matcha cérémonial, fraises fraîches & lait au choix", ar: "ماتشا احتفالي، فراولة طازجة وحليب حسب الاختيار" },
        price: "59 DH",
        tag: "Best-seller",
        featured: true,
        image: drinkMatcha,
      },
      { name: "Matcha Glacé Fruit de la Passion", price: "59 DH", tag: "Nouveau" },
      { name: "Matcha Glacé Mangue Vanille", price: "65 DH", featured: true },
      { name: "Matcha Glacé Vanille", price: "55 DH" },
      { name: "Matcha Glacé", price: "50 DH" },
      { name: "Matcha Latte", desc: { fr: "Matcha cérémonial & lait chaud vapeur", ar: "ماتشا احتفالي وحليب ساخن مبخر" }, price: "45 DH" },
      { name: "Latte Pistache Glacé", price: "45 DH" },
      { name: "Cappuccino Viennois Glacé", price: "45 DH" },
      { name: "Mocha Glacé", price: "40 DH" },
      { name: "Mocha Blanc Glacé", price: "40 DH" },
      { name: "Latte Espagnol Glacé", price: "38 DH" },
      { name: "Cappuccino Glacé", price: "35 DH" },
      { name: "Latte Glacé", price: "33 DH" },
      { name: "Chocolat Glacé", price: "30 DH" },
    ],
  },
  {
    id: "coffees",
    items: [
      { name: "Espresso", price: "18 DH" },
      { name: "Double Espresso", price: "24 DH" },
      { name: "Americano", price: "23 DH" },
      { name: "Espresso Macchiato", price: "25 DH" },
      { name: "Latte", price: "23 DH" },
      { name: "Cortado", price: "25 DH" },
      { name: "Cappuccino", price: "25 DH" },
      { name: "Chocolat Chaud", price: "25 DH" },
      { name: "Chai Latte Épicé", price: "28 DH" },
      { name: "Chai Latte Vanille", price: "28 DH" },
      { name: "Moccachino", price: "28 DH" },
      { name: "Latte Espagnol", price: "28 DH" },
      { name: "Latte Pistache", price: "35 DH", tag: "Favori" },
      { name: "Latte Caramel ou Vanille", price: "33 DH" },
      { name: "Cappuccino Noisette", price: "35 DH" },
      { name: "Mocha Chocolat Blanc", price: "33 DH" },
      { name: "Mocha Chocolat Noir", price: "33 DH" },
      { name: "Chocolat à l'Ancienne", price: "35 DH" },
      { name: "Cappuccino Viennois", price: "38 DH" },
      { name: "Thé à la Menthe", price: "20 DH" },
      { name: "Verveine", price: "18 DH" },
      { name: "Thé Noir", price: "18 DH" },
      { name: "Infusion Tchaba", price: "28 DH" },
      { name: "Infusion Yogi Tea", price: "28 DH" },
    ],
  },
  {
    id: "smoothies",
    items: [
      { name: "Smoothie Fruits Rouges", price: "59 DH", featured: true },
      { name: "Smoothie Mangue Ananas", price: "59 DH" },
      { name: "Smoothie Vert Vanille", price: "59 DH" },
      { name: "Thé Glacé Pêche", price: "38 DH" },
      { name: "Thé Glacé Passion", price: "38 DH" },
      { name: "Thé Glacé Citron (sans sucre)", price: "38 DH" },
    ],
  },
];

const REVIEWS = [
  {
    stars: 5,
    text: { fr: "L'une des meilleures expériences brunch que j'ai eues à Rabat. Produits frais, portions généreuses, service irréprochable. Un endroit que je recommande les yeux fermés.", ar: "إحدى أفضل تجارب البرانش التي عشتها في الرباط. منتجات طازجة، حصص سخية، وخدمة لا تشوبها شائبة. أنصح به بعيون مغمضة." },
    initials: "MR", name: "Monsieur R.", meta: { fr: "Local Guide", ar: "مرشد محلي" }, badge: { fr: "103 avis", ar: "103 تقييم" },
  },
  {
    stars: 5,
    text: { fr: "Juste incroyablement bon ! Le brunch réalisé avec des produits frais est hyper réconfortant. Au-delà d'être excellent, tout est joliment présenté. Une adresse à retenir absolument.", ar: "لذيذ بشكل لا يُصدَّق! البرانش بمنتجات طازجة مريح جداً. وإلى جانب التميّز، كل شيء معروض بجمال. عنوان يستحق الحفظ." },
    initials: "HF", name: "Hanane F.", meta: { fr: "Il y a 3 mois", ar: "قبل 3 أشهر" },
  },
  {
    stars: 5,
    text: { fr: "Très belle découverte ! L'endroit est cosy, propre et bien décoré. Les plats sont variés et savoureux. Parfait pour partager un moment spécial en famille ou entre amis.", ar: "اكتشاف جميل جداً! المكان دافئ ونظيف ومُزيَّن بذوق. الأطباق متنوعة ولذيذة. مثالي لمشاركة لحظة مميزة مع العائلة أو الأصدقاء." },
    initials: "CE", name: "Chaimae E.", meta: { fr: "Il y a un mois", ar: "قبل شهر" },
  },
  {
    stars: 5,
    text: { fr: "Hera est définitivement l'une des meilleures adresses pour bruncher autour de Rabat. Je reviens à chaque fois et retrouve la même qualité — les menus sont copieux et délicieux.", ar: "هيرا بلا شك من أفضل عناوين البرانش حول الرباط. أعود في كل مرة وأجد نفس الجودة — القوائم سخية ولذيذة." },
    initials: "LP", name: "Leila P.", meta: { fr: "Local Guide", ar: "مرشد محلي" }, badge: { fr: "138 avis", ar: "138 تقييم" },
  },
  {
    stars: 5,
    text: { fr: "Cet endroit est devenu mon coup de cœur absolu. Niveau propreté, c'est nickel. Mais ce qui me fait revenir, c'est la cuisine — une tuerie ! Chaque ingrédient est travaillé avec soin.", ar: "أصبح هذا المكان المفضل عندي على الإطلاق. النظافة ممتازة. لكن ما يعيدني هو الطعام — رائع! كل مكون يُحضَّر بعناية." },
    initials: "AB", name: "Afaf B.", meta: { fr: "Il y a 6 mois", ar: "قبل 6 أشهر" },
  },
  {
    stars: 5,
    text: { fr: "Un vrai coup de cœur ! Le pain perdu était tellement moelleux, et le matcha à la fraise — exquis. La déco est magnifique, chaleureuse et pensée dans les moindres détails.", ar: "حُب من النظرة الأولى! الخبز المحمَّر كان طرياً جداً، والماتشا بالفراولة لذيذ. الديكور رائع، دافئ ومدروس بأدق التفاصيل." },
    initials: "ZI", name: "Zineb I.", meta: { fr: "Il y a 7 mois", ar: "قبل 7 أشهر" },
  },
];

const SIGNATURE_DISHES = [
  { img: dishBriocheSaumon, name: { fr: "Brioche Salée Saumon", ar: "بريوش مالحة بالسلمون" }, tag: { fr: "Signature", ar: "مميز" }, className: "gi-large" },
  { img: dishBagel, name: { fr: "Bagel Salé", ar: "بايغل مالح" }, tag: { fr: "Best-seller", ar: "الأكثر مبيعاً" }, className: "gi-medium" },
  { img: drinkMatcha, name: { fr: "Matcha Glacé Fraise", ar: "ماتشا مثلج بالفراولة" }, tag: { fr: "Iconique", ar: "أيقوني" }, className: "gi-medium" },
  { img: dishHalloumiDuo, name: { fr: "Halloumi & Champignons Truffe", ar: "حلومي وفطر الكمأ" }, tag: { fr: "Premium", ar: "بريميوم" }, className: "gi-wide" },
  { img: dishHeraBurger, name: { fr: "Hera Burger", ar: "برغر هيرا" }, tag: { fr: "Signature", ar: "مميز" }, className: "gi-wide" },
  { img: dishTacosLunch, name: { fr: "Trio de Tacos", ar: "ثلاثية التاكوس" }, tag: { fr: "Lunch Time", ar: "وقت الغداء" }, className: "gi-wide" },
  { img: dishShakshuka, name: { fr: "Shakshuka", ar: "شكشوكة" }, tag: { fr: "Coup de cœur", ar: "محبوب" }, className: "gi-medium" },
  { img: dishGuacNachos, name: { fr: "Guacamole y Nachos", ar: "غواكامولي ونتشوس" }, tag: { fr: "Frais", ar: "طازج" }, className: "gi-medium" },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState("combos");
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar" : "fr";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

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
  }, [activeCat, lang]);

  const current = CATEGORIES.find((c) => c.id === activeCat)!;
  const toggleLang = () => setLang((l) => (l === "fr" ? "ar" : "fr"));

  const itemName = (n: string) => (lang === "ar" && ITEM_AR[n] ? ITEM_AR[n] : n);
  const tagText = (tag: string) => (lang === "ar" && TAG_AR[tag] ? TAG_AR[tag] : tag);
  const desc = (d?: { fr: string; ar?: string }) => (d ? (lang === "ar" ? d.ar || d.fr : d.fr) : "");

  return (
    <>
      <nav className={`hera-nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#top" className="nav-logo" aria-label="Hera Brunch">
          <img src={logo} alt="Hera Brunch" className="nav-logo-img" />
        </a>
        <ul className="nav-links">
          <li><a href="#about">{t("nav_story", lang)}</a></li>
          <li><a href="#menu">{t("nav_menu", lang)}</a></li>
          <li><a href="#reviews">{t("nav_reviews", lang)}</a></li>
          <li><a href="#info">{t("nav_info", lang)}</a></li>
          <li><a href="#contact" className="nav-cta">{t("nav_reserve", lang)}</a></li>
          <li>
            <button onClick={toggleLang} className="lang-toggle" aria-label="Switch language">
              <span className="lang-globe">🌐</span>
              {lang === "fr" ? "العربية" : "Français"}
            </button>
          </li>
        </ul>
      </nav>

      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="hero-texture" />
        <div className="hero-photos">
          <img src={dishBriocheSaumon} alt="" />
          <img src={dishBagel} alt="" />
          <img src={drinkMatcha} alt="" />
          <img src={dishHeraBurger} alt="" />
          <img src={dishHalloumiDuo} alt="" />
          <img src={dishTacosLunch} alt="" />
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
            {t("hero_eyebrow", lang)}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hero-title"
          >
            HERA<br /><em>{lang === "ar" ? "برانش" : "Brunch"}</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="hero-subtitle-word"
          >
            {t("hero_subtitle", lang)}
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
            {t("hero_desc", lang)}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a href="#menu" className="btn-primary">{t("cta_discover", lang)}</a>
            <a href="#contact" className="btn-ghost">{t("cta_contact", lang)}</a>
          </motion.div>
        </div>
        <div className="hero-scroll">
          <span>{t("scroll", lang)}</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="marquee-section">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} style={{ display: "contents" }}>
              <span className="marquee-item">{t("m1", lang)}</span>
              <span className="marquee-item">{t("m2", lang)}</span>
              <span className="marquee-item">{t("m3", lang)}</span>
              <span className="marquee-item">{t("m4", lang)}</span>
              <span className="marquee-item">{t("m5", lang)}</span>
              <span className="marquee-item">{t("m6", lang)}</span>
            </span>
          ))}
        </div>
      </div>

      <section className="delivery-section reveal">
        <div className="delivery-inner">
          <div className="delivery-text">
            <span className="section-label">{t("delivery_eyebrow", lang)}</span>
            <h2 className="delivery-title">{t("delivery_title", lang)} <em>Glovo &amp; Done</em></h2>
            <p className="delivery-sub">{t("delivery_sub", lang)}</p>
          </div>
          <div className="delivery-buttons">
            <a href="https://glovoapp.com/" target="_blank" rel="noreferrer" className="delivery-btn delivery-btn--glovo">
              <span className="delivery-btn-brand">Glovo</span>
              <span className="delivery-btn-cta">{t("order_glovo", lang)} →</span>
            </a>
            <a href="https://done.ma/" target="_blank" rel="noreferrer" className="delivery-btn delivery-btn--done">
              <span className="delivery-btn-brand">Done</span>
              <span className="delivery-btn-cta">{t("order_done", lang)} →</span>
            </a>
          </div>
        </div>
      </section>

      <section className="signature-gallery" id="gallery">
        <span className="section-label reveal">{t("signature_label", lang)}</span>
        <h2 className="section-title reveal reveal-delay-1">
          {t("signature_title_a", lang)}<br /><em>{t("signature_title_b", lang)}</em>
        </h2>
        <div className="gold-rule center reveal reveal-delay-2" />
        <div className="gallery-grid">
          {SIGNATURE_DISHES.map((dish, i) => (
            <motion.div
              key={dish.name.fr}
              className={`gallery-item ${dish.className}`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.1 }}
            >
              <img src={dish.img} alt={dish.name[lang]} loading="lazy" />
              <div className="gallery-overlay">
                <span className="gallery-overlay-tag">{dish.tag[lang]}</span>
                <span className="gallery-overlay-name">{dish.name[lang]}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-visual reveal">
          <div className="about-img-stack">
            <div><img src={dishBriocheSaumon} alt="" /></div>
            <div><img src={dishShakshuka2} alt="" /></div>
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
            <div className="about-rating-label">{t("rating_label", lang)}</div>
          </motion.div>
        </div>
        <div className="about-text">
          <span className="section-label reveal">{t("about_label", lang)}</span>
          <h2 className="section-title reveal reveal-delay-1">{t("about_title_a", lang)}<br /><em>{t("about_title_b", lang)}</em></h2>
          <div className="gold-rule reveal reveal-delay-2" />
          <p className="reveal reveal-delay-2">{t("about_p1", lang)}</p>
          <p className="reveal reveal-delay-2">{t("about_p2", lang)}</p>
          <div className="about-highlights reveal reveal-delay-3">
            <div className="highlight-item"><div className="highlight-num">693+</div><div className="highlight-label">{t("hl_reviews", lang)}</div></div>
            <div className="highlight-item"><div className="highlight-num">4.7</div><div className="highlight-label">{t("hl_rating", lang)}</div></div>
            <div className="highlight-item"><div className="highlight-num">100%</div><div className="highlight-label">{t("hl_fresh", lang)}</div></div>
            <div className="highlight-item"><div className="highlight-num">N°1</div><div className="highlight-label">{t("hl_n1", lang)}</div></div>
          </div>
        </div>
      </section>

      <div className="experience-strip">
        <div className="strip-inner">
          {[
            { i: "☀️", t: t("strip1_t", lang), d: t("strip1_d", lang) },
            { i: "🍽️", t: t("strip2_t", lang), d: t("strip2_d", lang) },
            { i: "🌿", t: t("strip3_t", lang), d: t("strip3_d", lang) },
            { i: "✨", t: t("strip4_t", lang), d: t("strip4_d", lang) },
          ].map((s, idx) => (
            <div key={idx} className={`strip-item reveal ${idx ? `reveal-delay-${idx}` : ""}`}>
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
            <span className="section-label reveal">{t("menu_label", lang)}</span>
            <h2 className="section-title reveal reveal-delay-1">{t("menu_title_a", lang)} <em>{t("menu_title_b", lang)}</em></h2>
            <div className="gold-rule center reveal reveal-delay-2" />
          </div>

          <div className="menu-tabs reveal">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`menu-tab ${activeCat === c.id ? "active" : ""}`}
                onClick={() => setActiveCat(c.id)}
              >
                {CAT_LABELS[c.id][lang]}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat + lang}
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
                    <div className="menu-real-left-wrap">
                      {item.image && <img src={item.image} alt="" className="menu-thumb" loading="lazy" />}
                      <div className="menu-real-left">
                        <div className="menu-real-name">
                          {itemName(item.name)}
                          {item.tag && <span className="menu-tag">{tagText(item.tag)}</span>}
                        </div>
                        {item.desc && <div className="menu-real-desc">{desc(item.desc)}</div>}
                      </div>
                    </div>
                    <div className="menu-real-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }} className="reveal">
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "hsl(19 58% 51% / 0.5)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              {t("supplements", lang)}
            </p>
            <a href="#contact" className="btn-primary">{t("menu_reserve", lang)}</a>
          </div>
        </div>
      </section>

      <section className="info-section" id="info">
        <div className="info-inner">
          <div className="info-block">
            <span className="section-label reveal">{t("hours_label", lang)}</span>
            <h3 className="reveal reveal-delay-1">{t("hours_title_a", lang)}<br />{t("hours_title_b", lang)}</h3>
            <ul className="info-list reveal reveal-delay-2">
              <li><span className="day">{t("monday", lang)}</span><span className="time">{t("closed", lang)}</span></li>
              <li><span className="day">{t("tue_fri", lang)}</span><span className="time">09h – 19h</span></li>
              <li><span className="day">{t("saturday", lang)}</span><span className="time">09h – 19h</span></li>
              <li><span className="day">{t("sunday", lang)}</span><span className="time">09h – 19h</span></li>
            </ul>
          </div>
          <div className="info-block">
            <span className="section-label reveal">{t("address_label", lang)}</span>
            <h3 className="reveal reveal-delay-1">{t("address_title_a", lang)}<br />{t("address_title_b", lang)}</h3>
            <div className="contact-items reveal reveal-delay-2">
              <div>
                <div className="contact-item-label">{t("loc_label", lang)}</div>
                <a
                  href="https://www.google.com/maps/place/Hera+Brunch/@33.9378009,-6.8965967,17z/data=!3m1!4b1!4m6!3m5!1s0xda71326a5cfea17:0x4c955f62fde339cb!8m2!3d33.9378009!4d-6.8965967!16s%2Fg%2F11yf8j2f80"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-item-val map-link"
                  style={{ whiteSpace: "pre-line", display: "inline-block", textDecoration: "none" }}
                >
                  {t("loc_val", lang)}
                  <span className="map-link-cta"> · {lang === "ar" ? "افتح في الخرائط ↗" : "Ouvrir dans Maps ↗"}</span>
                </a>
              </div>
              <div>
                <div className="contact-item-label">{t("delivery_label", lang)}</div>
                <div className="contact-item-val" style={{ whiteSpace: "pre-line" }}>{t("delivery_val", lang)}</div>
              </div>
            </div>
          </div>
          <div className="info-block">
            <span className="section-label reveal">{t("contact_label", lang)}</span>
            <h3 className="reveal reveal-delay-1">{t("contact_title_a", lang)}<br />{t("contact_title_b", lang)}</h3>
            <div className="contact-items reveal reveal-delay-2">
              <div>
                <div className="contact-item-label">{t("phone_label", lang)}</div>
                <div className="contact-item-val">
                  <a href="tel:0667474027" style={{ color: "hsl(var(--gold))", textDecoration: "none", letterSpacing: "0.05em" }}>
                    06 67 47 40 27
                  </a>
                </div>
              </div>
              <div>
                <div className="contact-item-label">{t("insta_label", lang)}</div>
                <div className="contact-item-val">@herabrunch</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reservation-section" id="contact">
        <div className="reservation-inner">
          <span className="section-label reveal" style={{ textAlign: "center", display: "block" }}>{t("contact_label", lang)}</span>
          <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: "center" }}>
            {t("contact_title_main_a", lang)}<br /><em>{t("contact_title_main_b", lang)}</em>
          </h2>
          <div className="gold-rule center reveal reveal-delay-2" />
          <p className="reveal reveal-delay-2">{t("contact_intro", lang)}</p>
          <motion.div
            className="reveal reveal-delay-2"
            style={{ margin: "2.5rem 0 3rem" }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ border: "1px solid hsl(var(--gold-light))", padding: "2.5rem", background: "hsl(var(--warm-white))", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "hsl(var(--gold))", marginBottom: "1rem" }}>{t("phone_label", lang)}</div>
              <a href="tel:0667474027" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 300, color: "hsl(var(--espresso))", textDecoration: "none", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>
                06 67 47 40 27
              </a>
              <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", fontWeight: 300, letterSpacing: "0.1em" }}>{t("hours_short", lang)}</div>
            </div>
          </motion.div>
          <div className="reveal reveal-delay-2" style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:0667474027" className="btn-primary">{t("call_now", lang)}</a>
            <a href="https://www.instagram.com/herabrunch" target="_blank" rel="noreferrer" className="btn-ghost" style={{ color: "hsl(var(--espresso))", borderColor: "hsl(var(--gold))" }}>
              {t("insta_btn", lang)}
            </a>
          </div>
          <p className="reveal" style={{ fontSize: "0.72rem", color: "hsl(var(--text-muted))", marginTop: "2rem", letterSpacing: "0.05em" }}>
            {t("contact_outro", lang)}
          </p>
        </div>
      </section>

      <section className="reviews-section" id="reviews">
        <div className="reviews-header">
          <div>
            <span className="section-label reveal">{t("reviews_label", lang)}</span>
            <h2 className="section-title reveal reveal-delay-1">{t("reviews_title_a", lang)}<br /><em>{t("reviews_title_b", lang)}</em></h2>
            <div className="gold-rule reveal reveal-delay-2" />
          </div>
          <div style={{ textAlign: "right" }} className="reveal">
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", fontWeight: 300, color: "hsl(var(--gold-dark))", lineHeight: 1 }}>4.7</div>
            <div style={{ color: "hsl(var(--gold))", fontSize: "1rem", letterSpacing: "0.1rem" }}>★★★★★</div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "hsl(var(--text-muted))", textTransform: "uppercase", marginTop: "0.3rem" }}>{t("reviews_count", lang)}</div>
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
              <p className="review-text">{r.text[lang]}</p>
              <div className="review-author">
                <div className="review-avatar">{r.initials}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-meta">
                    {r.meta[lang]}
                    {r.badge && <> · <span className="review-badge">{r.badge[lang]}</span></>}
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
              <p className="footer-tagline" style={{ marginTop: "0.5rem" }}>{t("footer_tagline", lang)}</p>
            </div>
            <ul className="footer-links">
              <li><a href="#about">{t("footer_history", lang)}</a></li>
              <li><a href="#menu">{t("nav_menu", lang)}</a></li>
              <li><a href="#reviews">{t("nav_reviews", lang)}</a></li>
              <li><a href="#info">{t("footer_hours", lang)}</a></li>
              <li><a href="#contact">{t("contact_label", lang)}</a></li>
            </ul>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">{t("footer_copy", lang)}</p>
            <div className="google-rating">
              <span>★★★★★</span>
              <strong>4.7</strong>
              <span>· {t("footer_reviews", lang)}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
