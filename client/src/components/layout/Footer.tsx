import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan">
                <Rocket className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-display font-bold text-xl">PitchRocket</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              AI-powered dynamic pitch generator for every scenario.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#scenarios" className="hover:text-foreground transition-colors">Scenarios</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">About Me</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
  <a 
    href="https://mubarek-beta.vercel.app/" 
    className="hover:text-foreground transition-colors"
    target="_blank" 
    rel="noopener noreferrer"
  >
    About
  </a>
</li>
<li>
  <a 
    href="https://mubarek-beta.vercel.app/" 
    className="hover:text-foreground transition-colors"
    target="_blank" 
    rel="noopener noreferrer"
  >
    Hiring
  </a>
</li>
<li>
  <a 
    href="https://mubarek-beta.vercel.app/" 
    className="hover:text-foreground transition-colors"
    target="_blank" 
    rel="noopener noreferrer"
  >
    Contact
  </a>
</li>
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-foreground transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-foreground transition-colors">Register</Link></li>
              
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
  © {new Date().getFullYear()} PitchRocket. All rights reserved.
</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}