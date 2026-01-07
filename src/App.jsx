import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Heart, X, ChevronDown, ChevronUp, Clock, Star, Map, Instagram, MessageCircle, Globe, ChevronRight, Flame, Leaf, Wine, Sparkles } from 'lucide-react';
import './App.css';

// --- ASSETS (High Quality Dark Aesthetic) ---
const ASSETS = {
  heroImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1080",
  // 4+1 GRID IMAGES
  grid_coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
  grid_food: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80", 
  grid_cocktails: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
  grid_wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
  
  // CATEGORY HEADERS
  cat_coffee: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600",
  cat_brunch: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600",
  cat_food: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600",
  cat_starters: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600",
  cat_cocktail: "https://images.unsplash.com/photo-1536935338788-843bb6319105?auto=format&fit=crop&w=600",
  cat_wine: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600",
  cat_whiskey: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600",
  cat_beer: "https://images.unsplash.com/photo-1623961990059-28437797f62d?auto=format&fit=crop&w=600",
  cat_dessert: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600",
};

// --- TRANSLATIONS ---
const UI = {
  el: {
    menu: "ΜΕΝΟΥ", myList: "Η Λίστα μου", empty: "Η λίστα είναι άδεια.", total: "Σύνολο",
    waiter: "Δείξτε αυτή την οθόνη στον σερβιτόρο.", book: "ΚΡΑΤΗΣΗ", open: "ΑΝΟΙΧΤΑ", closed: "ΚΛΕΙΣΤΑ",
    review: "Αξιολογήστε μας", choose: "Επιλέξτε", glass: "Ποτήρι", bottle: "Φιάλη",
    vibe: "Επιλέξτε Κατηγορία", full: "Πλήρες Μενού",
    t_coffee: "Καφές & Brunch", t_food: "Φαγητό & Burgers", t_drinks: "Cocktails & Ποτά", t_wine: "Κρασί & Κάβα",
    sommelier_title: "Δεν ξέρεις τι να διαλέξεις;", sommelier_desc: "Ο ψηφιακός Sommelier θα βρει το ποτό σου σε 3 βήματα!", sommelier_btn: "Βρες το ποτό μου"
  },
  en: {
    menu: "MENU", myList: "My Selection", empty: "Your list is empty.", total: "Total",
    waiter: "Show this screen to your waiter.", book: "BOOK A TABLE", open: "OPEN NOW", closed: "CLOSED",
    review: "Rate us on Google", choose: "Select Option", glass: "Glass", bottle: "Bottle",
    vibe: "Select Category", full: "Full Menu",
    t_coffee: "Coffee & Brunch", t_food: "Kitchen & Burgers", t_drinks: "Cocktails & Drinks", t_wine: "Wine & Spirits",
    sommelier_title: "Can't decide?", sommelier_desc: "Let our digital Sommelier find your drink in 3 steps!", sommelier_btn: "Find my drink"
  }
};

// --- SOMMELIER DATA ---
const SOMMELIER_DB = {
    cocktails: [
        { name: "Daiquiri Strawberry", ingredients: {el:"Λευκό Ρούμι, Λάιμ, Πουρές Φράουλα", en:"White Rum, Lime, Strawberry Puree"}, type: "sweet", base: "rum" },
        { name: "Pina Colada", ingredients: {el:"Λευκό Ρούμι, Ανανάς, Λικέρ Καρύδας", en:"White Rum, Pineapple, Coconut Liqueur"}, type: "sweet", base: "rum" },
        { name: "Stoly Kiss", ingredients: {el:"Βότκα, Μαστίχα, Κράνμπερι, Ρόδι", en:"Vodka, Mastic, Cranberry, Pomegranate"}, type: "sweet", base: "vodka" },
        { name: "Apple Martini", ingredients: {el:"Βότκα, Λάιμ, Πράσινο μήλο", en:"Vodka, Lime, Green Apple"}, type: "sweet", base: "vodka" },
        { name: "Aperol Spritz", ingredients: {el:"Aperol, Prosecco, Soda", en:"Aperol, Prosecco, Soda"}, type: "sour", base: "other" },
        { name: "Mojito", ingredients: {el:"Λευκό Ρούμι, Λάιμ, Μέντα, Σόδα", en:"White Rum, Lime, Mint, Soda"}, type: "sour", base: "rum" },
        { name: "Daiquiri", ingredients: {el:"Λευκό Ρούμι, Λάιμ, Ζάχαρη", en:"White Rum, Lime, Sugar"}, type: "sour", base: "rum" },
        { name: "Margarita", ingredients: {el:"Tequila, Triple Sec, Λεμόνι", en:"Tequila, Triple Sec, Lemon"}, type: "sour", base: "tequila" },
        { name: "Paloma", ingredients: {el:"Tequila, Λάιμ, Pink Grapefruit Soda", en:"Tequila, Lime, Pink Grapefruit Soda"}, type: "sour", base: "tequila" },
        { name: "Cosmopolitan", ingredients: {el:"Βότκα, Triple Sec, Κράνμπερι, Λάιμ", en:"Vodka, Triple Sec, Cranberry, Lime"}, type: "sour", base: "vodka" },
        { name: "Caipirinha", ingredients: {el:"Cachaca, Λάιμ, Μαύρη Ζάχαρη", en:"Cachaca, Lime, Brown Sugar"}, type: "sour", base: "rum" },
        { name: "Gin Cucumber", ingredients: {el:"Gin, Σιρόπι αγγούρι, Λάιμ, Σόδα", en:"Gin, Cucumber, Lime, Soda"}, type: "sour", base: "gin" },
        { name: "Negroni", ingredients: {el:"Campari, Gin, Cinzano Rosso", en:"Campari, Gin, Cinzano Rosso"}, type: "bitter", base: "gin" },
        { name: "Old Fashioned", ingredients: {el:"Whiskey, Angostura, Ζάχαρη", en:"Whiskey, Angostura, Sugar"}, type: "bitter", base: "whiskey" },
        { name: "Dry Martini", ingredients: {el:"Gin, Dry Vermouth", en:"Gin, Dry Vermouth"}, type: "bitter", base: "gin" },
        { name: "Mai Tai", ingredients: {el:"Λευκό & Μαύρο Ρούμι, Αμύγδαλο, Λάιμ", en:"White & Dark Rum, Almond, Lime"}, type: "strong", base: "rum" },
        { name: "Zombie", ingredients: {el:"Blend ρούμι, Μπράντυ, Ανανάς, Πορτοκάλι", en:"Rum blend, Brandy, Pineapple, Orange"}, type: "strong", base: "rum" },
        { name: "Long Island", ingredients: {el:"Ρούμι, Gin, Βότκα, Tequila, Cola", en:"Rum, Gin, Vodka, Tequila, Cola"}, type: "strong", base: "all" },
        { name: "Bloody Mary", ingredients: {el:"Βότκα, Ντομάτα, Tabasco, Worcestershire", en:"Vodka, Tomato, Tabasco, Worcestershire"}, type: "strong", base: "vodka" }
    ],
    mocktails: [
        { name: "Mango Mule", ingredients: {el:"Ανανάς, Λάιμ, Μάνγκο, Τόνικ", en:"Pineapple, Lime, Mango, Tonic"} },
        { name: "Red Paseo", ingredients: {el:"Κράνμπερι, Ρόδι, Λεμόνι", en:"Cranberry, Pomegranate, Lemon"} },
        { name: "Lady Lavender", ingredients: {el:"Λεβάντα, Γκρέιπφρουτ, Σόδα", en:"Lavender, Grapefruit, Soda"} },
        { name: "Green Gentleman", ingredients: {el:"Ακτινίδιο, Πορτοκάλι, Ροδάκινο", en:"Kiwi, Orange, Peach"} }
    ]
};

// --- MENU DATA (EXISTING) ---
const MENU_DATA = [
  // 1. STARTERS
  {
    id: 'starters', title: {el: "Ορεκτικά & Σαλάτες", en: "Starters & Salads"}, type: 'card', img: ASSETS.cat_starters,
    items: [
      { name: "Crostini Caprese (3pcs)", price: 6.50, desc: {el: "Ψωμάκια Moinellas, μοτσαρέλα, ντοματίνια, πέστο", en: "Bread mozzarella, cherry tomatoes, basil pesto"}, tags: ['veg'] },
      { name: "Bruschetta Pork (3pcs)", price: 7.50, desc: {el: "Ψωμάκια, κρέμα φασκόμηλο, καπνιστό ψαρονέφρι, παρμεζάνα", en: "Bread, Sage Creme, Smoked pork tenderloin, parmesan"} },
      { name: "Tragano (4pcs)", price: 8.00, desc: {el: "Ρολό με γραβιέρα Νάξου, κατσικίσιος κορμός, μαρμελάδα σύκο", en: "Fyllo with graviera Naxou, goat cheese, fig marmalade"}, tags: ['veg'] },
      { name: "Ethnic Basket (14pcs)", price: 12.00, desc: "Arancini, Empanadas, Spring rolls", ribbon: "Sharing" },
      { name: "Caliente (8pcs)", price: 7.50, desc: {el: "Κροκέτες τυριού, καυτερή πιπεριά, στικς μοτσαρέλας", en: "Cheese nuggets, spicy peppers, mozzarella sticks"}, tags: ['spicy'] },
      { name: "Vegetables Springrolls (4pcs)", price: 7.00, desc: {el: "Ρολάκια λαχανικών με γλυκόξινη σάλτσα", en: "Vegetable spring rolls with sweet-chilli sauce"}, tags: ['vegan'] },
      { name: "Falafel (5pcs)", price: 7.00, desc: {el: "Κροκέτες με ρεβύθια & μυρωδικά", en: "Croquettes with chickpeas & herbs"}, tags: ['vegan'] },
      { name: "Veggie Burger (2pcs)", price: 7.00, desc: {el: "Μπιφτέκι με τσία, φαγόπυρο, βρώμη, πατάτες", en: "Burger with chia, buckwheat, oatmeal, fries"}, tags: ['vegan'] },
      { name: "Flower Pot Salad", price: 9.00, desc: {el: "Κατσικίσιος κορμός, παξιμάδι, ντοματίνια, θυμάρι", en: "Goat cheese, carob crackers, cherry tomatoes, thyme"}, tags: ['veg'] },
      { name: "The Warm One", price: 9.50, desc: {el: "Σπανάκι, ρόκα, μοσχάρι σοτέ, φέτα τηγανητή", en: "Spinach, arugula, saute beef, fried feta"} },
      { name: "Paseo Caesar's", price: 9.50, desc: {el: "Iceberg, κοτόπουλο πανέ, μπέικον, σως καίσαρα", en: "Iceberg, crispy chicken, bacon, caesar's sauce"} },
      { name: "Vegetable Garden", price: 8.00, desc: {el: "Iceberg, ρόκα, σπανάκι, αβοκάντο, βινεγκρέτ", en: "Iceberg, rocca, spinach, avocado, vinaigrette"}, tags: ['vegan'] }
    ]
  },
  // 2. FINGER FOOD
  {
    id: 'food', title: {el: "Finger Food & Burgers", en: "Finger Food & Burgers"}, type: 'card', img: ASSETS.cat_food,
    items: [
      { name: "Pizza Special", price: 14.00, desc: {el: "Μοτσαρέλα, σάλτσα, μπέικον, μανιτάρια, πιπεριές", en: "Mozzarella, sauce, bacon, mushrooms, peppers"} },
      { name: "Pizza Margarita", price: 12.00, desc: {el: "Μοτσαρέλα, σάλτσα ντομάτας, βασιλικός", en: "Mozzarella, tomato sauce, basil"}, tags: ['veg'] },
      { name: "Pizza Prosciutto", price: 14.00, desc: {el: "Μοτσαρέλα, σάλτσα, προσούτο, ρόκα", en: "Mozzarella, sauce, prosciutto, rocca"} },
      { name: "Pizza Burratina", price: 14.00, desc: {el: "Σάλτσα, μπουράτα, μπρεζάολα, ρόκα", en: "Sauce, burrata, bresaola, rocca"} },
      { name: "Beef Bao Buns (3pcs)", price: 10.00, desc: {el: "Φιλέτο μοσχάρι, σάλτσα μπολονέζ", en: "Beef fillet, bolognese sauce"} },
      { name: "Chicken Bao Buns (3pcs)", price: 9.50, desc: {el: "Κοτόπουλο, τεριγιάκι, τζίντζερ", en: "Chicken, teriyaki, ginger"} },
      { name: "Fajitas Chicken", price: 12.50, desc: {el: "Κοτόπουλο, τορτίγια, γουακαμόλε", en: "Chicken, tortilla, guacamole"} },
      { name: "Mini Burgers (2pcs)", price: 9.00, desc: {el: "Μπριός, μοσχάρι, τσένταρ, πατάτες", en: "Brioche, beef, cheddar, fries"} },
      { name: "Club Sandwich Classic", price: 8.00, desc: {el: "Ζαμπόν, μπέικον, γκούντα, πατάτες", en: "Ham, bacon, gouda, fries"} },
      { name: "Club Sandwich Chicken", price: 9.00, desc: {el: "Κοτόπουλο, μπέικον, γκούντα, πατάτες", en: "Chicken, bacon, gouda, fries"} },
      { name: "Club Sandwich Kavurma", price: 9.00, desc: {el: "Καβουρμάς, ομελέτα, κασέρι, πατάτες", en: "Kavurma, omelette, cheese, fries"} },
      { name: "Chicken Nuggets (8pcs)", price: 7.00 },
      { name: "Nuggets Philadelphia", price: 7.00, desc: {el: "Γεμιστές με φιλαδέλφεια", en: "Stuffed with philadelphia"} },
      { name: "Smoked Burger", price: 9.50, desc: {el: "180γρ, Μπέικον, Jack Daniels σως, πατάτες", en: "180gr, Bacon, Jack Daniels sauce, fries"} },
      { name: "Sweet & Hot Burger", price: 9.50, desc: {el: "180γρ, Τσένταρ, Τσιπότλε, πατάτες", en: "180gr, Cheddar, Chipotle, fries"}, tags: ['spicy'] },
      { name: "Black Angus Burger", price: 13.00, desc: {el: "Premium κιμάς, μπέικον jam, τρούφα", en: "Premium beef, bacon jam, truffle"}, ribbon: "Top Choice" }
    ]
  },
  // 3. MAIN DISHES
  {
    id: 'main', title: {el: "Κυρίως Πιάτα", en: "Main Dishes"}, type: 'card', img: ASSETS.cat_food,
    items: [
      { name: "Risotto", price: 9.00, desc: {el: "Μανιτάρια δάσους, τρούφα, παρμεζάνα", en: "Forest mushrooms, truffle, parmesan"}, tags: ['veg'] },
      { name: "Ravioli", price: 12.00, desc: {el: "Ανθότυρο, σπανάκι, κρέμα μασκαρπόνε, τρούφα", en: "Anthotiro, spinach, mascarpone, truffle"}, tags: ['veg'] },
      { name: "Chicken Tagliatelle", price: 12.00, desc: {el: "Κοτόπουλο, λαχανικά, κρέμα γάλακτος", en: "Chicken, vegetables, heavy cream"} },
      { name: "Salmon Tagliatelle", price: 13.00, desc: {el: "Καπνιστός σολομός, βότκα, λάιμ", en: "Smoked salmon, vodka, lime"} },
      { name: "Medallion", price: 15.00, desc: {el: "Χοιρινό φιλέτο, πουρές, λάδι τρούφας", en: "Pork fillet, puree, truffle oil"} },
      { name: "Chicken Balottine", price: 15.00, desc: {el: "Κοτόπουλο, μοτσαρέλα, προσούτο, νιόκι", en: "Chicken, mozzarella, prosciutto, gnocchi"} },
      { name: "Bourbon Fillet", price: 25.00, desc: {el: "Φιλέτο μοσχάρι, σως βύσσινο Jack Daniels", en: "Beef fillet, sour cherry Jack Daniels sauce"} },
      { name: "Fillet a La Madagascar", price: 25.00, desc: {el: "Φιλέτο μοσχάρι, σως πράσινο πιπέρι", en: "Beef fillet, green pepper sauce"} },
      { name: {el: "Φιλέτο Μόσχου (125γρ)", en: "Beef Fillet (125g)"}, price: 15.00 },
      { name: {el: "Φιλέτο Μόσχου (250γρ)", en: "Beef Fillet (250g)"}, price: 23.00 },
      { name: {el: "Φιλέτο Κοτόπουλο", en: "Chicken Fillet"}, price: 10.50 },
      { name: {el: "Πιατέλα Τυριών", en: "Cheese Platter"}, price: 14.00, desc: {el: "4 ατόμων", en: "4 persons"} },
      { name: {el: "Πιατέλα Αλλαντικών", en: "Cold Cuts Platter"}, price: 14.00, desc: {el: "4 ατόμων", en: "4 persons"} }
    ]
  },
  // 4. SIGNATURES
  {
    id: 'signatures', title: { el: "Signature Cocktails", en: "Signature Cocktails" }, type: 'card', img: ASSETS.cat_cocktail,
    items: [
      { name: "Zombie", price: 10.00, desc: {el: "Blend ρούμι, Ανανάς, Πάθος, Φωτιά", en: "Rum blend, Pineapple, Passion Fruit, Fire"}, tags: ['strong'], ribbon: "Best Seller" },
      { name: "Mai Tai", price: 10.00, desc: {el: "Blend ρούμι, Αμύγδαλο, Λάιμ", en: "Rum blend, Almond, Lime"} },
      { name: "Paseo Sunset", price: 10.00, desc: {el: "Βότκα, Φράουλα, Βανίλια, Λάιμ", en: "Vodka, Strawberry, Vanilla"}, tags: ['popular', 'sweet'], ribbon: "Signature" },
      { name: "Spicy Mango", price: 10.00, desc: {el: "Τεκίλα, Μάνγκο, Τσίλι", en: "Tequila, Mango, Chili"}, tags: ['spicy'] },
      { name: "Stoly Kiss", price: 9.00, desc: {el: "Βότκα, Μαστίχα, Κράνμπερι", en: "Vodka, Mastic, Cranberry"} },
      { name: "Mango Mule", price: 6.00, desc: "Alcohol Free", tags: ['0%'] },
      { name: "Red Paseo", price: 6.00, desc: "Alcohol Free", tags: ['0%'] }
    ]
  },
  // 5. CLASSICS
  {
    id: 'classics', title: {el: "Classic Cocktails", en: "Classic Cocktails"}, type: 'list', img: ASSETS.cat_cocktail,
    items: [
      { name: "Aperol Spritz", price: 8.00 }, { name: "Negroni", price: 9.00 },
      { name: "Mojito", price: 9.00 }, { name: "Daiquiri", price: 9.00 },
      { name: "Margarita", price: 9.00 }, { name: "Cosmopolitan", price: 9.00 },
      { name: "Pina Colada", price: 9.00 }, { name: "Paloma", price: 8.50 },
      { name: "Old Fashioned", price: 9.00 }
    ]
  },
  // 6. SPIRITS
  {
    id: 'spirits', title: {el: "Ποτά & Κάβα", en: "Spirits & Cellar"}, type: 'group', img: ASSETS.cat_whiskey,
    groups: [
      {
        name: {el: "Standard Whiskey", en: "Standard Whiskey"},
        items: [
          { name: "Famous Grouse", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Johnnie Red", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Haig", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jameson", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Tullamore", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] }
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
          { name: "Macallan 12", variants: [{p: 20, l:{el:'Ποτήρι',en:'Glass'}}, {p: 200, l:{el:'Φιάλη',en:'Bottle'}}] }
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
          { name: "Ciroc", variants: [{p: 10, l:{el:'Ποτήρι',en:'Glass'}}, {p: 100, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: "Gin",
        items: [
          { name: "Gordons", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Tanqueray", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Hendricks", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Monkey 47", variants: [{p: 15, l:{el:'Ποτήρι',en:'Glass'}}, {p: 150, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: "Tequila",
        items: [
          { name: "Jose Cuervo Blanco", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jose Cuervo Reposado", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Don Julio Blanco", variants: [{p: 10, l:{el:'Ποτήρι',en:'Glass'}}, {p: 100, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Don Julio Anejo", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      }
    ]
  },
  // 7. WINE
  {
    id: 'wine', title: {el: "Λίστα Κρασιών", en: "Wine List"}, type: 'group', img: ASSETS.cat_wine,
    groups: [
      {
        name: {el: "Λευκά", en: "White"},
        items: [
          { name: "Epops (Ktima Chatzigeorgiou)", variants: [{p: 6, l:{el:'Ποτήρι',en:'Glass'}}, {p: 22, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Malagouzia (Simeonidi)", variants: [{p: 6.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 23, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Biblia Chora", variants: [{p: 28, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Magic Mountain", variants: [{p: 35, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Ερυθρά", en: "Red"},
        items: [
          { name: "Epops", variants: [{p: 6.3, l:{el:'Ποτήρι',en:'Glass'}}, {p: 24, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: {el: "Ερυθρός Ημίγλυκος", en: "Red Semi-Sweet"}, variants: [{p: 5.8, l:{el:'Ποτήρι',en:'Glass'}}] },
          { name: "Biblia Chora", variants: [{p: 29, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Magic Mountain", variants: [{p: 43, l:{el:'Φιάλη',en:'Bottle'}}] }
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
  // 8. BRUNCH
  {
    id: 'brunch', title: {el: "Brunch & Πρωινό", en: "Brunch & Breakfast"}, type: 'card', img: ASSETS.cat_brunch,
    items: [
      { name: "Whole Grain Sandwich", price: 2.50 },
      { name: "Ciabatta", price: 2.50 },
      { name: "Toast", price: 3.50 },
      { name: {el: "Αυγά Τηγανητά", en: "Fried Eggs"}, price: 6.50 },
      { name: "Scrambled Eggs", price: 7.50, tags: ['veg'] },
      { name: "Pancakes Savory", price: 7.00 },
      { name: "Chicken Pancakes", price: 8.50 },
      { name: "Pancakes Chocolate", price: 7.50, tags: ['popular'] },
      { name: "Pancakes Bueno", price: 7.50 }
    ]
  },
  // 9. COFFEE
  {
    id: 'coffee', title: {el: "Καφές & Ροφήματα", en: "Coffee & Beverages"}, type: 'list', img: ASSETS.cat_coffee,
    items: [
      { name: "Espresso", price: 2.50 },
      { name: {el: "Espresso Διπλός", en: "Espresso Double"}, price: 3.00 },
      { name: "Cappuccino", price: 3.80 },
      { name: "Freddo Espresso", price: 3.50 },
      { name: "Freddo Cappuccino", price: 4.00 },
      { name: {el: "Ελληνικός", en: "Greek Coffee"}, price: 2.50 },
      { name: {el: "Σοκολάτα", en: "Chocolate"}, price: 4.00 },
      { name: {el: "Τσάι", en: "Tea"}, price: 3.00 }
    ]
  },
  // 10. BEER
  {
    id: 'beer', title: {el: "Μπύρες", en: "Beers"}, type: 'list', img: ASSETS.cat_beer,
    items: [
      { name: "Mythos Draft 300ml", price: 3.50 }, { name: "Mythos Draft 400ml", price: 4.50 },
      { name: "Kaiser Draft 300ml", price: 4.00 }, { name: "Kaiser Draft 400ml", price: 5.00 },
      { name: "Corona", price: 5.00 }, { name: "McFarland", price: 5.50 }, { name: "Guinness", price: 6.00 }
    ]
  },
  // 11. DESSERT
  {
    id: 'dessert', title: {el: "Γλυκά", en: "Desserts"}, type: 'list', img: ASSETS.cat_dessert,
    items: [
      { name: "Cheesecake", price: 5.00 }, { name: "Chocolate Mousse", price: 5.00 },
      { name: "Souffle", price: 5.50 }, { name: "Chocolate Sphere", price: 9.00, tags: ['popular'] }
    ]
  }
];

// --- HELPER: SAFE TRANSLATION ---
const txt = (val, lang) => {
  if (!val) return "";
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val[lang]) return val[lang];
  return val['en'] || val['el'] || "";
};

// --- CORRECTED PRICE DISPLAY FUNCTION ---
const displayPrice = (item) => {
  if (item.variants && item.variants.length > 0) {
      if (item.variants.length === 1) {
          return `€${item.variants[0].p.toFixed(2)}`;
      }
      return `€${item.variants[0].p} / €${item.variants[1].p}`;
  }
  if (item.price) return `€${item.price.toFixed(2)}`;
  return "";
};

const renderTags = (tags) => {
  if (!tags) return null;
  return (
    <div className="tags-row">
      {tags.includes('spicy') && <span className="diet-tag tag-spicy"><Flame size={10}/> HOT</span>}
      {tags.includes('veg') && <span className="diet-tag tag-vegan"><Leaf size={10}/> VEG</span>}
      {tags.includes('vegan') && <span className="diet-tag tag-vegan"><Leaf size={10}/> VEGAN</span>}
      {tags.includes('gf') && <span className="diet-tag tag-vegan">GF</span>}
      {tags.includes('popular') && <span className="diet-tag tag-pop"><Star size={10}/> POP</span>}
      {tags.includes('0%') && <span className="diet-tag tag-pop">0%</span>}
    </div>
  );
};

// --- MODAL FOR VARIANTS ---
const VariantModal = ({ item, onClose, onSelect, lang }) => (
  <div className="modal-overlay">
    <div className="variant-box fade-in-up">
      <h3>{txt(item.name, lang)}</h3>
      <p>{UI[lang].choose}:</p>
      <div className="variant-options">
        {item.variants.map((v, i) => (
          <button key={i} onClick={() => onSelect(v)} className="variant-btn">
            <span>{txt(v.l, lang)}</span>
            <span className="var-price">€{v.p.toFixed(2)}</span>
          </button>
        ))}
      </div>
      <button onClick={onClose} className="close-link">{UI[lang].closed || "Close"}</button>
    </div>
  </div>
);

// --- COMPONENT: COCKTAIL SOMMELIER ---
const CocktailSommelier = ({ lang }) => {
    const [step, setStep] = useState(0); // 0: Start, 1: Alcohol, 2: Flavor, 3: Base, 4: Results
    const [pref, setPref] = useState({ alcohol: true, flavor: '', base: '' });
    const [results, setResults] = useState([]);

    const handleStart = () => setStep(1);

    const handleAlcohol = (hasAlcohol) => {
        setPref({ ...pref, alcohol: hasAlcohol });
        if (!hasAlcohol) {
            setResults(SOMMELIER_DB.mocktails);
            setStep(4);
        } else {
            setStep(2);
        }
    };

    const handleFlavor = (flavor) => {
        setPref({ ...pref, flavor });
        setStep(3);
    };

    const handleBase = (base) => {
        setPref({ ...pref, base });
        calculate(pref.flavor, base);
    };

    const calculate = (flavor, base) => {
        let list = SOMMELIER_DB.cocktails.filter(c => {
            if (c.type !== flavor) return false;
            if (base === 'any') return true;
            if (c.base === 'all' || c.base === 'other') return true;
            return c.base === base;
        });
        
        // Fallback
        if (list.length === 0) {
            list = SOMMELIER_DB.cocktails.filter(c => c.type === flavor);
        }

        // Randomize and take 3
        const shuffled = list.sort(() => 0.5 - Math.random());
        setResults(shuffled.slice(0, 3));
        setStep(4);
    };

    const restart = () => {
        setStep(0);
        setResults([]);
        setPref({ alcohol: true, flavor: '', base: '' });
    };

    // UI RENDERING
    return (
        <div className="sommelier-container">
            <h2 className="som-title"><Sparkles size={18}/> {step === 0 ? UI[lang].sommelier_title : "Sommelier"}</h2>
            
            {step === 0 && (
                <div className="som-step fade-in">
                    <p>{UI[lang].sommelier_desc}</p>
                    <button className="som-btn-start" onClick={handleStart}>{UI[lang].sommelier_btn}</button>
                </div>
            )}

            {step === 1 && (
                <div className="som-step fade-in">
                    <p className="q-text">1. {lang === 'el' ? "Θέλεις Αλκοόλ;" : "Do you want Alcohol?"}</p>
                    <button className="som-btn" onClick={() => handleAlcohol(true)}>{lang === 'el' ? "Ναι, με αλκοόλ" : "Yes, with alcohol"}</button>
                    <button className="som-btn" onClick={() => handleAlcohol(false)}>{lang === 'el' ? "Όχι, Alcohol Free" : "No, Alcohol Free"}</button>
                </div>
            )}

            {step === 2 && (
                <div className="som-step fade-in">
                    <p className="q-text">2. {lang === 'el' ? "Τι γεύση προτιμάς;" : "What flavors do you like?"}</p>
                    <button className="som-btn" onClick={() => handleFlavor('sweet')}>{lang === 'el' ? "Γλυκό & Φρουτώδες" : "Sweet & Fruity"}</button>
                    <button className="som-btn" onClick={() => handleFlavor('sour')}>{lang === 'el' ? "Ξινό & Δροσερό" : "Sour & Refreshing"}</button>
                    <button className="som-btn" onClick={() => handleFlavor('bitter')}>{lang === 'el' ? "Πικρό & Στιβαρό" : "Bitter & Dry"}</button>
                    <button className="som-btn" onClick={() => handleFlavor('strong')}>{lang === 'el' ? "Πολύ Δυνατό / Spicy" : "Strong / Spicy"}</button>
                </div>
            )}

            {step === 3 && (
                <div className="som-step fade-in">
                    <p className="q-text">3. {lang === 'el' ? "Αγαπημένη βάση;" : "Favorite Spirit?"}</p>
                    <button className="som-btn" onClick={() => handleBase('rum')}>{lang === 'el' ? "Ρούμι (Rum)" : "Rum"}</button>
                    <button className="som-btn" onClick={() => handleBase('vodka')}>{lang === 'el' ? "Βότκα (Vodka)" : "Vodka"}</button>
                    <button className="som-btn" onClick={() => handleBase('gin')}>{lang === 'el' ? "Τζιν (Gin)" : "Gin"}</button>
                    <button className="som-btn" onClick={() => handleBase('tequila')}>{lang === 'el' ? "Τεκίλα (Tequila)" : "Tequila"}</button>
                    <button className="som-btn" onClick={() => handleBase('whiskey')}>{lang === 'el' ? "Ουίσκι (Whiskey)" : "Whiskey"}</button>
                    <button className="som-btn" onClick={() => handleBase('any')}>{lang === 'el' ? "Όλα (Any)" : "Any"}</button>
                </div>
            )}

            {step === 4 && (
                <div className="som-results fade-in-up">
                    <p className="q-text">{lang === 'el' ? "Σου προτείνουμε:" : "We recommend:"}</p>
                    {results.map((drink, idx) => (
                        <div key={idx} className="som-card">
                            <h4>{drink.name}</h4>
                            <p>{txt(drink.ingredients, lang)}</p>
                        </div>
                    ))}
                    <button className="restart-link" onClick={restart}>{lang === 'el' ? "Πάμε πάλι;" : "Try again?"}</button>
                </div>
            )}
        </div>
    );
};

// --- MAIN APP ---
function SecretMenu() {
  const [mood, setMood] = useState(null);
  const [category, setCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showMyList, setShowMyList] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [toast, setToast] = useState(null);
  const [lang, setLang] = useState('el');
  const [variantItem, setVariantItem] = useState(null);

  const handleFavClick = (item) => {
    if (item.variants) setVariantItem(item);
    else toggleFav(item);
  };

  const toggleFav = (item, variant = null) => {
    const itemName = txt(item.name, lang);
    const variantLabel = variant ? txt(variant.l, lang) : "";
    const cartName = variant ? `${itemName} (${variantLabel})` : itemName;
    const cartPrice = variant ? variant.p : item.price;

    setFavorites(prev => {
      const exists = prev.find(i => i.cartName === cartName);
      if (exists) {
        showToast(`${cartName} removed`);
        return prev.filter(i => i.cartName !== cartName);
      }
      showToast(`${cartName} added!`);
      return [...prev, { ...item, cartName, realPrice: cartPrice }];
    });
    setVariantItem(null);
  };

  const removeFromFav = (cartNameToRemove) => {
    setFavorites(prev => prev.filter(i => i.cartName !== cartNameToRemove));
    showToast("Removed");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  };

  const MobileWrapper = ({ children }) => (
    <div className="mobile-wrapper">
      <div className="menu-phone-frame">
        {children}
        {toast && <div className="toast-notification">{toast}</div>}
        {variantItem && <VariantModal item={variantItem} onClose={() => setVariantItem(null)} onSelect={(v) => toggleFav(variantItem, v)} lang={lang}/>}
      </div>
    </div>
  );

  // 1. MOOD / HOME
  if (!mood) {
    return (
      <MobileWrapper>
        <div className="menu-content mood-bg">
           <div className="top-bar-actions">
             <button onClick={() => setLang(lang === 'en' ? 'el' : 'en')} className="lang-btn"><Globe size={14}/> {lang.toUpperCase()}</button>
           </div>
           <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="logo-small"/>
           <h1 className="mood-title">{UI[lang].vibe}</h1>
           
           <div className="grid-menu">
             <div className="grid-item" onClick={() => setMood('coffee')} style={{backgroundImage:`url(${ASSETS.grid_coffee})`}}><span>{UI[lang].t_coffee}</span></div>
             <div className="grid-item" onClick={() => setMood('food')} style={{backgroundImage:`url(${ASSETS.grid_food})`}}><span>{UI[lang].t_food}</span></div>
             <div className="grid-item" onClick={() => setMood('drinks')} style={{backgroundImage:`url(${ASSETS.grid_cocktails})`}}><span>{UI[lang].t_drinks}</span></div>
             <div className="grid-item" onClick={() => setMood('wine')} style={{backgroundImage:`url(${ASSETS.grid_wine})`}}><span>{UI[lang].t_wine}</span></div>
           </div>
           
           <button className="btn-full-menu" onClick={() => setMood('all')}>{UI[lang].full}</button>
           
           {/* COCKTAIL SOMMELIER INSERTED HERE */}
           <CocktailSommelier lang={lang} />

        </div>
      </MobileWrapper>
    );
  }

  // 2. MY LIST
  if (showMyList) {
     const total = favorites.reduce((sum, i) => sum + (i.realPrice || 0), 0);
     return (
      <MobileWrapper>
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

  // 3. CATEGORY
  if (!category) {
     const visibleCats = MENU_DATA.filter(cat => {
        if(mood === 'all') return true;
        if(mood === 'coffee') return ['coffee', 'brunch', 'dessert'].includes(cat.id);
        if(mood === 'food') return ['food', 'starters', 'main', 'brunch'].includes(cat.id);
        if(mood === 'drinks') return ['signatures', 'classics', 'beer'].includes(cat.id);
        if(mood === 'wine') return ['wine', 'spirits'].includes(cat.id);
        return true;
     });

     return (
      <MobileWrapper>
        <div className="menu-content">
           <div className="sticky-header">
              <button onClick={() => setMood(null)} className="icon-btn"><ChevronDown/></button>
              <span className="header-title">{UI[lang].menu}</span>
              <button onClick={() => setShowMyList(true)} className="icon-btn relative">
                 <Heart fill={favorites.length > 0 ? "#C5A065" : "none"} color="#C5A065"/>
                 {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
              </button>
           </div>
           
           <div className="review-area">
             <a href="https://www.google.com/search?q=Paseo+Lounge+Bar+Reviews" target="_blank" className="btn-gold small">
               <Star size={12} fill="black"/> {UI[lang].review}
             </a>
           </div>

           <div className="cat-grid">
              {visibleCats.map(cat => (
                 <div key={cat.id} className="cat-card" onClick={() => setCategory(cat)} style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${cat.img})`}}><h3>{txt(cat.title, lang)}</h3></div>
              ))}
           </div>
        </div>
      </MobileWrapper>
     );
  }

  // 4. ITEMS
  return (
   <MobileWrapper>
     <div className="menu-content">
        <div className="cat-header-hero" style={{backgroundImage: `url(${category.img})`}}>
           <div className="overlay-grad">
              <button onClick={() => setCategory(null)} className="back-bubble"><ChevronRight style={{transform:'rotate(180deg)'}}/></button>
              <h1>{txt(category.title, lang)}</h1>
           </div>
        </div>
        <div className="items-scroll">
           
           {category.type === 'card' && <div className="cards-stack">{category.items.map((item, i) => (
              <div key={i} className="menu-card">
                 {item.ribbon && <div className="ribbon">{item.ribbon}</div>}
                 <div className="card-details">
                   <h4>{txt(item.name, lang)} {renderTags(item.tags)}</h4>
                   <p>{txt(item.desc, lang)}</p>
                   <span className="price">{displayPrice(item)}</span>
                 </div>
                 <button className="fav-btn" onClick={() => handleFavClick(item)}>
                   <Heart size={20} fill={favorites.some(f => f.name === item.name) ? "#C5A065" : "none"} color="#C5A065"/>
                 </button>
              </div>
           ))}</div>}
           
           {category.type === 'list' && <div className="list-stack">{category.items.map((item, i) => (
              <div key={i} className="menu-list-item">
                 <div className="list-text"><h4>{txt(item.name, lang)} {renderTags(item.tags)}</h4>{item.desc && <p>{txt(item.desc, lang)}</p>}</div>
                 <div className="list-right">
                   <span className="price">{displayPrice(item)}</span>
                   <button className="fav-mini" onClick={() => handleFavClick(item)}><Heart size={16} fill={favorites.some(f => f.name === item.name) ? "#C5A065" : "none"} color="#C5A065"/></button>
                 </div>
              </div>
           ))}</div>}
           
           {category.type === 'group' && <div className="group-stack">{category.groups.map((grp, i) => (
              <div key={i} className="accordion">
                 <div className="accordion-header" onClick={() => setExpandedGroup(expandedGroup === grp.name ? null : grp.name)}>
                   <span>{txt(grp.name, lang)}</span>{expandedGroup === grp.name ? <ChevronUp/> : <ChevronDown/>}
                 </div>
                 {expandedGroup === grp.name && <div className="accordion-body">{grp.items.map((item, idx) => (
                    <div key={idx} className="simple-row-price">
                      <span>{txt(item.name, lang)}</span>
                      <div className="row-end">
                        <span className="price-tag">{displayPrice(item)}</span>
                        <button className="fav-mini" onClick={() => handleFavClick(item)}>
                          <Heart size={14} fill={favorites.some(f => f.name === item.name) ? "#C5A065" : "none"} color="#C5A065"/>
                        </button>
                      </div>
                    </div>
                 ))}</div>}
              </div>
           ))}</div>}
        </div>
        
        {favorites.length > 0 && <div className="floating-bar" onClick={() => setShowMyList(true)}><span>{UI[lang].myList} ({favorites.length})</span><ChevronUp size={16}/></div>}
     </div>
   </MobileWrapper>
  );
}

// --- PUBLIC SITE ---
const ReviewsSlider = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(prev => (prev + 1) % 3), 4000);
    return () => clearInterval(timer);
  }, []);
  const revs = [
    { u: "Maria K.", t: "Best cocktails in Kavala!", s: 5 },
    { u: "John D.", t: "Amazing atmosphere.", s: 5 },
    { u: "Elena P.", t: "Great brunch.", s: 5 }
  ];
  return (
    <div className="reviews-slider">
      <div className="stars">{'★'.repeat(revs[idx].s)}</div>
      <p>"{revs[idx].t}"</p>
      <span>- {revs[idx].u}</span>
    </div>
  );
};

function PublicSite() {
  const navigate = useNavigate();
  return (
    <div className="public-root">
      <div className="bg-image" style={{backgroundImage: `url(${ASSETS.heroImage})`}}><div className="overlay"></div></div>
      <div className="public-content">
        <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="logo-main"/>
        <h2 className="tagline">PREMIUM LOUNGE EXPERIENCE</h2>
        <ReviewsSlider />
        <div className="info-box secret-trigger" onClick={() => navigate('/qr-menu')}>
           <Clock size={24} color="#C5A065"/><p>Daily 08:00 - 03:00</p><span className="status-badge open">OPEN NOW</span>
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