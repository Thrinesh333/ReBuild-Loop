import { Link } from 'react-router-dom';

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'List Your Excess Materials',
    desc: 'Contractors with surplus materials fill in a simple form — material type, quantity, price, and contact. The listing goes live instantly.',
    icon: '📋',
  },
  {
    step: '02',
    title: 'Search Available Materials',
    desc: 'Buyers search by material type, quantity needed, and preferred location. Matching results appear as browsable cards.',
    icon: '🔍',
  },
  {
    step: '03',
    title: 'Contact the Supplier',
    desc: 'Found what you need? Click "Contact Supplier" to open an email directly to the listing owner and negotiate the deal.',
    icon: '📧',
  },
];

const BENEFITS = [
  { icon: '💚', title: 'Reduce Wastage', desc: 'Divert reusable materials away from landfills and back into active projects.' },
  { icon: '💰', title: 'Save Costs', desc: 'Buyers get materials below market rate; suppliers recover value from surplus stock.' },
  { icon: '🌍', title: 'Lower Carbon Footprint', desc: 'Reusing materials means less energy spent on new production and transportation.' },
  { icon: '🤝', title: 'Build Community', desc: 'Create a local network of responsible contractors who support each other.' },
  { icon: '⚡', title: 'Fast & Simple', desc: 'No registration, no complex forms. Post or find materials in under a minute.' },
  { icon: '🔒', title: 'Private & Local', desc: 'All data stays in your browser. No accounts or data sharing required.' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-600/40 border border-green-500/50 rounded-full px-4 py-1.5 text-sm mb-6">
            <span>♻️</span>
            <span>Construction Material Reuse Platform</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Turn Surplus Materials Into <br />
            <span className="text-green-300">Someone's Next Project</span>
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto mb-10">
            ReBuild Loop connects contractors who have excess construction materials with
            those who need them — reducing waste, cutting costs, and building a greener
            construction industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/supplier"
              className="bg-white text-green-800 font-semibold px-8 py-3.5 rounded-xl hover:bg-green-50 transition-colors shadow-lg"
            >
              🏗️ I Have Excess Materials
            </Link>
            <Link
              to="/buyer"
              className="bg-green-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-green-400 transition-colors shadow-lg border border-green-400"
            >
              🔍 I Need Materials
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-green-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">15+</div>
            <div className="text-green-300 text-xs mt-0.5">Sample Listings</div>
          </div>
          <div>
            <div className="text-2xl font-bold">10+</div>
            <div className="text-green-300 text-xs mt-0.5">Material Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold">100%</div>
            <div className="text-green-300 text-xs mt-0.5">Free to Use</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Three simple steps connect material suppliers with buyers across your city.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-green-50 rounded-2xl p-6 h-full border border-green-100">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-xs font-bold text-green-600 mb-1 tracking-widest">STEP {item.step}</div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Why ReBuild Loop?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Every kilogram of material reused is a step towards a more sustainable construction industry.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-green-100 mb-8">
            Post your surplus materials or find what you need — no registration required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/supplier"
              className="bg-white text-green-800 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors"
            >
              Post a Listing
            </Link>
            <Link
              to="/buyer"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-600 transition-colors"
            >
              Search Materials
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
