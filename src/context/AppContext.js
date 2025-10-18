import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  const PEOPLE_KEY = "ppl";
  const IDEAS_KEY = "idea";

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedPeople = await AsyncStorage.getItem(PEOPLE_KEY);

        if (storedPeople) setPeople(JSON.parse(storedPeople));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const savePeople = async () => {
      try {
        await AsyncStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
      } catch (error) {
        console.error("Error saving people:", error);
      }
    };
    savePeople();
  }, [people]);

  const formatPersonData = (person) => {
    const name = person.name ? person.name.trim() : "Unknown";
    const formattedPersonName =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const formattedPersonDoB = person.dob
      ? String(new Date(person.dob).toISOString().split("T")[0])
      : "";

    return { ...person, name: formattedPersonName, dob: formattedPersonDoB };
  };

  const addPerson = (person) => {
    setPeople((prev) => [...prev, formatPersonData(person)]);
  };

  const updatePerson = (id, updatedData) => {
    setPeople((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deletePerson = (id) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
  };

  const addIdea = (id, personId, idea, imgUri) => {
    setPeople((prev) =>
      prev.map((p) =>
        p.id === personId
          ? {
              ...p,
              ideas: [
                ...(p.ideas || []),
                {
                  id: randomUUID().toString(),
                  personId: personId,
                  text: idea,
                  image: imgUri,
                },
              ],
            }
          : p
      )
    );
  };

  const deleteIdea = (personId, ideaId) => {
    setPeople((prev) =>
      prev.map((p) =>
        p.id === personId
          ? { ...p, ideas: (p.ideas || []).filter((i) => i.id !== ideaId) }
          : p
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        people,
        addPerson,
        updatePerson,
        deletePerson,
        addIdea,
        deleteIdea,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
