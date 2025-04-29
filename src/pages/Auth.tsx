import { useState, useEffect } from "react";
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
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  UserPlus,
  LogIn,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);

  // Form states for sign in
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Form states for sign up
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [faculty, setFaculty] = useState("");
  const [studyYear, setStudyYear] = useState("1");
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Form validation states
  const [signInErrors, setSignInErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [signUpErrors, setSignUpErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});

  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Reset errors when changing tabs
  useEffect(() => {
    setSignInErrors({});
    setSignUpErrors({});
  }, [activeTab]);

  // Handle sign in form submission
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    const errors: { email?: string; password?: string } = {};

    // Validate form
    if (!signInEmail) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail)) {
      errors.email = "Please enter a valid email address";
    }

    if (!signInPassword) {
      errors.password = "Password is required";
    }

    // If there are errors, display them and don't submit
    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    // Form is valid, proceed with sign in
    setIsSigningIn(true);

    try {
      await signIn(signInEmail, signInPassword);

      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });

      navigate("/");
    } catch (error) {
      console.error("Sign in error:", error);

      toast({
        variant: "destructive",
        title: "Sign in failed",
        description:
          error instanceof Error
            ? error.message
            : "Incorrect email or password.",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  // Handle sign up form submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Sign up form submitted");

    // Clear previous errors
    const errors: {
      fullName?: string;
      email?: string;
      password?: string;
    } = {};

    // Validate form
    if (!fullName || fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
    }

    if (!signUpEmail) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail)) {
      errors.email = "Please enter a valid email address";
    }

    if (!signUpPassword) {
      errors.password = "Password is required";
    } else if (signUpPassword.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // If there are errors, display them and don't submit
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors);
      setSignUpErrors(errors);
      return;
    }

    // Form is valid, proceed with sign up
    setIsSigningUp(true);
    console.log("Starting sign up process");

    try {
      // Prepare user metadata
      const userData = {
        full_name: fullName,
        faculty: faculty || undefined,
        study_year: studyYear ? parseInt(studyYear) : undefined,
      };

      console.log("Signing up with data:", {
        email: signUpEmail,
        password: "[REDACTED]",
        userData,
      });

      // Call the signUp function
      await signUp(signUpEmail, signUpPassword, userData);

      console.log("Sign up successful");

      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account.",
      });

      // Reset form and switch to sign in tab
      setFullName("");
      setSignUpEmail("");
      setSignUpPassword("");
      setFaculty("");
      setStudyYear("1");
      setActiveTab("signin");
    } catch (error) {
      console.error("Sign up error:", error);

      toast({
        variant: "destructive",
        title: "Sign up failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign up.",
      });
    } finally {
      setIsSigningUp(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        placeholder="your.email@varsity.edu"
                        disabled={isSigningIn}
                        className={signInErrors.email ? "border-red-500" : ""}
                      />
                      {signInErrors.email && (
                        <p className="text-sm font-medium text-red-500">
                          {signInErrors.email}
                        </p>
                      )}
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
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          disabled={isSigningIn}
                          className={
                            signInErrors.password ? "border-red-500" : ""
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                      {signInErrors.password && (
                        <p className="text-sm font-medium text-red-500">
                          {signInErrors.password}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSigningIn}
                    >
                      {isSigningIn ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
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
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        disabled={isSigningUp}
                        className={
                          signUpErrors.fullName ? "border-red-500" : ""
                        }
                      />
                      {signUpErrors.fullName && (
                        <p className="text-sm font-medium text-red-500">
                          {signUpErrors.fullName}
                        </p>
                      )}
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
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="your.email@varsity.edu"
                        disabled={isSigningUp}
                        className={signUpErrors.email ? "border-red-500" : ""}
                      />
                      {signUpErrors.email && (
                        <p className="text-sm font-medium text-red-500">
                          {signUpErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signupPassword"
                        className="flex items-center gap-2"
                      >
                        <Lock className="h-4 w-4" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="signupPassword"
                          type={showPassword ? "text" : "password"}
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          placeholder="Minimum 6 characters"
                          disabled={isSigningUp}
                          className={
                            signUpErrors.password ? "border-red-500" : ""
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                      {signUpErrors.password && (
                        <p className="text-sm font-medium text-red-500">
                          {signUpErrors.password}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="faculty">Faculty</Label>
                        <select
                          id="faculty"
                          value={faculty}
                          onChange={(e) => setFaculty(e.target.value)}
                          disabled={isSigningUp}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Not specified</option>
                          <option value="Arts">Arts</option>
                          <option value="Commerce">
                            Commerce, Law & Management
                          </option>
                          <option value="Engineering">
                            Engineering & Built Environment
                          </option>
                          <option value="Health">Health Sciences</option>
                          <option value="Science">Science</option>
                          <option value="Humanities">Humanities</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studyYear">Study Year</Label>
                        <select
                          id="studyYear"
                          value={studyYear}
                          onChange={(e) => setStudyYear(e.target.value)}
                          disabled={isSigningUp}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="1">Year 1</option>
                          <option value="2">Year 2</option>
                          <option value="3">Year 3</option>
                          <option value="4">Year 4 (Honours)</option>
                          <option value="5">Year 5 (Masters)</option>
                          <option value="6">Year 6+ (PhD)</option>
                          <option value="staff">Staff Member</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSigningUp}
                      onClick={() =>
                        console.log("Create Account button clicked")
                      }
                    >
                      {isSigningUp ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
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
