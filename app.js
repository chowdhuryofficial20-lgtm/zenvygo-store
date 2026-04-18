const { useState, useEffect } = React;

function App() {
    const [view, setView] = useState('home');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // ১. ডাটাবেস থেকে প্রোডাক্ট নিয়ে আসার API লিঙ্ক
    const API_URL = "https://zenvygo-api.onrender.com/api/products";

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Navigation Header */}
            <nav className="glass-nav">
                <div onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer">
                    <img src="logo.png" className="h-6 filter invert" alt="Z" />
                    <span className="luxury-text text-xl">ZENVYGO</span>
                </div>
                <div className="flex gap-8 text-[10px] tracking-widest font-bold">
                    <button onClick={() => setView('home')} className="hover:text-[#C9A961]">COLLECTION</button>
                    <button onClick={() => setView('admin')} className="opacity-30 hover:opacity-100">INFRA</button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-40 px-10 max-w-7xl mx-auto min-h-screen">
                {view === 'home' ? (
                    <div>
                        <p className="text-[#C9A961] text-[10px] tracking-[0.8em] mb-4 uppercase">The New Standard</p>
                        <h1 className="luxury-text text-6xl md:text-8xl mb-20">ELITE<br/>CRAFT.</h1>
                        
                        {loading ? (
                            <p className="text-white tracking-widest opacity-50">SYNCING WITH DATABASE...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {products.map(p => (
                                    <div key={p._id} className="product-card group">
                                        <div className="overflow-hidden aspect-[3/4] mb-6 bg-black">
                                            <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-1000" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xs font-bold uppercase tracking-widest">{p.name}</h3>
                                            <p className="text-[#C9A961] italic text-sm">৳{p.price}</p>
                                        </div>
                                        {/* Order via Secure Line (WhatsApp) */}
                                        <div className="btn-gold" onClick={() => window.open(`https://wa.me/8801618479130?text=I want to order ${p.name}`)}>
                                            Order via Secure Line
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-20 text-center animate__animated animate__fadeIn">
                        <h2 className="luxury-text text-4xl mb-6 opacity-20">INFRASTRUCTURE LOGS</h2>
                        <div className="max-w-md mx-auto p-6 border border-white/5 bg-[#111] text-[10px] font-mono tracking-widest text-green-500">
                            > SYSTEM_STATUS: ONLINE <br/>
                            > API_GATEWAY: READY <br/>
                            > DB_CONNECTION: ESTABLISHED <br/>
                            > CLUSTER_NODE: ACTIVE <br/>
                            > READY FOR HYBRID SCALING...
                        </div>
                    </div>
                )}
            </main>

            {/* Footer with Your Info */}
            <footer>
                <div className="luxury-text text-xl mb-10 opacity-20">ZENVYGO STUDIO</div>
                <div className="flex justify-center gap-10 text-2xl mb-10 opacity-40">
                    <a href="https://facebook.com/zenvygo" target="_blank"><i className="fab fa-facebook-f hover:text-[#C9A961] transition"></i></a>
                    <a href="https://wa.me/8801618479130" target="_blank"><i className="fab fa-whatsapp hover:text-[#C9A961] transition"></i></a>
                    <a href="mailto:contact@zenvygo.com"><i className="far fa-envelope hover:text-[#C9A961] transition"></i></a>
                </div>
                <div className="text-[10px] tracking-[0.4em] text-gray-600 uppercase space-y-2 text-center">
                    <p>House 1353/2, Paterbag, Dania, Kadomtoli, Dhaka</p>
                    <p>+880 1618 479130</p>
                </div>
                <p className="mt-20 text-center text-[8px] opacity-10 tracking-[1em]">© 2026 ZENVYGO GLOBAL INFRASTRUCTURE</p>
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
