import { useUser } from "@clerk/clerk-expo";

interface updateUserPersonalInformation {
  user: any;
  name: string;
  username?: string;
  phone?: string;
}

export const updatePersonalInformation = async ({
  user,
  name,
  username,
  phone,
}: updateUserPersonalInformation) => {
  try {
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const result = await user?.update({
      firstName,
      lastName,
      username,
      phoneNumber: phone,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
