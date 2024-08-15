import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Task({ text, description, onEdit, onDelete }) {
    const [isChecked, setIsChecked] = useState(false);
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

    const toggleDescriptionVisibility = () => {
        setIsDescriptionVisible(!isDescriptionVisible);
    };

    return (
        <TouchableOpacity onPress={toggleDescriptionVisibility} style={styles.item}>
            <View style={styles.itemRow}>
                <View style={styles.itemLeft}>
                    <TouchableOpacity style={styles.square} onPress={() => setIsChecked(!isChecked)}>
                        {isChecked && <View style={styles.checkmark}></View>}
                    </TouchableOpacity>
                    <Text style={[styles.itemText, isChecked && styles.checkedText]}>{text}</Text>
                </View>
                
            </View>
            {isDescriptionVisible && (
                <View style={styles.descriptionContainer}>
                    <View style = {{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.descriptionText}>{description}</Text>
                            </View>
                    <View style={styles.buttons}>
                    {/* <TouchableOpacity onPress={onEdit} style={styles.editButton}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                        </View>
                        </View>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'column',
        marginBottom: 20,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
    checkedText: {
        textDecorationLine: 'line-through',
        color: '#bbb',
    },
    buttons: {
        flexDirection: 'row',
    },
    editButton: {
        marginRight: 10,
        backgroundColor: '#FFD700',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    descriptionContainer: {
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
    },
    descriptionText: {
        color: '#333',
    },
    checkmark: {
        width: 24,
        height: 24,
        backgroundColor: '#ea5804',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
});
