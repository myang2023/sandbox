
import { Burger, Flower, Rocket, Noodle, Music, Bike, Phone, Cup, Taxi } from "./svg/Avatars";


export function AvatarList({ id, customStyle }) {


    switch (id) {
        case 0:
            return <Burger customStyle={customStyle} />;
        case 1:
            return <Flower customStyle={customStyle} />;
        case 2:
            return <Rocket customStyle={customStyle} />;
        case 3:
            return <Noodle customStyle={customStyle} />;
        case 4:
            return <Music customStyle={customStyle} />;
        case 5:
            return <Bike customStyle={customStyle} />;
        case 6:
            return <Phone customStyle={customStyle} />;
        case 7:
            return <Cup customStyle={customStyle} />;
        case 8:
            return <Taxi customStyle={customStyle} />;
        default:
            return <p>invalid avatar id</p>;
    }


}
