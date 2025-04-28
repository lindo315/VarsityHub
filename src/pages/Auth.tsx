import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Mail, Lock, User, UserPlus, LogIn } from "lucide-react";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both email and password.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description:
          error instanceof Error
            ? error.message
            : "Incorrect email or password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, { full_name: fullName });
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account.",
      });
      setActiveTab("signin");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign up.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link to="/" className="inline-block">
              <div className="flex items-center justify-center">
                <GraduationCap className="h-10 w-10 text-varsity-blue" />
                <span className="ml-2 text-2xl font-bold text-varsity-blue">
                  Varsity<span className="text-varsity-gold">Hub</span>
                </span>
              </div>
            </Link>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Welcome to VarsityHub
            </h2>
            <p className="mt-2 text-gray-600">
              Your central hub for all campus events and activities
            </p>
          </div>

          <Card className="w-full">
            <Tabs
              defaultValue="signin"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="signin"
                  className="flex items-center justify-center"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="flex items-center justify-center"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </TabsTrigger>
              </TabsList>

              {/* Sign In Form */}
              <TabsContent value="signin">
                <form onSubmit={handleSignIn}>
                  <CardHeader>
                    <CardTitle>Sign in to your account</CardTitle>
                    <CardDescription>
                      Enter your email and password to access your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@varsity.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="password"
                          className="flex items-center gap-2"
                        >
                          <Lock className="h-4 w-4" />
                          Password
                        </Label>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-xs"
                          type="button"
                        >
                          Forgot password?
                        </Button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp}>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                      Join VarsityHub to stay connected with campus events
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signupEmail"
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="your.email@varsity.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signupPassword"
                        className="flex items-center gap-2"
                      >
                        <Lock className="h-4 w-4" />
                        Password
                      </Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Password must be at least 6 characters long
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                    <p className="mt-3 text-xs text-gray-500 text-center">
                      By creating an account, you agree to the
                      <Button
                        variant="link"
                        className="p-0 h-auto text-xs mx-1"
                        type="button"
                      >
                        Terms of Service
                      </Button>
                      and
                      <Button
                        variant="link"
                        className="p-0 h-auto text-xs ml-1"
                        type="button"
                      >
                        Privacy Policy
                      </Button>
                    </p>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} VarsityHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
