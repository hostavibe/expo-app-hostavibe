import { useOrganizationList } from "@clerk/clerk-expo"
import { StyleSheet, Text, View } from "react-native"


export const MyOrganizationsComponent = () => {
  const { userMemberships, isLoaded } = useOrganizationList({
    userMemberships: true,
  })

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading organizations...</Text>
      </View>
    )
  }

  const memberships = userMemberships?.data || []

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Organizations</Text>
      {memberships.length === 0 ? (
        <Text style={styles.emptyText}>You are not a member of any organizations</Text>
      ) : (
        memberships.map((membership) => (
          <View key={membership.organization.id} style={styles.orgItem}>
            <Text style={styles.orgName}>{membership.organization.name}</Text>
            <Text style={styles.orgRole}>Role: {membership.role}</Text>
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    orgItem: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    orgName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    orgRole: {
        fontSize: 14,
        color: '#666',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
    },
})