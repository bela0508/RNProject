import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [ideas, setIdeas] = useState([]);

  const PEOPLE_KEY = "ppl";
  const IDEAS_KEY = "idea";

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedPeople = await AsyncStorage.getItem(PEOPLE_KEY);
        const storedIdeas = await AsyncStorage.getItem(IDEAS_KEY);

        if (storedPeople) setPeople(JSON.parse(storedPeople));
        if (storedIdeas) setIdeas(JSON.parse(storedIdeas));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    AsyncStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
  }, [ideas]);

  const formatPersonData = (person) => {
    const formattedPersonName =
      person.name.charAt(0).toUpperCase() + person.name.slice(1).toLowerCase();
    const formattedPersonDoB = String(
      new Date(person.dob).toISOString().split("T")[0]
    );
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

  const addIdea = (idea) => {
    setIdeas((prev) => [...prev, idea]);
  };

  const updateIdea = (id, updatedData) => {
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updatedData } : i))
    );
  };

  const deleteIdea = (id) => {
    setIdeas((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        people,
        ideas,
        addPerson,
        updatePerson,
        deletePerson,
        addIdea,
        updateIdea,
        deleteIdea,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
