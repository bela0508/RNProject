import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, List, ListItem, Layout, Button } from "@ui-kitten/components";
import { AppContext } from "../context/AppContext";
import { Image, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../themes/styles";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export default function Ideas({ route }) {
  const { person: routePerson } = route.params;
  const { people, deleteIdea } = useContext(AppContext);

  const person = people.find((p) => p.id === routePerson.id) || routePerson;

  const [selectedImage, setSelectedImage] = useState(null);

  const deleteAction = () => (
    <Button onPress={() => deleteIdea(person.id)}>
      <Text>Delete</Text>
    </Button>
  );
  return (
    <SafeAreaView style={theme.components.safeAreaView}>
      {!person.ideas || person.ideas.length === 0 ? (
        <Layout style={theme.components.emptyListContainer}>
          <Ionicons name="star" size={72} color="black" />

          <Text category="h5">No Ideas Available</Text>
        </Layout>
      ) : (
        <Layout>
          <Text category="h5">Ideas for {person.name}</Text>
          <List
            data={person.ideas || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const deleteAction = () => (
                <Button onPress={() => deleteIdea(person.id, item.id)}>
                  <Text>Delete</Text>
                </Button>
              );

              return (
                <Swipeable renderRightActions={deleteAction}>
                  <ListItem style={theme.components.listItem}>
                    <Text>{item.text}</Text>
                    {item.image && (
                      <Pressable onPress={() => setSelectedImage(item.image)}>
                        <Image
                          source={{ uri: item.image }}
                          style={{ width: 80, height: 80, borderRadius: 8 }}
                        />
                      </Pressable>
                    )}
                  </ListItem>
                </Swipeable>
              );
            }}
          />
        </Layout>
      )}

      <Modal
        visible={!!selectedImage}
        transparent
        onRequestClose={() => setSelectedImage(null)}
      >
        <Pressable
          onPress={() => setSelectedImage(null)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "90%", height: "70%" }}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
