import React, { useState } from 'react';
import PlannerForm from './components/PlannerForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import HotelSuggestions from './components/HotelSuggestions';
import CostBreakdown from './components/CostBreakdown';

function App() {
  const [travelPlan, setTravelPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePlanGenerated = (plan) => {
    setTravelPlan(plan);
    setError(null);
  };

  const handleError = (err) => {
    setError(err);
    setTravelPlan(null);
  };

  const handleReset = () => {
    setTravelPlan(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ✈️ Travel Planner Agent
          </h1>
          <p className="text-gray-600 text-lg">
            Plan your perfect trip with AI-powered recommendations
          </p>
        </header>

        {!travelPlan && !loading && (
          <PlannerForm 
            onPlanGenerated={handlePlanGenerated}
            onError={handleError}
            setLoading={setLoading}
          />
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Creating your perfect travel plan...</p>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="text-red-800 font-semibold mb-2">Error</h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {travelPlan && (
          <div className="space-y-8">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                Plan Another Trip
              </button>
            </div>
            
            <ItineraryDisplay itinerary={travelPlan.itinerary} destination={travelPlan.destination} />
            <HotelSuggestions hotels={travelPlan.hotels} />
            <CostBreakdown breakdown={travelPlan.costBreakdown} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
