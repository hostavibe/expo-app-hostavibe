import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { useUserAndOrgInfo } from "../boards-overview/selected-board-group-context";


export const OrgsForUserList = () => {

  const userAndOrgInfo = useUserAndOrgInfo();

  if (userAndOrgInfo.userAndOrgType !== 'user-with-orgs') {
    return null;
  }

  const userOrgs = userAndOrgInfo.getUserOrgs();

  return (
    <>
      {
        userOrgs && userOrgs.length > 0 && (
          userOrgs.map((org) => (
            <Link key={org.organization.id} href={`/boards/org/${org.organization.id}` as any}>
              <Text>{org.organization.name}</Text>
            </Link>
          ))
        )
      }
    </>
  )
}