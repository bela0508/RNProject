import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Layout, Text, Button } from "@ui-kitten/components";
import { AppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";

export default function AddIdea({ route }) {
  const [idea, setIdea] = React.useState("");
  const { addIdea } = React.useContext(AppContext);
  const navigation = useNavigation();
  const { id, name } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Add Idea for Person ID: {name}</Text>
      <Layout>
        <Text>Idea</Text>
        <Input
          placeholder="Idea"
          value={idea}
          onChangeText={(nextValue) => setIdea(nextValue)}
        ></Input>
      </Layout>
      <Layout>
        <Button
          onPress={() => {
            addIdea(id, idea);
            navigation.navigate("Ideas", { person: { id, name } });
          }}
        >
          Save
        </Button>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
        >
          Cancel
        </Button>
      </Layout>
    </SafeAreaView>
  );
}
