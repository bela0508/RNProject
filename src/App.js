import * as React from "react";
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <GestureHandlerRootView>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="People"
                component={People}
                options={({ navigation }) => ({
                  headerShown: true,
                  title: "People",
                  headerRight: () => (
                    <Button onPress={() => navigation.navigate("AddPerson")}>
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
                  headerRight: () => (
                    <Button
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
