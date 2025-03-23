
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container px-4 md:px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary/70 flex items-center justify-center">
                <span className="text-lg font-bold text-white">B</span>
              </div>
              <span className="font-bold text-lg">Byeforce</span>
            </div>
            <p className="text-foreground/70 max-w-xs">
              A talented team of developers participating in the UTE Hackathon 2024.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/byeforce"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com/byeforce"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com/company/byeforce"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:team@byeforce.com"
                className="text-foreground/70 hover:text-primary transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-foreground/70 hover:text-primary transition-colors duration-200">
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Contact</h3>
            <p className="text-foreground/70">
              Feel free to reach out to us for collaboration or questions.
            </p>
            <a
              href="mailto:team@byeforce.com"
              className="inline-flex items-center space-x-2 text-primary hover:underline"
            >
              <Mail size={16} />
              <span>team@byeforce.com</span>
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/50 text-center text-foreground/50 text-sm">
          <p>© {currentYear} Byeforce Team. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
