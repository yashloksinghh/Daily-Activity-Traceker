async function generateTravelPlan({ destination, budget, days, travelers, preferences }) {
  const budgetPerDay = budget / days;
  const budgetPerPerson = budget / travelers;

  const accommodationBudget = budget * 0.35;
  const foodBudget = budget * 0.25;
  const activitiesBudget = budget * 0.25;
  const transportationBudget = budget * 0.10;
  const miscBudget = budget * 0.05;

  const itinerary = generateItinerary(destination, days, budgetPerDay, preferences);
  const hotels = generateHotelSuggestions(destination, days, accommodationBudget);
  const costBreakdown = generateCostBreakdown(
    budget,
    accommodationBudget,
    foodBudget,
    activitiesBudget,
    transportationBudget,
    miscBudget
  );

  return {
    destination,
    days,
    travelers,
    itinerary,
    hotels,
    costBreakdown
  };
}

function generateItinerary(destination, days, budgetPerDay, preferences) {
  const destinationData = getDestinationData(destination);
  const itinerary = [];

  for (let i = 1; i <= days; i++) {
    const dayActivities = [];
    
    if (i === 1) {
      dayActivities.push({
        time: '09:00 AM',
        name: 'Arrival & Hotel Check-in',
        description: `Arrive at ${destination} and check into your hotel. Take some time to rest and freshen up.`,
        icon: '✈️',
        cost: 0
      });
      dayActivities.push({
        time: '12:00 PM',
        name: 'Welcome Lunch',
        description: `Enjoy your first meal at a local restaurant and get a taste of ${destination}'s cuisine.`,
        icon: '🍽️',
        cost: budgetPerDay * 0.15
      });
      dayActivities.push({
        time: '02:00 PM',
        name: destinationData.attractions[0] || 'City Walking Tour',
        description: `Explore the main attractions and get oriented with the city layout.`,
        icon: '🚶',
        cost: budgetPerDay * 0.20
      });
    } else if (i === days) {
      dayActivities.push({
        time: '08:00 AM',
        name: 'Breakfast & Hotel Checkout',
        description: 'Enjoy your final breakfast and prepare for departure.',
        icon: '🏨',
        cost: budgetPerDay * 0.10
      });
      dayActivities.push({
        time: '10:00 AM',
        name: 'Last-minute Shopping',
        description: 'Pick up souvenirs and local specialties to take home.',
        icon: '🛍️',
        cost: budgetPerDay * 0.25
      });
      dayActivities.push({
        time: '02:00 PM',
        name: 'Departure',
        description: `Head to the airport/station for your journey home. Safe travels!`,
        icon: '✈️',
        cost: 0
      });
    } else {
      const attractionIndex = (i - 1) % destinationData.attractions.length;
      dayActivities.push({
        time: '09:00 AM',
        name: 'Breakfast',
        description: 'Start your day with a hearty breakfast at a local café.',
        icon: '☕',
        cost: budgetPerDay * 0.10
      });
      dayActivities.push({
        time: '10:30 AM',
        name: destinationData.attractions[attractionIndex] || `Attraction ${i}`,
        description: destinationData.descriptions[attractionIndex] || 'Explore this amazing location and immerse yourself in the local culture.',
        icon: destinationData.icons[attractionIndex] || '🏛️',
        cost: budgetPerDay * 0.25
      });
      dayActivities.push({
        time: '01:00 PM',
        name: 'Lunch',
        description: 'Try local specialties at a recommended restaurant.',
        icon: '🍴',
        cost: budgetPerDay * 0.15
      });
      dayActivities.push({
        time: '03:00 PM',
        name: destinationData.activities[attractionIndex] || 'Afternoon Activity',
        description: destinationData.activityDescriptions[attractionIndex] || 'Enjoy an afternoon of exploration and discovery.',
        icon: '🎯',
        cost: budgetPerDay * 0.20
      });
      dayActivities.push({
        time: '07:00 PM',
        name: 'Dinner',
        description: 'Dine at a local restaurant and enjoy the evening atmosphere.',
        icon: '🌙',
        cost: budgetPerDay * 0.20
      });
    }

    itinerary.push({
      day: i,
      title: i === 1 ? 'Arrival Day' : i === days ? 'Departure Day' : `Exploration Day ${i - 1}`,
      activities: dayActivities
    });
  }

  return itinerary;
}

function generateHotelSuggestions(destination, days, accommodationBudget) {
  const pricePerNight = accommodationBudget / days;
  
  const hotels = [
    {
      name: `${destination} Grand Hotel`,
      rating: 4.5,
      location: 'City Center',
      type: 'Luxury Hotel',
      amenities: ['Free WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'],
      pricePerNight: Math.round(pricePerNight * 1.3),
      totalCost: Math.round(pricePerNight * 1.3 * days)
    },
    {
      name: `Comfort Inn ${destination}`,
      rating: 4.0,
      location: 'Downtown',
      type: 'Mid-range Hotel',
      amenities: ['Free WiFi', 'Breakfast', 'Parking'],
      pricePerNight: Math.round(pricePerNight),
      totalCost: Math.round(pricePerNight * days)
    },
    {
      name: `Budget Stay ${destination}`,
      rating: 3.5,
      location: 'Near Transit',
      type: 'Budget Hotel',
      amenities: ['Free WiFi', 'Basic Breakfast'],
      pricePerNight: Math.round(pricePerNight * 0.7),
      totalCost: Math.round(pricePerNight * 0.7 * days)
    }
  ];

  return hotels;
}

function generateCostBreakdown(budget, accommodation, food, activities, transportation, miscellaneous) {
  const total = accommodation + food + activities + transportation + miscellaneous;
  const remaining = budget - total;

  const notes = [];
  if (remaining < 0) {
    notes.push('Consider reducing accommodation costs or activity expenses');
    notes.push('Look for free walking tours and attractions');
  } else if (remaining > budget * 0.2) {
    notes.push('You have extra budget for spontaneous activities');
    notes.push('Consider upgrading your accommodation or dining experiences');
  } else {
    notes.push('Budget is well-balanced across all categories');
    notes.push('Keep some buffer for unexpected expenses');
  }

  return {
    budget,
    accommodation,
    food,
    activities,
    transportation,
    miscellaneous,
    total,
    remaining,
    notes
  };
}

function getDestinationData(destination) {
  const destinationLower = destination.toLowerCase();
  
  const destinations = {
    'paris': {
      attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Arc de Triomphe', 'Sacré-Cœur'],
      descriptions: [
        'Visit the iconic Eiffel Tower and enjoy panoramic views of Paris',
        'Explore world-class art at the Louvre, home to the Mona Lisa',
        'Admire the Gothic architecture of Notre-Dame Cathedral',
        'See the famous Arc de Triomphe and walk down the Champs-Élysées',
        'Visit the beautiful Sacré-Cœur basilica in Montmartre'
      ],
      icons: ['🗼', '🎨', '⛪', '🏛️', '🕌'],
      activities: ['Seine River Cruise', 'Montmartre Walking Tour', 'French Cooking Class', 'Palace of Versailles', 'Latin Quarter Exploration'],
      activityDescriptions: [
        'Take a romantic cruise along the Seine River',
        'Explore the artistic neighborhood of Montmartre',
        'Learn to cook authentic French cuisine',
        'Day trip to the magnificent Palace of Versailles',
        'Wander through the historic Latin Quarter'
      ]
    },
    'tokyo': {
      attractions: ['Senso-ji Temple', 'Tokyo Skytree', 'Meiji Shrine', 'Shibuya Crossing', 'Tsukiji Market'],
      descriptions: [
        'Visit Tokyo\'s oldest temple in historic Asakusa',
        'Enjoy breathtaking views from Tokyo Skytree',
        'Experience tranquility at the Meiji Shrine',
        'See the world\'s busiest pedestrian crossing',
        'Explore the famous fish market and try fresh sushi'
      ],
      icons: ['⛩️', '🗼', '🏯', '🚶', '🐟'],
      activities: ['Sushi Making Class', 'Akihabara Electronics Tour', 'Traditional Tea Ceremony', 'Harajuku Fashion Walk', 'Sumo Wrestling Experience'],
      activityDescriptions: [
        'Learn to make authentic sushi from a master chef',
        'Explore the electronics and anime district',
        'Participate in a traditional Japanese tea ceremony',
        'Discover unique fashion in Harajuku',
        'Watch or experience sumo wrestling culture'
      ]
    },
    'new york': {
      attractions: ['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building', 'Brooklyn Bridge'],
      descriptions: [
        'Visit the iconic Statue of Liberty and Ellis Island',
        'Relax and explore the vast Central Park',
        'Experience the energy of Times Square',
        'Get panoramic views from the Empire State Building',
        'Walk across the historic Brooklyn Bridge'
      ],
      icons: ['🗽', '🌳', '🌆', '🏢', '🌉'],
      activities: ['Broadway Show', 'Museum of Modern Art', 'Food Tour', 'High Line Walk', 'Fifth Avenue Shopping'],
      activityDescriptions: [
        'Watch a world-class Broadway musical',
        'Explore contemporary art at MoMA',
        'Taste diverse cuisines on a food tour',
        'Walk the elevated High Line park',
        'Shop at luxury stores on Fifth Avenue'
      ]
    },
    'london': {
      attractions: ['Big Ben', 'British Museum', 'Tower of London', 'Buckingham Palace', 'London Eye'],
      descriptions: [
        'See the iconic Big Ben and Houses of Parliament',
        'Explore world history at the British Museum',
        'Discover the historic Tower of London and Crown Jewels',
        'Watch the Changing of the Guard at Buckingham Palace',
        'Ride the London Eye for stunning city views'
      ],
      icons: ['🕰️', '🏛️', '🏰', '👑', '🎡'],
      activities: ['West End Theatre', 'Thames River Cruise', 'Afternoon Tea', 'Camden Market', 'Harry Potter Studio Tour'],
      activityDescriptions: [
        'Enjoy a show in London\'s famous West End',
        'Cruise along the historic Thames River',
        'Experience traditional British afternoon tea',
        'Browse unique items at Camden Market',
        'Visit the magical Harry Potter studios'
      ]
    }
  };

  for (const [key, data] of Object.entries(destinations)) {
    if (destinationLower.includes(key)) {
      return data;
    }
  }

  return {
    attractions: ['Main Attraction', 'Historic Site', 'Cultural Center', 'Scenic Viewpoint', 'Local Market'],
    descriptions: [
      'Visit the main tourist attraction of the city',
      'Explore historic landmarks and learn about local history',
      'Experience the cultural heart of the destination',
      'Enjoy panoramic views from a scenic location',
      'Browse local markets and try regional specialties'
    ],
    icons: ['🏛️', '🏰', '🎭', '🌄', '🛍️'],
    activities: ['City Walking Tour', 'Local Food Experience', 'Museum Visit', 'Shopping District', 'Evening Entertainment'],
    activityDescriptions: [
      'Take a guided walking tour of the city',
      'Sample authentic local cuisine and specialties',
      'Visit museums showcasing local art and culture',
      'Explore popular shopping areas',
      'Enjoy evening entertainment and nightlife'
    ]
  };
}

module.exports = { generateTravelPlan };
