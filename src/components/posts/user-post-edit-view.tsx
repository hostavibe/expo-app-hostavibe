import { UserPostDetailsForId } from "@/src/api/types/user-post-details-for-id";
import { SupabaseClient } from "@supabase/supabase-js";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "../ui/IconSymbol";
import { UserPostImage } from "./user-post-image";


export interface EditModeDetails {
  onSave: (supabase: SupabaseClient, updatedPost: UserPostDetailsForId) => void;
}

interface UserPostEditViewProps {
  post: UserPostDetailsForId;
  editModeDetails: EditModeDetails;
}

export const UserPostEditView = (props: UserPostEditViewProps) => {

  const [editingCaption, setEditingCaption] = useState(false);
  const [tempCaption, setTempCaption] = useState('');
  
  const caption = props.post.configuration_json;
  const createdAt = props.post.created_at;

  const handleCaptionChange = (text: string) => {
    setTempCaption(text);
    // setHasUnsavedChanges(true);
  };

  return (
    <>
      <UserPostImage {...props} />
      <View style={styles.captionContainer}>
        {editingCaption ? (
          <TextInput
            style={styles.input}
            value={tempCaption}
            onChangeText={handleCaptionChange}
            onBlur={() => setEditingCaption(false)}
            autoFocus
          />
        ) : (
          <ThemedText style={styles.caption}>{caption}</ThemedText>
        )}
        <Pressable onPress={() => setEditingCaption(true)} style={styles.editButton}>
          <IconSymbol name="pencil.circle" size={20} color="#666" />
        </Pressable>
        <Text style={styles.date}>
          Created: {new Date(createdAt).toLocaleDateString()}
        </Text>
      </View>
      
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  caption: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  editButton: {
    padding: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});