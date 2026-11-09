import { useParams, Link, useNavigate } from 'react-router-dom';
import { getListingById } from '../utils/listings';
import { loadLocalListings } from '../utils/storage';

const CATEGORY_ICONS = {
  Cement: '🏗️', Steel: '🔩', Bricks: '🧱', Sand: '⛱️',
  Aggregate: '🪨', Wood: '🪵', Tiles: '🔲',
  'Concrete Blocks': '📦', 'PVC Pipes': '🔵', Roofing: '🏠', Plaster: '🖌️',
};

export default function MaterialDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = getListingById(id);
  const localIds = new Set(loadLocalListings().map((l) => l.id));
  const isLocal = localIds.has(id);

  if (!listing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-5">🚫</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Listing Not Found</h2>
        <p className="text-gray-500 mb-6 text-sm">
          This listing may have been deleted or the link is invalid.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition-colors font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  const icon = CATEGORY_ICONS[listing.category] || '📦';
  const mailtoLink = `mailto:${listing.email}?subject=Material%20Enquiry%20-%20${encodeURIComponent(listing.name)}&body=Hello%2C%0A%0AI%20am%20interested%20in%20your%20listing%20for%20${encodeURIComponent(listing.name)}.%0A%0APlease%20share%20more%20details.%0A%0AThank%20you.`;

  const listedDate = listing.listedAt
    ? new Date(listing.listedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/buyer" className="hover:text-green-600 transition-colors">Find Materials</Link>
        <span>/</span>
        <span className="text-gray-600">{listing.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          <div className="bg-gradient-to-br from-green-50 to-gray-100 rounded-2xl h-72 flex items-center justify-center overflow-hidden border border-gray-100 relative">
            {listing.image ? (
              <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-8xl opacity-50">{icon}</span>
            )}
            {isLocal && (
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                Your Listing
              </span>
            )}
          </div>

          {/* Contact box */}
          <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-5">
            <h3 className="font-semibold text-green-800 mb-1 text-sm">Supplier Contact</h3>
            <p className="text-green-700 text-sm mb-4 font-mono break-all">{listing.email}</p>
            <a
              href={mailtoLink}
              className="block text-center w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors shadow-sm"
            >
              📧 Contact Supplier
            </a>
            <p className="text-xs text-green-600 mt-2 text-center">
              Opens your default email application
            </p>
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              {listing.category}
            </span>
            {listedDate && (
              <span className="text-xs text-gray-400">Listed {listedDate}</span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mt-3 mb-5">{listing.name}</h1>

          {/* Key details grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-400 mb-1">Available Quantity</div>
              <div className="text-lg font-bold text-gray-800">
                {listing.quantity.toLocaleString()}
                <span className="text-sm font-normal text-gray-500 ml-1">{listing.unit}</span>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="text-xs text-gray-400 mb-1">Expected Price</div>
              <div className="text-lg font-bold text-green-700">
                ₹{listing.price.toLocaleString()}
                <span className="text-xs font-normal text-gray-400 ml-1">{listing.priceUnit}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
              <span className="text-xl mt-0.5">📍</span>
              <div>
                <div className="text-xs text-gray-400 mb-0.5">Location</div>
                <div className="text-sm font-medium text-gray-700">{listing.location}</div>
              </div>
            </div>

            {listing.description && (
              <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                <div className="text-xs text-gray-400 mb-1">Description</div>
                <p className="text-sm text-gray-600 leading-relaxed">{listing.description}</p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                ← Back to Results
              </button>
              <Link
                to="/buyer"
                className="flex-1 text-center bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
              >
                Search More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
