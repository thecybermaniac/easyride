import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Autocomplete from "react-native-autocomplete-input";

interface PlaceSuggestion {
  place_id: string;
  lat: number;
  lon: number;
  display_name: string;
}

const PlaceAutocompleteInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  // Debounce logic: Waits 300ms after user stops typing before making a request
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const fetchPlaces = async (query: string) => {
      if (query.length > 2) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              query
            )}&limit=5&addressdetails=1`,
            {
              headers: {
                "User-Agent": "YourAppName/1.0 (contact@yourdomain.com)",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data: PlaceSuggestion[] = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching places:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    if (debouncedQuery) {
      fetchPlaces(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
      style={{ borderRadius: 10, shadowColor: "#d4d4d4", elevation: 3 }}
    >
      <View className="absolute top-4 z-10 left-3">
        <Image
          source={icon ? icon : icons.search}
          className="w-6 h-6"
          resizeMode="contain"
        />
      </View>

      <Autocomplete
        data={suggestions}
        value={query}
        placeholder={initialLocation ?? "Where do you want to go?"}
        placeholderTextColor="gray"
        onChangeText={(text) => setQuery(text)}
        inputContainerStyle={{
          borderRadius: 20,
          marginHorizontal: 40,
          position: "relative",
          shadowColor: "#d4d4d4",
          borderWidth: 0,
        }}
        style={{
          backgroundColor: textInputBackgroundColor || "white",
          fontSize: 16,
          fontWeight: "600",
          marginTop: 5,
          width: "auto",
          borderRadius: 200,
          borderWidth: 0,
        }}
        listContainerStyle={{
          borderWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
          position: "absolute",
          top: 50, // Prevents overlaying on input
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
          zIndex: 99,
        }}
        flatListProps={{
          keyExtractor: (item) => item.place_id,
          style: {
            borderWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          renderItem: ({ item }) => (
            <TouchableOpacity
              className="p-1"
              onPress={() => {
                setQuery(item.display_name);
                setSuggestions([]);
                handlePress({
                  latitude: item?.lat!,
                  longitude: item?.lon!,
                  address: item?.display_name!,
                });
              }}
            >
              <Text style={{ padding: 5, borderBottomWidth: 0 }}>
                {item.display_name}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
};

export default PlaceAutocompleteInput;
