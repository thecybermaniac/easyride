import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ReactNativeModal from "react-native-modal";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { useUser } from "@clerk/clerk-expo";

type VerificationModalProps = {
  isModalVisible: boolean;
  setModalVisible: any;
  loading: boolean;
  form: any;
  setForm: any;
  error: string | null;
  user: any;
  updateUserInformation: () => void;
};

const VerificationModal = ({
  isModalVisible,
  setModalVisible,
  loading,
  form,
  setForm,
  error,
  user,
  updateUserInformation,
}: VerificationModalProps) => {
  const [activeTab, setActiveTab] = useState<"personal" | "security">(
    "personal"
  );

  return (
    <ReactNativeModal isVisible={isModalVisible}>
      <View className="bg-white px-7 py-9 rounded-2xl min-h-[400px] relative">
        {/* Close Icon */}
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="absolute top-4 right-0 w-10 h-10"
        >
          <Image source={icons.close} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>

        {/* Tabs */}
        <View className="flex-row justify-between mb-5">
          <TouchableOpacity
            className={`flex-1 pb-2 ${
              activeTab === "personal" ? "border-b-2 border-primary" : ""
            }`}
            onPress={() => setActiveTab("personal")}
          >
            <Text
              className={`text-center font-JakartaExtraBold ${
                activeTab === "personal" ? "text-primary" : "text-gray-500"
              }`}
            >
              Personal Information
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 pb-2 ${
              activeTab === "security" ? "border-b-2 border-primary" : ""
            }`}
            onPress={() => setActiveTab("security")}
          >
            <Text
              className={`text-center font-JakartaExtraBold ${
                activeTab === "security" ? "text-primary" : "text-gray-500"
              }`}
            >
              Security
            </Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information Fields */}
        {activeTab === "personal" && (
          <>
            <InputField
              label="Full Name"
              icon={icons.person}
              placeholder="John"
              value={form.name}
              onChangeText={(name) => setForm({ ...form, name })}
            />
            <InputField
              label="Email"
              placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </>
        )}

        {/* Security Fields */}
        {activeTab === "security" && (
          <>
            <InputField
              label="Current Password"
              icon={icons.lock}
              placeholder="••••••••"
              secureTextEntry
              value={form.currentPassword}
              onChangeText={(currentPassword) =>
                setForm({ ...form, currentPassword })
              }
            />
            <InputField
              label="New Password"
              icon={icons.lock}
              placeholder="••••••••"
              secureTextEntry
              value={form.newPassword}
              onChangeText={(newPassword) => setForm({ ...form, newPassword })}
            />
          </>
        )}

        {/* Error Message */}
        {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

        {/* Button */}
        <CustomButton
          title={activeTab === "security" ? "Update Password" : "Save Changes"}
          onPress={updateUserInformation}
          className="mt-5 bg-primary-500"
          disabled={loading}
        />
      </View>
    </ReactNativeModal>
  );
};

export default VerificationModal;
