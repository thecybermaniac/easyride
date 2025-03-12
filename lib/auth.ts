import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import * as Linking from "expo-linking";
import { fetchAPI } from "./fetch";
import { useUser } from "@clerk/clerk-expo";
import { updatePersonalInformation } from "./actions";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("secure store get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

// SecureStore is not supported on the web
export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, signUp, setActive } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/(tabs)/home", {
        scheme: "myapp",
      }),
    });

    if (createdSessionId) {
      if (setActive) {
        await setActive!({ session: createdSessionId });

        if (signUp.createdUserId) {
          await fetchAPI("/(api)/user", {
            method: "POST",
            body: JSON.stringify({
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
            }),
          });
        }

        return {
          success: true,
          code: "success",
          message: "You have been successfully authenticated",
        };
      }
    }

    return {
      success: false,
      code: "failed",
      message: "An error occurred",
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      code: error.code,
      message: error?.errors[0]?.longMessage,
    };
  }
};

export const updateUser = async ({
  user,
  name,
  newPassword,
  currentPassword,
}: {
  user: any;
  name: string;
  newPassword: string;
  currentPassword: string;
}) => {
  try {
    if (!user) {
      throw new Error("User not found");
    }

    // Update name if provided
    if (name !== "") {
      await user.update({
        firstName: name.split(" ")[0] || "",
        lastName: name.split(" ")[1] || "",
      });
    } else if (currentPassword !== "" && newPassword !== "") {
      await user?.updatePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
    } else {
      return { success: false, message: "A required field is missing" }
    }

    return { success: true, message: "User updated successfully" };
  } catch (error: any) {
    console.error("Error updating user:", error);
    return { success: false, message: error.message };
  }
};
