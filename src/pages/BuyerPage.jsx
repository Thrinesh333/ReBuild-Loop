import { useState } from 'react';
import { searchListings } from '../utils/listings';
import { saveSearch, loadLocalListings } from '../utils/storage';
import MaterialCard from '../components/MaterialCard';

const MATERIAL_SUGGESTIONS = [
  'Cement', 'Steel', 'Bricks', 'Sand', 'Gravel', 'Wood',
  'Tiles', 'Concrete Blocks', 'PVC Pipes', 'Roofing', 'Plaster',
];

export default function BuyerPage() {
  const [form, setForm] = useState({ materialType: '', requiredQuantity: '', preferredLocation: '' });
  const [results, setResults] = useState(null);
  const [searched, setSearched] = useState(false);
  const [errors, setErrors] = useState({});

  const localIds = new Set(loadLocalListings().map((l) => l.id));

  function validate() {
    const e = {};
    if (!form.materialType.trim()) e.materialType = 'Please enter a material type to search.';
    if (form.requiredQuantity && (isNaN(form.requiredQuantity) || Number(form.requiredQuantity) < 0))
      e.requiredQuantity = 'Enter a valid quantity.';
    return e;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  }

  function handleSearch(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const matches = searchListings({
      materialType: form.materialType,
      requiredQuantity: Number(form.requiredQuantity) || 0,
      preferredLocation: form.preferredLocation,
    });

    saveSearch(form);
    setResults(matches);
    setSearched(true);
  }

  function handleClear() {
    setForm({ materialType: '', requiredQuantity: '', preferredLocation: '' });
    setResults(null);
    setSearched(false);
    setErrors({});
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Materials</h1>
        <p className="text-gray-500">Search for available construction materials from suppliers in your area.</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-6 flex items-center gap-2">
          <span>🔍</span> Search Available Materials
        </h2>

        <form onSubmit={handleSearch} noValidate>
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {/* Material type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="materialType"
                value={form.materialType}
                onChange={handleChange}
                placeholder="e.g. Cement, Steel, Bricks"
                list="material-suggestions"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.materialType ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              <datalist id="material-suggestions">
                {MATERIAL_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
              </datalist>
              {errors.materialType && <p className="text-red-500 text-xs mt-1">{errors.materialType}</p>}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Quantity <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="number"
                name="requiredQuantity"
                value={form.requiredQuantity}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 100"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.requiredQuantity ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.requiredQuantity && <p className="text-red-500 text-xs mt-1">{errors.requiredQuantity}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Location <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                name="preferredLocation"
                value={form.preferredLocation}
                onChange={handleChange}
                placeholder="e.g. Bangalore, Whitefield"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-8 py-2.5 rounded-xl hover:bg-green-700 transition-colors"
            >
              🔍 Find Materials
            </button>
            {searched && (
              <button
                type="button"
                onClick={handleClear}
                className="bg-gray-100 text-gray-600 font-medium px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {/* How search works */}
      {!searched && (
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            { icon: '🔤', title: 'Keyword Match', desc: 'Search matches material names and categories.' },
            { icon: '📦', title: 'Quantity Check', desc: 'Only shows listings with enough stock for your needs.' },
            { icon: '📍', title: 'Location Filter', desc: 'Narrows results to your preferred area if specified.' },
          ].map((tip) => (
            <div key={tip.title} className="bg-green-50 border border-green-100 rounded-xl p-4">
              <div className="text-2xl mb-2">{tip.icon}</div>
              <div className="font-medium text-gray-700 text-sm mb-1">{tip.title}</div>
              <div className="text-gray-500 text-xs">{tip.desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {searched && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              {results.length > 0
                ? `${results.length} Matching Listing${results.length !== 1 ? 's' : ''} Found`
                : 'No Matching Listings'}
            </h2>
            {results.length > 0 && (
              <span className="text-sm text-gray-400">
                Searching for: <strong className="text-gray-600">"{form.materialType}"</strong>
              </span>
            )}
          </div>

          {results.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-14 text-center">
              <div className="text-5xl mb-4">🔎</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Materials Found</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                No listings match your search criteria. Try a different material type, reduce the
                required quantity, or remove the location filter.
              </p>
              <button
                onClick={handleClear}
                className="mt-5 bg-green-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-green-700 transition-colors"
              >
                Search Again
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((listing) => (
                <MaterialCard
                  key={listing.id}
                  listing={listing}
                  isLocal={localIds.has(listing.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
