import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Heart, X, ChevronDown, ChevronUp, Clock, Star, Map, Instagram, MessageCircle, Globe, ChevronRight, Flame, Leaf, Sparkles, Dices, ShoppingBag, Wifi, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// --- ASSETS ---
const ASSETS = {
  heroImage: "/hero-bg.jpg",
  grid_coffee: "/hot-coffee.jpg",
  grid_food: "/burger.jpg",
  grid_cocktails: "/signature.jpg",
  grid_wine: "/wine.jpg",
  cat_coffee_hot: "/hot-coffee.jpg",
  cat_coffee_cold: "/cold-coffee.jpg",
  cat_beverages: "/smoothies.jpg",
  cat_brunch: "/brunch.jpg",
  cat_starters: "/starters.jpg",
  cat_food: "/burger.jpg",
  cat_main: "/main-dishes.jpg",
  cat_signatures: "/signature.jpg",
  cat_cocktails_list: "/cocktails.jpg",
  cat_spirits: "/spirits.jpg",
  cat_wine: "/wine.jpg",
  cat_dessert: "/desserts.jpg",
};

// --- TRANSLATIONS ---
const UI = {
  el: {
    menu: "ΜΕΝΟΥ", myList: "Η Λίστα μου", empty: "Η λίστα είναι άδεια", total: "Σύνολο",
    waiter: "Δείξτε αυτή την οθόνη στον σερβιτόρο.", book: "ΚΡΑΤΗΣΗ", open: "ΑΝΟΙΧΤΑ", closed: "ΚΛΕΙΣΤΑ",
    review: "Αξιολογήστε μας", choose: "Επιλέξτε", glass: "Ποτήρι", bottle: "Φιάλη",
    vibe: "Επιλέξτε Κατηγορία", full: "Πλήρες Μενού",
    t_coffee: "Καφές & Πρωινό", t_food: "Φαγητό & Snacks", t_drinks: "Cocktails & Ποτά", t_wine: "Κρασί & Γλυκό",
    sommelier_title: "Δεν ξέρεις τι να διαλέξεις;", sommelier_desc: "Ο ψηφιακός Sommelier θα βρει το ποτό σου σε 3 βήματα!", sommelier_btn: "Βρες το ποτό μου",
    lucky_btn: "Νιώθω Τυχερός", lucky_title: "Η τύχη επιλέγει...", lucky_res: "Η πρότασή μας:",
    disclaimer: "Εάν έχετε αλλεργίες, παρακαλούμε ενημερώστε μας.",
    added: "Προστέθηκε", removed: "Αφαιρέθηκε",
    loading: "Φόρτωση Paseo Experience..."
  },
  en: {
    menu: "MENU", myList: "My Selection", empty: "Your list is empty", total: "Total",
    waiter: "Show this screen to your waiter.", book: "BOOK A TABLE", open: "OPEN NOW", closed: "CLOSED",
    review: "Rate us on Google", choose: "Select Option", glass: "Glass", bottle: "Bottle",
    vibe: "Select Category", full: "Full Menu",
    t_coffee: "Coffee & Breakfast", t_food: "Food & Snacks", t_drinks: "Cocktails & Spirits", t_wine: "Wine & Dessert",
    sommelier_title: "Can't decide?", sommelier_desc: "Let our digital Sommelier find your drink in 3 steps!", sommelier_btn: "Find my drink",
    lucky_btn: "I'm Feeling Lucky", lucky_title: "Fate is choosing...", lucky_res: "We recommend:",
    disclaimer: "If you have any food allergies please inform us.",
    added: "Added", removed: "Removed",
    loading: "Loading Paseo Experience..."
  }
};

// --- MENU DATA (COMPLETE) ---
const MENU_DATA = [
  // COFFEE & BEVERAGES
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
      { name: {el: "Espresso Corretto Διπλός", en: "Espresso Corretto Double"}, price: 5.00 },
      { name: {el: "Mochaccino Ζεστό", en: "Mochaccino Hot"}, price: 4.50, desc: {el: "Σοκολάτα, Espresso, Γάλα, Σαντιγί", en: "Chocolate, Espresso, Milk, Whipped Cream"} }
    ]
  },
  {
    id: 'coffee_cold', title: {el: "Καφέδες Κρύοι", en: "Cold Coffee"}, type: 'list', img: ASSETS.cat_coffee_cold,
    items: [
      { name: "Freddo Espresso", price: 3.50 },
      { name: "Freddo Cappuccino", price: 4.00 },
      { name: "Freddo Cappuccino Crema", price: 4.20 },
      { name: {el: "Εξτρα Δόση Espresso", en: "Extra Dose Espresso"}, price: 0.50 },
      { name: "Nescafe Frappe", price: 3.00 },
      { name: "Nescafe Ice Cream Frappe", price: 4.50 },
      { name: "Nescafe Frappe Baileys", price: 5.00 },
      { name: "Espresso Affogato", price: 5.00, desc: {el: "Διπλός με παγωτό βανίλια", en: "Double with Vanilla Ice Cream"} },
      { name: {el: "Mochaccino Κρύο", en: "Mochaccino Cold"}, price: 4.50, desc: {el: "Σοκολάτα, Espresso, Γάλα, Σαντιγί, Μπισκότο", en: "Chocolate, Espresso, Milk, Whipped Cream, Biscuits"} }
    ]
  },
  {
    id: 'beverages', title: {el: "Ροφήματα & Αναψυκτικά", en: "Beverages & Refreshments"}, type: 'group', img: ASSETS.cat_beverages,
    groups: [
        {
            name: {el: "Σοκολάτες & Τσάι", en: "Chocolate & Tea"},
            items: [
                { name: {el: "Σοκολάτα Κλασική", en: "Classic Chocolate"}, price: 4.00 },
                { name: {el: "Σοκολάτα Φουντούκι", en: "Hazelnut Chocolate"}, price: 4.20 },
                { name: {el: "Σοκολάτα Φράουλα", en: "Strawberry Chocolate"}, price: 4.20 },
                { name: {el: "Σοκολάτα Μπανάνα", en: "Banana Chocolate"}, price: 4.20 },
                { name: {el: "Σοκολάτα Καρύδα", en: "Coconut Chocolate"}, price: 4.20 },
                { name: {el: "Σοκολάτα Λευκή", en: "White Chocolate"}, price: 4.20 },
                { name: {el: "+ Σαντιγί", en: "+ Whipped Cream"}, price: 0.50 },
                { name: {el: "Κακάο", en: "Cocoa"}, price: 3.00 },
                { name: {el: "Τσάι Ζεστό", en: "Hot Tea"}, price: 3.00, desc: {el: "Πράσινο • Μαύρο • Βουνού • Χαμομήλι • Μέντα • Κανέλα • Τριαντάφυλλο • Φλαμούρι • Μήλο-Κανέλα • Φρούτα Δάσους • Μάνγκο-Κανέλα-Πορτοκάλι • Βανίλια-Καραμέλα • Μαύρο με Λεμόνι • Μαύρο με Ρόδι", en: "Green • Black • Mountain • Chamomile • Mint • Cinnamon • Rose • Lime Blossom • Apple-Cinnamon • Forest Fruits • Mango-Cinnamon-Orange • Vanilla-Caramel • Black with Lemon • Black with Pomegranate"} },
                { name: {el: "Τσάι Κρύο", en: "Cold Tea"}, price: 3.00, desc: {el: "Λεμόνι • Ροδάκινο • Πράσινο • Πεπόνι • Φρούτα Δάσους", en: "Lemon • Peach • Green • Melon • Forest Fruits"} }
            ]
        },
        {
            name: {el: "Σπιτικά Ροφήματα", en: "Handmade Beverages"},
            items: [
                { name: {el: "Λεμονάδα με Μαστίχα", en: "Lemonade with Mastic"}, price: 4.00 },
                { name: {el: "Λεμονάδα με Τζίντζερ", en: "Lemonade with Ginger"}, price: 4.00 },
                { name: {el: "Ροζ Γκρέιπφρουτ", en: "Pink Grapefruit"}, price: 4.00 },
                { name: {el: "Ροδακινάδα", en: "Peach Lemonade"}, price: 4.00 },
                { name: {el: "Φραουλάδα", en: "Strawberry Lemonade"}, price: 4.00 },
                { name: {el: "Βυσσινάδα", en: "Sour Cherry"}, price: 4.00 }
            ]
        },
        {
            name: {el: "Smoothies & Milkshakes", en: "Smoothies & Milkshakes"},
            items: [
                { name: "Caribbean Dream", price: 6.00, desc: {el: "Φράουλα, ανανάς, καρύδα", en: "Strawberry, pineapple, coconut"} },
                { name: "Forest Melody", price: 6.00, desc: {el: "Φράουλα, βατόμουρο, φραγκοστάφυλο", en: "Strawberry, blackberry, gooseberry"} },
                { name: "Tropical Sunset", price: 6.00, desc: {el: "Ανανάς, φρούτα πάθους, μάνγκο", en: "Pineapple, passion fruit, mango"} },
                { name: "Sunrise Energy", price: 6.50, desc: {el: "Βρώμη, μπανάνα, σκούρη σοκολάτα, φράουλα, αβοκάντο, βανίλια, μέλι, μύρτιλο", en: "Oat, banana, dark chocolate, strawberry, avocado, vanilla, honey, blueberry"} },
                { name: "Strawberry Fantasy", price: 6.00, desc: {el: "Φράουλα, μπανάνα", en: "Strawberry, banana"} },
                { name: "Super Protein", price: 6.50, desc: {el: "Ρόδι, φράουλα, μύρτιλο, σπόροι κάνναβης, πρωτεΐνη, σπιρουλίνα, χλωρέλλα", en: "Pomegranate, strawberry, blueberry, hemp seeds, protein pellets, spirulina, chlorella"} },
                { name: "Milkshake", price: 5.00, desc: {el: "Βανίλια, Σοκολάτα, Φράουλα, Γιαούρτι", en: "Vanilla, Chocolate, Strawberry, Yoghurt"} },
                { name: {el: "Γρανίτα", en: "Granita"}, price: 4.50, desc: {el: "Φράουλα, Λεμόνι", en: "Strawberry, Lemon"} }
            ]
        },
        {
            name: {el: "Αναψυκτικά & Χυμοί", en: "Refreshments & Juices"},
            items: [
                { name: {el: "Φυσικός Πορτοκάλι", en: "Fresh Orange Juice"}, price: 4.00 },
                { name: {el: "Φυσικός Ανάμεικτος", en: "Seasonal Fresh Fruit"}, price: 4.50 },
                { name: {el: "Φυσικός Ρόδι", en: "Fresh Pomegranate"}, price: 4.00 },
                { name: {el: "Φυσικός Ρόδι με Μύρτιλο", en: "Fresh Pomegranate & Blueberry"}, price: 4.50 },
                { name: "Amita", price: 3.00, desc: {el: "Μήλο, Βύσσινο, Μπανάνα, Ανανάς, Ροδάκινο, Λεμόνι, Κράνμπερι", en: "Apple, Sour Cherry, Banana, Pineapple, Peach, Lemon, Cranberry"} },
                { name: "Amita Motion", price: 3.00 },
                { name: "Coca Cola / Zero", price: 3.00 },
                { name: "Fanta Orange / Lemonade", price: 3.00 },
                { name: "Sprite", price: 3.00 },
                { name: "Schweppes Pink Grapefruit", price: 3.00 },
                { name: "Schweppes Tonic / Soda", price: 3.00 },
                { name: {el: "Ανθρακούχο Νερό", en: "Carbonated Mineral Water"}, price: 3.00 },
                { name: "Red Bull / Monster", price: 5.00 },
                { name: "Gordon's Space", price: 6.00 },
                { name: "Apple Cider (Milokleftis)", price: 5.50 },
                { name: "Cider Mango-Lime", price: 5.50 },
                { name: "Water 0.5L", price: 0.50 },
                { name: "Water 1L", price: 1.00 }
            ]
        }
    ]
  },
  // FOOD
  {
    id: 'brunch', title: {el: "Brunch & Πρωινό", en: "Brunch & Breakfast"}, type: 'card', img: ASSETS.cat_brunch,
    items: [
      { name: {el: "Πολύσπορο", en: "Whole Grain Sandwich"}, price: 2.50, desc: {el: "Γαλοπούλα, μασκαρπόνε, γκούντα, μαρούλι", en: "Turkey, mascarpone, gouda, lettuce"} },
      { name: "Ciabatta", price: 2.50, desc: {el: "Μοτσαρέλα, προσούτο, ρόκα, πέστο, μασκαρπόνε", en: "Mozzarella, prosciutto, rocca, pesto, mascarpone"} },
      { name: "Baguettini", price: 2.50, desc: {el: "Ντοματίνι, γκερεμέζι, πάστα ελιάς, μαρούλι, μασκαρπόνε", en: "Cherry tomato, geremezi cheese, olive paste, lettuce, mascarpone"} },
      { name: "Toast", price: 3.50, desc: {el: "Ζαμπόν/Γαλοπούλα, Κασέρι", en: "Ham/Turkey, Cheese"} },
      { name: {el: "Τοστ με Πατάτες", en: "Toast with Fries"}, price: 4.00 },
      { name: {el: "Φοκάτσια Σπιτική", en: "Homemade Focaccia"}, price: 6.00, desc: {el: "Μορταδέλα με φυστίκι, πέστο φυστικιού, κατίκι, ρόκα", en: "Peanut mortadella, pistachio pesto, katiki cheese, rocca"} },
      { name: {el: "Αυγά Τηγανητά", en: "Fried Eggs"}, price: 6.50, desc: {el: "2 αυγά, καβουρμάς, ψωμί", en: "2 fried eggs, handmade kavourma, bread"} },
      { name: "Scrambled Eggs", price: 7.50, desc: {el: "Φέτα, αβοκάντο, ντοματίνια κονφί, φρυγανισμένο ψωμί", en: "Feta, avocado, cherry tomatoes confit, toasted bread"}, tags: ['veg'] },
      { name: {el: "Ομελέτα Χωριάτικη", en: "Country Omelette"}, price: 6.50, desc: {el: "Πιπεριά, ντομάτα, πατάτες, κατίκι", en: "Green pepper, tomato, potatoes, katiki cheese"} },
      { name: {el: "Ομελέτα", en: "Omelette"}, price: 7.00, desc: {el: "Τυριά, λαχανικά, αλλαντικά", en: "Cheese, vegetables, cold cuts variety"} },
      { name: "Pancakes Savory", price: 7.00, desc: {el: "Μπέικον, τυρί, αυγό, ολλαντέζ", en: "Bacon, cheese, fried egg, hollandaise"} },
      { name: "Prosciutto Cotto Pancakes", price: 8.00, desc: {el: "Αυγό, κρέμα μετσόβου, ντοματίνια, χαρούπι, θυμάρι", en: "Fried egg, metsovone cream, tomatoes confit, carob, thyme"} },
      { name: "Chicken Pancakes", price: 8.50, desc: {el: "Μπέικον, σάλτσα τσένταρ, καλαμπόκι, πιπεριά, ολλαντέζ", en: "Bacon, cheddar sauce, corn, pepper, hollandaise"} },
      { name: "Chocolate Pancakes", price: 7.50, desc: {el: "Πραλίνα φουντουκιού, μπισκότο", en: "Hazelnut praline, biscuit"}, tags: ['popular'] },
      { name: "Bueno Pancakes", price: 7.50, desc: {el: "Πραλίνα Bueno, τραγανή βάφλα", en: "Bueno praline, crispy waffle"} },
      { name: "Ferrero Rocher Pancakes", price: 8.00, desc: {el: "Πραλίνα, φουντούκια, κακάο, βάφλα", en: "Praline, hazelnuts, cocoa, crispy waffle"} },
      { name: "Banoffee Pancakes", price: 8.00, desc: {el: "Μπανάνα, καραμέλα γάλακτος, μπισκότο", en: "Banana, dulce de leche, biscuit"} },
      { name: {el: "Βάφλα Σοκολάτα", en: "Waffle Chocolate"}, price: 6.00 },
      { name: {el: "Βάφλα Bueno", en: "Waffle Bueno"}, price: 6.00 },
      { name: {el: "Βάφλα Ferrero", en: "Waffle Ferrero"}, price: 6.50 },
      { name: {el: "Βάφλα Σοκολάτα & Μπανάνα", en: "Waffle Chocolate & Banana"}, price: 6.50 },
      { name: {el: "+ Μπάλα Παγωτό", en: "+ Ice Cream Scoop"}, price: 2.00, desc: {el: "Βανίλια, Σοκολάτα, Καραμέλα, Φράουλα", en: "Vanilla, Chocolate, Caramel, Strawberry"} }
    ]
  },
  {
    id: 'food', title: {el: "Φαγητό & Snacks", en: "Food & Snacks"}, type: 'card', img: ASSETS.cat_food,
    items: [
      { name: "Crostini Caprese (5pcs)", price: 6.50, tags: ['veg'] },
      { name: {el: "Μπρουσκέτες Ψαρονέφρι (5τμχ)", en: "Bruschetta Pork (5pcs)"}, price: 7.50, ribbon: "New" },
      { name: "Tragano (4pcs)", price: 8.00, tags: ['veg'] },
      { name: "Ethnic Basket (14pcs)", price: 12.00, desc: "Arancini, Empanadas, Spring rolls", ribbon: "Sharing" },
      { name: "Caliente (8pcs)", price: 7.50, desc: {el: "Κροκέτες τυριού, καυτερή πιπεριά, μοτσαρέλα στικς", en: "Cheese nuggets, spicy peppers, mozzarella sticks"}, tags: ['spicy'] },
      { name: "Springrolls (Vegan) (4pcs)", price: 7.00, tags: ['vegan'] },
      { name: "Falafel (5pcs)", price: 7.00, tags: ['vegan'] },
      { name: "Veggie Burger (2pcs)", price: 7.00, tags: ['vegan'] },
      { name: {el: "Γλάστρα Σαλάτα", en: "Flower Pot Salad"}, price: 9.00, desc: {el: "Κατσικίσιος κορμός, παξιμάδι, ντοματίνια, θυμάρι", en: "Goat cheese, carob crackers, cherry tomatoes, thyme"}, tags: ['veg'] },
      { name: {el: "Η Ζεστή Σαλάτα", en: "The Warm One"}, price: 9.50, desc: {el: "Σπανάκι, ρόκα, μοσχάρι σοτέ, φέτα τηγανητή", en: "Spinach, arugula, saute beef, fried feta"} },
      { name: "Paseo Caesar's", price: 9.50, desc: {el: "Iceberg, κοτόπουλο πανέ, μπέικον, σως καίσαρα", en: "Iceberg, crispy chicken, bacon, caesar's sauce"} },
      { name: {el: "Λαχανόκηπος", en: "Vegetable Garden"}, price: 8.00, desc: {el: "Iceberg, ρόκα, σπανάκι, αβοκάντο, βινεγκρέτ", en: "Iceberg, rocca, spinach, avocado, vinaigrette"}, tags: ['vegan'] },
      { name: "Pizza Special", price: 14.00, desc: {el: "Μοτσαρέλα, σάλτσα, μπέικον, μανιτάρια, πιπεριές", en: "Mozzarella, sauce, bacon, mushrooms, peppers"} },
      { name: "Beef Bao Buns (3pcs)", price: 10.00 },
      { name: "Chicken Bao Buns (3pcs)", price: 9.50 },
      { name: "Fajitas Chicken", price: 12.50 },
      { name: "Mini Burgers (2pcs)", price: 9.00 },
      { name: "Club Sandwich Classic", price: 8.00 },
      { name: "Club Sandwich Chicken", price: 9.00 },
      { name: {el: "Club Sandwich Καβουρμάς", en: "Club Sandwich Kavurma"}, price: 9.00 },
      { name: "Chicken Nuggets (9pcs)", price: 7.00 },
      { name: {el: "Κοτομπουκιές με Philadelphia (8τμχ)", en: "Nuggets Philadelphia (8pcs)"}, price: 7.00 },
      { name: {el: "Πατάτες Τηγανητές", en: "French Fries"}, price: 4.00 },
      { name: "Smoked Burger", price: 9.50, desc: {el: "Μπέικον, Jack Daniels σως", en: "Bacon, Jack Daniels sauce"} },
      { name: {el: "Καπνιστό Μπέργκερ XL", en: "Smoked Burger XL"}, price: 13.00, ribbon: "XL Size" },
      { name: "Sweet & Hot Burger", price: 9.50, desc: {el: "Τσένταρ, Τσιπότλε σως", en: "Cheddar, Chipotle sauce"}, tags: ['spicy'] },
      { name: "Black Angus Burger", price: 13.00, desc: {el: "Premium κιμάς, μπέικον jam, τρούφα", en: "Premium beef, bacon jam, truffle"}, ribbon: "Premium" }
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
      { name: {el: "Πιατέλα Τυριών", en: "Cheese Platter"}, variants: [{p:8, l:{el:'2 ατόμων', en:'2 Persons'}}, {p:14, l:{el:'4 ατόμων', en:'4 Persons'}}] },
      { name: {el: "Πιατέλα Αλλαντικών/Τυριών", en: "Cold Cuts & Cheese Platter"}, variants: [{p:8, l:{el:'2 ατόμων', en:'2 Persons'}}, {p:14, l:{el:'4 ατόμων', en:'4 Persons'}}] }
    ]
  },
  // DRINKS
  {
    id: 'signatures', title: { el: "Signature & Special", en: "Signature & Special" }, type: 'card', img: ASSETS.cat_signatures,
    items: [
      { name: "Zombie", price: 10.00, desc: {el: "Blend Ρούμι (Λευκό/Μαύρο/Χρυσό), Cointreau, Μπράντυ, Ανανάς, Πορτοκάλι, Γρεναδίνη, Λάιμ", en: "Rum blend (White/Dark/Gold), Cointreau, Brandy, Pineapple, Orange, Grenadine, Lime"}, tags: ['strong', 'popular'], ribbon: "Best Seller" },
      { name: "Mai Tai", price: 10.00, desc: {el: "Λευκό & Μαύρο Ρούμι, Λικέρ Πορτοκάλι, Λικέρ Αμύγδαλο, Λάιμ", en: "White & Dark Rum, Orange liqueur, Almond Liqueur, Lime"} },
      { name: "Stoly Kiss", price: 9.00, desc: {el: "Βότκα, Λικέρ Μαστίχας, Amita Κράνμπερι, Πουρές Ρόδι, Λεμόνι", en: "Vodka, Mastic Liqueur, Amita Cranberry, Pomegranate Puree, Lemon"} },
      { name: "Pina Colada", price: 9.00, desc: {el: "Λευκό Ρούμι, Amita Ανανάς, Λικέρ Καρύδας", en: "White Rum, Amita Pineapple, Coconut Liqueur"} },
      { name: "Long Island", price: 10.00, desc: {el: "Triple Sec, Λευκό Ρούμι, Τζιν, Βότκα, Tequila, Coca-Cola, Λάιμ", en: "Triple Sec, White Rum, Gin, Vodka, Tequila, Cola, Lime"} },
      { name: "Bloody Mary", price: 10.00, desc: {el: "Βότκα, Χυμός Ντομάτας, Tabasco, Worcestershire, Σέλερι, Αλάτι, Πιπέρι", en: "Vodka, Tomato Juice, Tabasco, Worcestershire, Celery, Salt, Pepper"} },
      { name: "Paseo Sunset", price: 10.00, tags: ['sweet'], ribbon: "Signature" },
      { name: "Spicy Mango", price: 10.00, tags: ['spicy'] },
    ]
  },
  {
    id: 'cocktails_list', title: {el: "Classics, Aperitivo & 0%", en: "Classics, Aperitivo & 0%"}, type: 'group', img: ASSETS.cat_cocktails_list,
    groups: [
      {
        name: {el: "Classic Cocktails", en: "Classic Cocktails"},
        items: [
          { name: "Mojito", price: 9.00, desc: {el: "Λευκό ρούμι, λάιμ, Schweppes Σόδα, μαύρη ζάχαρη", en: "White Rum, lime, Schweppes Soda, brown sugar"} },
          { name: "Daiquiri", price: 9.00, desc: {el: "Λευκό Ρούμι, λάιμ, σιρόπι ζάχαρης", en: "White Rum, lime, sugar syrup"} },
          { name: "Daiquiri Strawberry", price: 10.00, desc: {el: "Λευκό Ρούμι, λάιμ, πουρές φράουλα, σιρόπι", en: "White Rum, lime, strawberry puree, syrup"} },
          { name: "Margarita", price: 9.00, desc: {el: "Tequila, Triple Sec, Λεμόνι", en: "Tequila, Triple Sec, Lemon"} },
          { name: "Cosmopolitan", price: 9.00, desc: {el: "Βότκα, Triple Sec, Κράνμπερι, Λάιμ", en: "Vodka, Triple Sec, Cranberry, Lime"} },
          { name: "Cuba Libre", price: 8.00, desc: {el: "Λευκό Ρούμι, Cola, Λάιμ, Angostura", en: "White Rum, Cola, Lime, Angostura"} },
          { name: "Caipirinha", price: 8.50, desc: {el: "Cachaca, Λάιμ, Μαύρη Ζάχαρη", en: "Cachaca, Lime, Brown Sugar"} },
          { name: "Caipiroska", price: 8.50, desc: {el: "Βότκα, Λάιμ, Μαύρη Ζάχαρη", en: "Vodka, Lime, Brown Sugar"} },
          { name: "Old Fashioned", price: 9.00, desc: {el: "Ουίσκι, Angostura, Ζάχαρη", en: "Whiskey, Angostura, Sugar"} },
          { name: "Paloma", price: 8.50, desc: {el: "Tequila, Λάιμ, Schweppes Pink Grapefruit", en: "Tequila, Lime, Schweppes Pink Grapefruit"} },
          { name: "Apple Martini", price: 9.00, desc: {el: "Βότκα, Λάιμ, Πουρές Πράσινο Μήλο, Λικέρ Μήλου", en: "Vodka, Lime, Green Apple Puree, Apple Liqueur"} },
          { name: "Gin Cucumber", price: 8.50, desc: {el: "Gin, Σιρόπι Αγγούρι, Λάιμ, Schweppes Σόδα", en: "Gin, Cucumber syrup, Lime, Schweppes Soda"} },
          { name: "Dry Martini", price: 8.50, desc: {el: "Gin, Ξηρό Βερμούτ", en: "Gin, Dry Vermouth"} }
        ]
      },
      {
        name: {el: "Aperitivo", en: "Aperitivo"},
        items: [
           { name: "Aperol Spritz", price: 8.00, desc: {el: "Aperol, Cinzano, Schweppes Σόδα", en: "Aperol, Cinzano, Schweppes Soda"} },
           { name: "Negroni", price: 9.00, desc: {el: "Campari, Bulldog London Dry Gin, Cinzano 1757", en: "Campari, Bulldog London Dry Gin, Cinzano 1757"} }
        ]
      },
      {
        name: {el: "Alcohol Free (0%)", en: "Alcohol Free (0%)"},
        items: [
           { name: "Mango Mule", price: 6.00, desc: {el: "Ανανάς, Λάιμ, Πουρές Μάνγκο, Τόνικ", en: "Pineapple, Lime, Mango Puree, Tonic"}, tags: ['0%'] },
           { name: "Red Paseo", price: 6.00, desc: {el: "Amita Κράνμπερι, Πουρές Ρόδι, Amita Λεμόνι", en: "Amita Cranberry, Pomegranate Puree, Amita Lemon"}, tags: ['0%'] },
           { name: "Lady Lavender", price: 6.00, desc: {el: "Γρεναδίνη, Σιρόπι Λεβάντας, Γκρέιπφρουτ, Schweppes Σόδα", en: "Grenadine, Lavender Syrup, Grapefruit, Schweppes Soda"}, tags: ['0%'] },
           { name: "Green Gentleman", price: 6.50, desc: {el: "Ακτινίδιο, Πορτοκάλι 100%, Πουρές Ροδάκινο", en: "Kiwi, Orange 100%, Peach Puree"}, tags: ['0%'] },
           { name: "Virgin Mojito", price: 6.00, tags: ['0%'] },
           { name: "Tanqueray 0%", price: 7.50, tags: ['0%'] }
        ]
      }
    ]
  },
  // SPIRITS
  {
    id: 'spirits', title: {el: "Κάβα & Μπύρες", en: "Spirits & Beers"}, type: 'group', img: ASSETS.cat_spirits,
    groups: [
      {
        name: {el: "Whiskey Standard", en: "Whiskey Standard"},
        items: [
          { name: "Famous Grouse", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Johnnie Red", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Haig", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jameson", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Tullamore", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Dewars", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Cutty Sark", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Bushmills", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Ballantines", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Grants", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Bells", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "J&B", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Teachers", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
        ]
      },
      {
        name: {el: "Whiskey Premium & Malts", en: "Whiskey Premium & Malts"},
        items: [
          { name: "Jim Beam", variants: [{p: 7.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 75, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Four Roses", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Canadian Club", variants: [{p: 7.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 75, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Johnnie Black 12", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Chivas Regal 12", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jack Daniel's", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Gentleman Jack", variants: [{p: 10, l:{el:'Ποτήρι',en:'Glass'}}, {p: 100, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Naked Malt", variants: [{p: 8.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 85, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jameson Black", variants: [{p: 9, l:{el:'Ποτήρι',en:'Glass'}}, {p: 90, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Dimple", variants: [{p: 9, l:{el:'Ποτήρι',en:'Glass'}}, {p: 90, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Cardhu", variants: [{p: 9, l:{el:'Ποτήρι',en:'Glass'}}, {p: 90, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Dewars 12", variants: [{p: 9, l:{el:'Ποτήρι',en:'Glass'}}, {p: 90, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Crown Royal", variants: [{p: 11, l:{el:'Ποτήρι',en:'Glass'}}, {p: 110, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Glenfiddich 12", variants: [{p: 10, l:{el:'Ποτήρι',en:'Glass'}}, {p: 100, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Glenfiddich Richoak", variants: [{p: 12, l:{el:'Ποτήρι',en:'Glass'}}, {p: 120, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Glenfiddich 15", variants: [{p: 14, l:{el:'Ποτήρι',en:'Glass'}}, {p: 140, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Johnnie Double Black", variants: [{p: 12, l:{el:'Ποτήρι',en:'Glass'}}, {p: 120, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Johnnie Gold", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Johnnie Green", variants: [{p: 14, l:{el:'Ποτήρι',en:'Glass'}}, {p: 140, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Johnnie Blue", variants: [{p: 40, l:{el:'Ποτήρι',en:'Glass'}}, {p: 400, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Talisker", variants: [{p: 11, l:{el:'Ποτήρι',en:'Glass'}}, {p: 110, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Oban", variants: [{p: 14, l:{el:'Ποτήρι',en:'Glass'}}, {p: 140, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Lagavulin 8", variants: [{p: 14, l:{el:'Ποτήρι',en:'Glass'}}, {p: 140, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Lagavulin 16", variants: [{p: 20, l:{el:'Ποτήρι',en:'Glass'}}, {p: 200, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jack Single Barrel", variants: [{p: 15, l:{el:'Ποτήρι',en:'Glass'}}, {p: 150, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Haig Club", variants: [{p: 18, l:{el:'Ποτήρι',en:'Glass'}}, {p: 180, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "The Glenrothes 10YO", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "The Glenrothes WMC", variants: [{p: 18, l:{el:'Ποτήρι',en:'Glass'}}, {p: 180, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Chivas Regal 18", variants: [{p: 22, l:{el:'Ποτήρι',en:'Glass'}}, {p: 220, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jack Gold No.27", variants: [{p: 25, l:{el:'Ποτήρι',en:'Glass'}}, {p: 250, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Macallan 12", variants: [{p: 20, l:{el:'Ποτήρι',en:'Glass'}}, {p: 200, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Macallan 15 Double Cask", variants: [{p: 28, l:{el:'Ποτήρι',en:'Glass'}}, {p: 280, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Macallan Rare Cask", variants: [{p: 60, l:{el:'Ποτήρι',en:'Glass'}}, {p: 600, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: "Vodka",
        items: [
          { name: "Finlandia", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Serkova", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Stolichnaya", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Absolut", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Smirnoff Red", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Russian Standard", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Ursus", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Smirnoff North", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Ketel One", variants: [{p: 9, l:{el:'Ποτήρι',en:'Glass'}}, {p: 90, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Ciroc", variants: [{p: 10, l:{el:'Ποτήρι',en:'Glass'}}, {p: 100, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Belvedere", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Beluga", variants: [{p: 15, l:{el:'Ποτήρι',en:'Glass'}}, {p: 150, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Snow Leopard", variants: [{p: 15, l:{el:'Ποτήρι',en:'Glass'}}, {p: 150, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Grey Goose", variants: [{p: 15, l:{el:'Ποτήρι',en:'Glass'}}, {p: 150, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Stolichnaya Elit", variants: [{p: 20, l:{el:'Ποτήρι',en:'Glass'}}, {p: 200, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: "Gin",
        items: [
          { name: "Juniper", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Gordons", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Beefeater", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Tanqueray", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Bombay", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Hendricks", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Brokers", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Bulldog London Dry", variants: [{p: 9, l:{el:'Ποτήρι',en:'Glass'}}, {p: 90, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Tanqueray 10", variants: [{p: 11, l:{el:'Ποτήρι',en:'Glass'}}, {p: 110, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "G Vine", variants: [{p: 14, l:{el:'Ποτήρι',en:'Glass'}}, {p: 140, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Monkey 47", variants: [{p: 15, l:{el:'Ποτήρι',en:'Glass'}}, {p: 150, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: "Tequila",
        items: [
          { name: "Jose Cuervo Blanco", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jose Cuervo Reposado", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jose Cuervo Tradicional Silver", variants: [{p: 8.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 85, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jose Cuervo Tradicional Reposado", variants: [{p: 8.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 85, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Don Julio Blanco", variants: [{p: 10, l:{el:'Ποτήρι',en:'Glass'}}, {p: 100, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Don Julio Anejo", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Olmeca Dark Choco", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: "Rum",
        items: [
          { name: "Bacardi", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Havana Club", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Havana Dark", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Captain Morgan Dark", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Sailor Jerry", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Appleton", variants: [{p: 8.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 85, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Havana 7", variants: [{p: 8.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 85, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Angostura Anejo Gold", variants: [{p: 8.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 85, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Diplomatico", variants: [{p: 12, l:{el:'Ποτήρι',en:'Glass'}}, {p: 120, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Zacapa", variants: [{p: 13, l:{el:'Ποτήρι',en:'Glass'}}, {p: 130, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Κονιάκ / Brandy", en: "Cognac / Brandy"},
        items: [
          { name: "Metaxa 3*", variants: [{p: 6.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 65, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Metaxa 5*", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Metaxa 7*", variants: [{p: 7.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 75, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Metaxa Private Reserve", variants: [{p: 17, l:{el:'Ποτήρι',en:'Glass'}}, {p: 170, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Hennessy VS", variants: [{p: 16, l:{el:'Ποτήρι',en:'Glass'}}, {p: 160, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Courvoisier VS", variants: [{p: 12, l:{el:'Ποτήρι',en:'Glass'}}, {p: 120, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Λικέρ & Απεριτίφ", en: "Liqueur & Aperitivo"},
        items: [
          { name: "Aperol", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Campari", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Amaretto", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Jagermeister", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Southern Comfort", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Kahlua", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Martini Bianco", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Martini Dry", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Baileys", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Drambuie", variants: [{p: 8.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 85, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Sambuca", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Mastiha", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Malibu", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Batida de Coco", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Martini Rosso", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Martini Rosato", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Limoncello", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Apple Sourz", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Heering Cherry", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Porto", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Cointreau", variants: [{p: 8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 80, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Cachaca", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Tia Maria", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Benedictine", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Schnapps Peach", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Frangelico", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Grand Marnier", variants: [{p: 8.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 85, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Fernet Branca", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Blue Curacao", variants: [{p: 7, l:{el:'Ποτήρι',en:'Glass'}}, {p: 70, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
         name: {el: "Μπύρες", en: "Beers"},
         items: [
            { name: "Mythos Draft 300ml", price: 3.50 }, { name: "Mythos Draft 400ml", price: 4.50 }, { name: "Mythos Pitcher 1L", price: 12.00 },
            { name: "Kaiser Draft 300ml", price: 4.00 }, { name: "Kaiser Draft 400ml", price: 5.00 }, { name: "Kaiser Pitcher 1L", price: 13.00 },
            { name: "Corona", price: 5.00 }, { name: "McFarland", price: 5.50 }, { name: "Guinness", price: 6.00 },
            { name: "Fix", price: 4.00 }, { name: "Fix Dark", price: 4.50 }, { name: "Fix Άνευ (Non-Alcohol)", price: 4.00 },
            { name: "Mythos Radler", price: 4.00 }, { name: "Mythos Ice", price: 4.00 }, { name: "Mythos 0%", price: 4.00 },
            { name: "Stella Artois", price: 5.00 },
            { name: "Nisos All Day (Gluten Free)", price: 6.00 },
            { name: "Vergina Weiss", price: 5.00 },
            { name: "Marmita Red Ale (Local)", price: 5.00 },
            { name: "Gordon's Space", price: 6.00 },
            { name: "Apple Cider (Milokleftis)", price: 5.50 },
            { name: "Cider Mango-Lime", price: 5.50 }
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
          { name: "Tzoker (Lalikos)", variants: [{p: 6, l:{el:'Ποτήρι',en:'Glass'}}, {p: 22, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Chateau Nico Lazaridi", variants: [{p: 23, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Thema (Pavlidis)", variants: [{p: 26, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Julia Chateau", variants: [{p: 26, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Biblia Chora", variants: [{p: 28, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Dakry Ampelou", variants: [{p: 29, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Magic Mountain", variants: [{p: 35, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Santo Nychteri", variants: [{p: 36.5, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Ερυθρά", en: "Red"},
        items: [
          { name: "Epops", variants: [{p: 6.3, l:{el:'Ποτήρι',en:'Glass'}}, {p: 24, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: {el: "Ερυθρός Ημίγλυκος", en: "Red Semi-Sweet"}, variants: [{p: 5.8, l:{el:'Ποτήρι',en:'Glass'}}] },
          { name: "Simeonidi Merlot", variants: [{p: 25, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Thema (Pavlidis)", variants: [{p: 27, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Biblia Chora", variants: [{p: 29, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Deka", variants: [{p: 35, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Magic Mountain", variants: [{p: 43, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Santorini Mavrotragano", variants: [{p: 40, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Ροζέ", en: "Rose"},
        items: [
          { name: "Treis Magisses", variants: [{p: 5.8, l:{el:'Ποτήρι',en:'Glass'}}, {p: 21, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Kokkino Fili", variants: [{p: 5.8, l:{el:'Ποτήρι',en:'Glass'}}] },
          { name: "Diva", variants: [{p: 22, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Dune", variants: [{p: 23, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Αφρώδη & Σαμπάνιες", en: "Sparkling & Champagne"},
        items: [
          { name: "Prosecco Cinzano", variants: [{p: 5.5, l:{el:'Ποτήρι',en:'Glass'}}, {p: 19, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Moscato D'Asti", variants: [{p: 6, l:{el:'Ποτήρι',en:'Glass'}}, {p: 22, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Asti Martini", variants: [{p: 26, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Moet & Chandon", variants: [{p: 120, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      },
      {
        name: {el: "Επιδόρπιοι & Αποστάγματα", en: "Dessert Wines & Distillates"},
        items: [
          { name: "Sangria", price: 5.50 },
          { name: "Vinsanto Santowines (0.5L)", price: 39.00 },
          { name: "Vinsanto Argirou (0.5L)", price: 55.00 },
          { name: "Methexis Cigar (0.7L)", variants: [{p: 11, l:{el:'Ποτήρι',en:'Glass'}}, {p: 110, l:{el:'Φιάλη',en:'Bottle'}}] },
          { name: "Rakomelo (175ml)", price: 9.50 },
          { name: "Grappa (0.7L)", variants: [{p: 12, l:{el:'Ποτήρι',en:'Glass'}}, {p: 120, l:{el:'Φιάλη',en:'Bottle'}}] }
        ]
      }
    ]
  },
  {
    id: 'dessert', title: {el: "Γλυκά", en: "Desserts"}, type: 'list', img: ASSETS.cat_dessert,
    items: [
      { name: {el: "Τσιζκέικ Μαυροκέρασο", en: "Cheesecake Black Cherry"}, price: 5.00 },
      { name: {el: "Μους Σοκολάτας", en: "Chocolate Mousse"}, price: 5.00 },
      { name: {el: "Καρυδόπιτα Magic", en: "Pecan Pie Magic"}, price: 5.00 },
      { name: {el: "Καρυδόπιτα με Παγωτό", en: "Pecan Pie with Ice Cream"}, price: 6.50, desc: "Vanilla Ice Cream" },
      { name: {el: "Σουφλέ Σοκολάτα", en: "Chocolate Souffle"}, price: 5.50, desc: {el: "Σοκολάτα / Πορτοκάλι", en: "Chocolate / Orange"} },
      { name: {el: "Σουφλέ με Παγωτό", en: "Souffle with Ice Cream"}, price: 7.00 },
      { name: {el: "Μηλόπιτα", en: "Apple Pie"}, price: 5.00 },
      { name: {el: "Μηλόπιτα με Παγωτό", en: "Apple Pie with Ice Cream"}, price: 7.00 },
      { name: {el: "Σφαίρα Σοκολάτας", en: "Chocolate Sphere"}, price: 9.00, desc: {el: "Μαύρη σοκολάτα, τραγανή βάφλα, σμέουρα, αλμυρή καραμέλα, αμύγδαλα, καρποί κακάο", en: "Dark chocolate, crispy waffle, dried raspberries, salty caramel, caramelized almonds, cacao nibs"}, tags: ['popular'] },
      { name: {el: "1000 Φύλλα (Millefeuille)", en: "1000 Leaves"}, price: 9.00, desc: {el: "Τραγανό φύλλο Βηρυτού, ναμελάκα τόνκα, δυόσμος, καραμελωμένη μέντα", en: "Crispy Beirut pastry, namelaka tonka, spearmint leaves, caramelized mint"} },
      { name: {el: "Μπάλα Παγωτό", en: "Ice Cream Scoop"}, price: 2.00, desc: {el: "Βανίλια, Σοκολάτα, Καραμέλα, Φράουλα", en: "Vanilla, Chocolate, Caramel, Strawberry"} }
    ]
  }
];

// --- UTILS ---
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
          return (
            <div className="price-box">
              <span className="p-glass">€{v1.p.toFixed(2)}</span>
              {item.variants[1] && <span className="p-bottle">{item.variants[1].l.en==='Glass'?'Bottle':'Φιάλη'}: €{item.variants[1].p.toFixed(2)}</span>}
            </div>
          );
      }
      if (typeof item.price !== 'undefined') return <span className="p-glass">€{item.price.toFixed(2)}</span>;
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

// --- COMPONENTS ---
const Loader = ({ lang }) => (
  <motion.div initial={{opacity:1}} exit={{opacity:0}} className="app-loader">
    <motion.img 
      src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" 
      alt="Loading"
      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="loader-logo"
    />
    <p>{UI[lang].loading}</p>
  </motion.div>
);

const NotFound = ({ lang }) => (
  <div className="not-found">
    <AlertCircle size={48} color="#C5A065" />
    <h2>404</h2>
    <p>Oops! Too many cocktails?</p>
    <a href="/">Go Home</a>
  </div>
);

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
        <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="toast-notification">
          <div className="toast-content">
             <span className="toast-icon">✓</span>
             {toast}
          </div>
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
  
  // PERSISTENCY: Load from LocalStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('paseo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [showMyList, setShowMyList] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [toast, setToast] = useState(null);
  const [lang, setLang] = useState('el');
  const [variantItem, setVariantItem] = useState(null);
  const contentRef = useRef(null);

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('paseo_cart', JSON.stringify(favorites));
  }, [favorites]);

  // SCROLL TO TOP
  useLayoutEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [category, mood]);

  const handleFavClick = (item) => { 
    // HAPTIC FEEDBACK
    if (navigator.vibrate) navigator.vibrate(10);
    if (item.variants) setVariantItem(item); else toggleFav(item); 
  };

  const toggleFav = (item, variant = null) => {
    const itemName = txt(item.name, lang);
    const cartName = variant ? `${itemName} (${txt(variant.l, lang)})` : itemName;
    const cartPrice = variant ? variant.p : item.price;
    setFavorites(prev => {
      const exists = prev.find(i => i.cartName === cartName);
      if (exists) { showToast(`${UI[lang].removed}`); return prev.filter(i => i.cartName !== cartName); }
      showToast(`${UI[lang].added}`); return [...prev, { ...item, cartName, realPrice: cartPrice }];
    });
    setVariantItem(null);
  };

  const removeFromFav = (cartNameToRemove) => { 
    setFavorites(prev => prev.filter(i => i.cartName !== cartNameToRemove)); 
    showToast(UI[lang].removed); 
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 1500); };

  if (!mood) {
    return (
      <MobileWrapper toast={toast} variantItem={variantItem} setVariantItem={setVariantItem} toggleFav={toggleFav} lang={lang}>
        <div className="menu-content mood-bg" ref={contentRef}>
           <div className="top-bar-actions">
             <button onClick={() => setLang(lang === 'en' ? 'el' : 'en')} className="lang-btn"><Globe size={14}/> {lang.toUpperCase()}</button>
           </div>
           <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="logo-small" alt="Paseo" />
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
        <div className="menu-content list-view" ref={contentRef}>
           <div className="sticky-header">
              <button onClick={() => setShowMyList(false)} className="icon-btn"><X/></button>
              <h2>{UI[lang].myList}</h2><div style={{width: 24}}></div>
           </div>
           <div className="list-scroll">
              {favorites.length === 0 ? <div className="empty-state"><ShoppingBag size={48} style={{opacity:0.3, marginBottom:10}}/><p>{UI[lang].empty}</p></div> : favorites.map((item, idx) => (
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
        if(mood === 'coffee') return ['coffee_hot', 'coffee_cold', 'beverages'].includes(cat.id);
        if(mood === 'food') return ['brunch', 'food', 'main'].includes(cat.id);
        if(mood === 'drinks') return ['signatures', 'cocktails_list', 'spirits'].includes(cat.id);
        if(mood === 'wine') return ['wine', 'dessert'].includes(cat.id);
        return true;
     });

     return (
      <MobileWrapper toast={toast} variantItem={variantItem} setVariantItem={setVariantItem} toggleFav={toggleFav} lang={lang}>
        <div className="menu-content" ref={contentRef}>
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
             <a href="https://www.google.com/search?q=Paseo+Lounge+Bar+Reviews" target="_blank" rel="noopener noreferrer" className="btn-gold small">
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
     <div className="menu-content" ref={contentRef}>
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
                   <div className="price-display">{displayPrice(item)}</div>
                 </div>
                 <div className="actions-col">
                   <motion.button className="fav-btn" whileTap={{ scale: 0.8 }} animate={{ scale: favorites.some(f => f.name === item.name) ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }} onClick={(e) => { e.stopPropagation(); handleFavClick(item); }}>
                     <Heart size={20} fill={favorites.some(f => f.name === item.name) ? "#C5A065" : "none"} color="#C5A065"/>
                   </motion.button>
                 </div>
              </motion.div>
           ))}</div>}
           {category.type === 'list' && <div className="list-stack">
             {category.items.map((item, i) => (
              <motion.div key={i} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: i * 0.03}} className="menu-list-item">
                 <div className="list-text">
                    <h4>{txt(item.name, lang)} {renderTags(item.tags)}</h4>
                    {item.desc && <p className="item-desc">{txt(item.desc, lang)}</p>}
                 </div>
                 <div className="list-right">
                   <div className="price-display">{displayPrice(item)}</div>
                   <motion.button whileTap={{ scale: 0.8 }} animate={{ scale: favorites.some(f => f.name === item.name) ? [1, 1.3, 1] : 1 }} className="fav-mini" onClick={(e) => { e.stopPropagation(); handleFavClick(item); }}>
                     <Heart size={16} fill={favorites.some(f => f.name === item.name) ? "#C5A065" : "none"} color="#C5A065"/>
                   </motion.button>
                 </div>
              </motion.div>
           ))}</div>}
           {category.type === 'group' && <div className="group-stack">{category.groups.map((grp, i) => (
              <div key={i} className="accordion">
                 <div className={`accordion-header ${expandedGroup === grp.name ? 'active' : ''}`} onClick={() => setExpandedGroup(expandedGroup === grp.name ? null : grp.name)}>
                   <span>{txt(grp.name, lang)}</span>
                   <motion.div animate={{rotate: expandedGroup === grp.name ? 180 : 0}} transition={{duration:0.3}}><ChevronDown/></motion.div>
                 </div>
                 <AnimatePresence>
                 {expandedGroup === grp.name && (
                   <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className="accordion-body">
                     {grp.items.map((item, idx) => (
                        <div key={idx} className="simple-row-price">
                          <div className="list-text">
                             <h4>{txt(item.name, lang)} {renderTags(item.tags)}</h4>
                             {item.desc && <p className="item-desc">{txt(item.desc, lang)}</p>}
                          </div>
                          <div className="row-end">
                            <div className="price-display">{displayPrice(item)}</div>
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
           <div className="footer-note" style={{fontSize:10, color:'#666', marginTop:30, textAlign:'center', paddingBottom: 40}}>
              {UI[lang].disclaimer}
           </div>
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
              <a href="https://www.instagram.com/paseoloungebar/" className="social-btn" target="_blank" rel="noreferrer"><Instagram/></a>
              <a href="https://www.facebook.com/PASEOLOUNGEBAR/" className="social-btn" target="_blank" rel="noreferrer"><MessageCircle/></a>
              <a href="http://maps.google.com/?q=Paseo+Lounge+Bar+Kavala" className="social-btn" target="_blank" rel="noreferrer"><Map/></a>
           </div>
        </div>
        <div className="footer-note">
          <a href="https://www.google.com/search?q=Paseo+Lounge+Bar+Reviews" target="_blank" rel="noopener noreferrer" style={{color:'#888', fontSize:'11px', textDecoration:'underline'}}>Rate us on Google</a>
        </div>
      </div>
    </div>
  );
}

function App() { 
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 2000); }, []);

  if(loading) return <Loader lang="el"/>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/qr-menu" element={<SecretMenu />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  ); 
}
export default App;