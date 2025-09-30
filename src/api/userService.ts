import { UserRegistrationData } from "../components/UserContext"

const API = process.env.EXPO_PUBLIC_APP_URL + "/ChatAppAPI/"

export const createNewAccount = async (UserRegistrationData: UserRegistrationData) => {
    let formData = new FormData();
    formData.append("firstName", UserRegistrationData.firstName);
    formData.append("lastName", UserRegistrationData.lastName);
    formData.append("countryCode", UserRegistrationData.countryCode);
    formData.append("contactNo", UserRegistrationData.contactNo);
    formData.append("profileImage", {
        uri: UserRegistrationData.profileImage,
        name: "profile.img",
        type: "image/png"
    } as any);

    const response = await fetch(API + "User", {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const json = await response.json();
        console.log(json);
        if (json.status) {
            return json.message
        } else {
            return json.message
        }
    } else {
        return "OOPS! Account creation Faild ....!";
    }
}