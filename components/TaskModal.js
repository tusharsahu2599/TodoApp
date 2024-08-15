import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function TaskModal({ visible, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Error', 'Please enter a title and description.');
      return;
    } else {
        onSave(title, description);
        setTitle('');
        setDescription('');
    }
  };
  const handleCancel = () => { 
    setTitle('');
    setDescription('');
    onClose();
  }

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalView}>
                <TextInput
                    placeholder="Title"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    placeholder="Description"
                    style={styles.descriptionInput}
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={styles.buttons}>
                    <View style={styles.buttonContainer}>
                        <Button title="Save" onPress={handleSave} />
                    </View>
                    <View style={[styles.buttonContainer, styles.cancelButton]}>
                        <Button title="Cancel" onPress={handleCancel} color="#FF6347" />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    input: {
        width: '80%',
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 5,
    },
    descriptionInput: {
        width: '80%',
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 5,
    },
    buttons: {
        flexDirection: 'row',
      justifyContent: 'space-between',
        width: '80%',
        
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    cancelButton: {
        marginLeft: 10,
    },
});
