import React from 'react';

function CostBreakdown({ breakdown }) {
  const categories = [
    { key: 'accommodation', label: 'Accommodation', icon: '🏨', color: 'blue' },
    { key: 'food', label: 'Food & Dining', icon: '🍽️', color: 'green' },
    { key: 'activities', label: 'Activities & Tours', icon: '🎭', color: 'purple' },
    { key: 'transportation', label: 'Transportation', icon: '🚗', color: 'yellow' },
    { key: 'miscellaneous', label: 'Miscellaneous', icon: '💰', color: 'pink' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700 border-blue-300',
      green: 'bg-green-100 text-green-700 border-green-300',
      purple: 'bg-purple-100 text-purple-700 border-purple-300',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      pink: 'bg-pink-100 text-pink-700 border-pink-300'
    };
    return colors[color] || colors.blue;
  };

  const calculatePercentage = (amount) => {
    return ((amount / breakdown.total) * 100).toFixed(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center mb-6">
        <span className="text-4xl mr-3">💵</span>
        <h2 className="text-3xl font-bold text-gray-800">Cost Breakdown</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {categories.map((category) => {
            const amount = breakdown[category.key] || 0;
            const percentage = calculatePercentage(amount);
            
            return (
              <div key={category.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{category.icon}</span>
                    <span className="font-semibold text-gray-700">{category.label}</span>
                  </div>
                  <span className="font-bold text-gray-800">${amount.toFixed(2)}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full ${getColorClasses(category.color).split(' ')[0]} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-gray-600 text-right">{percentage}% of total</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Budget:</span>
                <span className="font-semibold">${breakdown.budget?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Total Estimated Cost:</span>
                <span className="font-semibold">${breakdown.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t-2 border-green-300 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Remaining:</span>
                <span className={`text-2xl font-bold ${
                  breakdown.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${Math.abs(breakdown.remaining).toFixed(2)}
                </span>
              </div>
              {breakdown.remaining < 0 && (
                <p className="text-red-600 text-sm mt-2">
                  ⚠️ Over budget by ${Math.abs(breakdown.remaining).toFixed(2)}
                </p>
              )}
              {breakdown.remaining >= 0 && (
                <p className="text-green-600 text-sm mt-2">
                  ✅ Within budget
                </p>
              )}
            </div>
          </div>

          {breakdown.notes && breakdown.notes.length > 0 && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">💡 Budget Tips</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {breakdown.notes.map((note, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CostBreakdown;
