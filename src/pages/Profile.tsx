import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  User,
  Mail,
  Building,
  GraduationCap,
  UserCircle,
  Settings,
  Shield,
  BellRing,
  History,
  CalendarClock,
  Save,
  Loader2,
  Upload,
  Camera,
} from "lucide-react";

type ProfileFormData = {
  full_name: string;
  username: string;
  faculty: string;
  study_year: number;
  avatar_url?: string;
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: "",
    username: "",
    faculty: "",
    study_year: 1,
  });

  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch profile data when component mounts or user changes
  useEffect(() => {
    async function getProfile() {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            full_name: data.full_name || "",
            username: data.username || "",
            faculty: data.faculty || "",
            study_year: data.study_year || 1,
            avatar_url: data.avatar_url || undefined,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error fetching profile",
        });
      }
    }

    getProfile();
  }, [user, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          username: formData.username,
          faculty: formData.faculty,
          study_year: formData.study_year,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error updating profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || !event.target.files.length) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${user?.id}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    setUploading(true);

    try {
      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL for the file
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Update the avatar URL in the form data
      setFormData({
        ...formData,
        avatar_url: data.publicUrl,
      });

      toast({
        title: "Avatar uploaded",
        description: "Your avatar has been uploaded successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description:
          error instanceof Error ? error.message : "Error uploading avatar",
      });
    } finally {
      setUploading(false);
    }
  };

  // Function to get user initials for avatar fallback
  const getUserInitials = () => {
    if (formData.full_name) {
      const names = formData.full_name.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || "U";
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - User info and navigation */}
            <div className="md:w-1/4">
              <Card className="sticky top-20">
                <CardHeader className="text-center">
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    <Avatar className="w-24 h-24 border-4 border-white shadow">
                      <AvatarImage src={formData.avatar_url} />
                      <AvatarFallback className="text-2xl bg-varsity-blue text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute right-0 bottom-0 rounded-full shadow"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Camera className="h-4 w-4" />
                      )}
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarUpload}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                  <CardTitle>{formData.full_name || "User"}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-1">
                    <Button
                      variant={activeTab === "general" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("general")}
                    >
                      <UserCircle className="h-4 w-4 mr-2" />
                      General Information
                    </Button>
                    <Button
                      variant={activeTab === "security" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("security")}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Security
                    </Button>
                    <Button
                      variant={
                        activeTab === "notifications" ? "default" : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => setActiveTab("notifications")}
                    >
                      <BellRing className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button
                      variant={activeTab === "activity" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("activity")}
                    >
                      <History className="h-4 w-4 mr-2" />
                      Activity
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Content */}
            <div className="md:w-3/4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsContent value="general" className="space-y-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-medium mb-4">
                              Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="full_name"
                                  className="flex items-center gap-2"
                                >
                                  <User className="h-4 w-4" />
                                  Full Name
                                </Label>
                                <Input
                                  id="full_name"
                                  value={formData.full_name}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      full_name: e.target.value,
                                    }))
                                  }
                                  placeholder="John Doe"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label
                                  htmlFor="username"
                                  className="flex items-center gap-2"
                                >
                                  <UserCircle className="h-4 w-4" />
                                  Username
                                </Label>
                                <Input
                                  id="username"
                                  value={formData.username}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      username: e.target.value,
                                    }))
                                  }
                                  placeholder="johndoe"
                                />
                              </div>

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
                                  value={user.email || ""}
                                  disabled
                                  className="bg-gray-50"
                                />
                                <p className="text-xs text-gray-500">
                                  To change your email, please contact support
                                </p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-lg font-medium mb-4">
                              Academic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="faculty"
                                  className="flex items-center gap-2"
                                >
                                  <Building className="h-4 w-4" />
                                  Faculty
                                </Label>
                                <Input
                                  id="faculty"
                                  value={formData.faculty}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      faculty: e.target.value,
                                    }))
                                  }
                                  placeholder="Engineering"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label
                                  htmlFor="study_year"
                                  className="flex items-center gap-2"
                                >
                                  <GraduationCap className="h-4 w-4" />
                                  Study Year
                                </Label>
                                <Select
                                  value={formData.study_year.toString()}
                                  onValueChange={(value) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      study_year: parseInt(value),
                                    }))
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your study year" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {[1, 2, 3, 4, 5, 6].map((year) => (
                                      <SelectItem
                                        key={year}
                                        value={year.toString()}
                                      >
                                        Year {year}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-40"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Security Settings
                        </h3>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">
                              Change Password
                            </CardTitle>
                            <CardDescription>
                              Update your password to keep your account secure
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <Label>Current Password</Label>
                              <Input type="password" placeholder="••••••••" />
                            </div>
                            <div className="space-y-2">
                              <Label>New Password</Label>
                              <Input type="password" placeholder="••••••••" />
                            </div>
                            <div className="space-y-2">
                              <Label>Confirm New Password</Label>
                              <Input type="password" placeholder="••••••••" />
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button>Update Password</Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Notification Preferences
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Choose how you'd like to be notified about activities,
                          events, and updates.
                        </p>
                        <div className="space-y-4">
                          <p className="text-center text-muted-foreground">
                            Notification settings coming soon
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Recent Activity
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          View a history of your recent account activity and
                          events you've attended.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-center p-4 border rounded-lg">
                            <div className="mr-4 bg-blue-100 p-2 rounded-full">
                              <Settings className="h-6 w-6 text-blue-500" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">Profile Updated</h4>
                              <p className="text-sm text-muted-foreground">
                                You updated your profile information
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Just now
                            </div>
                          </div>
                          <div className="flex items-center p-4 border rounded-lg">
                            <div className="mr-4 bg-green-100 p-2 rounded-full">
                              <CalendarClock className="h-6 w-6 text-green-500" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">Account Created</h4>
                              <p className="text-sm text-muted-foreground">
                                You created your VarsityHub account
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              3 days ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
