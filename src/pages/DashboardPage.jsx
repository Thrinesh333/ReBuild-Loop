import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllListings, getAllCategories } from '../utils/listings';
import { loadLocalListings, deleteLocalListing } from '../utils/storage';
import MaterialCard from '../components/MaterialCard';

export default function DashboardPage() {
  const [localListings, setLocalListings] = useState(() => loadLocalListings());

  const allListings = getAllListings();
  const categories = getAllCategories();

  // Category distribution
  const categoryCount = allListings.reduce((acc, l) => {
    acc[l.category] = (acc[l.category] || 0) + 1;
    return acc;
  }, {});

  // Recently listed (top 4 by date)
  const recentListings = [...allListings]
    .sort((a, b) => new Date(b.listedAt || 0) - new Date(a.listedAt || 0))
    .slice(0, 4);

  function handleDelete(id) {
    if (!window.confirm('Delete this listing? This cannot be undone.')) return;
    deleteLocalListing(id);
    setLocalListings(loadLocalListings());
  }

  const statCards = [
    {
      icon: '📋',
      label: 'Total Listings',
      value: allListings.length,
      sub: `${localListings.length} from you`,
      color: 'bg-green-50 border-green-100 text-green-700',
    },
    {
      icon: '🏷️',
      label: 'Material Categories',
      value: categories.length,
      sub: 'unique types available',
      color: 'bg-blue-50 border-blue-100 text-blue-700',
    },
    {
      icon: '📦',
      label: 'Predefined Listings',
      value: allListings.length - localListings.length,
      sub: 'sample data always available',
      color: 'bg-purple-50 border-purple-100 text-purple-700',
    },
    {
      icon: '🧑‍💼',
      label: 'Your Listings',
      value: localListings.length,
      sub: 'saved in this browser',
      color: 'bg-amber-50 border-amber-100 text-amber-700',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-500">Overview of all available material listings and your published materials.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((s) => (
          <div key={s.label} className={`rounded-2xl border p-5 ${s.color}`}>
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-3xl font-bold mb-0.5">{s.value}</div>
            <div className="font-medium text-sm">{s.label}</div>
            <div className="text-xs opacity-70 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span>🏷️</span> Materials by Category
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(categoryCount)
            .sort((a, b) => b[1] - a[1])
            .map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                <span className="text-sm text-gray-700 font-medium">{cat}</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {count}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Recent Listings */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <span>🕒</span> Recently Listed
          </h2>
          <Link to="/buyer" className="text-sm text-green-600 hover:underline font-medium">
            View All →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentListings.map((listing) => (
            <MaterialCard
              key={listing.id}
              listing={listing}
              isLocal={localListings.some((l) => l.id === listing.id)}
            />
          ))}
        </div>
      </div>

      {/* My Listings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <span>🧑‍💼</span> Your Published Listings
          </h2>
          <Link
            to="/supplier"
            className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
          >
            + Add Listing
          </Link>
        </div>

        {localListings.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-gray-500 text-sm mb-4">You haven't published any listings yet.</p>
            <Link
              to="/supplier"
              className="bg-green-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-green-700 transition-colors inline-block"
            >
              Post Your First Listing
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {localListings.map((listing) => (
              <MaterialCard
                key={listing.id}
                listing={listing}
                isLocal
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid sm:grid-cols-2 gap-5">
        <Link
          to="/supplier"
          className="bg-green-600 text-white rounded-2xl p-6 hover:bg-green-700 transition-colors shadow-sm"
        >
          <div className="text-3xl mb-2">🏗️</div>
          <div className="font-semibold text-lg mb-1">List Excess Materials</div>
          <div className="text-green-100 text-sm">Publish your surplus materials for other contractors to find.</div>
        </Link>
        <Link
          to="/buyer"
          className="bg-white border border-gray-100 text-gray-700 rounded-2xl p-6 hover:shadow-md transition-shadow shadow-sm"
        >
          <div className="text-3xl mb-2">🔍</div>
          <div className="font-semibold text-lg mb-1">Find Materials</div>
          <div className="text-gray-500 text-sm">Search through all available listings to find what your project needs.</div>
        </Link>
      </div>
    </div>
  );
}
