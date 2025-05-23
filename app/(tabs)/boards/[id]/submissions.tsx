import { approveBoardPostSubmission, fetchUserBoardPostSubmissions, rejectBoardPostSubmission, UserBoardPostSubmissionItem } from "@/src/api/supabase-db/board-post-submissions";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { useUserContext } from "@/src/hooks/user-context";
import { convertIdSearchParamToBoardIds } from "@/src/zod-types/branded-strings/board-id";
import { useAuth } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, FlatList, Modal, StyleSheet, TextInput, View } from "react-native";

export const BoardSubmissionsScreen = () => {
  const localSearchParams = useLocalSearchParams();
  const { boardUuid } = convertIdSearchParamToBoardIds(localSearchParams);
  const { supabase } = useUserContext();
  const { userId } = useAuth();
  const [submissions, setSubmissions] = useState<UserBoardPostSubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<UserBoardPostSubmissionItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const refreshSubmissions = useCallback(async () => {
    if (!supabase) {
      console.error('No supabase client found');
      return;
    }

    console.log('refreshing submissions');

    try {
      const data = await fetchUserBoardPostSubmissions(supabase, boardUuid);
      setSubmissions(data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  }, [supabase, boardUuid]);

  useEffect(() => {
    refreshSubmissions();
  }, [refreshSubmissions]);

  console.log('submissions', submissions);

  const handleApprove = async (submission: UserBoardPostSubmissionItem) => {
    if (!supabase || !userId) return;

    try {
      await approveBoardPostSubmission(supabase, submission.id, userId);
      // await refreshSubmissions();
    } catch (err) {
      console.error('Error approving submission:', err);
      Alert.alert('Error', 'Failed to approve submission');
    }
  };

  const handleReject = async () => {
    if (!supabase || !userId || !selectedSubmission) return;

    try {
      await rejectBoardPostSubmission(supabase, selectedSubmission.id, userId, rejectionReason);
      setRejectModalVisible(false);
      setRejectionReason('');
      setSelectedSubmission(null);
      // await refreshSubmissions();
    } catch (err) {
      console.error('Error rejecting submission:', err);
      Alert.alert('Error', 'Failed to reject submission');
    }
  };

  const openRejectModal = (submission: UserBoardPostSubmissionItem) => {
    setSelectedSubmission(submission);
    setRejectModalVisible(true);
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading submissions...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.error}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Board Submissions</ThemedText>
      <FlatList
        data={submissions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.submissionItem}>
            <ThemedText>Submission ID: {item.id}</ThemedText>
            <ThemedText>Submitted At: {new Date(item.submitted_at).toLocaleString()}</ThemedText>
            {item.approved_at && (
              <ThemedText>Approved At: {new Date(item.approved_at).toLocaleString()}</ThemedText>
            )}
            {item.rejected_at && (
              <ThemedText>Rejected At: {new Date(item.rejected_at).toLocaleString()}</ThemedText>
            )}
            {item.rejected_reason && (
              <ThemedText>Rejection Reason: {item.rejected_reason}</ThemedText>
            )}
            {!item.approved_at && !item.rejected_at && (
              <View style={styles.actionButtons}>
                <Button title="Approve" onPress={() => handleApprove(item)} />
                <Button title="Reject" onPress={() => openRejectModal(item)} color="red" />
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>No submissions found</ThemedText>
        }
      />

      <Modal
        visible={rejectModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRejectModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText type="title">Reject Submission</ThemedText>
            <ThemedText>Please provide a reason for rejection:</ThemedText>
            <TextInput
              style={styles.reasonInput}
              value={rejectionReason}
              onChangeText={setRejectionReason}
              placeholder="Enter rejection reason"
              multiline
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setRejectModalVisible(false)} />
              <Button title="Reject" onPress={handleReject} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  submissionItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  error: {
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    minHeight: 100,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default BoardSubmissionsScreen;