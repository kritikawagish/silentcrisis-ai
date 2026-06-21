import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/for-individuals', label: 'Individuals' },
  { to: '/for-teams', label: 'Teams' },
  { to: '/science', label: 'Science' },
  { to: '/dashboard', label: 'Demo' },
  { to: '/pricing', label: 'Pricing' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <nav
      id="global_nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass-strong py-3' : 'py-5'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cosmos-void/70 via-cosmos-void/20 to-transparent pointer-events-none" />
      <div className="relative max-w-[2400px] mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-amber-dawn group-hover:rotate-12 transition-transform duration-700">
                <circle cx="14" cy="14" r="2" fill="currentColor" />
                <circle cx="6" cy="6" r="1.2" fill="currentColor" opacity="0.7" />
                <circle cx="22" cy="8" r="1.2" fill="currentColor" opacity="0.7" />
                <circle cx="8" cy="22" r="1.2" fill="currentColor" opacity="0.7" />
                <circle cx="22" cy="22" r="1.2" fill="currentColor" opacity="0.7" />
                <line x1="14" y1="14" x2="6" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <line x1="14" y1="14" x2="22" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <line x1="14" y1="14" x2="8" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <line x1="14" y1="14" x2="22" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              </svg>
              <span className="font-display text-xl text-star-bright tracking-editorial">SilentCrisis</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-lg font-extralight transition-colors duration-300 relative ${
                      isActive ? 'text-amber-dawn' : 'text-star-bright/70 hover:text-star-bright'
                    }`
                  }
                  style={{ textShadow: '0 1px 8px rgba(10,4,24,0.5)' }}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-amber-dawn"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="text-lg font-extralight bg-amber-dawn text-cosmos-void px-5 py-2 hover:bg-amber-warm transition-colors duration-300"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)', paddingRight: '28px' }}
              >
                Book Demo
              </Link>
            </div>

            <button
              className="lg:hidden text-star-bright p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:hidden glass-strong overflow-hidden"
            >
              <div className="grid grid-cols-12 py-6">
                <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 flex flex-col gap-5">
                  {navLinks.map(link => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `text-lg font-extralight ${isActive ? 'text-amber-dawn' : 'text-star-bright/80'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <Link to="/contact" className="text-lg font-extralight text-amber-dawn pt-2 border-t border-star-bright/10">
                    Book Demo →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
