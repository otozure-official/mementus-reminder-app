import { View, Text, TextInput, Modal, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import {Picker} from "@react-native-picker/picker";

const NewTaskInput = ({ tasks, updateTasks }) => {
  const [text, onChangeText] = useState("");
  const [priority, setPriority] = useState("0");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdd = () => {
    if (text !== "") {
      updateTasks((draft) => {
        draft[draft.length - 1].data.push({
          content: text,
          time: null,
          completed: false,
          priority: priority, // priorityを追加
        });
      });
    }
    onChangeText("");
    setModalVisible(false); // モーダルを閉じる
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="新しいタスクを追加"
        placeholderTextColor="white"
        onChangeText={onChangeText}
        value={text}
      />
      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(true)} // モーダルを開く
      >
        <Text style={styles.buttonText}>追加</Text>
      </Pressable>

      {/* モーダルウィンドウ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Priority</Text>
            <Picker
              selectedValue={priority}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
            >
              <Picker.Item label="0" value="0" />
              <Picker.Item label="1" value="1" />
            </Picker>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleAdd}
            >
              <Text style={styles.textStyle}>決定</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    color: 'white',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NewTaskInput;
