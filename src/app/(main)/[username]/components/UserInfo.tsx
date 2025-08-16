import { useState, useRef } from 'react';
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
    <section className='flex flex-col gap-4 w-1/4 relative transform -translate-y-32'>
      <div className='rounded-full border-2 border-[#00c7ff] w-40 h-40 flex items-center justify-center cyan-glow'>
        Image Goes Here
      </div>

      <div className='flex items-center gap-2'>
        {editingField === 'username' ? (
          <input
            className='text-3xl w-40 bg-slate-900 border border-[#00c7ff] rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-[#00c7ff]'
            value={fieldValues.username || ''}
            onChange={(e) =>
              setFieldValues((vals) => ({ ...vals, username: e.target.value }))
            }
            onKeyDown={handleKeyDown('username')}
            onBlur={handleBlur('username')}
            disabled={isLoading}
            autoFocus
            maxLength={32}
          />
        ) : (
          <>
            <h1 className='text-3xl'>{fieldValues.username || ''}</h1>
            {canEdit && (
              <button
                onClick={() => setEditingField('username')}
                className='p-1 ml-2 border border-[#00c7ff] rounded-full hover:bg-[#23263a] transition-colors duration-100'
                type='button'
                title='Edit Username'
                aria-label='Edit Username'
              >
                <Pencil className='w-5 h-5 text-[#00c7ff] cursor-pointer' />
              </button>
            )}
          </>
        )}
      </div>

      {(editingField === 'bio' || fieldValues.bio || canEdit) && (
        <div className='flex items-start gap-2 p-4 bg-slate-950 border rounded-lg min-w-0'>
          {editingField === 'bio' ? (
            <textarea
              className='flex-1 w-full min-w-0 resize-none bg-slate-900 border border-[#00c7ff] rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-[#00c7ff]'
              rows={4}
              value={fieldValues.bio}
              onChange={(e) =>
                setFieldValues((vals) => ({ ...vals, bio: e.target.value }))
              }
              onKeyDown={handleKeyDown('bio')}
              onBlur={handleBlur('bio')}
              disabled={isLoading}
              maxLength={256}
              autoFocus
            />
          ) : (
            <>
              <p className='flex-1 w-full min-w-0 break-words overflow-hidden text-ellipsis max-h-[120px]'>
                {!fieldValues.bio && canEdit ? (
                  <span className='text-gray-500'>Write a short bio…</span>
                ) : (
                  fieldValues.bio
                )}
              </p>
              {canEdit && (
                <button
                  onClick={() => setEditingField('bio')}
                  className='p-1 ml-2 border border-[#00c7ff] rounded-full hover:bg-[#23263a] transition-colors duration-100'
                  type='button'
                  title='Edit Bio'
                  aria-label='Edit Bio'
                >
                  <Pencil className='w-5 h-5 text-[#00c7ff] cursor-pointer' />
                </button>
              )}
            </>
          )}
        </div>
      )}
      {canEdit && (
        <SignOutBtn />
      )}
    </section>
  );
}
