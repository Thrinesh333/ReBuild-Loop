import { useState, useRef } from 'react';
import { saveLocalListing, loadLocalListings, deleteLocalListing, generateId } from '../utils/storage';
import MaterialCard from '../components/MaterialCard';

const CATEGORIES = [
  'Cement', 'Steel', 'Bricks', 'Sand', 'Aggregate', 'Wood',
  'Tiles', 'Concrete Blocks', 'PVC Pipes', 'Roofing', 'Plaster', 'Other',
];

const UNITS = ['bags', 'kg', 'tonnes', 'pieces', 'litres', 'cubic metres', 'sq ft', 'sq m', 'rolls'];

const EMPTY_FORM = {
  name: '', category: '', quantity: '', unit: '', price: '', location: '', email: '', image: null,
};

// Field must be defined OUTSIDE SupplierPage so its component identity is
// stable across renders. Defining it inside would cause React to treat it as
// a brand-new component type on every state update, unmounting and remounting
// the DOM node (and losing input focus) after each keystroke.
function Field({ label, required, children, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function SupplierPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [localListings, setLocalListings] = useState(() => loadLocalListings());
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef();

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Material name is required.';
    if (!form.category) e.category = 'Please select a category.';
    if (!form.quantity || isNaN(form.quantity) || Number(form.quantity) <= 0)
      e.quantity = 'Enter a valid quantity greater than 0.';
    if (!form.unit) e.unit = 'Please select a unit.';
    if (!form.price || isNaN(form.price) || Number(form.price) < 0)
      e.price = 'Enter a valid price (0 or more).';
    if (!form.location.trim()) e.location = 'Location is required.';
    if (!form.email.trim()) {
      e.email = 'Contact email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address.';
    }
    return e;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
      setForm((f) => ({ ...f, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newListing = {
      id: generateId(),
      name: form.name.trim(),
      category: form.category,
      quantity: Number(form.quantity),
      unit: form.unit,
      price: Number(form.price),
      priceUnit: `per ${form.unit}`,
      location: form.location.trim(),
      email: form.email.trim(),
      image: form.image || null,
      description: '',
      listedAt: new Date().toISOString(),
    };

    saveLocalListing(newListing);
    setLocalListings(loadLocalListings());
    setForm(EMPTY_FORM);
    setErrors({});
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this listing? This cannot be undone.')) return;
    deleteLocalListing(id);
    setLocalListings(loadLocalListings());
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">List Excess Materials</h1>
        <p className="text-gray-500">Fill in the details below to publish your surplus materials. No registration required.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <span>📋</span> Material Details
          </h2>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-6 text-sm flex items-center gap-2">
              <span>✅</span>
              <span>Listing published successfully! Scroll down to see your listings.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Field label="Material Name / Type" name="name" required error={errors.name}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. OPC Cement Bags, TMT Steel Rods"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category" name="category" required error={errors.category}>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${
                    errors.category ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Unit" name="unit" required error={errors.unit}>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white ${
                    errors.unit ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select unit</option>
                  {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Available Quantity" name="quantity" required error={errors.quantity}>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g. 500"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.quantity ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
              </Field>

              <Field label="Expected Price (₹)" name="price" required error={errors.price}>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g. 350"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.price ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                />
              </Field>
            </div>

            <Field label="Location / Address" name="location" required error={errors.location}>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Whitefield, Bangalore"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.location ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
            </Field>

            <Field label="Contact Email" name="email" required error={errors.email}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. yourname@example.com"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
            </Field>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material Photograph <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" className="w-full h-36 object-cover rounded-lg border border-gray-200" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors shadow-sm"
            >
              📢 Publish Listing
            </button>
          </form>
        </div>

        {/* Info panel */}
        <div className="space-y-6">
          <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
            <h3 className="font-semibold text-green-800 mb-3">📌 How This Works</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>✔ Your listing is saved locally in this browser.</li>
              <li>✔ Buyers can search and find your material listing.</li>
              <li>✔ Buyers contact you directly via email.</li>
              <li>✔ No registration or account required.</li>
              <li>⚠ Listings are stored only in this browser/device.</li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h3 className="font-semibold text-amber-800 mb-2">⚠ Prototype Limitation</h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              This is a frontend-only prototype. Your listings are stored in browser LocalStorage
              and are <strong>not visible to other users</strong> on different devices. The predefined
              sample listings are available to everyone for demonstration.
            </p>
          </div>
        </div>
      </div>

      {/* My Listings */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Published Listings</h2>
        <p className="text-gray-500 text-sm mb-6">
          Listings you have published in this browser session. These are saved in your browser's local storage.
        </p>

        {localListings.length === 0 ? (
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-gray-500 text-sm">You haven't published any listings yet.</p>
            <p className="text-gray-400 text-xs mt-1">Use the form above to add your first listing.</p>
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
    </div>
  );
}
