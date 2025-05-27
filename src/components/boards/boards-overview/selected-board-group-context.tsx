import { useOrganization, useUser } from "@clerk/clerk-expo";
import { OrganizationMembershipResource } from "@clerk/types";
import React, { createContext, useContext } from "react";


type UserAndOrgInfo = {
  userAndOrgType: 'none';
} | {
  userAndOrgType: 'user-only';
  userId: string;
} | {
  userAndOrgType: 'user-with-orgs';
  userId: string;
  activeOrgId: string | null;
  getUserOrgs: () => OrganizationMembershipResource[];
}

export const UserAndOrgInfoContext = createContext<UserAndOrgInfo>({
  userAndOrgType: 'none',
});


export const UserAndOrgInfoContextProvder = ({ children }: { children: React.ReactNode }): React.ReactElement => {

  const { user } = useUser();
  const { organization } = useOrganization();

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
  
    if (!organization) {
      return {
        userAndOrgType: 'user-with-orgs' as const,
        userId: user.id,
        activeOrgId: null,
        getUserOrgs: () => user.organizationMemberships,
      };
    }
  
    return {
      userAndOrgType: 'user-with-orgs' as const,
      userId: user.id,
      activeOrgId: organization.id,
      getUserOrgs: () => user.organizationMemberships,
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
