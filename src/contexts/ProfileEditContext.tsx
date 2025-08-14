import React, { createContext, useContext } from 'react';
import useUser from '@/hooks/useUser/useUser';

interface ProfileEditContextValue {
  canEdit: boolean;
  signOutUser: () => Promise<{ message: string } | boolean>;
}

const ProfileEditContext = createContext<ProfileEditContextValue | undefined>(
  undefined
);

export const useProfileEdit = () => {
  const context = useContext(ProfileEditContext);
  if (!context) {
    throw new Error('useProfileEdit must be used within a ProfileEditProvider');
  }
  return context;
};

interface ProfileEditProviderProps {
  profileUserId: string;
  children: React.ReactNode;
}

export const ProfileEditProvider: React.FC<ProfileEditProviderProps> = ({
  profileUserId,
  children,
}) => {
  const { data: user, signOutUser } = useUser();

  const canEdit = user?.id === profileUserId;

  return (
    <ProfileEditContext.Provider value={{ canEdit, signOutUser }}>
      {children}
    </ProfileEditContext.Provider>
  );
};
