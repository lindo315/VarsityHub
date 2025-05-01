import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  Calendar,
  BookOpen,
  Trophy,
  Newspaper,
  Info,
  GraduationCap,
  Keyboard,
  ChevronDown,
  HomeIcon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import GlobalSearch from "@/components/search/GlobalSearch";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const navLinks = [
    { title: "Home", href: "/", icon: <HomeIcon className="h-4 w-4 mr-2" /> },
    {
      title: "Events",
      href: "/events",
      icon: <Calendar className="h-4 w-4 mr-2" />,
      dropdown: [
        { title: "All Events", href: "/events" },
        { title: "Academic Events", href: "/events?category=academic" },
        { title: "Cultural Events", href: "/events?category=cultural" },
        { title: "Social Events", href: "/events?category=social" },
      ],
    },
    {
      title: "Sports",
      href: "/sports",
      icon: <Trophy className="h-4 w-4 mr-2" />,
      dropdown: [
        { title: "Teams", href: "/sports?tab=teams" },
        { title: "Fixtures", href: "/sports?tab=fixtures" },
        { title: "Results", href: "/sports?tab=results" },
      ],
    },
    {
      title: "News",
      href: "/news",
      icon: <Newspaper className="h-4 w-4 mr-2" />,
      dropdown: [
        { title: "Latest News", href: "/news" },
        { title: "Achievements", href: "/news?category=Achievements" },
        { title: "Announcements", href: "/news?category=Announcements" },
      ],
    },
    { title: "About", href: "/about", icon: <Info className="h-4 w-4 mr-2" /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open search dialog with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Function to get user initials
  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      const names = user.user_metadata.full_name.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || "U";
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/auth");
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  const handleMouseEnter = (title: string) => {
    setIsDropdownOpen(title);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen("");
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"
        )}
      >
        {/* Top Bar - Only visible on larger screens */}
        <div className="hidden lg:block bg-varsity-blue text-white py-1">
          <div className="container flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-varsity-gold transition-colors">
                Student Portal
              </a>
              <a href="#" className="hover:text-varsity-gold transition-colors">
                Library
              </a>
              <a href="#" className="hover:text-varsity-gold transition-colors">
                Campus Map
              </a>
              <a href="#" className="hover:text-varsity-gold transition-colors">
                Directory
              </a>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <span>Welcome, {user.user_metadata?.full_name || "User"}</span>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="hover:text-varsity-gold transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?tab=signup"
                    className="hover:text-varsity-gold transition-colors font-medium"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center">
                <GraduationCap className="h-7 w-7 text-varsity-blue" />
                <div className="font-bold text-2xl text-varsity-blue ml-1">
                  Varsity<span className="text-varsity-gold">Hub</span>
                </div>
              </div>
            </Link>
            <nav className="hidden md:flex gap-1">
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() =>
                    link.dropdown && handleMouseEnter(link.title)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "text-sm font-medium px-3 py-2 rounded-md transition-colors hover:bg-gray-100 flex items-center",
                      location.pathname === link.href
                        ? "text-varsity-blue font-semibold"
                        : "text-foreground/80"
                    )}
                  >
                    {link.title}
                    {link.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                  </Link>

                  {link.dropdown && isDropdownOpen === link.title && (
                    <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen("")}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex relative"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
              {/* <kbd className="absolute pointer-events-none inline-flex items-center rounded border border-gray-200 bg-muted px-1 text-[10px] font-medium text-muted-foreground opacity-100 -bottom-6 right-[-3px]">
                <span className="text-xs">⌘</span>K
              </kbd> */}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex relative"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <Badge className="h-5 w-5 p-0 flex items-center justify-center absolute -top-1 -right-1 bg-varsity-gold text-black text-xs">
                3
              </Badge>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hidden md:flex"
                  >
                    <Avatar className="h-8 w-8 border border-gray-200">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-varsity-blue text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <span>{user.user_metadata?.full_name || "User"}</span>
                      <span className="text-xs font-normal text-gray-500 truncate">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/events">
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      My Events
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                className="hidden md:flex bg-varsity-blue hover:bg-varsity-blue/90"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] pr-0">
                <div className="px-1 py-6 grid gap-6">
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      to="/"
                      className="flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <GraduationCap className="h-6 w-6 text-varsity-blue" />
                      <span className="ml-2 text-xl font-bold text-varsity-blue">
                        Varsity<span className="text-varsity-gold">Hub</span>
                      </span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>

                  {/* Mobile Search Button */}
                  <Button
                    variant="outline"
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search...</span>
                    <Keyboard className="ml-auto h-4 w-4" />
                  </Button>

                  {user && (
                    <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10 mr-3 border border-gray-200">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-varsity-blue text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {user.user_metadata?.full_name || "User"}
                        </div>
                        <div className="text-xs text-muted-foreground truncate max-w-[220px]">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-2">
                    {navLinks.map((link, index) => (
                      <div key={index} className="grid gap-1">
                        <Link
                          to={link.href}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                            location.pathname === link.href
                              ? "bg-accent text-accent-foreground font-medium"
                              : "hover:bg-accent hover:text-accent-foreground"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.icon}
                          {link.title}
                        </Link>

                        {link.dropdown && (
                          <div className="ml-6 pl-2 border-l border-gray-200 space-y-1">
                            {link.dropdown.map((item, idx) => (
                              <Link
                                key={idx}
                                to={item.href}
                                className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-2 pt-4 border-t">
                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                        <Link
                          to="/events"
                          className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          My Events
                        </Link>
                        <Button
                          variant="ghost"
                          className="justify-start px-3 font-normal"
                          onClick={handleSignOut}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="default"
                        className="w-full bg-varsity-blue"
                        onClick={() => {
                          navigate("/auth");
                          setIsMenuOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>

                  {/* Mobile Quick Links */}
                  <div className="pt-4 border-t">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-2">
                      Quick Links
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="#"
                        className="text-xs rounded p-2 hover:bg-gray-100 text-gray-600"
                      >
                        Student Portal
                      </a>
                      <a
                        href="#"
                        className="text-xs rounded p-2 hover:bg-gray-100 text-gray-600"
                      >
                        Library
                      </a>
                      <a
                        href="#"
                        className="text-xs rounded p-2 hover:bg-gray-100 text-gray-600"
                      >
                        Campus Map
                      </a>
                      <a
                        href="#"
                        className="text-xs rounded p-2 hover:bg-gray-100 text-gray-600"
                      >
                        Directory
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Global Search Dialog */}
      <GlobalSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default Navbar;
