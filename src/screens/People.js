import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, List, ListItem, Button, Layout } from "@ui-kitten/components";
import { AppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";

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

export default function People() {
  const { people, deleteUser, theme } = useContext(AppContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text category="h5" style={{ margin: 10 }}>
        People List
      </Text>
      <List
        data={people}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItemComponent
            person={item}
            deleteUser={deleteUser}
            theme={theme}
          />
        )}
      />
    </SafeAreaView>
  );
}
