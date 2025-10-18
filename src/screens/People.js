import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, List, ListItem, Button, Layout } from "@ui-kitten/components";
import { AppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Ionicons } from "@expo/vector-icons";
import theme from "../themes/styles";

export function ListItemComponent({ person, deletePerson }) {
  const navigation = useNavigation();

  const deleteAction = () => (
    <Button onPress={() => deletePerson(person.id)}>
      <Text>Delete</Text>
    </Button>
  );

  const renderItemIcon = (props) => (
    <Ionicons
      name="star"
      size={32}
      color="#2a4dff"
      onPress={() => navigation.navigate("Ideas", { person })}
    />
  );
  return (
    <Swipeable renderRightActions={deleteAction}>
      <ListItem
        title={person.name}
        description={person.dob}
        accessoryRight={renderItemIcon}
        style={theme.components.listItem}
      />
    </Swipeable>
  );
}

export default function People() {
  const { people, deletePerson } = useContext(AppContext);
  const [sortedPeople, setSortedPeople] = React.useState([]);

  useEffect(() => {
    const sorted = [...people].sort((a, b) => {
      const dateA = new Date(a.dob);
      const dateB = new Date(b.dob);

      const monthA = dateA.getMonth();
      const monthB = dateB.getMonth();
      if (monthA !== monthB) return monthA - monthB;

      const dayA = dateA.getDate();
      const dayB = dateB.getDate();
      return dayA - dayB;
    });

    setSortedPeople(sorted);
  }, [people]);

  return (
    <SafeAreaView style={theme.components.safeAreaView}>
      {sortedPeople.length === 0 ? (
        <Layout style={theme.components.emptyListContainer}>
          <Ionicons name="people" size={72} color="black" />
          <Text>No Users Found</Text>
        </Layout>
      ) : (
        <>
          <Text category="h5" style={{ margin: 10 }}>
            People List
          </Text>
          <List
            data={sortedPeople}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListItemComponent person={item} deletePerson={deletePerson} />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}
