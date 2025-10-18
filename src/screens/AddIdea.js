import React, { useRef, useState, useEffect } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Text, Button, Layout, Input } from "@ui-kitten/components";
import { AppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import theme from "../themes/styles";

export default function AddIdea({ route }) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const [idea, setIdea] = useState("");

  const { addIdea } = React.useContext(AppContext);
  const navigation = useNavigation();
  const { id, name } = route.params;

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  const handleSave = () => {
    addIdea(id, idea, photoUri);
    navigation.navigate("Ideas", { person: { id, name } });
  };

  if (!permission?.granted) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Camera permission required.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={theme.components.safeAreaView}>
      <Layout style={theme.components.simpleContainer}>
        <Input
          label={"idea"}
          placeholder="Describe your idea..."
          value={idea}
          onChangeText={setIdea}
          style={{ marginVertical: 8 }}
        />
        {!photoUri ? (
          <CameraView
            ref={cameraRef}
            style={{
              flex: 1,
              borderRadius: 10,
              overflow: "hidden",
              margin: 10,
              aspectRatio: 2 / 3,
            }}
          />
        ) : (
          <Image
            source={{ uri: photoUri }}
            style={{ flex: 1, margin: 10, borderRadius: 10 }}
          />
        )}
        {!photoUri ? (
          <Button onPress={takePhoto}>Take Photo</Button>
        ) : (
          <Button onPress={() => setPhotoUri(null)}>Retake</Button>
        )}
      </Layout>

      <Layout style={theme.components.buttonContainer}>
        <Button
          appearance="outline"
          onPress={() => {
            navigation.goBack();
          }}
        >
          Cancel
        </Button>

        <Button disabled={!idea} onPress={handleSave}>
          Save
        </Button>
      </Layout>
    </SafeAreaView>
  );
}
