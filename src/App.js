import * as React from "react";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ApplicationProvider, Button } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import People from "./screens/People";
import AddPerson from "./screens/AddPerson";
import Ideas from "./screens/Ideas";
import AddIdea from "./screens/AddIdea";
import { AppProvider } from "./context/AppContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    async function hideSplash() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // simulate loading resources
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    hideSplash();
  }, []);

  return (
    <AppProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="People">
              <Stack.Screen
                name="People"
                component={People}
                options={({ navigation }) => ({
                  headerShown: true,
                  title: "People",
                  headerBackVisible: false,
                  headerRight: () => (
                    <Button
                      appearance="ghost"
                      onPress={() => navigation.navigate("AddPerson")}
                    >
                      Add Person
                    </Button>
                  ),
                })}
              />
              <Stack.Screen
                name="AddPerson"
                component={AddPerson}
                options={{
                  headerShown: true,
                  title: "Add Person",
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="Ideas"
                component={Ideas}
                options={({ navigation, route }) => ({
                  headerShown: true,
                  title: "Ideas",
                  headerLeft: () => (
                    <Button
                      appearance="ghost"
                      onPress={() => navigation.navigate("People")}
                    >
                      Back
                    </Button>
                  ),
                  headerRight: () => (
                    <Button
                      appearance="ghost"
                      onPress={() =>
                        navigation.navigate("AddIdea", {
                          id: route.params.person.id,
                          name: route.params.person.name,
                        })
                      }
                    >
                      Add Idea
                    </Button>
                  ),
                })}
              />
              <Stack.Screen
                name="AddIdea"
                component={AddIdea}
                options={{
                  headerShown: true,
                  title: "Add Idea",
                  headerBackVisible: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </ApplicationProvider>
    </AppProvider>
  );
}
