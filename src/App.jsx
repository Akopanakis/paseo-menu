import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Heart, X, ChevronDown, ChevronUp, Clock, Star, Map, Instagram, MessageCircle, Globe, ChevronRight, Flame, Leaf, Sparkles, Dices, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// --- ASSETS (STABLE IMAGES) ---
const ASSETS = {
  heroImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1080&q=80",
  
  // Grid Images (Main Menu Categories)
  grid_coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
  grid_food: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80", 
  grid_cocktails: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
  grid_wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
  
  // Detailed Category Headers
  cat_coffee_hot: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=800&q=80", // Hot Coffee
  cat_coffee_cold: "https://images.unsplash.com/photo-1517701604599-bb29b5c73311?auto=format&fit=crop&w=800&q=80", // Cold Coffee
  cat_choc_tea: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80", // Tea/Choc
  cat_juice_smoothie: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80", // Smoothies
  cat_refreshments: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80", // Cola/Soda
  cat_brunch: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80", // Pancakes
  cat_starters: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80", // Appetizers
  cat_food: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", // Pizza/Burgers
  cat_main: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", // Steak/Main
  cat_signatures: "https://images.unsplash.com/photo-1536935338788-843bb6319105?auto=format&fit=crop&w=800&q=80",
  cat_classics: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
  cat_spirits: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=80",
  cat_wine: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
  cat_beer: "https://images.unsplash.com/photo-1623961990059-28437797f62d?auto=format&fit=crop&w=800&q=80",
  cat_dessert: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
};

// --- TRANSLATIONS ---
const UI = {
  el: {
    menu: "ΜΕΝΟΥ", myList: "Η Λίστα μου", empty: "Η λίστα είναι άδεια.", total: "Σύνολο",
    waiter: "Δείξτε αυτή την οθόνη στον σερβιτόρο.", book: "ΚΡΑΤΗΣΗ", open: "ΑΝΟΙΧΤΑ", closed: "ΚΛΕΙΣΤΑ",
    review: "Αξιολογήστε μας", choose: "Επιλέξτε", glass: "Ποτήρι", bottle: "Φιάλη",
    vibe: "Επιλέξτε Κατηγορία", full: "Πλήρες Μενού",
    t_coffee: "Καφές, Brunch & Ροφήματα", t_food: "Φαγητό, Snacks & Γλυκά", t_drinks: "Cocktails, Ποτά & Μπύρες", t_wine: "Λίστα Κρασιών",
    sommelier_title: "Δεν ξέρεις τι να διαλέξεις;", sommelier_desc: "Ο ψηφιακός Sommelier θα βρει το ποτό σου σε 3 βήματα!", sommelier_btn: "Βρες το ποτό μου",
    lucky_btn: "Νιώθω Τυχερός", lucky_title: "Η τύχη επιλέγει...", lucky_res: "Η πρότασή μας:",
    disclaimer: "Εάν έχετε αλλεργίες, παρακαλούμε ενημερώστε μας."
  },
  en: {
    menu: "MENU", myList: "My Selection", empty: "Your list is empty.", total: "Total",
    waiter: "Show this screen to your waiter.", book: "BOOK A TABLE", open: "OPEN NOW", closed: "CLOSED",
    review: "Rate us on Google", choose: "Select Option", glass: "Glass", bottle: "Bottle",
    vibe: "Select Category", full: "Full Menu",
    t_coffee: "Coffee, Brunch & Beverages", t_food: "Food, Snacks & Sweets", t_drinks: "Cocktails, Spirits & Beers", t_wine: "Wine List",
    sommelier_title: "Can't decide?", sommelier_desc: "Let our digital Sommelier find your drink in 3 steps!", sommelier_btn: "Find my drink",
    lucky_btn: "I'm Feeling Lucky", lucky_title: "Fate is choosing...", lucky_res: "We recommend:",
    disclaimer: "If you have any food allergies please inform us."
  }
};

// --- SOMMELIER LOGIC DB ---
const SOMMELIER_DB = {
    cocktails: [
        { name: "Daiquiri Strawberry", ingredients: {el:"Λευκό Ρούμι, Λάιμ, Πουρές Φράουλα", en:"White Rum, Lime, Strawberry Puree"}, type: "sweet", bases: ["rum"] },
        { name: "Pina Colada", ingredients: {el:"Λευκό Ρούμι, Ανανάς, Λικέρ Καρύδας", en:"White Rum, Pineapple, Coconut Liqueur"}, type: "sweet", bases: ["rum"] },
        { name: "Stoly Kiss", ingredients: {el:"Βότκα, Μαστίχα, Κράνμπερι, Ρόδι", en:"Vodka, Mastic, Cranberry, Pomegranate"}, type: "sweet", bases: ["vodka"] },
        { name: "Apple Martini", ingredients: {el:"Βότκα, Λάιμ, Πράσινο Μήλο, Λικέρ Μήλου", en:"Vodka, Lime, Green Apple"}, type: "sweet", bases: ["vodka"] },
        { name: "Aperol Spritz", ingredients: {el:"Aperol, Prosecco, Soda", en:"Aperol, Prosecco, Soda"}, type: "sour", bases: ["other"] },
        { name: "Mojito", ingredients: {el:"Λευκό Ρούμι, Λάιμ, Σόδα, Μαύρη Ζάχαρη", en:"White Rum, Lime, Soda, Brown Sugar"}, type: "sour", bases: ["rum"] },
        { name: "Daiquiri", ingredients: {el:"Λευκό Ρούμι, Λάιμ, Σιρόπι", en:"White Rum, Lime, Syrup"}, type: "sour", bases: ["rum"] },
        { name: "Margarita", ingredients: {el:"Tequila, Triple Sec, Λεμόνι", en:"Tequila, Triple Sec, Lemon"}, type: "sour", bases: ["tequila"] },
        { name: "Paloma", ingredients: {el:"Tequila, Λάιμ, Pink Grapefruit Soda", en:"Tequila, Lime, Pink Grapefruit Soda"}, type: "sour", bases: ["tequila"] },
        { name: "Cosmopolitan", ingredients: {el:"Βότκα, Triple Sec, Κράνμπερι, Λάιμ", en:"Vodka, Triple Sec, Cranberry, Lime"}, type: "sour", bases: ["vodka"] },
        { name: "Caipirinha", ingredients: {el:"Cachaca, Λάιμ, Μαύρη Ζάχαρη", en:"Cachaca, Lime, Brown Sugar"}, type: "sour", bases: ["rum", "other"] },
        { name: "Caipiroska", ingredients: {el:"Βότκα, Λάιμ, Μαύρη Ζάχαρη", en:"Vodka, Lime, Brown Sugar"}, type: "sour", bases: ["vodka"] },
        { name: "Gin Cucumber", ingredients: {el:"Gin, Σιρόπι Αγγούρι, Λάιμ, Σόδα", en:"Gin, Cucumber, Lime, Soda"}, type: "sour", bases: ["gin"] },
        { name: "Negroni", ingredients: {el:"Campari, Gin, Cinzano Rosso", en:"Campari, Gin, Cinzano Rosso"}, type: "bitter", bases: ["gin"] },
        { name: "Old Fashioned", ingredients: {el:"Whiskey, Angostura, Ζάχαρη", en:"Whiskey, Angostura, Sugar"}, type: "bitter", bases: ["whiskey"] },
        { name: "Dry Martini", ingredients: {el:"Gin, Dry Vermouth", en:"Gin, Dry Vermouth"}, type: "bitter", bases: ["gin"] },
        { name: "Mai Tai", ingredients: {el:"Λευκό & Μαύρο Ρούμι, Αμύγδαλο, Λάιμ", en:"White & Dark Rum, Almond, Lime"}, type: "strong", bases: ["rum"] },
        { name: "Zombie", ingredients: {el:"Blend Ρούμι, Μπράντυ, Ανανάς, Πορτοκάλι", en:"Rum blend, Brandy, Pineapple, Orange"}, type: "strong", bases: ["rum"] },
        { name: "Long Island", ingredients: {el:"Ρούμι, Gin, Βότκα, Tequila, Cola", en:"Rum, Gin, Vodka, Tequila, Cola"}, type: "strong", bases: ["rum", "vodka", "gin", "tequila"] },
        { name: "Cuba Libre", ingredients: {el:"Λευκό Ρούμι, Cola, Λάιμ", en:"White Rum, Cola, Lime"}, type: "strong", bases: ["rum"] },
        { name: "Bloody Mary", ingredients: {el:"Βότκα, Ντομάτα, Tabasco, Worcestershire", en:"Vodka, Tomato, Tabasco, Worcestershire"}, type: "strong", bases: ["vodka"] }
    ],
    mocktails: [
        { name: "Mango Mule", ingredients: {el:"Ανανάς, Λάιμ, Μάνγκο, Τόνικ", en:"Pineapple, Lime, Mango, Tonic"} },
        { name: "Red Paseo", ingredients: {el:"Κράνμπερι, Ρόδι, Λεμόνι", en:"Cranberry, Pomegranate, Lemon"} },
        { name: "Lady Lavender", ingredients: {el:"Λεβάντα, Γκρέιπφρουτ, Σόδα", en:"Lavender, Grapefruit, Soda"} },
        { name: "Green Gentleman", ingredients: {el:"Ακτινίδιο, Πορτοκάλι, Ροδάκινο", en:"Kiwi, Orange, Peach"} }
    ]
};

// --- COMPLETE MENU DATA ---
const MENU_DATA = [
  // --- COFFEE & BEVERAGES SECTION ---
  {
    id: 'coffee_hot', title: {el: "Καφέδες Ζεστοί", en: "Hot Coffee"}, type: 'list', img: ASSETS.cat_coffee_hot,
    items: [
      { name: "Espresso", price: 2.50 },
      { name: {el: "Espresso Διπλός", en: "Espresso Double"}, price: 3.00 },
      { name: "Espresso Americano", price: 3.00 },
      { name: {el: "Espresso Americano Διπλός", en: "Espresso Americano Double"}, price: 3.50 },
      { name: "Espresso Macchiato", price: 3.00 },
      { name: {el: "Espresso Macchiato Διπλός", en: "Espresso Macchiato Double"}, price: 3.50 },
      { name: "Espresso Con Panna", price: 3.50 },
      { name: {el: "Espresso Con Panna Διπλός", en: "Espresso Con Panna Double"}, price: 4.00 },
      { name: "Cappuccino", price: 3.80 },
      { name: {el: "Cappuccino Διπλός", en: "Cappuccino Double"}, price: 4.30 },
      { name: "Cappuccino Latte", price: 4.00 },
      { name: "Nescafe", price: 3.00 },
      { name: {el: "Ελληνικός", en: "Greek Coffee"}, price: 2.50 },
      { name: {el: "Ελληνικός Διπλός", en: "Greek Coffee Double"}, price: 3.00 },
      { name: {el: "Φίλτρου", en: "Filter Coffee"}, price: 3.00 },
      { name: {el: "Φίλτρου με γεύσεις", en: "Flavored Filter Coffee"}, price: 3.50, desc: {el: "Φουντούκι, Καραμέλα, Βανίλια", en: "Hazelnut, Caramel, Vanilla"} },
      { name: "Irish Coffee", price: 6.00 },
      { name: "Baileys Blink", price: 6.00, desc: "Espresso, Baileys" },
      { name: "Espresso Corretto (Grappa)", price: 4.50 },
      { name: "Espresso Corretto Double", price: 5.00 },
      { name: "Mochaccino Hot", price: 4.50, desc: {el: "Σοκολάτα, Espresso, Γάλα, Σαντιγί", en: "Chocolate, Espresso, Milk, Whipped Cream"} }
    ]
  },
  {
    id: 'coffee_cold', title: {el: "Καφέδες Κρύοι", en: "Cold Coffee"}, type: 'list', img: ASSETS.cat_coffee_cold,
    items: [
      { name: "Freddo Espresso", price: 3.50 },
      { name: "Freddo Cappuccino", price: 4.00 },
      { name: "Freddo Cappuccino Crema", price: 4.20 },
      { name: "Extra Dose Espresso", price: 0.50 },
      { name: "Nescafe Frappe", price: 3.00 },
      { name: "Nescafe Ice Cream Frappe", price: 4.50 },
      { name: "Nescafe Frappe Baileys", price: 5.00 },
      { name: "Espresso Affogato", price: 5.00, desc: {el: "Διπλός με παγωτό βανίλια", en: "Double with Vanilla Ice Cream"} },
      { name: "Mochaccino Cold", price: 4.50, desc: {el: "Σοκολάτα, Espresso, Γάλα, Σαντιγί, Μπισκότο", en: "Chocolate, Espresso, Milk, Whipped Cream, Biscuits"} }
    ]
  },
  {
    id: 'choc_tea', title: {el: "Σοκολάτες & Τσάι", en: "Chocolate & Tea"}, type: 'list', img: ASSETS.cat_choc_tea,
    items: [
      { name: {el: "Σοκολάτα Κλασική", en: "Classic Chocolate"}, price: 4.00 },
      { name: {el: "Σοκολάτα Πραλίνα Φουντούκι", en: "Hazelnut Chocolate"}, price: 4.20 },
      { name: {el: "Σοκολάτα Φράουλα", en: "Strawberry Chocolate"}, price: 4.20 },
      { name: {el: "Σοκολάτα Μπανάνα", en: "Banana Chocolate"}, price: 4.20 },
      { name: {el: "Σοκολάτα Καρύδα", en: "Coconut Chocolate"}, price: 4.20 },
      { name: {el: "Σοκολάτα Λευκή", en: "White Chocolate"}, price: 4.20 },
      { name: {el: "Κακάο", en: "Cocoa"}, price: 3.00 },
      { name: {el: "Τσάι Ζεστό", en: "Hot Tea"}, price: 3.00, desc: {el: "Πράσινο, Μαύρο, Βουνού, Χαμομήλι, Μέντα, Κανέλα, Τριαντάφυλλο, Φλαμούρι, Μήλο-Κανέλα, Φρούτα Δάσους", en: "Green, Black, Mountain, Chamomile, Mint, Cinnamon, Rose, Lime blossom, Apple-Cinnamon, Forest Fruits"} },
      { name: {el: "Τσάι Κρύο", en: "Cold Tea"}, price: 3.00, desc: {el: "Λεμόνι, Ροδάκινο, Πράσινο, Πεπόνι, Φρούτα Δάσους", en: "Lemon, Peach, Green, Melon, Forest Fruits"} }
    ]
  },
  {
    id: 'juice_smoothie', title: {el: "Χυμοί, Smoothies & Αναψυκτικά", en: "Juices, Smoothies & Refreshments"}, type: 'list', img: ASSETS.cat_juice_smoothie,
    items: [
      { name: {el: "Φυσικός Πορτοκάλι", en: "Fresh Orange Juice"}, price: 4.00 },
      { name: {el: "Φυσικός Ανάμεικτος", en: "Seasonal Fresh Fruit"}, price: 4.50 },
      { name: {el: "Φυσικός Ρόδι", en: "Fresh Pomegranate"}, price: 4.00 },
      { name: {el: "Ρόδι με Μύρτιλο", en: "Pomegranate & Blueberry"}, price: 4.50 },
      { name: "Amita / Amita Motion", price: 3.00 },
      { name: {el: "Σπιτική Λεμονάδα (Μαστίχα/Ginger)", en: "Homemade Lemonade (Mastic/Ginger)"}, price: 4.00 },
      { name: {el: "Σπιτική Βυσσινάδα/Φράουλα/Ροδάκινο", en: "Homemade Sour Cherry/Strawberry/Peach"}, price: 4.00 },
      { name: {el: "Ροζ Γκρέιπφρουτ", en: "Pink Grapefruit Soda"}, price: 4.00 },
      { name: "Caribbean Dream Smoothie", price: 6.00, desc: {el: "Φράουλα, Ανανάς, Καρύδα", en: "Strawberry, Pineapple, Coconut"} },
      { name: "Forest Melody Smoothie", price: 6.00, desc: {el: "Φράουλα, Βατόμουρο, Φραγκοστάφυλο", en: "Strawberry, Blackberry, Gooseberry"} },
      { name: "Tropical Sunset Smoothie", price: 6.00, desc: {el: "Ανανάς, Φρούτα Πάθους, Μάνγκο", en: "Pineapple, Passion Fruit, Mango"} },
      { name: "Sunrise Energy Smoothie", price: 6.50, desc: {el: "Βρώμη, Μπανάνα, Σοκολάτα, Φράουλα, Αβοκάντο, Μέλι", en: "Oat, Banana, Dark Choco, Strawberry, Avocado, Honey"} },
      { name: "Strawberry Fantasy", price: 6.00, desc: {el: "Φράουλα, Μπανάνα", en: "Strawberry, Banana"} },
      { name: "Super Protein", price: 6.50, desc: {el: "Ρόδι, Φράουλα, Μύρτιλο, Κάνναβη, Πρωτεΐνη, Σπιρουλίνα", en: "Pomegranate, Strawberry, Blueberry, Hemp, Protein, Spirulina"} },
      { name: "Milkshake", price: 5.00, desc: {el: "Βανίλια, Σοκολάτα, Φράουλα", en: "Vanilla, Chocolate, Strawberry"} },
      { name: {el: "Γρανίτα", en: "Granita"}, price: 4.50, desc: {el: "Φράουλα, Λεμόνι", en: "Strawberry, Lemon"} },
      { name: "Coca Cola / Zero / Sprite / Fanta", price: 3.00 },
      { name: "Schweppes Pink / Tonic / Soda", price: 3.00 },
      { name: "Red Bull / Monster", price: 5.00 },
      { name: "Souroti / Water 1L", price: 3.00 },
      { name: "Water 0.5L", price: 0.50 }
    ]
  },

  // --- BRUNCH SECTION ---
  {
    id: 'brunch', title: {el: "Brunch & Πρωινό", en: "Brunch & Breakfast"}, type: 'card', img: ASSETS.cat_brunch,
    items: [
      { name: "Whole Grain Sandwich", price: 2.50, desc: {el: "Γαλοπούλα, Μασκαρπόνε, Γκούντα", en: "Turkey, Mascarpone, Gouda"} },
      { name: "Ciabatta", price: 2.50, desc: {el: "Μοτσαρέλα, Προσούτο, Πέστο, Μασκαρπόνε", en: "Mozzarella, Prosciutto, Pesto, Mascarpone"} },
      { name: "Baguettini", price: 2.50, desc: {el: "Ντοματίνι, Γκερεμέζι, Πάστα ελιάς", en: "Cherry tomato, Geremezi cheese, Olive paste"} },
      { name: "Toast", price: 3.50, desc: {el: "Ζαμπόν/Γαλοπούλα, Κασέρι", en: "Ham/Turkey, Cheese"} },
      { name: {el: "Τοστ με Πατάτες", en: "Toast with Fries"}, price: 4.00 },
      { name: "Homemade Focaccia", price: 6.00, desc: {el: "Μορταδέλα, Πέστο φυστικιού, Κατίκι", en: "Mortadella, Pistachio pesto, Katiki cheese"} },
      { name: {el: "Αυγά Τηγανητά", en: "Fried Eggs"}, price: 6.50, desc: {el: "2 αυγά, Καβουρμάς, Ψωμί", en: "2 eggs, Kavourma, Bread"} },
      { name: "Scrambled Eggs", price: 7.50, desc: {el: "Φέτα, Αβοκάντο, Ντοματίνια, Ψωμί", en: "Feta, Avocado, Cherry tomatoes, Bread"}, tags: ['veg'] },
      { name: {el: "Ομελέτα Χωριάτικη", en: "Country Omelette"}, price: 6.50 },
      { name: {el: "Ομελέτα Special", en: "Special Omelette"}, price: 7.00, desc: {el: "Τυριά, Λαχανικά, Αλλαντικά", en: "Cheese, Vegetables, Cold cuts"} },
      { name: "Pancakes Savory", price: 7.00, desc: {el: "Μπέικον, Τυρί, Αυγό, Ολλαντέζ", en: "Bacon, Cheese, Egg, Hollandaise"} },
      { name: "Prosciutto Cotto Pancakes", price: 8.00, desc: {el: "Αυγό, Κρέμα Μετσόβου, Προσούτο", en: "Egg, Metsovone cream, Prosciutto"} },
      { name: "Chicken Pancakes", price: 8.50, desc: {el: "Κοτόπουλο, Μπέικον, Τσένταρ, Ολλαντέζ", en: "Chicken, Bacon, Cheddar, Hollandaise"} },
      { name: "Chocolate Pancakes", price: 7.50, tags: ['popular'] },
      { name: "Bueno Pancakes", price: 7.50 },
      { name: "Ferrero Pancakes", price: 8.00 },
      { name: "Banoffee Pancakes", price: 8.00 },
      { name: "Waffle Chocolate", price: 6.00 },
      { name: "Waffle Bueno", price: 6.00 },
      { name: "Waffle Ferrero", price: 6.50 },
      { name: "Waffle Choco-Banana", price: 6.50 },
      { name: {el: "+ Μπάλα Παγωτό", en: "+ Ice Cream Scoop"}, price: 2.00 }
    ]
  },

  // --- FOOD & SNACKS SECTION ---
  {
    id: 'starters', title: {el: "Ορεκτικά & Σαλάτες", en: "Starters & Salads"}, type: 'card', img: ASSETS.cat_starters,
    items: [
      { name: "Crostini Caprese (5pcs)", price: 6.50, tags: ['veg'] },
      { name: "Bruschetta Pork (5pcs)", price: 7.50 },
      { name: "Tragano (4pcs)", price: 8.00, tags: ['veg'] },
      { name: "Ethnic Basket (14pcs)", price: 12.00, desc: "Arancini, Empanadas, Spring rolls", ribbon: "Sharing" },
      { name: "Caliente (8pcs)", price: 7.50, desc: {el: "Κροκέτες τυριού, καυτερή πιπεριά, στικς μοτσαρέλας", en: "Cheese nuggets, spicy peppers, mozzarella sticks"}, tags: ['spicy'] },
      { name: "Vegetables Springrolls (4pcs)", price: 7.00, tags: ['vegan'] },
      { name: "Falafel (5pcs)", price: 7.00, tags: ['vegan'] },
      { name: "Veggie Burger (2pcs)", price: 7.00, tags: ['vegan'] },
      { name: "Flower Pot Salad", price: 9.00, desc: {el: "Κατσικίσιος κορμός, παξιμάδι, ντοματίνια, θυμάρι", en: "Goat cheese, carob crackers, cherry tomatoes, thyme"}, tags: ['veg'] },
      { name: "The Warm One", price: 9.50, desc: {el: "Σπανάκι, ρόκα, μοσχάρι σοτέ, φέτα τηγανητή", en: "Spinach, arugula, saute beef, fried feta"} },
      { name: "Paseo Caesar's", price: 9.50, desc: {el: "Iceberg, κοτόπουλο πανέ, μπέικον, σως καίσαρα", en: "Iceberg, crispy chicken, bacon, caesar's sauce"} },
      { name: "Vegetable Garden", price: 8.00, desc: {el: "Iceberg, ρόκα, σπανάκι, αβοκάντο, βινεγκρέτ", en: "Iceberg, rocca, spinach, avocado, vinaigrette"}, tags: ['vegan'] }
    ]
  },
  {
    id: 'food', title: {el: "Finger Food, Pizza & Burgers", en: "Finger Food, Pizza & Burgers"}, type: 'card', img: ASSETS.cat_food,
    items: [
      { name: "Pizza Special", price: 14.00, desc: {el: "Μοτσαρέλα, σάλτσα, μπέικον, μανιτάρια, πιπεριές", en: "Mozzarella, sauce, bacon, mushrooms, peppers"} },
      { name: "Beef Bao Buns (3pcs)", price: 10.00 },
      { name: "Chicken Bao Buns (3pcs)", price: 9.50 },
      { name: "Fajitas Chicken", price: 12.50 },
      { name: "Mini Burgers (2pcs)", price: 9.00 },
      { name: "Club Sandwich Classic", price: 8.00 },
      { name: "Club Sandwich Chicken", price: 9.00 },
      { name: "Club Sandwich Kavurma", price: 9.00 },
      { name: "Chicken Nuggets (9pcs)", price: 7.00 },
      { name: "Nuggets Philadelphia (8pcs)", price: 7.00 },
      { name: {el: "Πατάτες Τηγανητές", en: "French Fries"}, price: 4.00 },
      { name: "Smoked Burger", price: 9.50, desc: {el: "180γρ, Μπέικον, Jack Daniels σως, πατάτες", en: "180gr, Bacon, Jack Daniels sauce, fries"} },
      { name: "Καπνιστό Μπέργκερ XL", price: 13.00, ribbon: "XL Size" },
      { name: "Sweet & Hot Burger", price: 9.50, desc: {el: "180γρ, Τσένταρ, Τσιπότλε, πατάτες", en: "180gr, Cheddar, Chipotle, fries"}, tags: ['spicy'] },
      { name: "Black Angus Burger", price: 13.00, desc: {el: "Premium κιμάς, μπέικον jam, τρούφα", en: "Premium beef, bacon jam, truffle"}, ribbon: "Top Choice" }
    ]
  },
  {
    id: 'main', title: {el: "Κυρίως Πιάτα", en: "Main Dishes"}, type: 'card', img: ASSETS.cat_main,
    items: [
      { name: "Risotto", price: 9.00, desc: {el: "Μανιτάρια δάσους, τρούφα, παρμεζάνα", en: "Forest mushrooms, truffle, parmesan"}, tags: ['veg'] },
      { name: "Ravioli", price: 12.00, desc: {el: "Ανθότυρο, σπανάκι, κρέμα μασκαρπόνε, τρούφα", en: "Anthotiro, spinach, mascarpone, truffle"}, tags: ['veg'] },
      { name: "Chicken Tagliatelle", price: 12.00 },
      { name: "Salmon Tagliatelle", price: 13.00 },
      { name: "Medallion", price: 15.00, desc: {el: "Χοιρινό φιλέτο, πουρές, λάδι τρούφας", en: "Pork fillet, puree, truffle oil"} },
      { name: "Chicken Balottine", price: 15.00 },
      { name: "Bourbon Fillet", price: 25.00, desc: {el: "Φιλέτο μοσχάρι, σως βύσσινο Jack Daniels", en: "Beef fillet, sour cherry Jack Daniels sauce"} },
      { name: "Fillet a La Madagascar", price: 25.00, desc: {el: "Φιλέτο μοσχάρι, σως πράσινο πιπέρι", en: "Beef fillet, green pepper sauce"} },
      { name: {el: "Φιλέτο Μόσχου (125γρ)", en: "Beef Fillet (125g)"}, price: 15.00 },
      { name: {el: "Φιλέτο Μόσχου (250γρ)", en: "Beef Fillet (250g)"}, price: 23.00 },
      { name: {el: "Φιλέτο Κοτόπουλο", en: "Chicken Fillet"}, price: 10.50 },
      { name: {el: "Πιατέλα Τυριών (2/4 ατ.)", en: "Cheese Platter (2/4 prs)"}, variants: [{p:8, l:{el:'2 ατόμων', en:'2 Persons'}}, {p:14, l:{el:'4 ατόμων', en:'4 Persons'}}] },
      { name: {el: "Πιατέλα Αλλαντικών (2/4 ατ.)", en: "Cold Cuts Platter (2/4 prs)"}, variants: [{p:8, l:{el:'2 ατόμων', en:'2 Persons'}}, {p:14, l:{el:'4 ατόμων', en:'4 Persons'}}] }
    ]
  },

  // --- DRINKS SECTION ---
  {
    id: 'signatures', title: { el: "Signature & Special", en: "Signature & Special" }, type: 'card', img: ASSETS.cat_signatures,
    items: [
      { name: "Zombie", price: 10.00, tags: ['strong', 'popular'], ribbon: "Best Seller" },
      { name: "Mai Tai", price: 10.00 },
      { name: "Stoly Kiss", price: 9.00 },
      { name: "Paseo Sunset", price: 10.00, tags: ['sweet'], ribbon: "Signature" },
      { name: "Spicy Mango", price: 10.00, tags: ['spicy'] },
      { name: "Mango Mule", price: 6.00, tags: ['0%'] },
      { name: "Red Paseo", price: 6.00, tags: ['0%'] },
      { name: "Lady Lavender", price: 6.00, tags: ['0%'] },
      { name: "Green Gentleman", price: 6.50, tags: ['0%'] },
      { name: "Virgin Mojito", price: 6.00, tags: ['0%'] },
      { name: "Tanqueray 0%", price: 7.50, tags: ['0%'] }
    ]
  },
  {
    id: 'classics', title: {el: "Classic Cocktails", en: "Classic Cocktails"}, type: 'list', img: ASSETS.cat_classics,
    items: [
      { name: "Aperol Spritz", price: 8.00 },
      { name: "Negroni", price: 9.00 },
      { name: "Mojito", price: 9.00 },
      { name: "Daiquiri", price: 9.00 },
      { name: "Daiquiri Strawberry", price: 10.00 },
      { name: "Margarita", price: 9.00 },
      { name: "Cosmopolitan", price: 9.00 },
      { name: "Long Island", price: 10.00 },
      { name: "Cuba Libre", price: 8.00 },
      { name: "Pina Colada", price: 9.00 },
      { name: "Caipirinha", price: 8.50 },
      { name: "Caipiroska", price: 8.50 },
      { name: "Bloody Mary", price: 10.00 },
      { name: "Paloma", price: 8.50 },
      { name: "Apple Martini", price: 9.00 },
      { name: "Gin Cucumber", price: 8.50 },
      { name: "Old Fashioned", price: 9.00 },
      { name: "Dry Martini", price: 8.50 }
    ]
  },
  {
    id: 'spirits', title: {el: "Ποτά & Κάβα", en: "Spirits & Cellar"}, type: 'group', img: ASSETS.cat_spirits,
    groups: [
      {
        name: {el: "Standard Whiskey", en: "Standard Whiskey"},
        items: [
          { name: "Famous Grouse", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Johnnie Red", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Haig", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jameson", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Tullamore", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Dewars", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Cutty Sark", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Bushmills", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Premium & Malts", en: "Premium & Malts"},
        items: [
          { name: "Johnnie Black 12", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Chivas Regal 12", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jack Daniel's", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Cardhu", variants: [{p: 9, l:{el:'Ποτήρι',en:'Glass'}}, {p: 90, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Glenfiddich 12", variants: [{p: 10, l:{el:'Ποτήρι',en:'Glass'}}, {p: 100, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Lagavulin 16", variants: [{p: 20, l:{el:'Ποτήρι',en:'Glass'}}, {p: 200, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Macallan 12", variants: [{p: 20, l:{el:'Ποτήρι',en:'Glass'}}, {p: 200, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Dimple", variants: [{p: 9, l:{el:'Ποτήρι',en:'Glass'}}, {p: 90, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Gentleman Jack", variants: [{p: 10, l:{el:'Ποτήρι',en:'Glass'}}, {p: 100, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Johnnie Blue", variants: [{p: 40, l:{el:'Ποτήρι',en:'Glass'}}, {p: 400, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Macallan Rare Cask", variants: [{p: 60, l:{el:'Ποτήρι',en:'Glass'}}, {p: 600, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: "Vodka",
        items: [
          { name: "Serkova", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Stolichnaya", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Absolut", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Belvedere", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Grey Goose", variants: [{p: 15, l:{el:'Ποτήρι',en:'Glass'}}, {p: 150, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Ciroc", variants: [{p: 10, l:{el:'Ποτήρι',en:'Glass'}}, {p: 100, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Beluga", variants: [{p: 15, l:{el:'Ποτήρι',en:'Glass'}}, {p: 150, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: "Gin",
        items: [
          { name: "Gordons", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Tanqueray", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Hendricks", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Monkey 47", variants: [{p: 15, l:{el:'Ποτήρι',en:'Glass'}}, {p: 150, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Tanqueray 10", variants: [{p: 11, l:{el:'Ποτήρι',en:'Glass'}}, {p: 110, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: "Tequila",
        items: [
          { name: "Jose Cuervo Blanco/Reposado", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Don Julio Blanco", variants: [{p: 10, l:{el:'Ποτήρι',en:'Glass'}}, {p: 100, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Don Julio Anejo", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: "Rum",
        items: [
          { name: "Bacardi", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Havana Club", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Diplomatico", variants: [{p: 12, l:{el:'Ποτήρι',en:'Glass'}}, {p: 120, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Zacapa", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Λικέρ & Απεριτίφ", en: "Liqueur & Aperitivo"},
        items: [
          { name: "Aperol / Campari", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Masticha", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jagermeister", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Metaxa 5*", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      }
    ]
  },
  {
    id: 'wine', title: {el: "Λίστα Κρασιών", en: "Wine List"}, type: 'group', img: ASSETS.cat_wine,
    groups: [
      {
        name: {el: "Λευκά", en: "White"},
        items: [
          { name: "Epops (Ktima Chatzigeorgiou)", variants: [{p: 6, l:{el:'Ποτήρι',en:'Glass'}}, {p: 22, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Malagouzia (Simeonidi)", variants: [{p: 6.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 23, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Biblia Chora", variants: [{p: 28, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Magic Mountain", variants: [{p: 35, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Tzoker (Lalikos)", variants: [{p: 6, l:{el:'Ποτήρι',en:'Glass'}}, {p: 22, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Thema (Pavlidis)", variants: [{p: 26, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Ερυθρά", en: "Red"},
        items: [
          { name: "Epops", variants: [{p: 6.3, l:{el:'Ποτήρι',en:'Glass'}}, {p: 24, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: {el: "Ερυθρός Ημίγλυκος", en: "Red Semi-Sweet"}, variants: [{p: 5.8, l:{el:'Ποτήρι',en:'Glass'}}] },
          { name: "Biblia Chora", variants: [{p: 29, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Magic Mountain", variants: [{p: 43, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Santorini Mavrotragano", variants: [{p: 40, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Ροζέ & Αφρώδη", en: "Rose & Sparkling"},
        items: [
          { name: "Treis Magisses", variants: [{p: 5.8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 21, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Prosecco Cinzano", variants: [{p: 5.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 19, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Moscato D'Asti", variants: [{p: 6, l:{el:'Ποτήρι',en:'Glass'}}, {p: 22, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Moet & Chandon", variants: [{p: 120, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      }
    ]
  },
  {
    id: 'beer', title: {el: "Μπύρες", en: "Beers"}, type: 'list', img: ASSETS.cat_beer,
    items: [
      { name: "Mythos Draft 300ml", price: 3.50 }, { name: "Mythos Draft 400ml", price: 4.50 },
      { name: "Mythos Pitcher (1lt)", price: 12.00 },
      { name: "Kaiser Draft 300ml", price: 4.00 }, { name: "Kaiser Draft 400ml", price: 5.00 },
      { name: "Kaiser Pitcher (1lt)", price: 13.00 },
      { name: "Corona", price: 5.00 }, { name: "McFarland", price: 5.50 }, { name: "Guinness", price: 6.00 },
      { name: "Fix / Fix Dark / Fix Anef", price: 4.00 },
      { name: "Stella Artois", price: 5.00 },
      { name: "Nisos All Day (Gluten Free)", price: 6.00 },
      { name: "Vergina Weiss", price: 5.00 },
      { name: "Apple Cider", price: 5.50 }
    ]
  },
  {
    id: 'dessert', title: {el: "Γλυκά", en: "Desserts"}, type: 'list', img: ASSETS.cat_dessert,
    items: [
      { name: "Cheesecake (Black Cherry)", price: 5.00 },
      { name: "Chocolate Mousse", price: 5.00 },
      { name: "Pecan Pie", price: 5.00 },
      { name: "Ice Pecan Pie", price: 6.50 },
      { name: "Souffle Chocolate/Orange", price: 5.50 },
      { name: {el: "Σουφλέ με Παγωτό", en: "Souffle with Ice Cream"}, price: 7.00 },
      { name: "Apple Pie", price: 5.00 },
      { name: {el: "Μηλόπιτα με Παγωτό", en: "Apple Pie with Ice Cream"}, price: 7.00 },
      { name: "Chocolate Sphere", price: 9.00, tags: ['popular'] },
      { name: "1000 Leaves (Millefeuille)", price: 9.00 }
    ]
  }
];

const txt = (val, lang) => {
  if (!val) return "";
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val[lang]) return val[lang];
  return val['en'] || val['el'] || "";
};

const displayPrice = (item) => {
  try {
      if (item.variants && item.variants.length > 0) {
          const v1 = item.variants[0];
          const v2 = item.variants[1];
          if (!v1 || typeof v1.p === 'undefined') return ""; 
          if (!v2) return `€${v1.p.toFixed(2)}`;
          return `€${v1.p.toFixed(2)} / €${v2.p.toFixed(2)}`;
      }
      if (typeof item.price !== 'undefined') return `€${item.price.toFixed(2)}`;
      return "";
  } catch (e) {
      return "€0.00";
  }
};

const renderTags = (tags) => {
  if (!tags) return null;
  return (
    <div className="tags-row">
      {tags.includes('spicy') && <span className="diet-tag tag-spicy"><Flame size={10}/> HOT</span>}
      {tags.includes('veg') && <span className="diet-tag tag-veg"><Leaf size={10}/> VEG</span>}
      {tags.includes('vegan') && <span className="diet-tag tag-vegan"><Leaf size={10}/> VEGAN</span>}
      {tags.includes('gf') && <span className="diet-tag tag-gf">GF</span>}
      {tags.includes('popular') && <span className="diet-tag tag-pop"><Star size={10}/> POP</span>}
      {tags.includes('strong') && <span className="diet-tag tag-spicy">STRONG</span>}
      {tags.includes('sweet') && <span className="diet-tag tag-pop">SWEET</span>}
      {tags.includes('0%') && <span className="diet-tag tag-0">0%</span>}
    </div>
  );
};

const handleShare = async (item, lang) => {
  const name = txt(item.name, lang);
  if (navigator.share) {
    try { await navigator.share({ title: 'Paseo Lounge Bar', text: `Check out the ${name} at Paseo! 🍸`, url: 'https://paseo.gr' }); } 
    catch (err) { console.log('Error sharing', err); }
  } else { alert("Copied to clipboard!"); }
};

const LuckySpinModal = ({ onClose, lang }) => {
  const [spinning, setSpinning] = useState(true);
  const [result, setResult] = useState(null);
  const [display, setDisplay] = useState("...");

  useEffect(() => {
    const signatures = MENU_DATA.find(c => c.id === 'signatures').items;
    const winner = signatures[Math.floor(Math.random() * signatures.length)];
    let count = 0;
    const interval = setInterval(() => {
      const randomItem = signatures[Math.floor(Math.random() * signatures.length)];
      setDisplay(txt(randomItem.name, lang));
      count++;
      if (count > 20) {
        clearInterval(interval);
        setResult(winner);
        setSpinning(false);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <div className="modal-overlay">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="lucky-box">
        <h3><Dices size={24}/> {UI[lang].lucky_title}</h3>
        <div className="slot-machine-window">
          <span className={spinning ? "blur-text" : "winner-text"}>
            {spinning ? display : txt(result?.name, lang)}
          </span>
        </div>
        {!spinning && result && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <p className="recommend-label">{UI[lang].lucky_res}</p>
            <p className="winner-desc">{txt(result.desc, lang)}</p>
            <div className="winner-price">{displayPrice(result)}</div>
          </motion.div>
        )}
        <button onClick={onClose} className="close-link" style={{marginTop: 20}}>{UI[lang].closed || "Close"}</button>
      </motion.div>
    </div>
  );
};

const VariantModal = ({ item, onClose, onSelect, lang }) => (
  <div className="modal-overlay">
    <div className="variant-box fade-in-up">
      <h3>{txt(item.name, lang)}</h3>
      <p>{UI[lang].choose}:</p>
      <div className="variant-options">
        {item.variants.map((v, i) => (
          <button key={i} onClick={() => onSelect(v)} className="variant-btn">
            <span>{txt(v.l, lang)}</span><span className="var-price">€{v.p.toFixed(2)}</span>
          </button>
        ))}
      </div>
      <button onClick={onClose} className="close-link">{UI[lang].closed || "Close"}</button>
    </div>
  </div>
);

const CocktailSommelier = ({ lang }) => {
    const [step, setStep] = useState(0); 
    const [pref, setPref] = useState({ alcohol: true, flavor: '', base: '' });
    const [results, setResults] = useState([]);
    const [showLucky, setShowLucky] = useState(false);

    const handleStart = () => setStep(1);
    const handleAlcohol = (hasAlcohol) => {
        setPref({ ...pref, alcohol: hasAlcohol });
        if (!hasAlcohol) { setResults(SOMMELIER_DB.mocktails); setStep(4); } else { setStep(2); }
    };
    const handleFlavor = (flavor) => { setPref({ ...pref, flavor }); setStep(3); };
    const handleBase = (base) => { setPref({ ...pref, base }); calculate(pref.flavor, base); };
    
    const calculate = (flavor, base) => {
        let list = SOMMELIER_DB.cocktails.filter(c => {
            if (c.type !== flavor) return false;
            if (base === 'any') return true; 
            if (c.bases.includes(base)) return true;
            return false;
        });
        if (list.length === 0) {
            list = SOMMELIER_DB.cocktails.filter(c => {
                if (base === 'any') return c.type === flavor;
                if (c.bases.includes(base)) return true;
                return false;
            });
        }
        const shuffled = list.sort(() => 0.5 - Math.random());
        setResults(shuffled.slice(0, 3));
        setStep(4);
    };
    const restart = () => { setStep(0); setResults([]); setPref({ alcohol: true, flavor: '', base: '' }); };

    return (
        <div className="sommelier-container">
            {showLucky && <LuckySpinModal onClose={() => setShowLucky(false)} lang={lang} />}
            <h2 className="som-title"><Sparkles size={18}/> {step === 0 ? UI[lang].sommelier_title : "Sommelier"}</h2>
            <AnimatePresence mode='wait'>
            {step === 0 && (
                <motion.div key="step0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="som-step">
                    <p>{UI[lang].sommelier_desc}</p>
                    <button className="som-btn-start" onClick={handleStart}>{UI[lang].sommelier_btn}</button>
                    <button className="btn-lucky" onClick={() => setShowLucky(true)}><Dices size={16}/> {UI[lang].lucky_btn}</button>
                </motion.div>
            )}
            {step === 1 && (
                <motion.div key="step1" initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} exit={{x:-20, opacity:0}} className="som-step">
                    <p className="q-text">1. {lang === 'el' ? "Θέλεις Αλκοόλ;" : "Do you want Alcohol?"}</p>
                    <button className="som-btn" onClick={() => handleAlcohol(true)}>{lang === 'el' ? "Ναι" : "Yes"}</button>
                    <button className="som-btn" onClick={() => handleAlcohol(false)}>{lang === 'el' ? "Όχι (Alcohol Free)" : "No (Alcohol Free)"}</button>
                </motion.div>
            )}
            {step === 2 && (
                <motion.div key="step2" initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} exit={{x:-20, opacity:0}} className="som-step">
                    <p className="q-text">2. {lang === 'el' ? "Τι γεύση προτιμάς;" : "Preferred Flavor?"}</p>
                    <button className="som-btn" onClick={() => handleFlavor('sweet')}>{lang === 'el' ? "Γλυκό & Φρουτώδες" : "Sweet & Fruity"}</button>
                    <button className="som-btn" onClick={() => handleFlavor('sour')}>{lang === 'el' ? "Ξινό & Δροσερό" : "Sour & Refreshing"}</button>
                    <button className="som-btn" onClick={() => handleFlavor('bitter')}>{lang === 'el' ? "Πικρό & Στιβαρό" : "Bitter & Dry"}</button>
                    <button className="som-btn" onClick={() => handleFlavor('strong')}>{lang === 'el' ? "Πολύ Δυνατό / Spicy" : "Strong / Spicy"}</button>
                </motion.div>
            )}
            {step === 3 && (
                <motion.div key="step3" initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} exit={{x:-20, opacity:0}} className="som-step">
                    <p className="q-text">3. {lang === 'el' ? "Αγαπημένη βάση;" : "Favorite Spirit?"}</p>
                    <button className="som-btn" onClick={() => handleBase('rum')}>{lang === 'el' ? "Ρούμι (Rum)" : "Rum"}</button>
                    <button className="som-btn" onClick={() => handleBase('vodka')}>{lang === 'el' ? "Βότκα (Vodka)" : "Vodka"}</button>
                    <button className="som-btn" onClick={() => handleBase('gin')}>{lang === 'el' ? "Τζιν (Gin)" : "Gin"}</button>
                    <button className="som-btn" onClick={() => handleBase('tequila')}>{lang === 'el' ? "Τεκίλα (Tequila)" : "Tequila"}</button>
                    <button className="som-btn" onClick={() => handleBase('whiskey')}>{lang === 'el' ? "Ουίσκι (Whiskey)" : "Whiskey"}</button>
                    <button className="som-btn" onClick={() => handleBase('any')}>{lang === 'el' ? "Όλα (Any)" : "Any"}</button>
                </motion.div>
            )}
            {step === 4 && (
                <motion.div key="step4" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="som-results">
                    <p className="q-text">{lang === 'el' ? "Σου προτείνουμε:" : "We recommend:"}</p>
                    {results.map((drink, idx) => (
                        <motion.div key={idx} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: idx * 0.1}} className="som-card">
                            <h4>{drink.name}</h4><p>{txt(drink.ingredients, lang)}</p>
                        </motion.div>
                    ))}
                    <button className="restart-link" onClick={restart}>{lang === 'el' ? "Πάμε πάλι;" : "Try again?"}</button>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

const MobileWrapper = ({ children, toast, variantItem, setVariantItem, toggleFav, lang }) => (
  <div className="mobile-wrapper">
    <div className="menu-phone-frame">
      {children}
      <AnimatePresence>
      {toast && (
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="toast-notification">
          {toast}
        </motion.div>
      )}
      </AnimatePresence>
      {variantItem && <VariantModal item={variantItem} onClose={() => setVariantItem(null)} onSelect={(v) => toggleFav(variantItem, v)} lang={lang}/>}
    </div>
  </div>
);

function SecretMenu() {
  const [mood, setMood] = useState(null);
  const [category, setCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showMyList, setShowMyList] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [toast, setToast] = useState(null);
  const [lang, setLang] = useState('el');
  const [variantItem, setVariantItem] = useState(null);

  const handleFavClick = (item) => { if (item.variants) setVariantItem(item); else toggleFav(item); };
  const toggleFav = (item, variant = null) => {
    const itemName = txt(item.name, lang);
    const cartName = variant ? `${itemName} (${txt(variant.l, lang)})` : itemName;
    const cartPrice = variant ? variant.p : item.price;
    setFavorites(prev => {
      const exists = prev.find(i => i.cartName === cartName);
      if (exists) { showToast(`${cartName} removed`); return prev.filter(i => i.cartName !== cartName); }
      showToast(`${cartName} added!`); return [...prev, { ...item, cartName, realPrice: cartPrice }];
    });
    setVariantItem(null);
  };
  const removeFromFav = (cartNameToRemove) => { setFavorites(prev => prev.filter(i => i.cartName !== cartNameToRemove)); showToast("Removed"); };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 1500); };

  if (!mood) {
    return (
      <MobileWrapper toast={toast} variantItem={variantItem} setVariantItem={setVariantItem} toggleFav={toggleFav} lang={lang}>
        <div className="menu-content mood-bg">
           <div className="top-bar-actions">
             <button onClick={() => setLang(lang === 'en' ? 'el' : 'en')} className="lang-btn"><Globe size={14}/> {lang.toUpperCase()}</button>
           </div>
           <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="logo-small" alt="Paseo"/>
           <h1 className="mood-title">{UI[lang].vibe}</h1>
           <div className="grid-menu">
             <div className="grid-item" onClick={() => setMood('coffee')} style={{backgroundImage:`url(${ASSETS.grid_coffee})`}}><span>{UI[lang].t_coffee}</span></div>
             <div className="grid-item" onClick={() => setMood('food')} style={{backgroundImage:`url(${ASSETS.grid_food})`}}><span>{UI[lang].t_food}</span></div>
             <div className="grid-item" onClick={() => setMood('drinks')} style={{backgroundImage:`url(${ASSETS.grid_cocktails})`}}><span>{UI[lang].t_drinks}</span></div>
             <div className="grid-item" onClick={() => setMood('wine')} style={{backgroundImage:`url(${ASSETS.grid_wine})`}}><span>{UI[lang].t_wine}</span></div>
           </div>
           <button className="btn-full-menu" onClick={() => setMood('all')}>{UI[lang].full}</button>
           <CocktailSommelier lang={lang} />
           <div className="footer-note" style={{fontSize:10, color:'#666', marginTop:20}}>{UI[lang].disclaimer}</div>
        </div>
      </MobileWrapper>
    );
  }

  if (showMyList) {
     const total = favorites.reduce((sum, i) => sum + (i.realPrice || 0), 0);
     return (
      <MobileWrapper toast={toast} variantItem={variantItem} setVariantItem={setVariantItem} toggleFav={toggleFav} lang={lang}>
        <div className="menu-content list-view">
           <div className="sticky-header">
              <button onClick={() => setShowMyList(false)} className="icon-btn"><X/></button>
              <h2>{UI[lang].myList}</h2><div style={{width: 24}}></div>
           </div>
           <div className="list-scroll">
              {favorites.length === 0 ? <p className="empty-state">{UI[lang].empty}</p> : favorites.map((item, idx) => (
                 <div key={idx} className="order-item">
                    <div className="order-info"><h4>{item.cartName}</h4><span>€{item.realPrice.toFixed(2)}</span></div>
                    <button onClick={() => removeFromFav(item.cartName)} className="remove-btn"><X size={14}/></button>
                 </div>
              ))}
              <div className="total-row"><span>{UI[lang].total}:</span><span>€{total.toFixed(2)}</span></div>
           </div>
        </div>
      </MobileWrapper>
     )
  }

  if (!category) {
     const visibleCats = MENU_DATA.filter(cat => {
        if(mood === 'all') return true;
        if(mood === 'coffee') return ['coffee_hot', 'coffee_cold', 'choc_tea', 'juice_smoothie', 'brunch', 'dessert'].includes(cat.id);
        if(mood === 'food') return ['food', 'starters', 'main', 'brunch', 'dessert'].includes(cat.id);
        if(mood === 'drinks') return ['signatures', 'classics', 'spirits', 'beer'].includes(cat.id);
        if(mood === 'wine') return ['wine'].includes(cat.id);
        return true;
     });

     return (
      <MobileWrapper toast={toast} variantItem={variantItem} setVariantItem={setVariantItem} toggleFav={toggleFav} lang={lang}>
        <div className="menu-content">
           <div className="sticky-header">
              <button onClick={() => setMood(null)} className="icon-btn"><ChevronDown/></button>
              <span className="header-title">{UI[lang].menu}</span>
              <button onClick={() => setShowMyList(true)} className="icon-btn relative">
                 <Heart fill={favorites.length > 0 ? "#C5A065" : "none"} color="#C5A065"/>
                 <AnimatePresence>
                 {favorites.length > 0 && <motion.span initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} className="badge">{favorites.length}</motion.span>}
                 </AnimatePresence>
              </button>
           </div>
           <div className="review-area">
             <a href="https://www.google.com/search?q=Paseo+Lounge+Bar+Reviews" target="_blank" className="btn-gold small">
               <Star size={12} fill="black"/> {UI[lang].review}
             </a>
           </div>
           <motion.div className="cat-grid" initial={{opacity:0}} animate={{opacity:1}}>
              {visibleCats.map(cat => (
                 <div key={cat.id} className="cat-card" onClick={() => setCategory(cat)} style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${cat.img})`}}><h3>{txt(cat.title, lang)}</h3></div>
              ))}
           </motion.div>
        </div>
      </MobileWrapper>
     );
  }

  return (
   <MobileWrapper toast={toast} variantItem={variantItem} setVariantItem={setVariantItem} toggleFav={toggleFav} lang={lang}>
     <div className="menu-content">
        <div className="cat-header-hero" style={{backgroundImage: `url(${category.img})`}}>
           <div className="overlay-grad">
              <button onClick={() => setCategory(null)} className="back-bubble"><ChevronRight style={{transform:'rotate(180deg)'}}/></button>
              <h1>{txt(category.title, lang)}</h1>
           </div>
        </div>
        <div className="items-scroll">
           {category.type === 'card' && <div className="cards-stack">
             {category.items.map((item, i) => (
              <motion.div key={i} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: i * 0.05}} className="menu-card">
                 {item.ribbon && <div className="ribbon">{item.ribbon}</div>}
                 <div className="card-details">
                   <h4>{txt(item.name, lang)} {renderTags(item.tags)}</h4>
                   <p>{txt(item.desc, lang)}</p>
                   <span className="price">{displayPrice(item)}</span>
                 </div>
                 <div className="actions-col">
                   {/* Share button removed as requested */}
                   <motion.button className="fav-btn" whileTap={{ scale: 0.8 }} animate={{ scale: favorites.some(f => f.name === item.name) ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }} onClick={(e) => { e.stopPropagation(); handleFavClick(item); }}>
                     <Heart size={20} fill={favorites.some(f => f.name === item.name) ? "#C5A065" : "none"} color="#C5A065"/>
                   </motion.button>
                 </div>
              </motion.div>
           ))}</div>}
           {category.type === 'list' && <div className="list-stack">
             {category.items.map((item, i) => (
              <motion.div key={i} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: i * 0.03}} className="menu-list-item">
                 <div className="list-text"><h4>{txt(item.name, lang)} {renderTags(item.tags)}</h4>{item.desc && <p>{txt(item.desc, lang)}</p>}</div>
                 <div className="list-right">
                   <span className="price">{displayPrice(item)}</span>
                   <motion.button whileTap={{ scale: 0.8 }} animate={{ scale: favorites.some(f => f.name === item.name) ? [1, 1.3, 1] : 1 }} className="fav-mini" onClick={(e) => { e.stopPropagation(); handleFavClick(item); }}>
                     <Heart size={16} fill={favorites.some(f => f.name === item.name) ? "#C5A065" : "none"} color="#C5A065"/>
                   </motion.button>
                 </div>
              </motion.div>
           ))}</div>}
           {category.type === 'group' && <div className="group-stack">{category.groups.map((grp, i) => (
              <div key={i} className="accordion">
                 <div className="accordion-header" onClick={() => setExpandedGroup(expandedGroup === grp.name ? null : grp.name)}>
                   <span>{txt(grp.name, lang)}</span>{expandedGroup === grp.name ? <ChevronUp/> : <ChevronDown/>}
                 </div>
                 <AnimatePresence>
                 {expandedGroup === grp.name && (
                   <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className="accordion-body">
                     {grp.items.map((item, idx) => (
                        <div key={idx} className="simple-row-price">
                          <span>{txt(item.name, lang)}</span>
                          <div className="row-end">
                            <span className="price-tag">{displayPrice(item)}</span>
                            <motion.button whileTap={{ scale: 0.8 }} animate={{ scale: favorites.some(f => f.name === item.name) ? [1, 1.3, 1] : 1 }} className="fav-mini" onClick={(e) => { e.stopPropagation(); handleFavClick(item); }}>
                              <Heart size={14} fill={favorites.some(f => f.name === item.name) ? "#C5A065" : "none"} color="#C5A065"/>
                            </motion.button>
                          </div>
                        </div>
                     ))}
                   </motion.div>
                 )}
                 </AnimatePresence>
              </div>
           ))}</div>}
        </div>
        {favorites.length > 0 && <motion.div initial={{y:50}} animate={{y:0}} className="floating-bar" onClick={() => setShowMyList(true)}><span>{UI[lang].myList} ({favorites.length})</span><ChevronUp size={16}/></motion.div>}
     </div>
   </MobileWrapper>
  );
}

const ReviewsSlider = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const timer = setInterval(() => setIdx(prev => (prev + 1) % 3), 4000); return () => clearInterval(timer); }, []);
  const revs = [ { u: "Maria K.", t: "Best cocktails in Kavala!", s: 5 }, { u: "John D.", t: "Amazing atmosphere.", s: 5 }, { u: "Elena P.", t: "Great brunch.", s: 5 } ];
  return (
    <div className="reviews-slider">
      <div className="stars">{'★'.repeat(revs[idx].s)}</div><p>"{revs[idx].t}"</p><span>- {revs[idx].u}</span>
    </div>
  );
};

function PublicSite() {
  const navigate = useNavigate();
  return (
    <div className="public-root">
      <div className="bg-image" style={{backgroundImage: `url(${ASSETS.heroImage})`}}><div className="overlay"></div></div>
      <div className="public-content">
        <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="logo-main" alt="Paseo"/>
        <h2 className="tagline">PREMIUM LOUNGE EXPERIENCE</h2>
        <ReviewsSlider />
        <div className="info-box secret-trigger" onClick={() => navigate('/qr-menu')}>
           <Clock size={24} color="#C5A065"/><p>Daily 08:00 - 00:00</p><span className="status-badge open">OPEN NOW</span>
        </div>
        <div className="action-buttons">
           <a href="tel:+302510834378" className="btn-gold">BOOK NOW</a>
           <div className="social-row">
              <a href="https://www.instagram.com/paseoloungebar/" className="social-btn"><Instagram/></a>
              <a href="https://www.facebook.com/PASEOLOUNGEBAR/" className="social-btn"><MessageCircle/></a>
              <a href="http://maps.google.com/?q=Paseo+Lounge+Bar+Kavala" className="social-btn"><Map/></a>
           </div>
        </div>
        <div className="footer-note">
          <a href="https://www.google.com/search?q=Paseo+Lounge+Bar+Reviews" target="_blank" style={{color:'#888', fontSize:'11px', textDecoration:'underline'}}>Rate us on Google</a>
        </div>
      </div>
    </div>
  );
}

function App() { return <Router><Routes><Route path="/" element={<PublicSite />} /><Route path="/qr-menu" element={<SecretMenu />} /></Routes></Router>; }
export default App;