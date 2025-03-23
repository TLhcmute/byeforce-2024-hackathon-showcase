
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const NavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-out-expo ${
          isActive
            ? "text-primary"
            : "text-foreground/70 hover:text-foreground"
        }`}
      >
        <span className="relative z-10">{children}</span>
        {isActive && (
          <span className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-md -z-0 animate-scale-in" />
        )}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-lg bg-background/70 border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            aria-label="Byeforce"
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-gradient-to-br from-primary/90 via-violet-500 to-purple-700 flex items-center justify-center shadow-lg">
              <Zap className="w-7 h-7 text-white" strokeWidth={2.5} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            <div className="font-bold text-xl tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-purple-600">
                ByteForce
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <div className="w-px h-6 bg-border mx-2" />
            <ThemeToggle />
          </div>

          <button
            className="block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 block md:hidden pt-20 glass-panel animate-fade-in overflow-auto">
          <div className="container px-4 py-8 mx-auto">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="px-4 py-3 rounded-lg text-lg font-medium hover:bg-background/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/projects"
                className="px-4 py-3 rounded-lg text-lg font-medium hover:bg-background/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <div className="px-4 py-3 rounded-lg">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
