import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Download, 
  Wand2, 
  BookOpen, 
  ArrowRight, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Menu,
  Upload,
  ChevronLeft,
  X,
  Mail,
  Lock
} from "lucide-react";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import './Phone.css';

const LANDMARKS = [
  "this is the Eiffel tower",
  "This is the Statue of Liberty",
  "This is Burj Khalifa",
  "This is the Great Wall of China",
  "This is Mt.Kenya",
  "Sorry, we can't recognize this landmark."
];

function AuthModal({ isOpen, onClose, initialMode }: { isOpen: boolean; onClose: () => void; initialMode: 'login' | 'signup' }) {
  const [mode, setMode] = useState(initialMode);
  
  // Use effect to sync internal mode with initialMode when opening
  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="liquid-glass-strong relative z-[110] w-full max-w-md overflow-hidden rounded-[2.5rem] p-8 lg:p-12 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute right-6 top-6 h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-medium tracking-tight mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Join Discovery'}
              </h2>
              <p className="text-white/50 text-sm">
                {mode === 'login' ? 'Continue your journey across landmarks' : 'Start identifying destinations worldwide'}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="w-full liquid-glass border border-white/10 flex items-center justify-center gap-3 rounded-full py-3.5 text-sm font-medium transition-all"
              >
                <img src="https://www.google.com/favicon.ico" className="h-4 w-4 rounded-full" alt="Google" />
                Continue with Google
              </motion.button>
              
              <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <span className="relative bg-transparent px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">or use email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-white/60 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-sm focus:bg-white/10 focus:ring-1 focus:ring-white/20 outline-none transition-all placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="space-y-2 text-left text-white/50">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/40 ml-4">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30 group-focus-within:text-white/60 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-sm focus:bg-white/10 focus:ring-1 focus:ring-white/20 outline-none transition-all placeholder:text-white/20"
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black font-semibold rounded-full py-4 mt-4 transition-transform shadow-lg hover:bg-white/90"
              >
                {mode === 'login' ? 'Log in' : 'Create account'}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-white/40 text-sm">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{" "}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-white font-medium hover:underline transition-all"
                >
                  {mode === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const LOGO_URL = "https://picsum.photos/seed/bloom-logo/64/64?grayscale";
  const FLOWERS_URL = "https://picsum.photos/seed/bloom-flowers/400/300?grayscale";
  
  const BACKGROUND_IMAGES = [
    "https://raw.githubusercontent.com/kevincruize-create/Portfolio/main/Video/Tourist_1.png",
    "https://raw.githubusercontent.com/kevincruize-create/Portfolio/main/Video/Tourist_2.png",
    "https://raw.githubusercontent.com/kevincruize-create/Portfolio/main/Video/Tourist_3.png"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [view, setView] = useState<'hero' | 'upload'>('hero');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [BACKGROUND_IMAGES.length]);

  const handleUploadClick = () => {
    if (view === 'hero') {
      setView('upload');
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        // Simulate recognition
        const randomResult = LANDMARKS[Math.floor(Math.random() * LANDMARKS.length)];
        setRecognitionResult(randomResult);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setRecognitionResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden font-sans text-white bg-black">
      {/* Background Slideshow */}
      <div className="fixed inset-0 z-0 h-full w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={BACKGROUND_IMAGES[currentImageIndex]}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute inset-0 h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex min-h-screen w-full">
        {/* Left Panel */}
        <section className={`relative flex flex-col p-4 transition-all duration-1000 ease-in-out ${view === 'upload' ? 'w-full lg:p-12' : 'w-full lg:w-[52%] lg:p-6'}`}>
          <div className="liquid-glass-strong absolute inset-4 rounded-[2.5rem] lg:inset-6" />
          
          <div className="relative z-20 flex flex-1 flex-col p-8 lg:p-12">
            {/* Nav */}
            <nav className={`flex items-center justify-between transition-all duration-700 ${view === 'upload' ? 'absolute top-12 left-12 right-12 z-50 mb-0' : 'relative mb-8'}`}>
              <div 
                className="flex items-center gap-3 cursor-pointer" 
                onClick={() => setView('hero')}
              >
                <img src={LOGO_URL} alt="Bloom Logo" className="h-8 w-8 rounded-full" referrerPolicy="no-referrer" />
                <span className="text-2xl font-semibold tracking-tighter">Finder</span>
              </div>
              <div className="flex items-center gap-2 lg:gap-4">
                {view === 'upload' && (
                  <motion.button 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => {
                        setView('hero');
                        resetUpload();
                    }}
                    className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm font-medium text-white/70 hover:text-white transition-colors mr-2 md:mr-4"
                  >
                    <ChevronLeft className="h-3 w-3 md:h-4 md:h-4" /> <span className="hidden sm:inline">Back to Home</span><span className="sm:hidden">Home</span>
                  </motion.button>
                )}
                <div className="flex items-center gap-3 md:gap-4">
                  <motion.button 
                    whileHover={{ opacity: 0.7 }}
                    onClick={() => {
                        setAuthMode('login');
                        setIsAuthModalOpen(true);
                    }}
                    className="text-xs md:text-sm font-medium tracking-tight text-white/70 transition-opacity cursor-pointer hover:text-white"
                  >
                    Log in
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setAuthMode('signup');
                        setIsAuthModalOpen(true);
                    }}
                    className="liquid-glass rounded-full px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-medium tracking-tight whitespace-nowrap"
                  >
                    Create account
                  </motion.button>
                </div>
              </div>
            </nav>

            <AnimatePresence mode="wait">
              {view === 'hero' ? (
                <motion.div 
                  key="hero"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-1 flex-col items-center justify-center text-center"
                >
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={LOGO_URL} 
                    alt="Bloom Icon" 
                    className="mb-8 h-20 w-20 rounded-full" 
                    referrerPolicy="no-referrer"
                  />
                  <motion.h1 
                    className="mb-8 max-w-2xl text-6xl font-medium leading-[1.1] tracking-[-0.05em] lg:text-7xl"
                  >
                    Don't know the <em className="font-serif italic text-white/80">landmark</em>? <br />
                    We'll help you travel there.
                  </motion.h1>

                  <motion.p
                    transition={{ delay: 0.1 }}
                    className="mb-12 max-w-lg text-lg font-normal leading-relaxed text-white/70 lg:text-xl"
                  >
                    We'll help you identify your next tourist destination by only uploading an image of the place you want to go.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-1 flex-col items-center justify-center w-full"
                >
                    <div className="w-full max-w-4xl space-y-12 text-center py-12">
                        <header className="space-y-4">
                            <motion.h2 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-5xl lg:text-7xl font-medium tracking-tight"
                            >
                                Discover Your <em className="font-serif italic text-white/80">Journey</em>
                            </motion.h2>
                            <motion.p 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-white/60 text-xl lg:text-2xl max-w-2xl mx-auto"
                            >
                                Upload an image to reveal the destination's identity and start your adventure.
                            </motion.p>
                        </header>

                        <div className="relative group max-w-2xl mx-auto w-full">
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept="image/*"
                            />
                            
                            {!uploadedImage ? (
                                <motion.div 
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="liquid-glass border-2 border-dashed border-white/10 rounded-[3rem] p-24 cursor-pointer hover:bg-white/5 transition-all flex flex-col items-center gap-8 shadow-2xl"
                                >
                                    <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/20">
                                        <Upload className="h-10 w-10 text-white/90" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-2xl font-medium tracking-tight">Click to upload or drag and drop</p>
                                        <p className="text-white/40">Any photo of a global landmark or destination</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="liquid-glass rounded-[3rem] overflow-hidden p-4 shadow-3xl"
                                >
                                    <div className="relative aspect-[16/10] w-full rounded-[2.5rem] overflow-hidden shadow-inner">
                                        <img 
                                            src={uploadedImage} 
                                            alt="Uploaded landmark" 
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                        />
                                        <button 
                                            onClick={resetUpload}
                                            className="absolute top-6 right-6 h-12 w-12 rounded-full bg-black/50 backdrop-blur-xl flex items-center justify-center hover:bg-black/70 transition-colors border border-white/10"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                                    
                                    <motion.div 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="p-10 text-center space-y-6"
                                    >
                                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-xs font-bold uppercase tracking-[0.2em] text-white/70 ring-1 ring-white/20">
                                            <Sparkles className="h-3 w-3" /> Landmark Detected
                                        </div>
                                        <h3 className="text-4xl lg:text-5xl font-medium tracking-tight">
                                           {recognitionResult?.includes("can't") ? (
                                               <span className="text-white/50 italic font-light">{recognitionResult}</span>
                                           ) : (
                                               <span className="font-serif italic text-white/95">{recognitionResult}</span>
                                           )}
                                        </h3>
                                        <div className="pt-4">
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => fileInputRef.current?.click()}
                                                className="liquid-glass px-8 py-3 rounded-full text-base font-medium hover:bg-white/10 transition-colors border border-white/10"
                                            >
                                                Try another one
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upload Section (Footer) */}
            <footer className={`mt-auto flex flex-col items-center transition-all duration-700 ${view === 'upload' ? 'max-h-0 opacity-0 pointer-events-none translate-y-10' : 'max-h-40 opacity-100 translate-y-0'}`}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUploadClick}
                className="liquid-glass-strong flex items-center gap-4 rounded-full py-4 px-10 text-xl font-medium tracking-tight shadow-2xl backdrop-blur-3xl group mb-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                  <Upload className="h-6 w-6" />
                </div>
                Upload Image
              </motion.button>
              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mb-8">
                JPEG, PNG, WEBP (MAX 10MB)
              </p>
            </footer>
          </div>
        </section>

        {/* Right Panel */}
        <section className={`hidden flex-col gap-6 p-6 transition-all duration-1000 ease-in-out ${view === 'upload' ? 'w-0 opacity-0 overflow-hidden p-0 pointer-events-none -translate-x-20' : 'w-[48%] opacity-100 lg:flex'}`}>
          {/* Top Bar */}
          <div className="flex items-center justify-end gap-3">
            <div className="liquid-glass flex items-center gap-4 rounded-full px-5 py-2">
              <a href="#" className="text-white transition-colors hover:text-white/80"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="text-white transition-colors hover:text-white/80"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="text-white transition-colors hover:text-white/80"><Instagram className="h-4 w-4" /></a>
              <div className="h-4 w-px bg-white/20" />
              <ArrowRight className="h-4 w-4 cursor-pointer text-white/60 transition-colors hover:text-white" />
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full"
            >
              <Sparkles className="h-5 w-5" />
            </motion.button>
          </div>


          {/* Bottom Feature Section */}
          <div className="mt-auto space-y-4">
            <div className="liquid-glass rounded-[2.5rem] p-4">
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="liquid-glass flex flex-col items-center justify-center gap-3 rounded-3xl py-8 text-center transition-transform hover:scale-[1.02]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Wand2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Processing</h4>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Ready</p>
                  </div>
                </div>
                <div className="liquid-glass flex flex-col items-center justify-center gap-3 rounded-3xl py-8 text-center transition-transform hover:scale-[1.02]">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold transition-transform">Growth Archive</h4>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">2.4k Items</p>
                  </div>
                </div>
              </div>

              {/* Bottom Large Card */}
              <div className="liquid-glass flex items-center gap-4 rounded-3xl p-4 transition-transform hover:scale-[1.01]">
                <img 
                  src={FLOWERS_URL} 
                  alt="Plant Sculpting" 
                  className="h-16 w-24 rounded-2xl object-cover grayscale" 
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold tracking-tight">Most Uploaded Sites</h4>
                  <p className="text-xs text-white/60">Experience the world throught the eyes of others</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full"
                >
                  <span className="text-xl">+</span>
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </main>
  );
}

