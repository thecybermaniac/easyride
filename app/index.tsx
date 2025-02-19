import { useFetch } from "@/lib/fetch";
import { useDriverStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const Home = () => {
  const { isSignedIn } = useAuth();
  const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
  const { setDrivers } = useDriverStore();

  useEffect(() => {
    if (drivers) {
      setDrivers(drivers as MarkerData[]);
    }
  }, [drivers]);

  // Show loading state while fetching
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Redirect based on authentication state
  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
