import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
// Χρησιμοποιούμε μόνο βασικά εικονίδια για ασφάλεια
import { Search, Heart, Wifi, Home, X, ChevronRight, ChevronDown, ChevronUp, Coffee, Wine, Martini, List, Clock, MapPin, Instagram } from 'lucide-react';
import './App.css';

// --- ΕΙΚΟΝΕΣ (Assets) ---
const ASSETS = {
  heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-bartender-making-a-cocktail-with-smoke-33777-large.mp4",
  cat_coffee: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600",
  cat_brunch: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600",
  cat_food: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600",
  cat_cocktail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600",
  cat_wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600",
  cat_whiskey: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600",
  cat_beer: "https://images.unsplash.com/photo-1623961990059-28437797f62d?auto=format&fit=crop&w=600",
  cat_dessert: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600",
};

// --- ΔΕΔΟΜΕΝΑ ΜΕΝΟΥ ---
const MENU_DATA = [
  {
    id: 'coffee', title: "Coffee & Beverages", type: 'list', img: ASSETS.cat_coffee,
    items: [
      { name: "Espresso", price: 2.50 }, { name: "Espresso Double", price: 3.00 },
      { name: "Freddo Espresso", price: 3.50 }, { name: "Cappuccino", price: 3.80 },
      { name: "Freddo Cappuccino", price: 4.00 }, { name: "Greek Coffee", price: 2.50 },
      { name: "Nescafe Frappe", price: 3.00 }, { name: "Chocolate", price: 4.00 },
      { name: "Tea (Various)", price: 3.00 }, { name: "Mochaccino", price: 4.50 }
    ]
  },
  {
    id: 'signatures', title: "Signature Cocktails", type: 'card', img: ASSETS.cat_cocktail,
    items: [
      { name: "Zombie", price: 10.00, desc: "Rum blend, Pineapple, Passion Fruit, Fire" },
      { name: "Mai Tai", price: 10.00, desc: "Rum blend, Almond, Lime" },
      { name: "Paseo Sunset", price: 10.00, desc: "Vodka, Strawberry Puree, Lime" },
      { name: "Stoly Kiss", price: 9.00, desc: "Vodka, Mastic, Cranberry" },
      { name: "Porn Star Martini", price: 10.00, desc: "Passion Fruit, Vanilla Vodka" },
      { name: "Mango Mule", price: 6.00, desc: "Alcohol Free - Pineapple, Lime, Mango" }
    ]
  },
  {
    id: 'classics', title: "Classic Cocktails", type: 'list', img: ASSETS.cat_cocktail,
    items: [
      { name: "Aperol Spritz", price: 8.00 }, { name: "Negroni", price: 9.00 },
      { name: "Mojito", price: 9.00 }, { name: "Daiquiri", price: 9.00 },
      { name: "Margarita", price: 9.00 }, { name: "Old Fashioned", price: 9.00 },
      { name: "Paloma", price: 8.50 }, { name: "Apple Martini", price: 9.00 }
    ]
  },
  {
    id: 'brunch', title: "Brunch & Snacks", type: 'card', img: ASSETS.cat_brunch,
    items: [
      { name: "Pancakes Chocolate", price: 7.50, desc: "Hazelnut praline, biscuit" },
      { name: "Pancakes Bueno", price: 7.50, desc: "Bueno cream, crispy waffle" },
      { name: "Pancakes Savory", price: 7.00, desc: "Bacon, cheese, fried egg" },
      { name: "Chicken Pancakes", price: 8.50, desc: "Bacon, cheddar, corn" },
      { name: "Club Sandwich", price: 8.00, desc: "Classic with fries" },
      { name: "Scrambled Eggs", price: 7.50, desc: "Feta, avocado, bread" }
    ]
  },
  {
    id: 'food', title: "Bar Kitchen", type: 'card', img: ASSETS.cat_food,
    items: [
      { name: "Black Angus Burger", price: 13.00, desc: "Premium beef, cheddar, fries" },
      { name: "Pizza Special", price: 14.00, desc: "Family size" },
      { name: "Chicken Nuggets", price: 7.00, desc: "9 pcs" },
      { name: "Bao Buns Chicken", price: 9.50, desc: "3 pcs, sweet chili" },
      { name: "Risotto", price: 9.00, desc: "Creamy risotto" },
      { name: "Fillet Bourbon", price: 25.00, desc: "Premium meat, Bourbon sauce" },
      { name: "Cheese Platter", price: 8.00, desc: "Variety of cheeses" }
    ]
  },
  {
    id: 'spirits', title: "Spirits & Cellar", type: 'group', img: ASSETS.cat_whiskey,
    groups: [
      { name: "Standard Whiskey (7€)", items: ["Famous Grouse", "Johnnie Red", "Haig", "Jameson", "Bushmills"] },
      { name: "Premium Whiskey", items: ["Johnnie Black 12 (8€)", "Chivas 12 (8€)", "Jack Daniels (8€)", "Cardhu (9€)", "Glenfiddich 12 (10€)", "Macallan 12 (20€)"] },
      { name: "Vodka", items: ["Standard (7€)", "Belvedere (13€)", "Grey Goose (15€)", "Ciroc (10€)"] },
      { name: "Gin", items: ["Standard (7€)", "Tanqueray (8€)", "Hendricks (13€)", "Monkey 47 (15€)"] },
      { name: "Tequila", items: ["Jose Cuervo (7€)", "Don Julio Blanco (10€)", "Don Julio Anejo (13€)"] },
      { name: "Rum", items: ["Bacardi (7€)", "Havana (7€)", "Diplomatico (12€)", "Zacapa (13€)"] }
    ]
  },
  {
    id: 'wine', title: "Wine List", type: 'group', img: ASSETS.cat_wine,
    groups: [
      { name: "White Wines", items: ["Epops (6€ / 22€)", "Malagouzia (6.5€ / 23€)", "Biblia Chora (28€)"] },
      { name: "Red Wines", items: ["Epops (6.3€ / 24€)", "Biblia Chora (29€)", "Magic Mountain (43€)"] },
      { name: "Sparkling", items: ["Prosecco (5.5€)", "Moscato D'Asti (6€)", "Moet (120€)"] }
    ]
  },
  {
    id: 'beer', title: "Beers", type: 'list', img: ASSETS.cat_beer,
    items: [
      { name: "Mythos Draft 400ml", price: 4.50 }, { name: "Kaiser Draft 400ml", price: 5.00 },
      { name: "Corona / Stella", price: 5.00 }, { name: "McFarland", price: 5.50 },
      { name: "Guinness", price: 6.00 }, { name: "Cider", price: 5.50 }
    ]
  },
  {
    id: 'dessert', title: "Desserts", type: 'list', img: ASSETS.cat_dessert,
    items: [
      { name: "Chocolate Sphere", price: 9.00 }, { name: "Cheesecake", price: 5.00 },
      { name: "Souffle", price: 5.50 }, { name: "Ice Cream Scoop", price: 2.00 }
    ]
  }
];

// --- 1. PUBLIC SITE (ΒΙΤΡΙΝΑ) ---
function PublicSite() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="public-root">
      {/* Video Background */}
      <div className="video-bg">
        <video ref={videoRef} autoPlay muted loop playsInline>
          <source src={ASSETS.heroVideo} type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>

      <div className="public-content fade-in">
        <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="logo-main" alt="Paseo" />
        <h2 className="tagline">PREMIUM LOUNGE EXPERIENCE</h2>
        
        <div className="info-grid">
          {/* ΚΟΥΜΠΙ ΩΡΑΣ -> ΠΑΕΙ ΣΤΟ ΜΕΝΟΥ */}
          <div className="info-box secret-trigger" onClick={() => navigate('/qr-menu')}>
             <Clock size={24} color="#C5A065"/>
             <p>Daily<br/>08:00 - 03:00</p>
          </div>
          <div className="info-box">
             <MapPin size={24} color="#C5A065"/>
             <p>Kavala<br/>Ethnikis Antistaseos 12</p>
          </div>
        </div>

        <div className="action-buttons">
           <a href="tel:+302510834378" className="btn-gold">ΚΡΑΤΗΣΗ ΤΡΑΠΕΖΙΟΥ</a>
           <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn-outline">INSTAGRAM</a>
        </div>
      </div>
      
      <div className="footer-note">
         <p>Scan the QR code at your table to view the menu.</p>
      </div>
    </div>
  );
}

// --- 2. QR MENU (ΕΦΑΡΜΟΓΗ) ---
function SecretMenu() {
  const [mood, setMood] = useState(null);
  const [category, setCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showMyList, setShowMyList] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);

  const toggleFav = (item) => {
    setFavorites(prev => {
      const exists = prev.find(i => i.name === item.name);
      if (exists) return prev.filter(i => i.name !== item.name);
      return [...prev, item];
    });
  };

  // WRAPPER ΓΙΑ ΝΑ ΚΕΝΤΡΑΡΕΙ ΣΤΟ PC
  const MobileWrapper = ({ children }) => (
    <div className="mobile-wrapper">
      <div className="menu-phone-frame">
        {children}
      </div>
    </div>
  );

  // 1. MOOD SCREEN
  if (!mood) {
    return (
      <MobileWrapper>
        <div className="menu-content mood-bg">
           <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="logo-small" alt="logo" />
           <h1 className="mood-title">Choose your Vibe</h1>
           
           <div className="mood-cards">
              <div className="mood-card" onClick={() => setMood('day')}>
                 <Coffee size={30} color="#C5A065"/>
                 <h3>Day & Brunch</h3>
              </div>
              <div className="mood-card" onClick={() => setMood('night')}>
                 <Martini size={30} color="#C5A065"/>
                 <h3>Night & Drinks</h3>
              </div>
              <div className="mood-card full" onClick={() => setMood('all')}>
                 <List size={30} color="#C5A065"/>
                 <h3>Full Menu</h3>
              </div>
           </div>
        </div>
      </MobileWrapper>
    );
  }

  // 2. MY LIST SCREEN
  if (showMyList) {
     const total = favorites.reduce((sum, item) => sum + (item.price || 0), 0);
     return (
      <MobileWrapper>
        <div className="menu-content list-view">
           <div className="sticky-header">
              <button onClick={() => setShowMyList(false)} className="icon-btn"><X/></button>
              <h2>My Selection</h2>
              <div style={{width: 24}}></div>
           </div>
           <div className="list-scroll">
              {favorites.length === 0 ? (
                 <div className="empty-state">List is empty.<br/>Add items with the heart icon.</div>
              ) : (
                 <div className="order-list">
                    {favorites.map((item, idx) => (
                       <div key={idx} className="order-item">
                          <div className="order-info">
                             <h4>{item.name}</h4>
                             <span>€{item.price?.toFixed(2)}</span>
                          </div>
                          <button onClick={() => toggleFav(item)} className="remove-btn"><X size={14}/></button>
                       </div>
                    ))}
                    <div className="total-row">
                       <span>Total:</span>
                       <span>€{total.toFixed(2)}</span>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </MobileWrapper>
     )
  }

  // 3. CATEGORY LIST
  if (!category) {
     const visibleCats = MENU_DATA.filter(cat => {
        if(mood === 'all') return true;
        if(mood === 'day') return ['coffee', 'brunch', 'dessert', 'food'].includes(cat.id);
        if(mood === 'night') return ['signatures', 'classics', 'spirits', 'wine', 'beer', 'food', 'dessert'].includes(cat.id);
        return true;
     });

     return (
      <MobileWrapper>
        <div className="menu-content">
           <div className="sticky-header">
              <button onClick={() => setMood(null)} className="icon-btn"><ChevronDown/></button>
              <span className="header-title">MENU</span>
              <button onClick={() => setShowMyList(true)} className="icon-btn relative">
                 <Heart fill={favorites.length > 0 ? "#C5A065" : "none"} color="#C5A065"/>
                 {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
              </button>
           </div>
           
           <div className="cat-grid">
              {visibleCats.map(cat => (
                 <div key={cat.id} className="cat-card" onClick={() => setCategory(cat)} 
                      style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${cat.img})`}}>
                    <h3>{cat.title}</h3>
                 </div>
              ))}
           </div>
           <div className="wifi-bar"><Wifi size={14}/> WiFi: <strong>paseo2024</strong></div>
        </div>
      </MobileWrapper>
     );
  }

  // 4. ITEMS SCREEN
  return (
   <MobileWrapper>
     <div className="menu-content">
        <div className="cat-header-hero" style={{backgroundImage: `url(${category.img})`}}>
           <div className="overlay-grad">
              <button onClick={() => setCategory(null)} className="back-bubble"><ChevronRight style={{transform:'rotate(180deg)'}}/></button>
              <h1>{category.title}</h1>
           </div>
        </div>

        <div className="items-scroll">
           {category.type === 'card' && (
              <div className="cards-stack">
                 {category.items.map((item, i) => (
                    <div key={i} className="menu-card">
                       <div className="card-details">
                          <h4>{item.name}</h4>
                          <p>{item.desc}</p>
                          <span className="price">€{item.price.toFixed(2)}</span>
                       </div>
                       <button className="fav-btn" onClick={() => toggleFav(item)}>
                          <Heart size={20} fill={favorites.find(f=>f.name===item.name) ? "#C5A065" : "none"} color="#C5A065"/>
                       </button>
                    </div>
                 ))}
              </div>
           )}

           {category.type === 'list' && (
              <div className="list-stack">
                 {category.items.map((item, i) => (
                    <div key={i} className="menu-list-item">
                       <div className="list-text">
                          <h4>{item.name}</h4>
                          {item.desc && <p>{item.desc}</p>}
                       </div>
                       <div className="list-right">
                          <span className="price">€{item.price.toFixed(2)}</span>
                          <button className="fav-mini" onClick={() => toggleFav(item)}>
                             <Heart size={16} fill={favorites.find(f=>f.name===item.name) ? "#C5A065" : "none"} color="#C5A065"/>
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           )}

           {category.type === 'group' && (
              <div className="group-stack">
                 {category.groups.map((grp, i) => (
                    <div key={i} className="accordion">
                       <div className="accordion-header" onClick={() => setExpandedGroup(expandedGroup === grp.name ? null : grp.name)}>
                          <span>{grp.name}</span>
                          {expandedGroup === grp.name ? <ChevronUp/> : <ChevronDown/>}
                       </div>
                       {expandedGroup === grp.name && (
                          <div className="accordion-body">
                             {grp.items.map((str, idx) => (
                                <div key={idx} className="simple-row">{str}</div>
                             ))}
                          </div>
                       )}
                    </div>
                 ))}
              </div>
           )}
        </div>

        {favorites.length > 0 && (
           <div className="floating-bar" onClick={() => setShowMyList(true)}>
              <span>Selection ({favorites.length})</span>
              <ChevronUp size={16}/>
           </div>
        )}
     </div>
   </MobileWrapper>
  );
}

// --- ROUTER ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/qr-menu" element={<SecretMenu />} />
      </Routes>
    </Router>
  );
}

export default App;