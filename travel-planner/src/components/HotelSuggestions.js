import React from 'react';

function HotelSuggestions({ hotels }) {
  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.round(rating));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center mb-6">
        <span className="text-4xl mr-3">🏨</span>
        <h2 className="text-3xl font-bold text-gray-800">Hotel Recommendations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 h-32 flex items-center justify-center">
              <span className="text-6xl">🏨</span>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
              
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-2">{getRatingStars(hotel.rating)}</span>
                <span className="text-gray-600 text-sm">({hotel.rating})</span>
              </div>

              <p className="text-gray-600 text-sm mb-3">{hotel.location}</p>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Type:</span> {hotel.type}
                </p>
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-2xl font-bold text-green-600">
                  ${hotel.pricePerNight}
                  <span className="text-sm text-gray-600 font-normal"> / night</span>
                </p>
                {hotel.totalCost && (
                  <p className="text-sm text-gray-600 mt-1">
                    Total: ${hotel.totalCost}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelSuggestions;
