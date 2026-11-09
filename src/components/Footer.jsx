export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">♻️</span>
            <span className="text-white font-bold text-lg">
              ReBuild<span className="text-green-400">Loop</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Connecting contractors to reduce construction material wastage. A simple,
            frontend-only prototype built for sustainability.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-green-400 transition-colors">Home</a></li>
            <li><a href="/supplier" className="hover:text-green-400 transition-colors">List Materials</a></li>
            <li><a href="/buyer" className="hover:text-green-400 transition-colors">Find Materials</a></li>
            <li><a href="/dashboard" className="hover:text-green-400 transition-colors">Dashboard</a></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-white font-semibold mb-3">About</h4>
          <p className="text-sm leading-relaxed">
            ReBuild Loop is a college project prototype. Data is stored locally in your browser.
            Predefined listings are available for demonstration. No backend or database is used.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © 2026 ReBuild Loop — College Project Prototype. All listings are for demonstration purposes.
      </div>
    </footer>
  );
}
