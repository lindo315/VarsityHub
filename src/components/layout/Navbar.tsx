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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const navLinks = [
    { title: "Home", href: "/", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    {
      title: "Events",
      href: "/events",
      icon: <Calendar className="h-4 w-4 mr-2" />,
    },
    {
      title: "Sports",
      href: "/sports",
      icon: <Trophy className="h-4 w-4 mr-2" />,
    },
    {
      title: "News",
      href: "/news",
      icon: <Newspaper className="h-4 w-4 mr-2" />,
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

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          isScrolled
            ? "bg-white/95 backdrop-blur border-b shadow-sm"
            : "bg-background/95 backdrop-blur"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center">
                <GraduationCap className="h-6 w-6 text-varsity-blue" />
                <div className="font-bold text-2xl text-varsity-blue ml-1">
                  Varsity<span className="text-varsity-gold">Hub</span>
                </div>
              </div>
            </Link>
            <nav className="hidden md:flex gap-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-varsity-blue flex items-center",
                    location.pathname === link.href
                      ? "text-varsity-blue font-semibold"
                      : "text-foreground/80"
                  )}
                >
                  {link.title}
                </Link>
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
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-varsity-blue text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Profile
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
                className="hidden md:flex"
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
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
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
                    <div className="flex items-center p-2">
                      <Avatar className="h-9 w-9 mr-3">
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
                      <Link
                        key={index}
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
                        className="w-full"
                        onClick={() => {
                          navigate("/auth");
                          setIsMenuOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                    )}
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
