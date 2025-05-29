import { useClerk, useOrganization, useUser } from "@clerk/clerk-expo";
import { OrganizationMembershipResource } from "@clerk/types";
import React, { createContext, useContext } from "react";


export type UserAndOrgInfo = {
  userAndOrgType: 'none';
} | {
  userAndOrgType: 'user-only';
  userId: string;
} | {
  userAndOrgType: 'user-with-orgs';
  userId: string;
  activeOrgId: string | null;
  getUserOrgs: () => OrganizationMembershipResource[];
  setActiveOrgId: (orgId: string) => Promise<void>;
}

export const UserAndOrgInfoContext = createContext<UserAndOrgInfo>({
  userAndOrgType: 'none',
});


export const UserAndOrgInfoContextProvder = ({ children }: { children: React.ReactNode }): React.ReactElement => {

  const { user } = useUser();
  const { organization } = useOrganization();
  const { setActive } = useClerk();

  const getUserAndOrgInfo = (): UserAndOrgInfo => {
    if (!user) {
      return {
        userAndOrgType: 'none' as const,
      };
    }
  
    if (user.organizationMemberships.length === 0) {
      return {
        userAndOrgType: 'user-only' as const,
        userId: user.id,
      };
    }

    const setActiveOrgId = async (orgId: string) => {
      if (setActive) {
        await setActive({ organization: orgId });
      }
    }

    if (!organization) {
      return {
        userAndOrgType: 'user-with-orgs' as const,
        userId: user.id,
        activeOrgId: null,
        getUserOrgs: () => user.organizationMemberships,
        setActiveOrgId,
      };
    }
  
    return {
      userAndOrgType: 'user-with-orgs' as const,
      userId: user.id,
      activeOrgId: organization.id,
      getUserOrgs: () => user.organizationMemberships,
      setActiveOrgId,
    };    
  }

  const userAndOrgInfo = getUserAndOrgInfo();

  return (
    <UserAndOrgInfoContext.Provider value={userAndOrgInfo}>
      {children}
    </UserAndOrgInfoContext.Provider>
  )
};

export const useUserAndOrgInfo = (): UserAndOrgInfo => {
  const userAndOrgInfo = useContext(UserAndOrgInfoContext);
  return userAndOrgInfo;
}
