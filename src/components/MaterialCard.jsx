import { Link } from 'react-router-dom';

const CATEGORY_ICONS = {
  Cement: '🏗️',
  Steel: '🔩',
  Bricks: '🧱',
  Sand: '⛱️',
  Aggregate: '🪨',
  Wood: '🪵',
  Tiles: '🔲',
  'Concrete Blocks': '📦',
  'PVC Pipes': '🔵',
  Roofing: '🏠',
  Plaster: '🖌️',
};

export default function MaterialCard({ listing, isLocal = false, onDelete }) {
  const icon = CATEGORY_ICONS[listing.category] || '📦';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Image or placeholder */}
      <div className="bg-gradient-to-br from-green-50 to-gray-100 h-40 flex items-center justify-center relative">
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-6xl opacity-60">{icon}</span>
        )}
        {isLocal && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
            Your Listing
          </span>
        )}
        <span className="absolute top-2 right-2 bg-white text-gray-600 text-xs px-2 py-0.5 rounded-full border border-gray-200">
          {listing.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-2">{listing.name}</h3>

        <div className="space-y-1.5 text-xs text-gray-500 flex-1">
          <div className="flex items-center gap-1.5">
            <span>📦</span>
            <span>
              {listing.quantity.toLocaleString()} {listing.unit}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>💰</span>
            <span>
              ₹{listing.price} {listing.priceUnit}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>📍</span>
            <span className="truncate">{listing.location}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Link
            to={`/material/${listing.id}`}
            className="flex-1 text-center bg-green-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            View Details
          </Link>
          {isLocal && onDelete && (
            <button
              onClick={() => onDelete(listing.id)}
              className="bg-red-50 text-red-600 text-xs font-medium px-3 py-2 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
