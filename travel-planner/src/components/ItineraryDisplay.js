import React from 'react';

function ItineraryDisplay({ itinerary, destination }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center mb-6">
        <span className="text-4xl mr-3">📅</span>
        <h2 className="text-3xl font-bold text-gray-800">Your Itinerary</h2>
      </div>
      
      <div className="mb-4 pb-4 border-b border-gray-200">
        <p className="text-xl text-gray-600">
          <span className="font-semibold text-gray-800">Destination:</span> {destination}
        </p>
      </div>

      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Day {day.day}: {day.title}
            </h3>
            
            <div className="space-y-3">
              {day.activities.map((activity, actIndex) => (
                <div key={actIndex} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{activity.icon || '📍'}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {activity.time && (
                          <span className="text-blue-600 mr-2">{activity.time}</span>
                        )}
                        {activity.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{activity.description}</p>
                      {activity.cost && (
                        <p className="text-green-600 font-semibold mt-2">
                          Estimated Cost: ${activity.cost}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItineraryDisplay;
