import React from "react";
import { Input, Layout, Text, Button } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";
import { AppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import theme from "../themes/styles";
import { randomUUID } from "expo-crypto";
import { KeyboardAvoidingView } from "react-native";

export default function AddPerson() {
  const [name, setName] = React.useState("");
  const [dob, setDob] = React.useState("");

  const { addPerson } = React.useContext(AppContext);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={theme.components.safeAreaView}>
      <Layout style={theme.components.simpleContainer}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <Input
            label={"Name"}
            placeholder=""
            value={name}
            onChangeText={(nextValue) => setName(nextValue)}
          />
        </KeyboardAvoidingView>
        <Input
          label={"Date of Birth"}
          placeholder="YYYY-MM-DD"
          value={dob}
          onChangeText={(nextValue) => setDob(nextValue)}
        />
        <DatePicker
          current="2025-10-10"
          isGregorian={true}
          mode="calendar"
          onDateChange={() => {}}
          onSelectedChange={(date) => {
            const safeDate = date.replaceAll("/", "-");
            setDob(safeDate);
          }}
        />
      </Layout>
      <Layout style={theme.components.buttonContainer}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={!name || !dob}
          onPress={() => {
            addPerson({ id: randomUUID().toString(), name, dob });
            navigation.navigate("People");
          }}
        >
          Save
        </Button>
      </Layout>
    </SafeAreaView>
  );
}
