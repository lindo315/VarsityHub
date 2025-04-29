import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

type UserMetadata = {
  full_name?: string;
  faculty?: string;
  study_year?: number;
  avatar_url?: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    userData: UserMetadata
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<UserMetadata>) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    navigate("/");
  };

  const signUp = async (
    email: string,
    password: string,
    userData: UserMetadata
  ) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });

    if (error) throw error;

    // If the user is created immediately (no email verification required)
    if (data.user) {
      // Insert into the profiles table
      await createInitialProfile(data.user.id, userData);
    }
  };

  const createInitialProfile = async (
    userId: string,
    userData: UserMetadata
  ) => {
    try {
      // Check if a profile already exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .single();

      if (!existingProfile) {
        // Create the profile
        await supabase.from("profiles").insert({
          id: userId,
          full_name: userData.full_name,
          faculty: userData.faculty,
          study_year: userData.study_year,
          avatar_url: userData.avatar_url,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error creating initial profile:", error);
      // Don't throw here - we don't want to disrupt the sign-up flow
      // The profile can be created later
    }
  };

  const updateUserProfile = async (data: Partial<UserMetadata>) => {
    if (!user) throw new Error("User not authenticated");

    // First update auth metadata
    const { error: authError } = await supabase.auth.updateUser({
      data: data,
    });

    if (authError) throw authError;

    // Then update the profile in the profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (profileError) throw profileError;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signIn,
        signUp,
        signOut,
        updateUserProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
