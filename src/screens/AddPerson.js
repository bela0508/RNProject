import React from "react";
import { Input, Layout, Text, Button } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";
import { AppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";

export default function AddPerson() {
  const [name, setName] = React.useState("");
  const [dob, setDob] = React.useState("");

  const { addPerson } = React.useContext(AppContext);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Add Person</Text>
      <Layout>
        <Text>Name</Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(nextValue) => setName(nextValue)}
        ></Input>
        <Text>Date of Birth</Text>
        <DatePicker
          current="2025-10-10"
          isGregorian={true}
          mode="calendar"
          onDateChange={() => {}}
          onSelectedChange={(date) => {
            const safeDate = date.replaceAll("/", "-"); // normalize separators
            setDob(safeDate);
          }}
        />
      </Layout>
      <Layout>
        <Button
          onPress={() => {
            addPerson({ id: Date.now().toString(), name, dob });
            navigation.navigate("People");
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
