// Component imports
import { FormField, FormItem, FormControl, FormDescription, FormMessage, FormLabel, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil } from "lucide-react";
// Hooks & Utilities
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { displayNameSchema, DisplayNameSchema } from "@/hooks/useProfile/profile.schema";
import useProfile from "@/hooks/useProfile/useProfile";
import useUser from "@/hooks/useUser/useUser";
import { checkProfanity } from "utils/usernameValidator";

export default function DisplayName() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading } = useUser();
  
  const { data: profile } = useProfile(user?.username || "");

  const form = useForm<DisplayNameSchema>({
    resolver: zodResolver(displayNameSchema),
    mode: "onChange",
    defaultValues: {
      displayName: "",
    },
  });

  if (isLoading) {
    return <Skeleton className="h-6" />;
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
                <FormLabel />
                <FormControl>
                  <Input placeholder="Enter your display name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      ) : (
        <div className="flex items-center font-body text-lg group gap-8">
          <p>{profile?.displayName}</p>
          <button className="rounded-full border border-white p-1 cursor-pointer hidden group-hover:block hover:border-zinc-400 transition-all duration-300
            hover:text-zinc-400" 
            onClick={() => setIsEditing(true)}>
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}