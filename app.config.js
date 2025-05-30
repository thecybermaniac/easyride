export default {
    expo: {
        name: "Easyride",
        slug: "easyride",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        splash: {
            image: "./assets/images/splash.png",
            resizeMode: "cover", // Changed to fill full screen
            backgroundColor: "#FF8C00",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#FF8C00",
                // Note: `resizeMode` is not a valid property here.
            },
            package: "com.the_harrison_ehiogu.easyride",
            config: {
                googleMaps: {
                    apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                },
            },
        },
        plugins: [
            "expo-router"
        ],
        extra: {
            eas: {
                projectId: "6cee65d6-1be1-4693-ada6-466a2408ed1a",
            },
        },
        owner: "the_harrison_ehiogu",
    },
};
