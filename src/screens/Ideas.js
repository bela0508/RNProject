import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, List, Layout, ListItem } from "@ui-kitten/components";

function ListItemComponent({ person, deleteUser, theme }) {
  const navigation = useNavigation();

  const deleteAction = () => (
    <Button
      onPress={() => deleteUser(person.id)}
      style={[theme.components.swipeableButton, theme.components.deleteButton]}
    >
      <Text style={theme.colors.surface}>Delete</Text>
    </Button>
  );

  return (
    <ListItem>
      <Swipeable rightActions={deleteAction}>
        <Layout>
          <Text>{person.name}</Text>
          <Text>{person.dob}</Text>
        </Layout>
        <Button onPress={() => navigation.navigate("Ideas", { person })}>
          {/* SVG to Navigate to person details screen */}
        </Button>
      </Swipeable>
    </ListItem>
  );
}

export default function Ideas({ route }) {
  const { person } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text category="h5">Ideas for {person.name}</Text>
      <List
        data={person.ideas || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem>
            <Text>{item}</Text>
          </ListItem>
        )}
      />
    </SafeAreaView>
  );
}
