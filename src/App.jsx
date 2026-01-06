import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Search, Heart, Wifi, MapPin, Clock, Phone, Instagram, Facebook, ChevronDown, ChevronRight, ChevronUp, X, Coffee, Wine, PartyPopper, Utensils, List } from 'lucide-react';
import './App.css';

// --- ASSETS (VIDEO & IMAGES) ---
const ASSETS = {
  // Cinematic Video για την Αρχική (Public)
  heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-bartender-making-a-cocktail-with-smoke-33777-large.mp4",
  // Generic Εικόνες Κατηγοριών (High Quality Dark Mood)
  coffee: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600",
  brunch: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600",
  food: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600",
  cocktail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600",
  wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600",
  whiskey: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600",
  beer: "https://images.unsplash.com/photo-1623961990059-28437797f62d?auto=format&fit=crop&w=600",
  dessert: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600",
  refresh: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600"
};

// --- DATA: MENU STRUCTURE ---
const MENU_DATA = [
  {
    id: 'coffee', title: "Coffee & Beverages", type: 'list', img: ASSETS.coffee,
    items: [
      { name: "Espresso", price: 2.50 }, { name: "Espresso Double", price: 3.00 },
      { name: "Freddo Espresso", price: 3.50 }, { name: "Cappuccino", price: 3.80 },
      { name: "Freddo Cappuccino", price: 4.00 }, { name: "Freddo Cappuccino Crema", price: 4.20 },
      { name: "Greek Coffee", price: 2.50 }, { name: "Filter Coffee", price: 3.00 },
      { name: "Nescafe Frappe", price: 3.00 }, { name: "Chocolate Hot/Cold", price: 4.00 },
      { name: "Tea (Various Flavors)", price: 3.00 }, { name: "Mochaccino", price: 4.50 }
    ]
  },
  {
    id: 'signatures', title: "Signature Cocktails", type: 'card', img: ASSETS.cocktail,
    items: [
      { name: "Zombie", price: 10.00, desc: "Rum blend, Pineapple, Passion Fruit, Fire" },
      { name: "Mai Tai", price: 10.00, desc: "Rum blend, Almond, Lime" },
      { name: "Paseo Sunset", price: 10.00, desc: "Vodka, Strawberry Puree, Lime" },
      { name: "Stoly Kiss", price: 9.00, desc: "Vodka, Mastic, Cranberry, Pomegranate" },
      { name: "Porn Star Martini", price: 10.00, desc: "Passion Fruit, Vanilla Vodka, Prosecco shot" },
      { name: "Mango Mule", price: 6.00, desc: "Alcohol Free - Pineapple, Lime, Mango, Tonic" }
    ]
  },
  {
    id: 'classics', title: "Classic Cocktails", type: 'list', img: ASSETS.cocktail,
    items: [
      { name: "Aperol Spritz", price: 8.00 }, { name: "Negroni", price: 9.00 },
      { name: "Mojito", price: 9.00 }, { name: "Daiquiri", price: 9.00 },
      { name: "Margarita", price: 9.00 }, { name: "Cosmopolitan", price: 9.00 },
      { name: "Old Fashioned", price: 9.00 }, { name: "Paloma", price: 8.50 }
    ]
  },
  {
    id: 'brunch', title: "Brunch & Pancakes", type: 'card', img: ASSETS.brunch,
    items: [
      { name: "Pancakes Chocolate", price: 7.50, desc: "Hazelnut praline, biscuit" },
      { name: "Pancakes Bueno", price: 7.50, desc: "Bueno cream, crispy waffle" },
      { name: "Pancakes Savory", price: 7.00, desc: "Bacon, cheese, fried egg, hollandaise" },
      { name: "Chicken Pancakes", price: 8.50, desc: "Bacon, cheddar, corn, peppers" },
      { name: "Club Sandwich", price: 8.00, desc: "Classic with fries" },
      { name: "Scrambled Eggs", price: 7.50, desc: "Feta, avocado, cherry tomatoes" }
    ]
  },
  {
    id: 'food', title: "Bar Kitchen", type: 'card', img: ASSETS.food,
    items: [
      { name: "Black Angus Burger", price: 13.00, desc: "Premium beef, cheddar, sauces, fries" },
      { name: "Sweet & Hot Burger", price: 9.50, desc: "Spicy kick, fries" },
      { name: "Pizza Special", price: 14.00, desc: "Family size" },
      { name: "Chicken Nuggets", price: 7.00, desc: "9 pcs" },
      { name: "Bao Buns Chicken", price: 9.50, desc: "3 pcs, sweet chili" },
      { name: "Risotto", price: 9.00, desc: "Creamy risotto" },
      { name: "Fillet Bourbon", price: 25.00, desc: "Premium meat with Bourbon sauce" },
      { name: "Cheese Platter", price: 8.00, desc: "Variety of cheeses (2 persons)" }
    ]
  },
  {
    id: 'spirits', title: "Spirits & Cellar", type: 'group', img: ASSETS.whiskey,
    groups: [
      {
        name: "Standard Whiskey (7€ Bottle: 70€)",
        items: ["Famous Grouse", "Johnnie Red", "Haig", "Dewars", "Cutty Sark", "Jameson", "Bushmills"]
      },
      {
        name: "Premium Whiskey",
        items: ["Johnnie Black 12 (8€)", "Chivas Regal 12 (8€)", "Jack Daniels (8€)", "Dimple (9€)", "Cardhu (9€)", "Glenfiddich 12 (10€)", "Lagavulin 16 (20€)", "Macallan 12 (20€)"]
      },
      {
        name: "Vodka",
        items: ["Standard (Serkova, Stolichnaya...) (7€)", "Ketel One (9€)", "Ciroc (10€)", "Belvedere (13€)", "Grey Goose (15€)", "Beluga (15€)"]
      },
      {
        name: "Gin",
        items: ["Standard (Gordons, Beefeater) (7€)", "Tanqueray / Bombay (8€)", "Hendricks (13€)", "Monkey 47 (15€)"]
      },
      {
        name: "Tequila",
        items: ["Jose Cuervo (7€)", "Don Julio Blanco (10€)", "Don Julio Anejo (13€)"]
      },
      {
        name: "Rum",
        items: ["Bacardi / Havana (7€)", "Diplomatico (12€)", "Zacapa (13€)"]
      }
    ]
  },
  {
    id: 'wine', title: "Wine List", type: 'group', img: ASSETS.wine,
    groups: [
      { name: "White Wines", items: ["Epops (6€ / 22€)", "Malagouzia Simeonidi (6.5€ / 23€)", "Biblia Chora (28€)", "Magic Mountain (35€)"] },
      { name: "Red Wines", items: ["Epops (6.3€ / 24€)", "Biblia Chora (29€)", "Magic Mountain (43€)"] },
      { name: "Sparkling & Dessert", items: ["Prosecco Cinzano (5.5€)", "Moscato D'Asti (6€)", "Moet & Chandon (120€)", "Sangria (5.5€)"] }
    ]
  },
  {
    id: 'beer', title: "Beers", type: 'list', img: ASSETS.beer,
    items: [
      { name: "Mythos Draft 400ml", price: 4.50 }, { name: "Kaiser Draft 400ml", price: 5.00 },
      { name: "Fix / Fix Dark", price: 4.00 }, { name: "Corona / Stella", price: 5.00 },
      { name: "McFarland", price: 5.50 }, { name: "Guinness", price: 6.00 }
    ]
  },
  {
    id: 'dessert', title: "Desserts & Refresh", type: 'list', img: ASSETS.dessert,
    items: [
      { name: "Chocolate Sphere", price: 9.00 }, { name: "Cheesecake", price: 5.00 },
      { name: "Souffle", price: 5.50 }, { name: "Ice Cream Scoop", price: 2.00 },
      { name: "Smoothies", price: 6.00 }, { name: "Fresh Juice", price: 4.00 },
      { name: "Soft Drinks", price: 3.00 }
    ]
  }
];

// =========================================
// COMPONENT 1: PUBLIC WEBSITE (NO PRICES)
// =========================================
function PublicSite() {
  const videoRef = useRef(null);
  
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
          <div className="info-box">
             <Clock size={20} color="#C5A065"/>
             <p>Daily<br/>08:00 - 03:00</p>
          </div>
          <div className="info-box">
             <MapPin size={20} color="#C5A065"/>
             <p>Kavala<br/>Ethnikis Antistaseos 12</p>
          </div>
        </div>

        <div className="action-buttons">
           <a href="tel:+302510834378" className="btn-gold">ΚΡΑΤΗΣΗ ΤΡΑΠΕΖΙΟΥ</a>
           <a href="https://instagram.com" target="_blank" className="btn-outline">INSTAGRAM</a>
        </div>
      </div>
      
      <div className="footer-note">
         <p>Scan the QR code at your table to view the menu.</p>
      </div>
    </div>
  );
}

// =========================================
// COMPONENT 2: QR MENU (THE SECRET APP)
// =========================================
function SecretMenu() {
  const [mood, setMood] = useState(null); // 'day' or 'night'
  const [category, setCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showMyList, setShowMyList] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);

  // Toggle Favorite logic
  const toggleFav = (item) => {
    setFavorites(prev => {
      const exists = prev.find(i => i.name === item.name);
      if (exists) return prev.filter(i => i.name !== item.name);
      return [...prev, item];
    });
  };

  // 1. MOOD SELECTOR SCREEN
  if (!mood) {
    return (
      <div className="menu-root mood-bg">
         <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="logo-small" />
         <h1 className="mood-title">Choose your Vibe</h1>
         
         <div className="mood-cards">
            <div className="mood-card" onClick={() => setMood('day')}>
               <Coffee size={32} color="#C5A065"/>
               <h3>Day & Brunch</h3>
               <p>Coffee, Pancakes, Snacks</p>
            </div>
            <div className="mood-card" onClick={() => setMood('night')}>
               <PartyPopper size={32} color="#C5A065"/>
               <h3>Night & Drinks</h3>
               <p>Cocktails, Spirits, Food</p>
            </div>
            <div className="mood-card full" onClick={() => setMood('all')}>
               <List size={32} color="#C5A065"/>
               <h3>Full Menu</h3>
            </div>
         </div>
      </div>
    );
  }

  // 2. MY LIST SCREEN (WAITER VIEW)
  if (showMyList) {
     const total = favorites.reduce((sum, item) => sum + (item.price || 0), 0);
     return (
        <div className="menu-root list-view">
           <div className="sticky-header">
              <button onClick={() => setShowMyList(false)} className="icon-btn"><X/></button>
              <h2>My Selection</h2>
              <div style={{width: 40}}></div>
           </div>
           <div className="list-content">
              {favorites.length === 0 ? (
                 <div className="empty-state">Your list is empty.<br/>Tap the heart icon to add items.</div>
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
                       <span>Total Estimate:</span>
                       <span>€{total.toFixed(2)}</span>
                    </div>
                    <div className="waiter-note">
                       Show this screen to your waiter to order.
                    </div>
                 </div>
              )}
           </div>
        </div>
     )
  }

  // 3. CATEGORY LIST SCREEN
  if (!category) {
     const visibleCats = MENU_DATA.filter(cat => {
        if(mood === 'all') return true;
        if(mood === 'day') return ['coffee', 'brunch', 'dessert', 'refresh', 'food'].includes(cat.id);
        if(mood === 'night') return ['signatures', 'classics', 'spirits', 'wine', 'beer', 'food', 'dessert'].includes(cat.id);
     });

     return (
        <div className="menu-root">
           <div className="sticky-header">
              <button onClick={() => setMood(null)} className="icon-btn"><ChevronDown/></button>
              <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="header-logo" />
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
     );
  }

  // 4. ITEMS SCREEN (HYBRID LAYOUT)
  return (
     <div className="menu-root">
        {/* Category Header */}
        <div className="cat-header-hero" style={{backgroundImage: `url(${category.img})`}}>
           <div className="overlay-grad">
              <button onClick={() => setCategory(null)} className="back-bubble"><ChevronRight style={{transform:'rotate(180deg)'}}/></button>
              <h1>{category.title}</h1>
           </div>
        </div>

        <div className="items-scroll">
           
           {/* TYPE: CARDS (Cocktails/Food) */}
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

           {/* TYPE: LIST (Coffee/Beer) */}
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

           {/* TYPE: GROUP (Spirits/Wines) */}
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

        {/* Floating Button for My List */}
        {favorites.length > 0 && (
           <div className="floating-bar" onClick={() => setShowMyList(true)}>
              <span>View Selection ({favorites.length})</span>
              <ChevronUp/>
           </div>
        )}
     </div>
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