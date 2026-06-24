module.exports = {
  states: [
    { slug: "uttar-pradesh", name: "Uttar Pradesh", abbr: "UP",
      language: "Hindi", tier: 2,
      cities: [
        { slug: "bareilly", name: "Bareilly", district: "Bareilly", population: "1.1M",
          localNote: "Major commercial hub for Western UP, known for furniture, steel, and educational institutions" },
        { slug: "lucknow", name: "Lucknow", district: "Lucknow", population: "3.5M",
          localNote: "State capital, strong in government, healthcare, education, and retail sectors" },
        { slug: "kanpur", name: "Kanpur", district: "Kanpur Nagar", population: "3.1M",
          localNote: "Industrial hub, major leather and textile manufacturing center" },
        { slug: "agra", name: "Agra", district: "Agra", population: "1.7M",
          localNote: "Tourism, marble products, shoes and leather goods industry hub" },
        { slug: "varanasi", name: "Varanasi", district: "Varanasi", population: "1.4M",
          localNote: "Religious tourism, silk weaving, and growing medical tourism hub" },
        { slug: "mathura", name: "Mathura", district: "Mathura", population: "0.4M",
          localNote: "Religious tourism and dairy industry hub" },
        { slug: "meerut", name: "Meerut", district: "Meerut", population: "1.5M",
          localNote: "Sports goods manufacturing and agricultural trading center" },
        { slug: "allahabad", name: "Prayagraj", district: "Prayagraj", population: "1.5M",
          localNote: "Education, judicial center, and Maha Kumbh tourism hub" },
        { slug: "noida", name: "Noida", district: "Gautam Buddha Nagar", population: "0.64M",
          localNote: "IT and corporate hub, part of Delhi NCR tech ecosystem" },
        { slug: "ghaziabad", name: "Ghaziabad", district: "Ghaziabad", population: "2.4M",
          localNote: "Industrial city in NCR belt, growing real estate and retail market" }
      ]
    },
    { slug: "delhi", name: "Delhi NCR", abbr: "DL",
      language: "Hindi/English", tier: 1,
      cities: [
        { slug: "new-delhi", name: "New Delhi", district: "Central Delhi", population: "11M",
          localNote: "National capital, highest concentration of B2B, government, and premium services" },
        { slug: "gurugram", name: "Gurugram", district: "Gurugram", population: "1.5M",
          localNote: "Corporate India headquarters hub, premium B2B and luxury consumer market" },
        { slug: "noida-dl", name: "Noida", district: "Gautam Buddha Nagar", population: "0.64M",
          localNote: "IT/ITES and startup hub with young professional consumer base" },
        { slug: "faridabad", name: "Faridabad", district: "Faridabad", population: "1.4M",
          localNote: "Industrial city with strong manufacturing and SME presence" },
        { slug: "dwarka", name: "Dwarka", district: "South West Delhi", population: "0.7M",
          localNote: "Residential suburb with growing retail, education, and healthcare businesses" },
        { slug: "rohini", name: "Rohini", district: "North West Delhi", population: "0.9M",
          localNote: "Large residential area with dense local business activity" }
      ]
    },
    { slug: "maharashtra", name: "Maharashtra", abbr: "MH",
      language: "Marathi/English", tier: 1,
      cities: [
        { slug: "mumbai", name: "Mumbai", district: "Mumbai City", population: "12.5M",
          localNote: "Financial capital, media/entertainment hub, highest urban consumer spend" },
        { slug: "pune", name: "Pune", district: "Pune", population: "3.1M",
          localNote: "IT, education, and auto industry hub with young workforce" },
        { slug: "nagpur", name: "Nagpur", district: "Nagpur", population: "2.4M",
          localNote: "Orange city, central India commercial hub and growing IT sector" },
        { slug: "nashik", name: "Nashik", district: "Nashik", population: "1.5M",
          localNote: "Wine capital of India, grape/onion farming, and growing IT park" },
        { slug: "aurangabad", name: "Aurangabad", district: "Chhatrapati Sambhajinagar", population: "1.2M",
          localNote: "Auto manufacturing and tourism hub (Ajanta-Ellora)" },
        { slug: "thane", name: "Thane", district: "Thane", population: "1.8M",
          localNote: "Mumbai's twin city with dense residential and commercial activity" },
        { slug: "navi-mumbai", name: "Navi Mumbai", district: "Thane", population: "1.1M",
          localNote: "Planned city with growing corporate and retail presence" }
      ]
    },
    { slug: "karnataka", name: "Karnataka", abbr: "KA",
      language: "Kannada/English", tier: 1,
      cities: [
        { slug: "bangalore", name: "Bangalore", district: "Bengaluru Urban", population: "8.4M",
          localNote: "Silicon Valley of India — highest concentration of tech companies and startups" },
        { slug: "mysore", name: "Mysore", district: "Mysuru", population: "0.9M",
          localNote: "Yoga capital, silk industry, and heritage tourism hub" },
        { slug: "mangalore", name: "Mangalore", district: "Dakshina Kannada", population: "0.6M",
          localNote: "Banking, seafood exports, and cashew processing hub" },
        { slug: "hubli", name: "Hubli-Dharwad", district: "Dharwad", population: "1.0M",
          localNote: "Commercial hub of North Karnataka with textile and trade activity" },
        { slug: "belgaum", name: "Belagavi", district: "Belagavi", population: "0.6M",
          localNote: "Industrial city near Maharashtra border with sugar and textile industries" }
      ]
    },
    { slug: "tamil-nadu", name: "Tamil Nadu", abbr: "TN",
      language: "Tamil/English", tier: 1,
      cities: [
        { slug: "chennai", name: "Chennai", district: "Chennai", population: "7.1M",
          localNote: "Auto industry hub, IT corridor, and gateway to Southeast Asia" },
        { slug: "coimbatore", name: "Coimbatore", district: "Coimbatore", population: "1.6M",
          localNote: "Manchester of South India — textile and engineering industry hub" },
        { slug: "madurai", name: "Madurai", district: "Madurai", population: "1.5M",
          localNote: "Temple city, education hub and growing SME market" },
        { slug: "trichy", name: "Tiruchirappalli", district: "Tiruchirappalli", population: "0.9M",
          localNote: "Engineering manufacturing and education hub of central Tamil Nadu" },
        { slug: "salem", name: "Salem", district: "Salem", population: "0.8M",
          localNote: "Steel and textiles city with growing healthcare sector" }
      ]
    },
    { slug: "gujarat", name: "Gujarat", abbr: "GJ",
      language: "Gujarati/English", tier: 1,
      cities: [
        { slug: "ahmedabad", name: "Ahmedabad", district: "Ahmedabad", population: "5.6M",
          localNote: "Largest city in Gujarat, major textile, pharma, and diamond trading hub" },
        { slug: "surat", name: "Surat", district: "Surat", population: "4.5M",
          localNote: "Diamond polishing capital of the world and textile manufacturing giant" },
        { slug: "vadodara", name: "Vadodara", district: "Vadodara", population: "2.1M",
          localNote: "Industrial city with Petrochemical, chemical and engineering companies" },
        { slug: "rajkot", name: "Rajkot", district: "Rajkot", population: "1.5M",
          localNote: "Auto components and engineering goods manufacturing city" },
        { slug: "gandhinagar", name: "Gandhinagar", district: "Gandhinagar", population: "0.3M",
          localNote: "State capital and GIFT City — India's international financial services hub" }
      ]
    },
    { slug: "rajasthan", name: "Rajasthan", abbr: "RJ",
      language: "Hindi/Rajasthani", tier: 2,
      cities: [
        { slug: "jaipur", name: "Jaipur", district: "Jaipur", population: "3.1M",
          localNote: "Pink City, tourism, gems & jewellery, handicrafts hub" },
        { slug: "jodhpur", name: "Jodhpur", district: "Jodhpur", population: "1.1M",
          localNote: "Blue City, handicrafts, tourism, and agro-processing" },
        { slug: "udaipur", name: "Udaipur", district: "Udaipur", population: "0.5M",
          localNote: "City of Lakes, luxury wedding destination and heritage tourism" },
        { slug: "kota", name: "Kota", district: "Kota", population: "1.0M",
          localNote: "Coaching capital of India — highest density of JEE/NEET students" },
        { slug: "ajmer", name: "Ajmer", district: "Ajmer", population: "0.5M",
          localNote: "Religious tourism and education hub of central Rajasthan" }
      ]
    },
    { slug: "telangana", name: "Telangana", abbr: "TG",
      language: "Telugu/English", tier: 1,
      cities: [
        { slug: "hyderabad", name: "Hyderabad", district: "Hyderabad", population: "6.8M",
          localNote: "Cyberabad IT hub, pharma industry and Biryani capital — fast growing metro" },
        { slug: "warangal", name: "Warangal", district: "Warangal", population: "0.8M",
          localNote: "Emerging IT and educational hub with textile industry" },
        { slug: "nizamabad", name: "Nizamabad", district: "Nizamabad", population: "0.3M",
          localNote: "Agricultural trading hub for turmeric and soybean" }
      ]
    },
    { slug: "west-bengal", name: "West Bengal", abbr: "WB",
      language: "Bengali/English", tier: 1,
      cities: [
        { slug: "kolkata", name: "Kolkata", district: "Kolkata", population: "4.5M",
          localNote: "Cultural capital, jute and textile industry, growing IT sector" },
        { slug: "durgapur", name: "Durgapur", district: "Paschim Bardhaman", population: "0.6M",
          localNote: "Steel city and industrial belt of West Bengal" },
        { slug: "siliguri", name: "Siliguri", district: "Darjeeling", population: "0.7M",
          localNote: "Gateway to Northeast India, tea trading and tourism hub" }
      ]
    },
    { slug: "madhya-pradesh", name: "Madhya Pradesh", abbr: "MP",
      language: "Hindi", tier: 2,
      cities: [
        { slug: "indore", name: "Indore", district: "Indore", population: "2.2M",
          localNote: "Cleanest city in India, emerging IT and education hub" },
        { slug: "bhopal", name: "Bhopal", district: "Bhopal", population: "1.8M",
          localNote: "State capital with government, education, and manufacturing" },
        { slug: "jabalpur", name: "Jabalpur", district: "Jabalpur", population: "1.3M",
          localNote: "Defence and engineering manufacturing hub of MP" },
        { slug: "gwalior", name: "Gwalior", district: "Gwalior", population: "1.1M",
          localNote: "Tourism, education and trade hub of northern MP" }
      ]
    },
    { slug: "punjab", name: "Punjab", abbr: "PB",
      language: "Punjabi/Hindi", tier: 2,
      cities: [
        { slug: "ludhiana", name: "Ludhiana", district: "Ludhiana", population: "1.6M",
          localNote: "Hosiery and cycle manufacturing capital — largest city in Punjab" },
        { slug: "amritsar", name: "Amritsar", district: "Amritsar", population: "1.1M",
          localNote: "Golden Temple tourism hub and agricultural trade center" },
        { slug: "chandigarh", name: "Chandigarh", district: "Chandigarh", population: "0.96M",
          localNote: "Tri-city capital, high per capita income, growing IT and services" },
        { slug: "jalandhar", name: "Jalandhar", district: "Jalandhar", population: "0.9M",
          localNote: "Sports goods and leather goods manufacturing hub" }
      ]
    },
    { slug: "haryana", name: "Haryana", abbr: "HR",
      language: "Hindi", tier: 2,
      cities: [
        { slug: "gurugram-hr", name: "Gurugram", district: "Gurugram", population: "1.5M",
          localNote: "Millennium City — India's outsourcing and startup capital" },
        { slug: "faridabad-hr", name: "Faridabad", district: "Faridabad", population: "1.4M",
          localNote: "Industrial hub and part of Delhi NCR with large manufacturing base" },
        { slug: "hisar", name: "Hisar", district: "Hisar", population: "0.3M",
          localNote: "Steel and agricultural machinery manufacturing hub" },
        { slug: "panipat", name: "Panipat", district: "Panipat", population: "0.3M",
          localNote: "Textile recycling capital of India" }
      ]
    },
    { slug: "uttarakhand", name: "Uttarakhand", abbr: "UK",
      language: "Hindi", tier: 2,
      cities: [
        { slug: "dehradun", name: "Dehradun", district: "Dehradun", population: "0.8M",
          localNote: "State capital, education, and IT services hub. ISRO and Survey of India offices" },
        { slug: "haridwar", name: "Haridwar", district: "Haridwar", population: "0.23M",
          localNote: "Religious tourism, Ayurveda, and yoga capital of India" },
        { slug: "rishikesh", name: "Rishikesh", district: "Dehradun", population: "0.1M",
          localNote: "Global yoga capital — highest concentration of yoga schools and TTC programs" },
        { slug: "nainital", name: "Nainital", district: "Nainital", population: "0.04M",
          localNote: "Mountain tourism hub and hill station resort destination" }
      ]
    },
    { slug: "kerala", name: "Kerala", abbr: "KL",
      language: "Malayalam/English", tier: 1,
      cities: [
        { slug: "kochi", name: "Kochi", district: "Ernakulam", population: "0.6M",
          localNote: "Port city, IT hub, and gateway to Kerala tourism and Ayurveda" },
        { slug: "thiruvananthapuram", name: "Thiruvananthapuram", district: "Thiruvananthapuram", population: "0.75M",
          localNote: "State capital with IT, space research (ISRO), and tourism" },
        { slug: "kozhikode", name: "Kozhikode", district: "Kozhikode", population: "0.6M",
          localNote: "Startup hub of Kerala and Malabar coast tourism" }
      ]
    },
    { slug: "andhra-pradesh", name: "Andhra Pradesh", abbr: "AP",
      language: "Telugu/English", tier: 2,
      cities: [
        { slug: "visakhapatnam", name: "Visakhapatnam", district: "Visakhapatnam", population: "2.0M",
          localNote: "Port city, steel and petrochemicals hub, emerging IT center" },
        { slug: "vijayawada", name: "Vijayawada", district: "Krishna", population: "1.0M",
          localNote: "Commercial hub of Andhra Pradesh, trading and education center" },
        { slug: "tirupati", name: "Tirupati", district: "Tirupati", population: "0.37M",
          localNote: "Religious tourism hub — highest footfall temple city in the world" }
      ]
    }
  ]
};
