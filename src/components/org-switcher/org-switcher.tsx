import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useUserAndOrgInfo } from "../boards/boards-overview/selected-board-group-context";

export const OrgSwitcher = () => {
  const userAndOrgInfo = useUserAndOrgInfo();

  if (userAndOrgInfo.userAndOrgType !== 'user-with-orgs') {
    return null;
  }

  if (userAndOrgInfo.activeOrgId === null) {
    return null;
  }

  const orgs = userAndOrgInfo.getUserOrgs();
  
  if (orgs.length <= 1) {
    return null;
  }

  const handleOrgChange = async (orgId: string) => {
    try {
      await userAndOrgInfo.setActiveOrgId(orgId);
    } catch (error) {
      console.error('Error switching organization:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={userAndOrgInfo.activeOrgId}
          onValueChange={handleOrgChange}
          style={styles.picker}
          enabled={orgs.length > 1}
          // mode="dialog"
          mode="dropdown"
        >
          {orgs.map((org) => (
            <Picker.Item
              key={org.organization.id}
              label={org.organization.name}
              value={org.organization.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    minWidth: 200,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
    minHeight: 50,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
});
