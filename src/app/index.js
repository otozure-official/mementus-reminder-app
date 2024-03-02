import { useState, useCallback } from "react";
import { useImmer } from "use-immer";
import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import ListHeader from "../components/ListHeader";
import TaskList from "../components/TaskList";
import NewTaskCard from "../components/NewTaskCard";
import taskData from "../taskData";

SplashScreen.preventAutoHideAsync();

function Page() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [tasks, updateTasks] = useImmer(taskData);
  const [isSorted, setIsSorted] = useState(false); // sortの状態を管理するステートを追加
  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  // sortボタンを押したときの処理を定義
  const handleSort = () => {
    setIsSorted((prev) => !prev); // sortの状態を反転させる
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <ListHeader />
        <View className="flex-1">
          <View style={styles.sortButtonContainer}>
            <Pressable style={styles.sortButton} onPress={handleSort}>
              <Text style={styles.sortButtonText}>
                {isSorted ? "All" : "Sort"} // sortの状態に応じてボタンのテキストを変更
              </Text>
            </Pressable>
          </View>
          <TaskList
            tasks={tasks}
            updateTasks={updateTasks}
            isAppReady={isAppReady}
            setIsAppReady={setIsAppReady}
            isSorted={isSorted} // sortの状態をTaskListに渡す
          />
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={84}>
            <NewTaskCard tasks={tasks} updateTasks={updateTasks} />
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Page;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
  sortButtonContainer: {
    // sortボタンのコンテナのスタイルを追加
    alignItems: "flex-end",
    margin: 10,
  },
  sortButton: {
    // sortボタンのスタイルを追加
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  sortButtonText: {
    // sortボタンのテキストのスタイルを追加
    color: "#000",
    fontWeight: "bold",
  },
});
