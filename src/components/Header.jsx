import { Menu, Home, Info, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Brand */}
                <div className="flex items-center space-x-2">
                    <Menu size={24} className="text-white sm:hidden" />
                    <h1 className="text-2xl font-bold">ToDoList</h1>
                </div>

                {/* Navigation Links */}
                <nav className="hidden sm:flex space-x-8">
                    <Link to="/" className="flex items-center gap-2 hover:underline transition-colors duration-300">
                        <Home size={24} />
                        <span>Home</span>
                    </Link>
                    <Link to="/about" className="flex items-center gap-2 hover:underline transition-colors duration-300">
                        <Info size={24} />
                        <span>About</span>
                    </Link>
                    <Link to="/contact" className="flex items-center gap-2 hover:underline transition-colors duration-300">
                        <Phone size={24} />
                        <span>Contact</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
