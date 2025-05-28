import { useUserAndOrgInfo } from "@/src/components/boards/boards-overview/selected-board-group-context";
import { ThemedText } from "@/src/components/ThemedText";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Pressable, View } from "react-native";


const OrgScreenHeader = () => {
  return null;
}


const OrgScreen = () => {
  const navigation = useNavigation();
  const userAndOrgInfo = useUserAndOrgInfo();
  
  useEffect(() => {
    navigation.setOptions({
      title: 'My Org board list',
      headerRight: OrgScreenHeader,
    });
  }, [navigation]);

  if (userAndOrgInfo.userAndOrgType !== 'user-with-orgs') {
    return <ThemedText>No orgs</ThemedText>;
  }

  const userOrgs = userAndOrgInfo.userAndOrgType === 'user-with-orgs' ? userAndOrgInfo.getUserOrgs() : [];


  const selectOrganization = async (orgId: string) => {
    try {
      await userAndOrgInfo.setActiveOrgId(orgId);
      router.push('/org/boards');
    } catch (error) {
      console.error('Error switching organization:', error);
    }
  }

  return (
    <View>
      <ThemedText>Boards - Org [{userAndOrgInfo.userAndOrgType}]</ThemedText>
      {
        userOrgs.map((org) => (
          <Pressable 
            key={org.id} 
            onPress={() => selectOrganization(org.organization.id)}
          >
            <ThemedText>{org.organization.name}</ThemedText>
          </Pressable>
        ))
      }
    </View>
  );
}

export default OrgScreen;