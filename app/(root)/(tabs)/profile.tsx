import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { useState } from "react";
import VerificationModal from "@/components/VerificationModal";
import { fetchAPI } from "@/lib/fetch";
import { updateUser } from "@/lib/auth";

const Profile = () => {
  const { user } = useUser();
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: user?.firstName + " " + user?.lastName,
    currentPassword: "",
    newPassword: "",
  });

  const updateUserInformation = async () => {
    setLoading(true);
    try {
      await updateUser({
        user,
        name: form.name,
        newPassword: form.newPassword,
        currentPassword: form.currentPassword,
      });
      setModalVisible(false);
      setForm({
        name: user?.firstName + " " + user?.lastName,
        currentPassword: "",
        newPassword: ""
      });
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
          <TouchableOpacity
            className="bg-white p-2 absolute bottom-0 right-32 rounded-full"
            onPress={() => setModalVisible(true)}
          >
            <Image source={icons.edit} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First Name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last Name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
      {/* Update User Information Modal */}
      <VerificationModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        loading={loading}
        form={form}
        setForm={setForm}
        error={error}
        user={user}
        updateUserInformation={updateUserInformation}
      />
    </SafeAreaView>
  );
};

export default Profile;
