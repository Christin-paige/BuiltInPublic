// Component imports
import { FormField, FormItem, FormControl, FormMessage, FormLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
// Hooks & Utilities
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { displayNameSchema, DisplayNameSchema } from "@/hooks/useProfile/profile.schema";
import useProfile, { useUpdateProfile } from "@/hooks/useProfile/useProfile";
import useUser from "@/hooks/useUser/useUser";
import { checkProfanity } from "utils/usernameValidator";
import { Profile } from "@/repositories/profileRepository/profile.types";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function DisplayName({ profile }: { profile?: Profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading } = useUser();
  
  const { data: userProfile } = useProfile(user?.username || "");
  const updateProfileMutation = useUpdateProfile();

  // Form setup to edit display name and test validation
  const form = useForm<DisplayNameSchema>({
    resolver: zodResolver(displayNameSchema),
    mode: "onChange",
    defaultValues: {
      displayName: "",
    },
  });

  // Handle the form submission and test display name for profanity
  const onSubmit = async (data: DisplayNameSchema) => {
    const isProfane = await checkProfanity(data.displayName);
    if (isProfane) {
      form.setError("displayName", {
        type: "manual",
        message: "Please avoid using inappropriate language.",
      });
    } else {
      // Try to update the profile display name, and show the error if it's not successful
      try {
        await updateProfileMutation.mutateAsync({
          profileId: profile?.id || "",
          fields: { display_name: data.displayName },
        });
        toast.success("Display name updated successfully!");
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed to update display name");
      }
    }
  };

  // Reset form values when profile data changes
  useEffect(() => {
    if (profile) {
      form.reset({
        displayName: profile.displayName || "",
      });
    }
  }, [form, profile]);

  // Return the skeleton loader while loading
  if (isLoading) {
    return <Skeleton className="h-6" />;
  }

  if (profile?.id !== userProfile?.id) {
    return (
      <>
        {profile?.displayName ? (
          <p className="font-body text-lg">{profile.displayName}</p>
        ) : (
          <p className="font-body text-lg">{profile?.username}</p>
        )}
      </>
    )
  }

  return (
    <>
      {isEditing ? (
        <Form {...form}>
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Enter your display name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
          </div>
        </Form>
      ) : (
        <div className="flex items-center font-body text-lg group gap-8">
          <p>{profile?.displayName}</p>
          <button className="cursor-pointer hidden group-hover:block transition-all duration-300 text-zinc-400 hover:text-zinc-100" 
            onClick={() => setIsEditing(true)}>
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}