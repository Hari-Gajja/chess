document.addEventListener('DOMContentLoaded', function() {
    // Improved Loader Functionality
    const loader = document.querySelector('.loader');
    
    // Hide loader after animation completes
    setTimeout(function() {
        loader.classList.add('fade-out');
        
        // Remove loader from DOM after fade-out completes
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }, 300); // Match this duration with CSS transition
    }, 1500);

    // Prevent scrolling during loader
    document.body.style.overflow = 'hidden';

    // Initialize cart functionality
    loadCart();
    loadSavedItems();
    updateCartCount();

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });


    const products = [

    {
        id: 13,
        name: 'Glass Chess Set with LED Base',
        brand: 'Royal Chess',
        price: 7999,
        originalPrice: 8999,
        category: 'sets',
        material: 'glass',
        description: 'Elegant transparent glass chess set with illuminated LED base.',
        features: [
            'Hand-blown glass pieces',
            'LED illuminated base',
            'Modern design',
            'Touch control lighting',
            'Display case included'
        ],
        specs: {
            'Board Size': '40cm x 40cm',
            'King Height': '7.5cm',
            'Material': 'Tempered Glass',
            'Weight': '2.8kg',
            'Light Modes': '7 colors'
        },
        image: 'https://m.media-amazon.com/images/I/71yXjJZQmAL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/royal-glass-led-chess/p/itm123456'
    },
    {
        id: 14,
        name: 'Portable Silicon Chess Board',
        brand: 'ChessWay',
        price: 499,
        originalPrice: 699,
        category: 'boards',
        material: 'silicon',
        description: 'Roll-up silicon chess board thats waterproof and travel-friendly.',
        features: [
            'Waterproof material',
            'Non-slip surface',
            'Roll-up design',
            'Lightweight',
            'Easy to clean'
        ],
        specs: {
            'Board Size': '48cm x 48cm',
            'Square Size': '5cm',
            'Material': 'Food-grade Silicon',
            'Weight': '0.3kg',
            'Storage': 'Rolls up with strap'
        },
        image: 'https://m.media-amazon.com/images/I/71e+7kXq5LL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessway-silicon-board/p/itm123456'
    },
    {
        id: 15,
        name: '3D Printed Chess Set',
        brand: 'ChessMaster',
        price: 3499,
        originalPrice: 3999,
        category: 'sets',
        material: 'resin',
        description: 'Unique 3D printed chess set with customizable designs.',
        features: [
            'Custom designs available',
            'High-detail printing',
            'Weighted base',
            'Smooth finish',
            'Collector\'s item'
        ],
        specs: {
            'Board Size': '45cm x 45cm',
            'King Height': '8cm',
            'Material': 'Premium Resin',
            'Weight': '1.5kg',
            'Customization': 'Designs and colors'
        },
        image: 'https://m.media-amazon.com/images/I/71YHjVXyRwL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessmaster-3d-printed-set/p/itm123456'
    },
    {
        id: 16,
        name: 'Chess Clock with Bluetooth',
        brand: 'DGT',
        price: 3499,
        originalPrice: 3999,
        category: 'clocks',
        description: 'Advanced chess clock with Bluetooth connectivity for tournament play.',
        features: [
            'Bluetooth sync',
            'Multiple time controls',
            'Large LCD display',
            'Tournament approved',
            'Rechargeable battery'
        ],
        specs: {
            'Display': 'Backlit LCD',
            'Battery Life': '50 hours',
            'Connectivity': 'Bluetooth 4.0',
            'Material': 'Durable Plastic',
            'Weight': '0.4kg'
        },
        image: 'https://m.media-amazon.com/images/I/61VX6L+0WjL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/dgt-bluetooth-clock/p/itm123456'
    },
    {
        id: 17,
        name: 'Giant Outdoor Chess Set',
        brand: 'ChessWay',
        price: 8999,
        originalPrice: 9999,
        category: 'sets',
        material: 'plastic',
        description: 'Large chess set for gardens, parks, and outdoor events.',
        features: [
            'Weather-resistant',
            '20-inch king height',
            'Foldable storage bag',
            'Easy to clean',
            'Perfect for clubs'
        ],
        specs: {
            'Board Size': '3m x 3m',
            'King Height': '51cm',
            'Material': 'HDPE Plastic',
            'Weight': '15kg',
            'Storage': 'Included carry bag'
        },
        image: 'https://m.media-amazon.com/images/I/71hUwz5yYGL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessway-giant-outdoor-set/p/itm123456'
    },
    {
        id: 18,
        name: 'Chess Piece Cleaning Kit',
        brand: 'Staunton',
        price: 399,
        originalPrice: 499,
        category: 'accessories',
        description: 'Professional cleaning kit for maintaining chess pieces.',
        features: [
            'Special cleaning solution',
            'Microfiber cloths',
            'Soft bristle brush',
            'Polish for wood/metal',
            'Storage pouch'
        ],
        specs: {
            'Contents': '3 cloths, brush, 2 solutions',
            'Capacity': '100ml each',
            'Material': 'Microfiber',
            'Weight': '0.2kg'
        },
        image: 'https://m.media-amazon.com/images/I/81XQ9+kv5VL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/staunton-cleaning-kit/p/itm123456'
    },
    {
        id: 19,
        name: 'Chess-themed Coffee Table',
        brand: 'Royal Chess',
        price: 24999,
        originalPrice: 29999,
        category: 'furniture',
        material: 'wood/glass',
        description: 'Beautiful chess-themed coffee table with storage for pieces.',
        features: [
            'Built-in chess board',
            'Glass top protection',
            'Storage drawers',
            'Solid wood construction',
            'Conversation piece'
        ],
        specs: {
            'Dimensions': '90cm x 90cm x 45cm',
            'Material': 'Mahogany & Tempered Glass',
            'Weight': '25kg',
            'Storage': 'Two side drawers'
        },
        image: 'https://m.media-amazon.com/images/I/71hUwz5yYGL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/royal-chess-coffee-table/p/itm123456'
    },
    {
        id: 20,
        name: 'Chess Notation Trainer',
        brand: 'ChessMaster',
        price: 1499,
        originalPrice: 1999,
        category: 'electronics',
        description: 'Electronic device that helps learn and practice chess notation.',
        features: [
            'Interactive lessons',
            'Practice modes',
            'Tournament scenarios',
            'Portable design',
            'Rechargeable battery'
        ],
        specs: {
            'Display': '3.5" LCD',
            'Battery Life': '15 hours',
            'Exercises': '500+',
            'Material': 'Plastic',
            'Weight': '0.25kg'
        },
        image: 'https://m.media-amazon.com/images/I/61VX6L+0WjL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessmaster-notation-trainer/p/itm123456'
    },
    // Continuing with more products...
    {
        id: 21,
        name: 'Antique Brass Chess Set',
        brand: 'House of Staunton',
        price: 12999,
        originalPrice: 14999,
        category: 'sets',
        material: 'brass',
        description: 'Collector\'s edition antique brass chess set with intricate designs.',
        features: [
            'Hand-cast pieces',
            'Antique finish',
            'Weighted bases',
            'Velvet-lined box',
            'Limited edition'
        ],
        specs: {
            'Board Size': '55cm x 55cm',
            'King Height': '10.5cm',
            'Material': 'Solid Brass',
            'Weight': '5.2kg',
            'Edition': '500 pieces worldwide'
        },
        image: 'https://m.media-amazon.com/images/I/71YHjVXyRwL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/hos-antique-brass-set/p/itm123456'
    },
    {
        id: 22,
        name: 'Chess-themed Wall Clock',
        brand: 'ChessWay',
        price: 1299,
        originalPrice: 1599,
        category: 'accessories',
        material: 'wood/metal',
        description: 'Decorative wall clock with chess piece designs as hour markers.',
        features: [
            'Silent movement',
            'Battery operated',
            'Wooden frame',
            'Chess piece markers',
            'Modern design'
        ],
        specs: {
            'Diameter': '40cm',
            'Movement': 'Quartz',
            'Material': 'MDF & Metal',
            'Weight': '1.2kg',
            'Battery': '1x AA (not included)'
        },
        image: 'https://m.media-amazon.com/images/I/71e+7kXq5LL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessway-wall-clock/p/itm123456'
    },
    {
        id: 23,
        name: 'Chess Piece Identification Guide',
        brand: 'ChessMaster',
        price: 199,
        originalPrice: 299,
        category: 'accessories',
        description: 'Illustrated guide for identifying historical chess piece styles.',
        features: [
            '200+ illustrations',
            'Historical context',
            'Collector\'s reference',
            'Pocket-sized',
            'Glossary of terms'
        ],
        specs: {
            'Pages': '96',
            'Size': '15cm x 10cm',
            'Paper Quality': 'Glossy',
            'Weight': '0.15kg'
        },
        image: 'https://m.media-amazon.com/images/I/81XQ9+kv5VL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessmaster-piece-guide/p/itm123456'
    },
    {
        id: 24,
        name: 'Chess-themed Necktie',
        brand: 'Royal Chess',
        price: 899,
        originalPrice: 1199,
        category: 'apparel',
        material: 'silk',
        description: 'Elegant silk necktie with subtle chess piece patterns.',
        features: [
            '100% silk',
            'Hand-rolled edges',
            'Chess piece motif',
            'Formal wear',
            'Gift box included'
        ],
        specs: {
            'Length': '147cm',
            'Width': '8cm',
            'Material': 'Pure Silk',
            'Care': 'Dry clean only'
        },
        image: 'https://m.media-amazon.com/images/I/71hUwz5yYGL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/royal-chess-necktie/p/itm123456'
    },
    {
        id: 25,
        name: 'Chess Puzzle Calendar 2023',
        brand: 'ChessMaster',
        price: 499,
        originalPrice: 699,
        category: 'accessories',
        description: 'Daily chess puzzle calendar with solutions and explanations.',
        features: [
            '365 puzzles',
            'Difficulty ratings',
            'Spiral binding',
            'Solutions included',
            'Progress tracker'
        ],
        specs: {
            'Pages': '368',
            'Size': '15cm x 15cm',
            'Paper Quality': 'Premium',
            'Weight': '0.5kg'
        },
        image: 'https://m.media-amazon.com/images/I/81XQ9+kv5VL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessmaster-puzzle-calendar/p/itm123456'
    },
    // More products...
    {
        id: 26,
        name: 'Chess-themed Notebook Set',
        brand: 'ChessWay',
        price: 349,
        originalPrice: 499,
        category: 'accessories',
        material: 'paper/leather',
        description: 'Premium notebook set with chess-themed covers for game notation.',
        features: [
            '3 notebooks included',
            'Chess motif covers',
            'Lined and grid pages',
            'Elastic closure',
            'Pen loop'
        ],
        specs: {
            'Pages per book': '96',
            'Size': 'A5',
            'Cover Material': 'PU Leather',
            'Weight': '0.4kg'
        },
        image: 'https://m.media-amazon.com/images/I/71e+7kXq5LL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessway-notebook-set/p/itm123456'
    },
    {
        id: 27,
        name: 'Chess Piece Earrings',
        brand: 'Royal Chess',
        price: 1299,
        originalPrice: 1599,
        category: 'apparel',
        material: 'sterling silver',
        description: 'Elegant chess piece designed earrings for chess enthusiasts.',
        features: [
            'Sterling silver',
            'Knight and pawn designs',
            'Hypoallergenic',
            'Gift box included',
            'Handcrafted'
        ],
        specs: {
            'Length': '2.5cm',
            'Material': '925 Sterling Silver',
            'Weight': '0.01kg per pair',
            'Finish': 'Polished'
        },
        image: 'https://m.media-amazon.com/images/I/71hUwz5yYGL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/royal-chess-earrings/p/itm123456'
    },
    {
        id: 28,
        name: 'Chess Club Banner',
        brand: 'ChessMaster',
        price: 1999,
        originalPrice: 2499,
        category: 'accessories',
        material: 'vinyl',
        description: 'Professional vinyl banner for chess clubs and tournaments.',
        features: [
            'Weather-resistant',
            'Grommets for hanging',
            'Customizable text',
            'Vibrant colors',
            'Durable material'
        ],
        specs: {
            'Size': '2m x 1m',
            'Material': 'Premium Vinyl',
            'Weight': '0.8kg',
            'Customization': 'Club name/logo'
        },
        image: 'https://m.media-amazon.com/images/I/71YHjVXyRwL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessmaster-club-banner/p/itm123456'
    },
    {
        id: 29,
        name: 'Chess-themed Mouse Pad',
        brand: 'ChessWay',
        price: 299,
        originalPrice: 399,
        category: 'accessories',
        material: 'rubber/fabric',
        description: 'Large mouse pad with chess board design for gamers and professionals.',
        features: [
            'Non-slip base',
            'Smooth tracking surface',
            'Stitched edges',
            'Chess board pattern',
            'Large size'
        ],
        specs: {
            'Size': '80cm x 30cm',
            'Material': 'Rubber Base + Fabric Top',
            'Weight': '0.3kg',
            'Thickness': '3mm'
        },
        image: 'https://m.media-amazon.com/images/I/71e+7kXq5LL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessway-mouse-pad/p/itm123456'
    },
    {
        id: 30,
        name: 'Chess-themed Playing Cards',
        brand: 'Royal Chess',
        price: 249,
        originalPrice: 349,
        category: 'accessories',
        material: 'cardstock',
        description: 'Playing card deck with chess piece designs on face cards.',
        features: [
            'Standard poker size',
            'Chess-themed court cards',
            'Air-cushion finish',
            'Custom tuck box',
            'Collector\'s item'
        ],
        specs: {
            'Cards': '52 + 2 jokers',
            'Size': 'Poker standard',
            'Material': 'Premium Cardstock',
            'Weight': '0.1kg'
        },
        image: 'https://m.media-amazon.com/images/I/71hUwz5yYGL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/royal-chess-playing-cards/p/itm123456'
    },
    // Continuing to 50...
    {
        id: 31,
        name: 'Chess-themed Desk Lamp',
        brand: 'ChessMaster',
        price: 1799,
        originalPrice: 2199,
        category: 'accessories',
        material: 'metal',
        description: 'Adjustable desk lamp with chess piece base and warm lighting.',
        features: [
            'LED bulbs included',
            '3 brightness levels',
            'Chess king base',
            'Adjustable neck',
            'Touch control'
        ],
        specs: {
            'Height': '45cm',
            'Bulb Type': 'LED (included)',
            'Material': 'Metal',
            'Weight': '1.1kg',
            'Power': 'USB/Adapter'
        },
        image: 'https://m.media-amazon.com/images/I/61VX6L+0WjL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessmaster-desk-lamp/p/itm123456'
    },
    {
        id: 32,
        name: 'Chess-themed Winter Gloves',
        brand: 'Royal Chess',
        price: 799,
        originalPrice: 999,
        category: 'apparel',
        material: 'wool/leather',
        description: 'Warm winter gloves with subtle chess piece embroidery.',
        features: [
            'Touchscreen compatible',
            'Leather palms',
            'Chess piece embroidery',
            'Stretch cuff',
            'Gift box'
        ],
        specs: {
            'Material': 'Wool/Leather',
            'Sizes': 'S/M/L/XL',
            'Weight': '0.15kg per pair',
            'Care': 'Hand wash'
        },
        image: 'https://m.media-amazon.com/images/I/71hUwz5yYGL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/royal-chess-gloves/p/itm123456'
    },
    {
        id: 33,
        name: 'Chess-themed Throw Pillow',
        brand: 'ChessWay',
        price: 599,
        originalPrice: 799,
        category: 'accessories',
        material: 'cotton',
        description: 'Decorative throw pillow with chess board design for home decor.',
        features: [
            '18x18 inch size',
            'Removable cover',
            'Chess board pattern',
            'Hidden zipper',
            'Machine washable'
        ],
        specs: {
            'Size': '45cm x 45cm',
            'Material': '100% Cotton',
            'Fill': 'Polyester fiber',
            'Weight': '0.3kg'
        },
        image: 'https://m.media-amazon.com/images/I/71e+7kXq5LL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessway-throw-pillow/p/itm123456'
    },
    {
        id: 34,
        name: 'Chess-themed Socks (3 Pack)',
        brand: 'ChessMaster',
        price: 449,
        originalPrice: 599,
        category: 'apparel',
        material: 'cotton',
        description: 'Comfortable socks with chess piece designs for casual wear.',
        features: [
            '3 pairs per pack',
            'Breathable cotton',
            'Chess piece patterns',
            'Elastic support',
            'One size fits most'
        ],
        specs: {
            'Material': '80% Cotton, 15% Polyester, 5% Spandex',
            'Sizes': 'US 6-12',
            'Weight': '0.15kg per pack',
            'Care': 'Machine wash'
        },
        image: 'https://m.media-amazon.com/images/I/71YHjVXyRwL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessmaster-socks-pack/p/itm123456'
    },
    {
        id: 35,
        name: 'Chess-themed Apron',
        brand: 'Royal Chess',
        price: 699,
        originalPrice: 899,
        category: 'apparel',
        material: 'cotton',
        description: 'Stylish kitchen apron with chess board pattern for cooking enthusiasts.',
        features: [
            'Adjustable neck strap',
            'Two large pockets',
            'Tie-back closure',
            'Chess board print',
            'Machine washable'
        ],
        specs: {
            'Size': '75cm x 60cm',
            'Material': '100% Cotton',
            'Weight': '0.25kg',
            'Care': 'Machine wash'
        },
        image: 'https://m.media-amazon.com/images/I/71hUwz5yYGL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/royal-chess-apron/p/itm123456'
    },
    // Continuing to 50...
    {
        id: 36,
        name: 'Chess-themed Backpack',
        brand: 'ChessWay',
        price: 1599,
        originalPrice: 1999,
        category: 'accessories',
        material: 'polyester',
        description: 'Durable backpack with chess board design for students and travelers.',
        features: [
            '15-inch laptop compartment',
            'Multiple pockets',
            'Padded shoulder straps',
            'Chess board pattern',
            'Water-resistant'
        ],
        specs: {
            'Capacity': '25L',
            'Material': '600D Polyester',
            'Weight': '0.7kg',
            'Dimensions': '45cm x 30cm x 15cm'
        },
        image: 'https://m.media-amazon.com/images/I/71e+7kXq5LL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessway-backpack/p/itm123456'
    },
    {
        id: 37,
        name: 'Chess-themed Coffee Mug',
        brand: 'ChessMaster',
        price: 349,
        originalPrice: 499,
        category: 'accessories',
        material: 'ceramic',
        description: 'Premium ceramic mug with chess piece designs for hot beverages.',
        features: [
            '350ml capacity',
            'Dishwasher safe',
            'Chess piece graphics',
            'Comfortable handle',
            'Gift box option'
        ],
        specs: {
            'Capacity': '350ml',
            'Material': 'Ceramic',
            'Weight': '0.4kg',
            'Care': 'Dishwasher safe'
        },
        image: 'https://m.media-amazon.com/images/I/81XQ9+kv5VL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessmaster-coffee-mug/p/itm123456'
    },
    {
        id: 38,
        name: 'Chess-themed Keychain Set',
        brand: 'Royal Chess',
        price: 249,
        originalPrice: 399,
        category: 'accessories',
        material: 'metal',
        description: 'Set of 6 metal keychains with different chess piece designs.',
        features: [
            '6 different pieces',
            'Durable metal',
            'Enamel finish',
            'Split rings included',
            'Gift packaging'
        ],
        specs: {
            'Pieces': '6 keychains',
            'Material': 'Zinc Alloy',
            'Size': '3cm each',
            'Weight': '0.1kg per set'
        },
        image: 'https://m.media-amazon.com/images/I/71hUwz5yYGL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/royal-chess-keychains/p/itm123456'
    },
    {
        id: 39,
        name: 'Chess-themed Wall Art',
        brand: 'ChessWay',
        price: 1999,
        originalPrice: 2499,
        category: 'accessories',
        material: 'canvas',
        description: 'Framed canvas wall art featuring famous chess positions.',
        features: [
            'Stretched canvas',
            'Wooden frame',
            'Famous chess positions',
            'Ready to hang',
            '3-piece set'
        ],
        specs: {
            'Size': '40cm x 60cm each',
            'Material': 'Canvas',
            'Weight': '2kg total',
            'Set': '3 panels'
        },
        image: 'https://m.media-amazon.com/images/I/71e+7kXq5LL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessway-wall-art/p/itm123456'
    },
    {
        id: 40,
        name: 'Chess-themed Phone Case',
        brand: 'ChessMaster',
        price: 499,
        originalPrice: 699,
        category: 'accessories',
        material: 'tpu',
        description: 'Protective phone case with chess board design for various models.',
        features: [
            'Shock-absorbent',
            'Precise cutouts',
            'Chess board pattern',
            'Non-slip grip',
            'Wireless charging compatible'
        ],
        specs: {
            'Compatibility': 'Multiple models',
            'Material': 'TPU',
            'Weight': '0.05kg',
            'Protection': 'Military-grade'
        },
        image: 'https://m.media-amazon.com/images/I/71YHjVXyRwL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessmaster-phone-case/p/itm123456'
    },
    // Final 10 products...
    {
        id: 41,
        name: 'Chess-themed T-shirt',
        brand: 'Royal Chess',
        price: 799,
        originalPrice: 999,
        category: 'apparel',
        material: 'cotton',
        description: 'Casual t-shirt with subtle chess piece graphic for everyday wear.',
        features: [
            '100% cotton',
            'Breathable fabric',
            'Chess knight design',
            'Multiple colors',
            'Regular fit'
        ],
        specs: {
            'Material': '100% Cotton',
            'Sizes': 'S/M/L/XL/XXL',
            'Weight': '0.2kg',
            'Care': 'Machine wash'
        },
        image: 'https://m.media-amazon.com/images/I/71hUwz5yYGL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/royal-chess-tshirt/p/itm123456'
    },
    {
        id: 42,
        name: 'Chess-themed Cufflinks',
        brand: 'ChessMaster',
        price: 1299,
        originalPrice: 1599,
        category: 'apparel',
        material: 'sterling silver',
        description: 'Elegant cufflinks with chess piece designs for formal occasions.',
        features: [
            'Sterling silver',
            'King and queen designs',
            'Gift box included',
            'Secure closure',
            'Polished finish'
        ],
        specs: {
            'Material': '925 Sterling Silver',
            'Size': '1.5cm diameter',
            'Weight': '0.02kg per pair',
            'Finish': 'Polished'
        },
        image: 'https://m.media-amazon.com/images/I/61VX6L+0WjL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessmaster-cufflinks/p/itm123456'
    },
    {
        id: 43,
        name: 'Chess-themed Jigsaw Puzzle',
        brand: 'ChessWay',
        price: 599,
        originalPrice: 799,
        category: 'accessories',
        material: 'cardboard',
        description: '1000-piece jigsaw puzzle featuring famous chess match positions.',
        features: [
            '1000 pieces',
            'High-quality print',
            'Famous chess positions',
            'Poster included',
            'Challenge for enthusiasts'
        ],
        specs: {
            'Pieces': '1000',
            'Size when complete': '68cm x 48cm',
            'Material': 'Cardboard',
            'Weight': '0.5kg'
        },
        image: 'https://m.media-amazon.com/images/I/71e+7kXq5LL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/chessway-jigsaw-puzzle/p/itm123456'
    },
    {
        id: 44,
        name: 'Chess-themed Desk Organizer',
        brand: 'Royal Chess',
        price: 899,
        originalPrice: 1199,
        category: 'accessories',
        material: 'wood',
        description: 'Wooden desk organizer with chess piece compartments for stationery.',
        features: [
            'Multiple compartments',
            'Chess piece shaped holders',
            'Solid wood construction',
            'Natural finish',
            'Non-slip base'
        ],
        specs: {
            'Dimensions': '25cm x 15cm x 10cm',
            'Material': 'Sheesham Wood',
            'Weight': '0.8kg',
            'Compartments': '6'
        },
        image: 'https://m.media-amazon.com/images/I/71hUwz5yYGL._AC_UF1000,1000_QL80_.jpg',
        amazonLink: 'https://www.amazon.com/dp/B08L3YFJ7N',
        flipkartLink: 'https://www.flipkart.com/royal-chess-desk-organizer/p/itm123456'
    }
];

// Updated brand data with proper logos
const brands = [
    {
        name: 'Staunton',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Staunton_chess_set.jpg/1200px-Staunton_chess_set.jpg',
        dataBrand: 'staunton'
    },
    {
        name: 'ChessMaster',
        logo: 'https://upload.wikimedia.org/wikipedia/en/2/29/Chessmaster_logo.png',
        dataBrand: 'chessmaster'
    },
    {
        name: 'Royal Chess',
        logo: 'https://pbs.twimg.com/profile_images/1538852928248635393/LjJjGX72_400x400.jpg',
        dataBrand: 'royalchess'
    },
    {
        name: 'ChessWay',
        logo: 'https://static.vecteezy.com/system/resources/previews/008/480/739/non_2x/simple-chess-king-logo-icon-illustration-free-vector.jpg',
        dataBrand: 'chessway'
    },
    {
        name: 'Chess Bazaar',
        logo: 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpENTibR.png',
        dataBrand: 'chessbazaar'
    },
    {
        name: 'DGT',
        logo: 'https://www.digitalgametechnology.com/images/DGT_Logo.png',
        dataBrand: 'dgt'
    },
    {
        name: 'House of Staunton',
        logo: 'https://www.houseofstaunton.com/media/logo/default/hos_logo_1.png',
        dataBrand: 'hos'
    },
    {
        name: 'ChessUp',
        logo: 'https://www.chessup.com/wp-content/uploads/2021/05/ChessUp-Logo.png',
        dataBrand: 'chessup'
    }
];

    // Display products
    const productsGrid = document.querySelector('.products-grid');
    const categoryTabs = document.querySelectorAll('.category-tabs .tab-btn');
    const brandTabs = document.querySelectorAll('.brand-tabs .tab-btn');
    const loadMoreBtn = document.getElementById('load-more-btn');
    let currentCategory = 'all';
    let currentBrand = 'all';
    let displayedCount = 8;

    function displayProducts(category = 'all', brand = 'all', count = 8, minPrice = 500, maxPrice = 50000) {
        productsGrid.innerHTML = '';
        const filteredProducts = products.filter(product => {
            const categoryMatch = category === 'all' || 
                                product.category === category || 
                                product.material === category;
            const brandMatch = brand === 'all' || product.brand.toLowerCase() === brand.toLowerCase();
            const priceMatch = product.price >= minPrice && product.price <= maxPrice;
            return categoryMatch && brandMatch && priceMatch;
        });
        
        const productsToShow = filteredProducts.slice(0, count);
        
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-img-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <p class="product-brand">${product.brand}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
                        ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });

        // Update load more button visibility
        loadMoreBtn.style.display = filteredProducts.length > count ? 'block' : 'none';
    }

    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            displayedCount = 8;
            displayProducts(currentCategory, currentBrand, displayedCount);
        });
    });

    // Brand tabs
    brandTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            brandTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentBrand = this.dataset.brand;
            displayedCount = 8;
            displayProducts(currentCategory, currentBrand, displayedCount);
        });
    });

    // Load more button
    loadMoreBtn.addEventListener('click', function() {
        displayedCount += 4;
        displayProducts(currentCategory, currentBrand, displayedCount);
    });

    // Modal functionality
    const productModal = document.getElementById('productModal');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductBrand = document.getElementById('modalProductBrand');
    const modalCurrentPrice = document.getElementById('modalCurrentPrice');
    const modalOriginalPrice = document.getElementById('modalOriginalPrice');
    const modalProductSpecs = document.getElementById('modalProductSpecs');
    const modalProductFeatures = document.getElementById('modalProductFeatures');
    const modalBuyLinks = document.getElementById('modalBuyLinks');
    const modalMainImage = document.getElementById('modalMainImage');
    const thumbnailImages = document.getElementById('thumbnailImages');
    const closeModal = document.querySelectorAll('.close-modal');

    // Open modal when clicking on product cards
    document.addEventListener('click', function(e) {
        // Don't open modal if clicking add to cart or wishlist buttons
        if (e.target.classList.contains('add-to-cart') || 
            e.target.classList.contains('wishlist-btn') ||
            e.target.closest('.add-to-cart') ||
            e.target.closest('.wishlist-btn')) {
            return;
        }

        const productCard = e.target.closest('.product-card');
        if (productCard) {
            const productId = parseInt(productCard.querySelector('.add-to-cart').dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
                openProductModal(product);
            }
        }
    });

    function openProductModal(product) {
        // Set basic info
        modalProductName.textContent = product.name;
        modalProductBrand.textContent = product.brand;
        modalCurrentPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;
        
        // Handle original price
        if (product.originalPrice) {
            modalOriginalPrice.textContent = `₹${product.originalPrice.toLocaleString('en-IN')}`;
            modalOriginalPrice.style.display = 'inline-block';
        } else {
            modalOriginalPrice.style.display = 'none';
        }
        
        // Set main image
        modalMainImage.src = product.image;
        modalMainImage.alt = product.name;
        
        // Set thumbnails (if available)
        thumbnailImages.innerHTML = '';
        if (product.images && product.images.length > 0) {
            product.images.forEach((img, index) => {
                const thumb = document.createElement('img');
                thumb.src = img;
                thumb.alt = `${product.name} - ${index + 1}`;
                thumb.addEventListener('click', () => {
                    modalMainImage.src = img;
                    document.querySelectorAll('.thumbnail-images img').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
                if (index === 0) thumb.classList.add('active');
                thumbnailImages.appendChild(thumb);
            });
        }
        
        // Set specifications
        modalProductSpecs.innerHTML = '<h3>Specifications</h3>';
        if (product.specs) {
            for (const [key, value] of Object.entries(product.specs)) {
                const specItem = document.createElement('div');
                specItem.className = 'spec-item';
                specItem.innerHTML = `
                    <span class="spec-name">${key}</span>
                    <span class="spec-value">${value}</span>
                `;
                modalProductSpecs.appendChild(specItem);
            }
        }
        
        // Set features
        modalProductFeatures.innerHTML = '<h3>Features</h3>';
        if (product.features) {
            const featuresList = document.createElement('ul');
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            modalProductFeatures.appendChild(featuresList);
        }
        
        // Set buy links
        modalBuyLinks.innerHTML = '';
        if (product.amazonLink) {
            const amazonLink = document.createElement('a');
            amazonLink.href = product.amazonLink;
            amazonLink.className = 'buy-link';
            amazonLink.target = '_blank';
            amazonLink.innerHTML = '<i class="fab fa-amazon"></i> Buy on Amazon';
            modalBuyLinks.appendChild(amazonLink);
        }
        if (product.flipkartLink) {
            const flipkartLink = document.createElement('a');
            flipkartLink.href = product.flipkartLink;
            flipkartLink.className = 'buy-link';
            flipkartLink.target = '_blank';
            flipkartLink.innerHTML = '<i class="fas fa-shopping-bag"></i> Buy on Flipkart';
            modalBuyLinks.appendChild(flipkartLink);
        }
        if (product.brandLink) {
            const brandLink = document.createElement('a');
            brandLink.href = product.brandLink;
            brandLink.className = 'buy-link';
            brandLink.target = '_blank';
            brandLink.innerHTML = '<i class="fas fa-globe"></i> Buy from Brand';
            modalBuyLinks.appendChild(brandLink);
        }
        
        // Show modal
        productModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modals
    closeModal.forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.auth-modal, .product-modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        });
    });

    // Close when clicking outside modal
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('auth-modal') || e.target.classList.contains('product-modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const selectedProduct = products.find(p => p.id === productId);
            
            if (selectedProduct) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity = (existingItem.quantity || 1) + 1;
                    if (existingItem.quantity > 10) existingItem.quantity = 10;
                } else {
                    selectedProduct.quantity = 1;
                    cart.push(selectedProduct);
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                
                // Animation
                const cartIcon = document.querySelector('.fa-shopping-cart');
                cartIcon.classList.add('animate');
                setTimeout(() => cartIcon.classList.remove('animate'), 500);
                
                // Show success message
                const btn = e.target;
                const originalText = btn.textContent;
                btn.textContent = 'Added to Cart!';
                btn.style.backgroundColor = '#2ecc71';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 2000);
            }
        }
    });

    // Wishlist button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('wishlist-btn') || e.target.closest('.wishlist-btn')) {
            const btn = e.target.classList.contains('wishlist-btn') ? e.target : e.target.closest('.wishlist-btn');
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'var(--secondary-color)';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        }
    });

    // Price filter functionality
    document.getElementById('apply-filter').addEventListener('click', function() {
        const minPrice = parseFloat(document.getElementById('min-price').value) || 500;
        const maxPrice = parseFloat(document.getElementById('max-price').value) || 50000;
        displayedCount = 8;
        displayProducts(currentCategory, currentBrand, displayedCount, minPrice, maxPrice);
    });

    document.getElementById('reset-filter').addEventListener('click', function() {
        document.getElementById('min-price').value = '';
        document.getElementById('max-price').value = '';
        displayedCount = 8;
        displayProducts(currentCategory, currentBrand, displayedCount, 500, 50000);
    });

    // Initialize
    setTimeout(() => {
        displayProducts();
    }, 1500);

    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .brand-card, .product-card, .testimonial-card, .info-item, .form-group');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    setTimeout(() => {
        animateOnScroll();
    }, 1500);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Brand card hover effect
    const brandCards = document.querySelectorAll('.brand-card');
    brandCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const brand = this.dataset.brand;
            document.body.classList.add(`brand-${brand}`);
        });
        
        card.addEventListener('mouseleave', function() {
            const brand = this.dataset.brand;
            document.body.classList.remove(`brand-${brand}`);
        });
    });

    // Auth Modal Functionality
    const loginModal = document.getElementById('loginModal');
    const openLoginModalBtn = document.getElementById('openLoginModal');
    const openSignupModalBtn = document.getElementById('openSignupModal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginFormElement = document.getElementById('loginFormElement');
    const signupFormElement = document.getElementById('signupFormElement');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const signupName = document.getElementById('signupName');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const userIcon = document.getElementById('userIcon');

    // Create floating bubbles for login modal
    const loginBubbles = document.getElementById('loginBubbles');
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 80 + 30;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = `-${size}px`;
        bubble.style.animationDuration = `${Math.random() * 20 + 10}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        loginBubbles.appendChild(bubble);
    }

    // Open login modal
    openLoginModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Switch to login tab by default
        switchAuthTab('login');
    });

    // Open signup modal
    openSignupModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Switch to signup tab
        switchAuthTab('signup');
    });

    // Switch between auth tabs
    function switchAuthTab(tabName) {
        authTabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        authForms.forEach(form => {
            if (form.id === `${tabName}Form`) {
                form.classList.add('active');
            } else {
                form.classList.remove('active');
            }
        });
    }

    // Tab click handler
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchAuthTab(this.dataset.tab);
        });
    });

    // Switch to signup form
    switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        switchAuthTab('signup');
    });

    // Switch to login form
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        switchAuthTab('login');
    });

    // Login form submission
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = loginEmail.value;
        const password = loginPassword.value;
        
        // Simple validation
        if (!email || !password) {
            this.classList.add('animate__animated', 'animate__shakeX');
            setTimeout(() => {
                this.classList.remove('animate__shakeX');
            }, 1000);
            return;
        }
        
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Success animation
            const btn = this.querySelector('button');
            btn.classList.add('animate__animated', 'animate__bounceOut');
            
            setTimeout(() => {
                btn.textContent = '✓ Success!';
                btn.classList.remove('animate__bounceOut');
                btn.classList.add('animate__bounceIn');
                btn.style.background = '#2ecc71';
                
                // Store current user
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Initialize users in localStorage if not exists
                if (!localStorage.getItem('users')) {
                    localStorage.setItem('users', JSON.stringify([]));
                }
                
                // Update UI
                updateAuthState();
                
                // Close modal after delay
                setTimeout(() => {
                    loginModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 1000);
            }, 500);
        } else {
            this.classList.add('animate__animated', 'animate__shakeX');
            setTimeout(() => {
                this.classList.remove('animate__shakeX');
            }, 1000);
        }
    });

    // Signup form submission
    signupFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = signupName.value;
        const email = signupEmail.value;
        const password = signupPassword.value;
        const confirmPass = confirmPassword.value;
        
        // Validate passwords match
        if (password !== confirmPass) {
            passwordError.style.display = 'block';
            this.classList.add('animate__animated', 'animate__shakeX');
            setTimeout(() => {
                this.classList.remove('animate__shakeX');
            }, 1000);
            return;
        }
        
        // Check if email exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            emailError.style.display = 'block';
            this.classList.add('animate__animated', 'animate__shakeX');
            setTimeout(() => {
                this.classList.remove('animate__shakeX');
            }, 1000);
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            joined: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Success animation
        const btn = this.querySelector('button');
        btn.classList.add('animate__animated', 'animate__bounceOut');
        
        setTimeout(() => {
            btn.textContent = '✓ Account Created!';
            btn.classList.remove('animate__bounceOut');
            btn.classList.add('animate__bounceIn');
            btn.style.background = '#2ecc71';
            
            // Update UI
            updateAuthState();
            
            // Close modal after delay
            setTimeout(() => {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 1000);
        }, 500);
    });

    // Update auth state based on current user
    function updateAuthState() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser) {
            // Hide login/signup buttons
            document.querySelector('.auth-buttons').style.display = 'none';
            
            // Show user icon with dropdown
            userIcon.innerHTML = `<i class="fas fa-user-circle"></i>`;
            userIcon.style.fontSize = '1.4rem';
            
            // Create dropdown menu with enhanced layout
            const dropdown = document.createElement('div');
            dropdown.className = 'user-dropdown';
            dropdown.innerHTML = `
                <div class="user-header">
                    <div class="user-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="user-info">
                        <h4>${currentUser.name}</h4>
                        <p>${currentUser.email}</p>
                    </div>
                </div>
                <div class="user-menu">
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-user"></i>
                        <span>My Profile</span>
                    </a>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-box"></i>
                        <span>My Orders</span>
                        <span class="badge">0</span>
                    </a>
                    <a href="#" class="dropdown-item">
                        <i class="fas fa-heart"></i>
                        <span>Wishlist</span>
                        <span class="badge">0</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" id="logoutBtn" class="dropdown-item logout-item">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </div>
            `;

            // Add styles for logout button
            const style = document.createElement('style');
            style.textContent += `
                .logout-item {
                    color: #dc3545 !important;
                }
                .logout-item i {
                    color: #dc3545 !important;
                }
                .logout-item:hover {
                    background-color: #fff5f5 !important;
                }
            `;
            document.head.appendChild(style);
            
            // Position dropdown
            userIcon.parentNode.appendChild(dropdown);
            
            // Update user icon click handler
            userIcon.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'profile.html';
            });
            
            // Enhanced logout functionality
            const logoutBtn = dropdown.querySelector('#logoutBtn');
            logoutBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                
                // Add loading state
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Logging out...</span>';
                
                // Simulate logout process
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Clear user data
                localStorage.removeItem('currentUser');
                
                // Show success message
                const message = document.createElement('div');
                message.className = 'logout-message';
                message.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    Successfully logged out!
                `;
                document.body.appendChild(message);
                
                // Add styles for message
                const messageStyle = document.createElement('style');
                messageStyle.textContent = `
                    .logout-message {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #28a745;
                        color: white;
                        padding: 12px 24px;
                        border-radius: 4px;
                        z-index: 9999;
                        animation: slideIn 0.3s ease-out;
                    }
                    @keyframes slideIn {
                        from { transform: translateX(100%); }
                        to { transform: translateX(0); }
                    }
                `;
                document.head.appendChild(messageStyle);
                
                // Remove message and reload page
                setTimeout(() => {
                    message.remove();
                    location.reload();
                }, 1500);
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.user-dropdown') && e.target !== userIcon) {
                    dropdown.style.display = 'none';
                }
            });
        } else {
            // Show login/signup buttons
            document.querySelector('.auth-buttons').style.display = 'flex';
            
            // Reset user icon
            userIcon.innerHTML = `<i class="fas fa-user"></i>`;
            userIcon.style.fontSize = '1.2rem';
            
            // Remove dropdown if exists
            const dropdown = document.querySelector('.user-dropdown');
            if (dropdown) dropdown.remove();
        }
    }

    // Check auth state on page load
    updateAuthState();

    // Clear error messages when typing
    signupEmail.addEventListener('input', () => emailError.style.display = 'none');
    confirmPassword.addEventListener('input', () => passwordError.style.display = 'none');
    
    // Cart Page Functionality
    function loadCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) return; // Not on cart page
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            // Show empty cart message
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any products yet.</p>
                    <a href="index.html#shop" class="btn">Continue Shopping</a>
                </div>
            `;
            document.querySelector('.checkout-btn').style.display = 'none';
            updateSummary(0, 0, 0);
            return;
        }
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="product-brand">${item.brand}</p>
                    <p>${item.category} product</p>
                    <div class="item-actions">
                        <button class="remove-item btn-link tab-btn">Remove</button>
                        <button class="save-for-later btn-link tab-btn">Save for later</button>
                    </div>
                </div>
                <div class="item-price">
                    ₹${item.price.toLocaleString('en-IN')}
                </div>
                <div class="item-quantity">
                    <button class="quantity-minus tab-btn"><i class="fas fa-minus"></i></button>
                    <input type="number" value="${item.quantity || 1}" min="1">
                    <button class="quantity-plus tab-btn"><i class="fas fa-plus"></i></button>
                </div>
                <div class="item-total">
                    ₹${((item.price * (item.quantity || 1))).toLocaleString('en-IN')}
                </div>
            </div>
        `).join('');
        
        // Calculate subtotal
        const subtotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
        const shipping = subtotal > 5000 ? 0 : 100; // Free shipping over ₹5000
        const tax = subtotal * 0.18; // 18% GST
        
        updateSummary(subtotal, shipping, tax);
        
        // Add event listeners
        document.querySelectorAll('.quantity-minus').forEach(button => {
            button.addEventListener('click', function() {
                const input = this.nextElementSibling;
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                    updateCartItem(this.closest('.cart-item'));
                }
            });
        });
        
        document.querySelectorAll('.quantity-plus').forEach(button => {
            button.addEventListener('click', function() {
                const input = this.previousElementSibling;
                let value = parseInt(input.value);
                if (value < 10) {
                    input.value = value + 1;
                    updateCartItem(this.closest('.cart-item'));
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                removeCartItem(cartItem);
            });
        });
        
        document.querySelectorAll('.item-quantity input').forEach(input => {
            input.addEventListener('change', function() {
                let value = parseInt(this.value);
                if (isNaN(value) || value < 1) {
                    this.value = 1;
                } else if (value > 10) {
                    this.value = 10;
                }
                updateCartItem(this.closest('.cart-item'));
            });
        });

        // Save for later functionality
        document.querySelectorAll('.save-for-later').forEach(button => {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                saveForLater(cartItem);
            });
        });

        // Add checkout button event listener
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                // Create success message element
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success position-fixed top-50 start-50 translate-middle';
                successMessage.style.zIndex = '9999';
                successMessage.style.minWidth = '300px';
                successMessage.style.textAlign = 'center';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle fa-2x mb-2"></i>
                    <h4>Order Placed Successfully!</h4>
                    <p>Your items have been ordered.</p>
                `;

                // Add message to body
                document.body.appendChild(successMessage);

                // Clear the cart
                localStorage.setItem('cart', '[]');
                updateCartCount();

                // Remove message and redirect after delay
                setTimeout(() => {
                    successMessage.remove();
                    window.location.href = 'index.html#shop';
                }, 2000);
            });
        }
    }

    function updateCartItem(cartItem) {
        const productId = parseInt(cartItem.getAttribute('data-id'));
        const quantity = parseInt(cartItem.querySelector('.item-quantity input').value);
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update item total
            const price = cart[itemIndex].price;
            cartItem.querySelector('.item-total').textContent = `₹${(price * quantity).toLocaleString('en-IN')}`;
            
            // Update summary
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const shipping = subtotal > 5000 ? 0 : 100;
            const tax = subtotal * 0.18;
            
            updateSummary(subtotal, shipping, tax);
            updateCartCount();
        }
    }

    function removeCartItem(cartItem) {
        const productId = parseInt(cartItem.getAttribute('data-id'));
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        cartItem.remove();
        
        if (cart.length === 0) {
            const cartItemsContainer = document.getElementById('cart-items');
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any products yet.</p>
                        <a href="index.html#shop" class="btn">Continue Shopping</a>
                    </div>
                `;
                document.querySelector('.checkout-btn').style.display = 'none';
            }
        }
        
        // Update summary
        const subtotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
        const shipping = subtotal > 5000 ? 0 : 100;
        const tax = subtotal * 0.18;
        
        updateSummary(subtotal, shipping, tax);
        updateCartCount();
    }

    function updateSummary(subtotal, shipping, tax) {
        const total = subtotal + shipping + tax;
        
        document.querySelector('.subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
        document.querySelector('.shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`;
        document.querySelector('.tax').textContent = `₹${tax.toLocaleString('en-IN')}`;
        document.querySelector('.total-price').textContent = `₹${total.toLocaleString('en-IN')}`;
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }

    function saveForLater(cartItem) {
        const productId = parseInt(cartItem.getAttribute('data-id'));
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        
        const item = cart.find(item => item.id === productId);
        if (item) {
            // Add item to saved items
            savedItems.push(item);
            localStorage.setItem('savedItems', JSON.stringify(savedItems));
            
            // Remove item from cart
            removeCartItem(cartItem);
            
            // Load saved items
            loadSavedItems();
            
            // Show success message
            const message = document.createElement('div');
            message.className = 'alert alert-success';
            message.textContent = 'Item saved for later';
            const savedItemsContainer = document.querySelector('.saved-items');
            savedItemsContainer.insertBefore(message, savedItemsContainer.firstChild);
            setTimeout(() => message.remove(), 3000);
        }
    }

    function loadSavedItems() {
        const savedItemsContainer = document.querySelector('.saved-items-container');
        if (!savedItemsContainer) return;

        const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        
        if (savedItems.length === 0) {
            savedItemsContainer.innerHTML = `
                <div class="text-center text-muted py-4">
                    <p>No items saved for later</p>
                </div>
            `;
            return;
        }

        savedItemsContainer.innerHTML = savedItems.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="product-brand">${item.brand}</p>
                    <p>${item.category} product</p>
                    <div class="item-actions">
                        <button class="move-to-cart btn-link tab-btn">Move to Cart</button>
                        <button class="remove-saved-item btn-link tab-btn">Remove</button>
                    </div>
                </div>
                <div class="item-price">
                    ₹${item.price.toLocaleString('en-IN')}
                </div>
            </div>
        `).join('');

        // Add event listeners for saved items
        document.querySelectorAll('.move-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const savedItem = this.closest('.cart-item');
                moveToCart(savedItem);
            });
        });

        document.querySelectorAll('.remove-saved-item').forEach(button => {
            button.addEventListener('click', function() {
                const savedItem = this.closest('.cart-item');
                removeSavedItem(savedItem);
            });
        });
    }

    function moveToCart(savedItem) {
        const productId = parseInt(savedItem.getAttribute('data-id'));
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        
        const item = savedItems.find(item => item.id === productId);
        if (item) {
            // Add to cart
            const existingCartItem = cart.find(cartItem => cartItem.id === productId);
            if (existingCartItem) {
                existingCartItem.quantity = (existingCartItem.quantity || 1) + 1;
                if (existingCartItem.quantity > 10) existingCartItem.quantity = 10;
            } else {
                item.quantity = 1;
                cart.push(item);
            }
            
            // Remove from saved items
            savedItems = savedItems.filter(savedItem => savedItem.id !== productId);
            
            // Update storage
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('savedItems', JSON.stringify(savedItems));
            
            // Refresh displays
            loadCart();
            loadSavedItems();
            updateCartCount();
            
            // Show success message
            const message = document.createElement('div');
            message.className = 'alert alert-success';
            message.textContent = 'Item moved to cart';
            const cartContainer = document.querySelector('.cart-items');
            cartContainer.insertBefore(message, cartContainer.firstChild);
            setTimeout(() => message.remove(), 3000);
        }
    }

    function removeSavedItem(savedItem) {
        const productId = parseInt(savedItem.getAttribute('data-id'));
        let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        
        // Remove item from saved items
        savedItems = savedItems.filter(item => item.id !== productId);
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        
        // Refresh saved items display
        loadSavedItems();
        
        // Show success message
        const message = document.createElement('div');
        message.className = 'alert alert-success';
        message.textContent = 'Item removed from saved items';
        const savedItemsContainer = document.querySelector('.saved-items');
        savedItemsContainer.insertBefore(message, savedItemsContainer.firstChild);
        setTimeout(() => message.remove(), 3000);
    }

    // Initialize cart functionality when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Update cart count
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        }

        // Initialize cart page if we're on cart.html
        loadCart();
        loadSavedItems();
    });

    // Event delegation for dynamic auth elements
    document.addEventListener('click', function(e) {
        // Handle login button click
        if (e.target.matches('.login-btn') || e.target.closest('.login-btn')) {
            e.preventDefault();
            const loginModal = document.getElementById('loginModal');
            loginModal.style.display = 'block';
            switchAuthTab('login');
        }
        
        // Handle signup button click
        if (e.target.matches('.signup-btn') || e.target.closest('.signup-btn')) {
            e.preventDefault();
            const loginModal = document.getElementById('loginModal');
            loginModal.style.display = 'block';
            switchAuthTab('signup');
        }
        
        // Handle switch to signup link
        if (e.target.matches('#switchToSignup')) {
            e.preventDefault();
            switchAuthTab('signup');
        }
        
        // Handle switch to login link
        if (e.target.matches('#switchToLogin')) {
            e.preventDefault();
            switchAuthTab('login');
        }
        
        // Handle form submissions
        if (e.target.matches('#loginForm button[type="submit"]')) {
            e.preventDefault();
            handleLogin();
        }
        
        if (e.target.matches('#signupForm button[type="submit"]')) {
            e.preventDefault();
            handleSignup();
        }
    });

    // Handle login form submission
    function handleLogin() {
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (!loginEmail || !loginPassword) {
            showError('loginError', 'Please fill in all fields');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showSuccess('Login successful!');
            setTimeout(() => {
                document.getElementById('loginModal').style.display = 'none';
                updateAuthState();
            }, 1500);
        } else {
            showError('loginError', 'Invalid email or password');
        }
    }

    // Handle signup form submission
    function handleSignup() {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            showError('signupError', 'Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            showError('signupError', 'Passwords do not match');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            showError('signupError', 'Email already exists');
            return;
        }
        
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            joined: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        showSuccess('Account created successfully!');
        setTimeout(() => {
            document.getElementById('loginModal').style.display = 'none';
            updateAuthState();
        }, 1500);
    }

    // Helper functions
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 3000);
        }
    }

    function showSuccess(message) {
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.textContent = message;
        
        const form = document.querySelector('.auth-form.active');
        if (form) {
            form.insertBefore(successMessage, form.firstChild);
            setTimeout(() => successMessage.remove(), 3000);
        }
    }
});

// Brand data array
const brands = [
    {
        name: 'Staunton',
        logo: 'https://cdn.shopify.com/s/files/1/0280/7985/4614/files/official-staunton-logo.png',
        dataBrand: 'staunton'
    },
    {
        name: 'ChessMaster',
        logo: 'https://upload.wikimedia.org/wikipedia/en/2/29/Chessmaster_logo.png',
        dataBrand: 'chessmaster'
    },
    {
        name: 'Royal Chess',
        logo: 'https://static.vecteezy.com/system/resources/previews/007/514/845/non_2x/chess-king-crown-luxury-logo-design-free-vector.jpg',
        dataBrand: 'royalchess'
    },
    {
        name: 'ChessWay',
        logo: 'https://static.vecteezy.com/system/resources/previews/008/480/739/non_2x/simple-chess-king-logo-icon-illustration-free-vector.jpg',
        dataBrand: 'chessway'
    },
    {
        name: 'Chess Bazaar',
        logo: 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpENTibR.png',
        dataBrand: 'chessbazaar'
    },
    {
        name: 'DGT',
        logo: 'https://www.digitalgametechnology.com/images/DGT_Logo.png',
        dataBrand: 'dgt'
    }
];

// Function to load brand cards
function loadBrandCards() {
    const brandsGrid = document.querySelector('.brands-grid');
    brandsGrid.innerHTML = brands.map(brand => `
        <div class="brand-card" data-brand="${brand.dataBrand}">
            <img src="${brand.logo}" alt="${brand.name}">
        </div>
    `).join('');
}

// Initialize brands on page load
document.addEventListener('DOMContentLoaded', () => {
    loadBrandCards();
    // ...rest of your existing initialization code...
});

const testimonials = [
    {
        rating: 5,
        text: "The Royal Chess Set I purchased is simply magnificent. The craftsmanship is outstanding and the pieces feel perfect in hand.",
        customer: {
            name: "Rahul Sharma",
            location: "Delhi",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        }
    },
    {
        rating: 4.5,
        text: "Great experience buying my tournament chess clock. Customer service was very helpful in choosing the right model.",
        customer: {
            name: "Priya Patel",
            location: "Mumbai",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        }
    },
    {
        rating: 5,
        text: "As a chess enthusiast, I appreciate ChessKart's collection. Found the perfect Staunton set within my budget.",
        customer: {
            name: "Arjun Mehta",
            location: "Chess Enthusiast",
            image: "https://randomuser.me/api/portraits/men/75.jpg"
        }
    }
];

function loadTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (!testimonialsContainer) return;

    testimonialsContainer.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="rating">
                ${getStarRating(testimonial.rating)}
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="customer">
                <img src="${testimonial.customer.image}" alt="${testimonial.customer.name}">
                <div>
                    <h4>${testimonial.customer.name}</h4>
                    <p>${testimonial.customer.location}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTestimonials();
    // ...rest of existing initialization code...
});

function displayProducts(category = 'all', brand = 'all', count = 8, minPrice = 500, maxPrice = 50000) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    const filteredProducts = products.filter(product => {
        const categoryMatch = category === 'all' || product.category === category;
        const brandMatch = brand === 'all' || product.brand.toLowerCase() === brand.toLowerCase();
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        return categoryMatch && brandMatch && priceMatch;
    });

    // ...rest of existing display logic...
}

// Initialize filters
document.addEventListener('DOMContentLoaded', () => {
    const brandTabs = document.querySelectorAll('.brand-tabs .tab-btn');
    brandTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            brandTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentBrand = this.dataset.brand;
            displayedCount = 8;
            displayProducts(currentCategory, currentBrand, displayedCount);
        });
    });
    
    // ...rest of initialization code...
});