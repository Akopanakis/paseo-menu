import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Heart, Wifi, X, ChevronRight, ChevronDown, ChevronUp, Coffee, Martini, List, Clock, MapPin, Flame, Leaf, Star, Share2, MessageCircle, Map, Instagram, Sparkles, Smile } from 'lucide-react';
import './App.css';

// --- ASSETS ---
const ASSETS = {
  heroImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1080",
  cat_coffee: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600",
  cat_brunch: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600",
  cat_food: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600",
  cat_starters: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600",
  cat_cocktail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600",
  cat_wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600",
  cat_whiskey: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=600",
  cat_beer: "https://images.unsplash.com/photo-1623961990059-28437797f62d?auto=format&fit=crop&w=600",
  cat_dessert: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600",
};

// --- DATA ---
const REVIEWS = [
  { user: "Maria K.", text: "Best cocktails in Kavala! The Zombie is a must.", stars: 5 },
  { user: "John D.", text: "Amazing atmosphere and great music.", stars: 5 },
  { user: "Elena P.", text: "Great brunch and coffee.", stars: 5 }
];

const MENU_DATA = [
  // 1. STARTERS & SALADS (NEW DETAILED)
  {
    id: 'starters', title: "Starters & Salads", type: 'card', img: ASSETS.cat_starters,
    items: [
      // Starters
      { name: "Crostini Caprese (3pcs)", price: 6.50, desc: "Bread, mozzarella, cherry tomatoes, basil pesto", tags: ['veg'] },
      { name: "Bruschetta Pork (3pcs)", price: 7.50, desc: "Bread (fry), Sage Creme, Smoked pork tenderloin, grated parmesan" },
      { name: "Tragano (4pcs)", price: 8.00, desc: "Fyllo stuffed with graviera Naxou, goat cheese, fig marmalade, mustard seeds", tags: ['veg'] },
      { name: "Ethnic Basket (14pcs)", price: 12.00, desc: "Arancini, Empanadas, Spring rolls", ribbon: "Sharing" },
      { name: "Caliente (8pcs)", price: 7.50, desc: "Cheese nuggets with spicy peppers and mozzarella sticks", tags: ['spicy'] },
      // Vegan
      { name: "Vegetables Springrolls (4pcs)", price: 7.00, desc: "Vegetable spring rolls with sweet-chilli sauce", tags: ['vegan'] },
      { name: "Falafel (5pcs)", price: 7.00, desc: "Croquettes with chickpeas & herbs", tags: ['vegan'] },
      { name: "Veggie Burger (2pcs)", price: 7.00, desc: "Burger with chia seeds, buckwheat, oatmeal flakes, french fries", tags: ['vegan'] },
      // Salads
      { name: "Flower Pot", price: 9.00, desc: "Goat cheese, carob crackers, capers, cherry tomatoes, thyme, cucumber, olive, onion, peppers, sun-dried tomato sauce", tags: ['veg'] },
      { name: "The Warm One", price: 9.50, desc: "Spinach, arugula, saute beef, semi sun-dried tomato, fried feta with sesame, balsamic, pine" },
      { name: "Paseo Caesar's", price: 9.50, desc: "Iceberg, croutons, crispy chicken, lettuce, bacon, maple, caesar's sauce, parmesan" },
      { name: "Vegetable Garden", price: 8.00, desc: "Iceberg, lettuce, rocca, spinach, avocado, mustard & honey vinaigrette", tags: ['vegan'] }
    ]
  },

  // 2. FINGER FOOD & BURGERS
  {
    id: 'food', title: "Finger Food & Burgers", type: 'card', img: ASSETS.cat_food,
    items: [
      { name: "Pizza Special", price: 14.00, desc: "Mozzarella, tomato sauce, parmesan, rocca, basil pesto, mushrooms, bacon, peppers" },
      { name: "Pizza Margarita", price: 12.00, desc: "Mozzarella, tomato sauce, parmesan, rocca, basil pesto", tags: ['veg'] },
      { name: "Pizza Prosciutto", price: 14.00, desc: "Mozzarella, tomato sauce, parmesan, basil pesto, rocca, prosciutto" },
      { name: "Pizza Burratina", price: 14.00, desc: "Tomato sauce, mozzarella, parmesan, burrata, bresaola, rocca, basil pesto" },
      { name: "Beef Bao Buns (3pcs)", price: 10.00, desc: "Beef fillet, spring onions, sauce bolognese" },
      { name: "Chicken Bao Buns (3pcs)", price: 9.50, desc: "Chicken, sesame, teriyaki sauce, spring sauce, ginger powder" },
      { name: "Fajitas Chicken", price: 12.50, desc: "Chicken, peppers, onions, tomatoes, tortillas, ranchero, guacamole, creme fraiche" },
      { name: "Mini Burgers (2pcs)", price: 9.00, desc: "Brioche, beef 60gr, caramelized onions, cheddar, lettuce, mayo pickles, fries" },
      { name: "Club Sandwich Classic", price: 8.00, desc: "Bomba bread, gouda, mayo, bacon, ham, tomato, fries" },
      { name: "Club Sandwich Chicken", price: 9.00, desc: "Bomba bread, mayo, gouda, bacon, chicken, tomato, lettuce, fries" },
      { name: "Club Sandwich Kavurma", price: 9.00, desc: "Kavurma, omelette, Elassona cheese, lettuce, tomato, fries" },
      { name: "Chicken Nuggets (8pcs)", price: 7.00 },
      { name: "Nuggets w/ Philadelphia", price: 7.00, desc: "6pcs Stuffed chicken nuggets" },
      { name: "Smoked Burger", price: 9.50, desc: "Brioche, beef 180gr, iceberg, crisp bacon, tomato, Jack Daniels sauce, tobacco oil, fries" },
      { name: "Sweet & Hot Burger", price: 9.50, desc: "Brioche, beef 180gr, iceberg, white cheddar, chipotle mayo, bourbon peach sauce, fries", tags: ['spicy'] }
    ]
  },

  // 3. MAIN DISHES & PLATTERS
  {
    id: 'main', title: "Main Dishes & Platters", type: 'card', img: ASSETS.cat_food,
    items: [
      { name: "Risotto", price: 9.00, desc: "Rice, forest mushrooms, truffle, parmesan", tags: ['veg'] },
      { name: "Ravioli", price: 12.00, desc: "Stuffed with anthotiro & spinach, mascarpone cream, parmesan, truffle, Marsala wine", tags: ['veg'] },
      { name: "Chicken Tagliatelle", price: 12.00, desc: "Chicken, carrot, zucchini, mushrooms, spring onions, heavy cream, tarragon" },
      { name: "Salmon Tagliatelle", price: 13.00, desc: "Smoked salmon, mascarpone, spring onions, poppy seeds, vodka, lime zest" },
      { name: "Medallion", price: 15.00, desc: "Pork fillet, potato & mushroom puree, truffle oil, mushroom sauce" },
      { name: "Chicken Balottine", price: 15.00, desc: "Chicken, mozzarella, sun-dried tomato, basil, prosciutto, gnocchi, parmesan" },
      { name: "Bourbon Fillet", price: 25.00, desc: "Beef fillet, butter potatoes, grilled asparagus, sour cherry Jack Daniels sauce" },
      { name: "Fillet a La Madagascar", price: 25.00, desc: "Beef fillet, grilled vegetables, sauce green pepper" },
      { name: "Grilled Beef Fillet 125g", price: 15.00 },
      { name: "Grilled Beef Fillet 250g", price: 23.00 },
      { name: "Grilled Chicken Fillet", price: 10.50 },
      { name: "Cheese Platter", price: 14.00, desc: "Kefalotiri, peperoncino, goat cheese, blue cheese, dried fruit (4 persons)", tags: ['veg'] },
      { name: "Cold Cuts & Cheese", price: 14.00, desc: "Cheeses, prosciutto, turkey, smoked tenderloin (4 persons)" }
    ]
  },

  // 4. SIGNATURE COCKTAILS
  {
    id: 'signatures', title: "Signature Cocktails", type: 'card', img: ASSETS.cat_cocktail,
    items: [
      { name: "Zombie", price: 10.00, desc: "Rum blend, Cointreau, Brandy, Pineapple, Orange, Grenadine, Lime", tags: ['strong'], ribbon: "Best Seller" },
      { name: "Mai Tai", price: 10.00, desc: "White Rum, Dark Rum, Orange liqueur, Almond liqueur, Lime" },
      { name: "Paseo Sunset", price: 10.00, desc: "Vodka, Strawberry Puree, Vanilla Syrup, Lime", tags: ['popular', 'sweet'], ribbon: "Signature" },
      { name: "Spicy Mango", price: 12.00, desc: "Tequila Reposado, Mango, Chili, Lime", tags: ['spicy'] },
      { name: "Stoly Kiss", price: 9.00, desc: "Vodka, Mastic liqueur, Cranberry juice, Pomegranate puree, Lemon" },
      { name: "Porn Star Martini", price: 10.00, desc: "Passion Fruit, Vanilla Vodka" },
      { name: "Mango Mule", price: 6.00, desc: "Alcohol Free: Pineapple, Lime, Mango, Tonic", tags: ['0%'] },
      { name: "Red Paseo", price: 6.00, desc: "Alcohol Free: Cranberry, Pomegranate, Lemon", tags: ['0%'] },
      { name: "Lady Lavender", price: 6.00, desc: "Alcohol Free: Grenadine, Lavender, Soda, Grapefruit", tags: ['0%'] },
      { name: "Green Gentleman", price: 6.50, desc: "Alcohol Free: Kiwi, Orange, Peach", tags: ['0%'] }
    ]
  },

  // 5. CLASSIC COCKTAILS
  {
    id: 'classics', title: "Classic Cocktails", type: 'list', img: ASSETS.cat_cocktail,
    items: [
      { name: "Aperol Spritz", price: 8.00, desc: "Aperol, Cinzano To Spritz, Soda" },
      { name: "Negroni", price: 9.00, desc: "Campari, Bulldog Gin, Cinzano 1757" },
      { name: "Mojito", price: 9.00, desc: "White Rum, Lime, Soda, Brown Sugar" },
      { name: "Daiquiri", price: 9.00, desc: "White Rum, Lime, Sugar Syrup" },
      { name: "Daiquiri Strawberry", price: 10.00, desc: "White Rum, Lime, Strawberry Puree" },
      { name: "Margarita", price: 9.00, desc: "Tequila, Triple Sec, Fresh Lemon" },
      { name: "Cosmopolitan", price: 9.00, desc: "Vodka, Triple Sec, Cranberry, Lime" },
      { name: "Long Island", price: 10.00, desc: "Triple Sec, Rum, Gin, Vodka, Tequila, Cola" },
      { name: "Cuba Libre", price: 8.00, desc: "White Rum, Cola, Lime" },
      { name: "Pina Colada", price: 9.00, desc: "Rum, Pineapple, Coconut" },
      { name: "Caipirinha", price: 8.50, desc: "Cachaca, Lime, Brown Sugar" },
      { name: "Caipiroska", price: 8.50, desc: "Vodka, Lime, Brown Sugar" },
      { name: "Bloody Mary", price: 10.00, desc: "Vodka, Tomato, Spices" },
      { name: "Old Fashioned", price: 9.00, desc: "Whiskey, Bitters, Sugar" },
      { name: "Paloma", price: 8.50, desc: "Tequila, Lime, Pink Grapefruit" },
      { name: "Apple Martini", price: 9.00, desc: "Vodka, Lime, Green Apple" },
      { name: "Gin Cucumber", price: 8.50, desc: "Gin, Cucumber, Lime, Soda" },
      { name: "Dry Martini", price: 8.50, desc: "Gin, Dry Vermouth" }
    ]
  },

  // 6. SPIRITS (FAVORITES ENABLED)
  {
    id: 'spirits', title: "Spirits & Cellar", type: 'group', img: ASSETS.cat_whiskey,
    groups: [
      {
        name: "Standard Whiskey",
        items: [
          {n: "Famous Grouse", p: "7.00€ / 70.00€"}, {n: "Johnnie Red", p: "7.00€ / 70.00€"},
          {n: "Haig", p: "7.00€ / 70.00€"}, {n: "Dewars", p: "7.00€ / 70.00€"},
          {n: "Cutty Sark", p: "7.00€ / 70.00€"}, {n: "Ballantines", p: "7.00€ / 70.00€"},
          {n: "Grants", p: "7.00€ / 70.00€"}, {n: "Bells", p: "7.00€ / 70.00€"},
          {n: "J&B", p: "7.00€ / 70.00€"}, {n: "Teachers", p: "7.00€ / 70.00€"},
          {n: "Jameson", p: "7.00€ / 70.00€"}, {n: "Tullamore", p: "8.00€ / 80.00€"},
          {n: "Bushmills", p: "8.00€ / 80.00€"}
        ]
      },
      {
        name: "Premium / Single Malts",
        items: [
          {n: "Jim Beam", p: "7.50€ / 75.00€"}, {n: "Four Roses", p: "8.00€ / 80.00€"},
          {n: "Canadian Club", p: "7.50€ / 75.00€"}, {n: "Johnnie Black 12", p: "8.00€ / 80.00€"},
          {n: "Chivas Regal 12", p: "8.00€ / 80.00€"}, {n: "Jack Daniel's", p: "8.00€ / 80.00€"},
          {n: "Gentleman Jack", p: "10.00€ / 100.00€"}, {n: "Naked Malt", p: "8.50€ / 85.00€"},
          {n: "Jameson Black", p: "9.00€ / 90.00€"}, {n: "Dimple", p: "9.00€ / 90.00€"},
          {n: "Cardhu", p: "9.00€ / 90.00€"}, {n: "Dewars 12", p: "9.00€ / 90.00€"},
          {n: "Crown Royal", p: "11.00€ / 110.00€"}, {n: "Glenfiddich 12", p: "10.00€ / 100.00€"},
          {n: "Glenfiddich Rich Oak", p: "12.00€ / 120.00€"}, {n: "Glenfiddich 15", p: "14.00€ / 140.00€"},
          {n: "Johnnie Double Black", p: "12.00€ / 120.00€"}, {n: "Johnnie Gold", p: "13.00€ / 130.00€"},
          {n: "Johnnie Green", p: "14.00€ / 140.00€"}, {n: "Johnnie Blue", p: "40.00€ / 400.00€"},
          {n: "Talisker", p: "11.00€ / 110.00€"}, {n: "Oban", p: "14.00€ / 140.00€"},
          {n: "Lagavulin 8", p: "14.00€ / 140.00€"}, {n: "Lagavulin 16", p: "20.00€ / 200.00€"},
          {n: "Jack Single Barrel", p: "15.00€ / 150.00€"}, {n: "Haig Club", p: "18.00€ / 180.00€"},
          {n: "The Glenrothes 10", p: "13.00€ / 130.00€"}, {n: "Chivas Regal 18", p: "22.00€ / 220.00€"},
          {n: "Jack Gold No. 27", p: "25.00€ / 250.00€"}, {n: "Macallan 12", p: "20.00€ / 200.00€"},
          {n: "Macallan 15", p: "28.00€ / 280.00€"}, {n: "Macallan Rare Cask", p: "60.00€ / 600.00€"}
        ]
      },
      {
        name: "Vodka",
        items: [
          {n: "Finlandia", p: "8.00€ / 80.00€"}, {n: "Serkova", p: "7.00€ / 70.00€"},
          {n: "Stolichnaya", p: "7.00€ / 70.00€"}, {n: "Absolut", p: "7.00€ / 70.00€"},
          {n: "Smirnoff Red", p: "7.00€ / 70.00€"}, {n: "Russian Standard", p: "7.00€ / 70.00€"},
          {n: "Ursus", p: "7.00€ / 70.00€"}, {n: "Smirnoff North", p: "7.00€ / 70.00€"},
          {n: "Ketel One", p: "9.00€ / 90.00€"}, {n: "Ciroc", p: "10.00€ / 100.00€"},
          {n: "Belvedere", p: "13.00€ / 130.00€"}, {n: "Beluga", p: "15.00€ / 150.00€"},
          {n: "Snow Leopard", p: "15.00€ / 150.00€"}, {n: "Grey Goose", p: "15.00€ / 150.00€"},
          {n: "Stolichnaya Elit", p: "20.00€ / 200.00€"}
        ]
      },
      {
        name: "Gin",
        items: [
          {n: "Juniper", p: "7.00€ / 70.00€"}, {n: "Gordons", p: "7.00€ / 70.00€"},
          {n: "Beefeater", p: "7.00€ / 70.00€"}, {n: "Tanqueray", p: "8.00€ / 80.00€"},
          {n: "Bombay", p: "8.00€ / 80.00€"}, {n: "Brokers", p: "8.00€ / 80.00€"},
          {n: "Bulldog", p: "9.00€ / 90.00€"}, {n: "Tanqueray 10", p: "11.00€ / 110.00€"},
          {n: "Hendricks", p: "13.00€ / 130.00€"}, {n: "G Vine", p: "14.00€ / 140.00€"},
          {n: "Monkey 47", p: "15.00€ / 150.00€"}
        ]
      },
      {
        name: "Rum",
        items: [
          {n: "Bacardi", p: "7.00€ / 70.00€"}, {n: "Havana", p: "7.00€ / 70.00€"},
          {n: "Havana Dark", p: "8.00€ / 80.00€"}, {n: "Captain Morgan", p: "8.00€ / 80.00€"},
          {n: "Sailor Jerry", p: "8.00€ / 80.00€"}, {n: "Appleton", p: "8.50€ / 85.00€"},
          {n: "Havana 7", p: "8.50€ / 85.00€"}, {n: "Angostura Gold", p: "8.50€ / 85.00€"},
          {n: "Diplomatico", p: "12.00€ / 120.00€"}, {n: "Zacapa", p: "13.00€ / 130.00€"}
        ]
      },
      {
        name: "Tequila",
        items: [
          {n: "Jose Cuervo Blanco", p: "7.00€ / 70.00€"}, {n: "Jose Cuervo Reposado", p: "7.00€ / 70.00€"},
          {n: "Jose Cuervo Silver Trad.", p: "8.50€ / 85.00€"}, {n: "Jose Cuervo Reposad Trad.", p: "8.50€ / 85.00€"},
          {n: "Olmeca Dark Choco", p: "7.00€ / 70.00€"}, {n: "Don Julio Blanco", p: "10.00€ / 100.00€"},
          {n: "Don Julio Anejo", p: "13.00€ / 130.00€"}
        ]
      },
      {
        name: "Cognac / Metaxa",
        items: [
          {n: "Metaxa 3 Stars", p: "6.50€ / 65.00€"}, {n: "Metaxa 5 Stars", p: "7.00€ / 70.00€"},
          {n: "Metaxa 7 Stars", p: "7.50€ / 75.00€"}, {n: "Metaxa Private Reserve", p: "17.00€ / 170.00€"},
          {n: "Hennessy VS", p: "16.00€ / 160.00€"}, {n: "Courvoisier VS", p: "12.00€ / 120.00€"}
        ]
      }
    ]
  },

  // 7. WINE LIST (FAVORITES ENABLED)
  {
    id: 'wine', title: "Wine List", type: 'group', img: ASSETS.cat_wine,
    groups: [
      {
        name: "White Wines (Glass / Bottle)",
        items: [
          {n: "Epops (Ktima Chatzigeorgiou)", p: "6.00€ / 22.00€"},
          {n: "Malagouzia (Simeonidi)", p: "6.50€ / 23.00€"},
          {n: "Tzoker (Lalikos)", p: "6.00€ / 22.00€"},
          {n: "Chateau Nico Lazaridi", p: "23.00€"},
          {n: "Thema (Pavlidis)", p: "26.00€"},
          {n: "Julia Chateau", p: "26.00€"},
          {n: "Ktima Biblia Chora", p: "28.00€"},
          {n: "Dakry Ampelou", p: "29.00€"},
          {n: "Magic Mountain", p: "35.00€"},
          {n: "Santo Nychteri", p: "36.50€"}
        ]
      },
      {
        name: "Red Wines (Glass / Bottle)",
        items: [
          {n: "Epops", p: "6.30€ / 24.00€"},
          {n: "Red Semi-Sweet", p: "5.80€ (Glass)"},
          {n: "Thema (Pavlidis)", p: "27.00€"},
          {n: "Simeonidis Merlot", p: "25.00€"},
          {n: "Ktima Biblia Chora", p: "29.00€"},
          {n: "Santorini Mavrotragano", p: "40.00€"},
          {n: "Magic Mountain", p: "43.00€"},
          {n: "Deka", p: "35.00€"}
        ]
      },
      {
        name: "Rose & Sparkling",
        items: [
          {n: "Treis Magisses", p: "5.80€ / 21.00€"},
          {n: "Kokkino Fili", p: "5.80€"},
          {n: "Diva", p: "22.00€"},
          {n: "Dune", p: "23.00€"},
          {n: "Prosecco Cinzano", p: "5.50€ / 19.00€"},
          {n: "Moscato D'Asti", p: "6.00€ / 22.00€"},
          {n: "Asti Martini", p: "26.00€"},
          {n: "Moet & Chandon", p: "120.00€"},
          {n: "Sangria", p: "5.50€"}
        ]
      }
    ]
  },

  // 8. BRUNCH & PANCAKES
  {
    id: 'brunch', title: "Brunch & Pancakes", type: 'card', img: ASSETS.cat_brunch,
    items: [
      { name: "Whole Grain Sandwich", price: 2.50, desc: "Turkey, Mascarpone, Gouda, Lettuce" },
      { name: "Ciabatta", price: 2.50, desc: "Mozzarella, Prosciutto, Rocca, Basil Pesto, Mascarpone" },
      { name: "Baguettini", price: 2.50, desc: "Cherry tomato, Geremezi cheese, Olive paste, Lettuce" },
      { name: "Toast", price: 3.50, desc: "Bread, Turkey/Ham, Cheese" },
      { name: "Toast with Fries", price: 4.00, desc: "Served with french fries" },
      { name: "Homemade Focaccia", price: 6.00, desc: "Peanut mortadela, peanut pesto, katiki cheese, rocca" },
      { name: "Fried Eggs", price: 6.50, desc: "2 eggs, handmade kavourma, bread" },
      { name: "Scrambled Eggs", price: 7.50, desc: "Feta, avocado, cherry tomatoes, matured bread", tags: ['veg'] },
      { name: "Country Omelette", price: 6.50, desc: "Green peppers, tomato, potatoes, katiki cheese" },
      { name: "Pancakes Savory", price: 7.00, desc: "Bacon, cheese, fried egg, hollandaise" },
      { name: "Prosciutto Pancakes", price: 8.00, desc: "Fried egg, Metsovone cream, cherry tomatoes, carob" },
      { name: "Chicken Pancakes", price: 8.50, desc: "Crispy bacon, cheddar sauce, corn, peppers, hollandaise" },
      { name: "Pancakes Chocolate", price: 7.50, desc: "Hazelnut praline, biscuit", tags: ['popular'] },
      { name: "Pancakes Bueno", price: 7.50, desc: "Bueno cream, crispy waffle" },
      { name: "Pancakes Ferrero", price: 8.00, desc: "Ferrero praline, hazelnuts, cocoa" },
      { name: "Banoffee Pancakes", price: 8.00, desc: "Caramelized bananas, dulce de leche, biscuit, salted caramel" },
      { name: "Waffle Chocolate", price: 6.00, desc: "Praline, biscuit" },
      { name: "Waffle Bueno", price: 6.00, desc: "Bueno cream, crispy waffle" }
    ]
  },

  // 9. COFFEE & TEA
  {
    id: 'coffee', title: "Coffee & Tea", type: 'list', img: ASSETS.cat_coffee,
    items: [
      { name: "Espresso", price: 2.50 }, { name: "Espresso Double", price: 3.00 },
      { name: "Espresso Americano", price: 3.00 }, { name: "Espresso Americano Double", price: 3.50 },
      { name: "Espresso Macchiato", price: 3.00 }, { name: "Espresso Macchiato Double", price: 3.50 },
      { name: "Espresso Con Panna", price: 3.50 }, { name: "Espresso Con Panna Double", price: 4.00 },
      { name: "Cappuccino", price: 3.80 }, { name: "Cappuccino Double", price: 4.30 },
      { name: "Cappuccino Latte", price: 4.00 },
      { name: "Nescafe", price: 3.00 }, { name: "Greek Coffee", price: 2.50 },
      { name: "Greek Coffee Double", price: 3.00 },
      { name: "Filter Coffee", price: 3.00 },
      { name: "Filter Flavored", price: 3.50, desc: "Hazelnut, Caramel, Vanilla" },
      { name: "Espresso Cold", price: 3.50 },
      { name: "Cappuccino Cold", price: 4.00 },
      { name: "Cappuccino Cold Crema", price: 4.20 },
      { name: "Nescafe Frappe", price: 3.00 },
      { name: "Nescafe Ice Cream Frappe", price: 4.50 },
      { name: "Mochaccino Hot", price: 4.50 }, { name: "Mochaccino Cold", price: 4.50 },
      { name: "Irish Coffee", price: 6.00 }, { name: "Baileys Blink", price: 6.00 },
      { name: "Espresso Affogato", price: 5.00 }, { name: "Espresso Corretto", price: 4.50 },
      { name: "Chocolate Classic", price: 4.00 },
      { name: "Chocolate Flavors", price: 4.20, desc: "Strawberry, Hazelnut, Banana, Coconut, White" },
      { name: "Tea (Hot)", price: 3.00, desc: "Green, Black, Mountain, Chamomile, Mint, Cinnamon, Rose" },
      { name: "Tea (Cold)", price: 3.00, desc: "Lemon, Peach, Green, Melon, Forest Fruits" },
      { name: "Fresh Juice", price: 4.00, desc: "Orange, Pomegranate, Seasonal" },
      { name: "Homemade Lemonade", price: 4.00, desc: "Ginger or Mastic" }
    ]
  },

  // 10. BEERS
  {
    id: 'beer', title: "Beers", type: 'list', img: ASSETS.cat_beer,
    items: [
      { name: "Mythos Draft 300ml", price: 3.50 }, { name: "Mythos Draft 400ml", price: 4.50 },
      { name: "Mythos Pitcher 1lt", price: 12.00 },
      { name: "Kaiser Draft 300ml", price: 4.00 }, { name: "Kaiser Draft 400ml", price: 5.00 },
      { name: "Kaiser Pitcher 1lt", price: 13.00 },
      { name: "Fix / Fix Dark", price: 4.00 },
      { name: "Corona / Stella", price: 5.00 },
      { name: "McFarland", price: 5.50 }, { name: "Guinness", price: 6.00 },
      { name: "Nissos All Day", price: 6.00, desc: "Gluten Free", tags: ['gf'] },
      { name: "Cider (Apple/Mango)", price: 5.50 }
    ]
  },

  // 11. DESSERTS & REFRESH
  {
    id: 'dessert', title: "Desserts & Refresh", type: 'list', img: ASSETS.cat_dessert,
    items: [
      { name: "Cheesecake", price: 5.00, desc: "Black Cherry" },
      { name: "Chocolate Mousse", price: 5.00 },
      { name: "Pecan Pie Magic", price: 5.00 },
      { name: "Souffle Chocolate", price: 5.50 },
      { name: "Souffle with Ice Cream", price: 7.00 },
      { name: "Apple Pie", price: 5.00 },
      { name: "Chocolate Sphere", price: 9.00, desc: "Dark chocolate, crispy waffle, dried raspberries, salty caramel", tags: ['popular'] },
      { name: "1000 Leaves", price: 9.00, desc: "Crispy Beirut pastry, namelaka tonka" },
      { name: "Smoothies", price: 6.00, desc: "Caribbean, Forest, Tropical, Strawberry" },
      { name: "Super Protein", price: 6.50, desc: "Pomegranate, strawberry, hemp seeds, spirulina", tags: ['vegan'] },
      { name: "Granitas", price: 4.50, desc: "Strawberry, Lemon" },
      { name: "Milkshake", price: 5.00, desc: "Vanilla, Chocolate, Strawberry" },
      { name: "Soft Drinks", price: 3.00 },
      { name: "Red Bull / Monster", price: 5.00 }
    ]
  }
];

// --- HELPERS ---
const renderPrice = (p) => {
  if (typeof p === 'number') return `€${p.toFixed(2)}`;
  return p; // Used for "7.00€ / 70.00€" strings
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
      {tags.includes('0%') && <span className="diet-tag tag-pop">0% ALC</span>}
    </div>
  );
};

// --- COMPONENTS ---

// Reviews Slider (Public)
const ReviewsSlider = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(prev => (prev + 1) % REVIEWS.length), 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="reviews-slider">
      <div className="stars">{'★'.repeat(REVIEWS[idx].stars)}</div>
      <p>"{REVIEWS[idx].text}"</p>
      <span>- {REVIEWS[idx].user}</span>
    </div>
  );
};

// Sommelier (Quiz)
const SommelierQuiz = ({ onClose, onResult }) => {
  const [step, setStep] = useState(0);
  
  const questions = [
    { q: "Τι διάθεση έχεις;", opts: [{t: "Party 🍹", v: 'party'}, {t: "Chill ☕", v: 'chill'}] },
    { q: "Τι γεύση προτιμάς;", opts: [{t: "Γλυκό 🍓", v: 'sweet'}, {t: "Ξινό / Πικρό 🍋", v: 'sour'}] },
    { q: "Πόσο δυνατό;", opts: [{t: "Ελαφρύ", v: 'light'}, {t: "Δυνατό 💪", v: 'strong'}] }
  ];

  const handleAnswer = () => {
    if (step < 2) setStep(step + 1);
    else {
      onResult("Δοκίμασε το 'Paseo Sunset'!");
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="quiz-modal fade-in-up">
        <h3>Digital Sommelier 🍷</h3>
        <p>{questions[step].q}</p>
        <div className="quiz-opts">
          {questions[step].opts.map((o, i) => (
            <button key={i} onClick={handleAnswer}>{o.t}</button>
          ))}
        </div>
        <button className="close-quiz" onClick={onClose}>Κλείσιμο</button>
      </div>
    </div>
  );
};

// --- PAGES ---

// 1. PUBLIC SITE
function PublicSite() {
  const navigate = useNavigate();
  return (
    <div className="public-root">
      <div className="bg-image" style={{backgroundImage: `url(${ASSETS.heroImage})`}}>
        <div className="overlay"></div>
      </div>

      <div className="public-content">
        <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="logo-main" alt="Logo"/>
        <h2 className="tagline">PREMIUM LOUNGE EXPERIENCE</h2>
        
        <ReviewsSlider />

        <div className="info-box secret-trigger" onClick={() => navigate('/qr-menu')}>
           <Clock size={24} color="#C5A065"/>
           <p>Daily 08:00 - 03:00</p>
           <span className="status-badge open">OPEN NOW</span>
        </div>

        <div className="action-buttons">
           <a href="tel:+302510834378" className="btn-gold">ΚΡΑΤΗΣΗ / BOOK NOW</a>
           <div className="social-row">
              <a href="https://www.instagram.com/paseoloungebar/" className="social-btn"><Instagram/></a>
              <a href="https://www.facebook.com/PASEOLOUNGEBAR/" className="social-btn"><MessageCircle/></a>
              <a href="http://maps.google.com/?q=Paseo+Lounge+Bar+Kavala" className="social-btn"><Map/></a>
           </div>
        </div>
      </div>
    </div>
  );
}

// 2. QR MENU APP
function SecretMenu() {
  const [mood, setMood] = useState(null);
  const [category, setCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showMyList, setShowMyList] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [toast, setToast] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const toggleFav = (item) => {
    setFavorites(prev => {
      const exists = prev.find(i => i.name === item.name);
      if (exists) {
        showToast(`${item.name} removed`);
        return prev.filter(i => i.name !== item.name);
      }
      showToast(`${item.name} added!`);
      return [...prev, item];
    });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const MobileWrapper = ({ children }) => (
    <div className="mobile-wrapper">
      <div className="menu-phone-frame">
        {children}
        {toast && <div className="toast-notification">{toast}</div>}
        {showQuiz && <SommelierQuiz onClose={() => setShowQuiz(false)} onResult={showToast} />}
      </div>
    </div>
  );

  // VIEW: MOOD SELECTOR
  if (!mood) {
    return (
      <MobileWrapper>
        <div className="menu-content mood-bg">
           <img src="https://i.postimg.cc/mDgLLyBY/Paseo-Logo-Transparent.png" className="logo-small" alt="logo"/>
           <h1 className="mood-title">Choose your Vibe</h1>
           <div className="mood-cards">
              <div className="mood-card" onClick={() => setMood('day')}><Coffee size={30} color="#C5A065"/><h3>Day & Brunch</h3></div>
              <div className="mood-card" onClick={() => setMood('night')}><Martini size={30} color="#C5A065"/><h3>Night & Drinks</h3></div>
              <div className="mood-card full" onClick={() => setMood('all')}><List size={30} color="#C5A065"/><h3>Full Menu</h3></div>
           </div>
           
           <button className="quiz-trigger" onClick={() => setShowQuiz(true)}>
             <Sparkles size={16}/> Δεν ξέρεις τι να πάρεις;
           </button>
        </div>
      </MobileWrapper>
    );
  }

  // VIEW: MY LIST
  if (showMyList) {
     return (
      <MobileWrapper>
        <div className="menu-content list-view">
           <div className="sticky-header">
              <button onClick={() => setShowMyList(false)} className="icon-btn"><X/></button>
              <h2>My Selection</h2><div style={{width: 24}}></div>
           </div>
           <div className="list-scroll">
              {favorites.length === 0 ? <p className="empty-state">Η λίστα είναι άδεια.</p> : favorites.map((item, idx) => (
                 <div key={idx} className="order-item">
                    <div className="order-info"><h4>{item.name}</h4><span>{renderPrice(item.price)}</span></div>
                    <button onClick={() => toggleFav(item)} className="remove-btn"><X size={14}/></button>
                 </div>
              ))}
           </div>
        </div>
      </MobileWrapper>
     )
  }

  // VIEW: CATEGORY SELECT
  if (!category) {
     const visibleCats = MENU_DATA.filter(cat => {
        if(mood === 'all') return true;
        if(mood === 'day') return ['coffee', 'brunch', 'dessert', 'food', 'starters'].includes(cat.id);
        if(mood === 'night') return ['signatures', 'classics', 'spirits', 'wine', 'beer', 'food', 'starters', 'dessert'].includes(cat.id);
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
           
           {/* RATE US BUTTON (MOVED HERE) */}
           <div className="review-area">
             <a href="https://search.google.com/local/writereview?placeid=YOUR_ID" target="_blank" className="btn-gold small">
               <Star size={12} fill="black"/> Αξιολογήστε μας
             </a>
           </div>

           <div className="cat-grid">
              {visibleCats.map(cat => (
                 <div key={cat.id} className="cat-card" onClick={() => setCategory(cat)} style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${cat.img})`}}><h3>{cat.title}</h3></div>
              ))}
           </div>
        </div>
      </MobileWrapper>
     );
  }

  // VIEW: ITEMS LIST
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
           {category.type === 'card' && <div className="cards-stack">{category.items.map((item, i) => (
              <div key={i} className="menu-card">
                 {item.ribbon && <div className="ribbon">{item.ribbon}</div>}
                 <div className="card-details"><h4>{item.name} {renderTags(item.tags)}</h4><p>{item.desc}</p><span className="price">{renderPrice(item.price)}</span></div>
                 <button className="fav-btn" onClick={() => toggleFav(item)}><Heart size={20} fill={favorites.find(f=>f.name===item.name) ? "#C5A065" : "none"} color="#C5A065"/></button>
              </div>
           ))}</div>}
           
           {category.type === 'list' && <div className="list-stack">{category.items.map((item, i) => (
              <div key={i} className="menu-list-item">
                 <div className="list-text"><h4>{item.name} {renderTags(item.tags)}</h4>{item.desc && <p>{item.desc}</p>}</div>
                 <div className="list-right">
                   <span className="price">{renderPrice(item.price)}</span>
                   <button className="fav-mini" onClick={() => toggleFav(item)}><Heart size={16} fill={favorites.find(f=>f.name===item.name) ? "#C5A065" : "none"} color="#C5A065"/></button>
                 </div>
              </div>
           ))}</div>}
           
           {category.type === 'group' && <div className="group-stack">{category.groups.map((grp, i) => (
              <div key={i} className="accordion">
                 <div className="accordion-header" onClick={() => setExpandedGroup(expandedGroup === grp.name ? null : grp.name)}><span>{grp.name}</span>{expandedGroup === grp.name ? <ChevronUp/> : <ChevronDown/>}</div>
                 {expandedGroup === grp.name && <div className="accordion-body">{grp.items.map((item, idx) => (
                    <div key={idx} className="simple-row-price">
                      <span>{item.n}</span>
                      <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                        <span className="price-tag">{item.p}</span>
                        {/* ENABLED FAVORITES FOR GROUPS (WINE/SPIRITS) */}
                        <button className="fav-mini" onClick={() => toggleFav({name: item.n, price: 0})}><Heart size={14} fill={favorites.find(f=>f.name===item.n) ? "#C5A065" : "none"} color="#C5A065"/></button>
                      </div>
                    </div>
                 ))}</div>}
              </div>
           ))}</div>}
        </div>
        
        {favorites.length > 0 && <div className="floating-bar" onClick={() => setShowMyList(true)}><span>Selection ({favorites.length})</span><ChevronUp size={16}/></div>}
     </div>
   </MobileWrapper>
  );
}

function App() { return <Router><Routes><Route path="/" element={<PublicSite />} /><Route path="/qr-menu" element={<SecretMenu />} /></Routes></Router>; }
export default App;