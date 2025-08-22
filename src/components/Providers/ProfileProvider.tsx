import React, { createContext, useContext } from 'react';
import useUser from '@/hooks/useUser/useUser';
import { Profile } from '@/repositories/profileRepository/profile.types';

interface ProfileEditContextValue {
  canEdit: boolean;
  profile: Profile;
  isLoading: boolean;
}

const ProfileEditContext = createContext<ProfileEditContextValue | undefined>(
  undefined
);

export const useProfileContext = () => {
  const context = useContext(ProfileEditContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  profile: Profile;
  children: React.ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  profile,
  children,
}) => {
  const { data: user, isLoading } = useUser();

  const canEdit = user?.id === profile.id;

  return (
    <ProfileEditContext.Provider value={{ canEdit, profile, isLoading }}>
      {children}
    </ProfileEditContext.Provider>
  );
};
