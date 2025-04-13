
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  company: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.profile?.first_name || "",
      lastName: user?.profile?.last_name || "",
      company: user?.profile?.company || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user?.user?.id) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          company: data.company,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    const firstName = form.watch("firstName");
    const lastName = form.watch("lastName");
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    }
    
    return user?.user?.email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Profile Settings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.profile?.avatar_url || ""} />
                  <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="flex gap-2">
                  <User className="h-4 w-4" />
                  <span>Change Avatar</span>
                </Button>
              </div>
              
              <div className="flex-1">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p>{user?.user?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                <p className="capitalize">{user?.role || "User"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Account Created</h3>
                <p>{user?.user?.created_at ? new Date(user.user.created_at).toLocaleDateString() : "-"}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              To change your email address or password, please contact support.
            </p>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
