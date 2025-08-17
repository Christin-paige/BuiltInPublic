import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import DisplayName from '@/components/Profile/DisplayName';
import Bio from '@/components/Profile/Bio';
import { useProfileEdit } from '@/contexts/ProfileEditContext';
import { Profile } from '@/repositories/profileRepository/profile.types';
import { Pencil } from 'lucide-react';
import { checkUsernameExists, updateProfile } from '@/hooks/useProfile/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import SignOutBtn from '@/components/Buttons/SignOutBtn';
import 'react-toastify/dist/ReactToastify.css';

interface UserInfoProps {
  profile: Profile;
}

type EditableField = 'username' | 'bio';

export default function UserInfo({ profile }: UserInfoProps) {
  const { canEdit } = useProfileEdit();
  const router = useRouter();

  const [fieldValues, setFieldValues] = useState({
    username: profile.username,
    bio: profile.bio || '',
  });
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const skipNextBlur = useRef(false);

  const handleFieldEdit = async (field: EditableField) => {
    const newValue = fieldValues[field];
    if (newValue === profile[field]) {
      setEditingField(null);
      return;
    }
    setIsLoading(true);
    try {
      if (field === 'username' && newValue) {
        const exists = await checkUsernameExists(newValue);
        if (exists) throw new Error('That username is already taken');
      }
      await updateProfile(profile.id, { [field]: newValue });
      toast.success(`${field === 'username' ? 'Username' : 'Bio'} updated!`);
      if (field === 'username') router.push(`/${newValue}`);
      setEditingField(null);
    } catch (error: any) {
      toast.error(error.message || 'Update failed—please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (field: EditableField) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      skipNextBlur.current = true;
      handleFieldEdit(field);
    }
  };

  const handleBlur = (field: EditableField) => () => {
    if (skipNextBlur.current) {
      skipNextBlur.current = false;
      return;
    }
    handleFieldEdit(field);
  };

  return (
    <section className='flex flex-col gap-4 w-1/4 relative transform -translate-y-28'>
      {isLoading ? (
        <Skeleton className='w-24 h-24 rounded-full' />
      ) : (
        <Avatar className='w-24 h-24'>
          <AvatarImage src={profile.avatarUrl || ''} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}

      <DisplayName profile={profile} />
      <Bio profile={profile} />
      {canEdit && <SignOutBtn />}
    </section>
  );
}
