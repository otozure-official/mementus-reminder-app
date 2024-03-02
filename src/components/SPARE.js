//index.js

function Page() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [tasks, updateTasks] = useImmer(taskData);
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <ListHeader />
        <View className="flex-1">
          <TaskList
            tasks={tasks}
            updateTasks={updateTasks}
            isAppReady={isAppReady}
            setIsAppReady={setIsAppReady}
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
});


//TaskList.js
/*return (
  <SectionList
    sections={tasks}
    keyExtractor={(item, index) => item + index}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        title={refreshingTitle}
        tintColor={"#fff"}
        titleColor={"#fff"}
      />
    }
    onLayout={onLayout}
    renderItem={({ item, index, section }) => {
      let sectionIndex = tasks.indexOf(section);
      if (
        !showExpiredTasks &&
        sectionIndex >= todayIndex &&
        !item.completed
      ) {
        return (
          <View className="my-1 h-8 flex-row items-center gap-2 pl-2 pr-4">
            <Pressable
              className="size-8"
              onPress={() => handlePress(index, tasks.indexOf(section))}
            >
              <View className="m-1.5 size-4 rounded-full border border-white"></View>
            </Pressable>
            <View>
              <Text className="text-sm font-semibold text-white">
                {item.content}
              </Text>
              {item.time && (
                <Text className="text-xs font-normal text-zinc-500">
                  {item.time}
                </Text>
              )}
            </View>
          </View>
        );
      } else if (showExpiredTasks && !item.completed) {
        return (
          <View className="my-1 h-8 flex-row items-center gap-2 pl-2 pr-4">
            <Pressable
              className="size-8"
              onPress={() => handlePress(index, tasks.indexOf(section))}
            >
              <View className="m-1.5 size-4 rounded-full border border-white"></View>
            </Pressable>
            <View>
              <Text className="text-sm font-semibold text-white">
                {item.content}
              </Text>
              {item.time && (
                <Text className="text-xs font-normal text-zinc-500">
                  {item.time}
                </Text>
              )}
            </View>
          </View>
        );
      }
    }}
    renderSectionHeader={({ section, section: { title } }) => {
      let date = new Date(title);
      let dateJapanese = date.toLocaleDateString("ja-JP", {
        month: "long",
        day: "numeric",
      });
      let sectionIndex = tasks.indexOf(section);
      if (title === null) {
        return <TaskListSection section={section}>期日なし</TaskListSection>;
      } else if (!showExpiredTasks && sectionIndex >= todayIndex) {
        return (
          <TaskListSection
            title={title}
            todayDate={todayDate}
            tomorrowDate={tomorrowDate}
            showExpiredTasks={showExpiredTasks}
            todayIndex={todayIndex}
            sectionIndex={sectionIndex}
          >
            {dateJapanese}
          </TaskListSection>
        );
      } else if (showExpiredTasks) {
        return (
          <TaskListSection
            title={title}
            todayDate={todayDate}
            tomorrowDate={tomorrowDate}
            showExpiredTasks={showExpiredTasks}
            todayIndex={todayIndex}
            sectionIndex={sectionIndex}
          >
            {dateJapanese}
          </TaskListSection>
        );
      }
    }}
  />
);
};/**/
