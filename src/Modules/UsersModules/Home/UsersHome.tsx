import ExploreSec from "../../Shared/ExploreSec/ExploreSec";
import FirstADS from "./FirstADS";
import StaticSwiper, { type CardData } from "./StaticSwiper";
import SwiperADS from "./SwiperADS";
import noImage from "../../../assets/Images/no image.jpg"
 import image1  from '../../../assets/Images/FirstStaticSwiper/65bbbe177f04fc9e6708f5ef38e8d9fe4df98844.png'
 import image2  from '../../../assets/Images/FirstStaticSwiper/b3b0285d24ca5531514bdb74d16f6cc672c596ab.png'
 import image3  from '../../../assets/Images/FirstStaticSwiper/b6b247eb0fbdb2d61b318592a8e4415aad9b8292.png'
 import image4  from '../../../assets/Images/FirstStaticSwiper/d34488af1e658f42775981f988c24d8466aa55cd.png'
 import image5  from '../../../assets/Images/secondStaticSwiper/21a09502cec2678562e78e53df473d7fb9ec27ac.png'
 import image6  from '../../../assets/Images/secondStaticSwiper/35ce45f22e9a0bb98d868c162430f2e632d2f1b4.png'
 import image7  from '../../../assets/Images/secondStaticSwiper/94cd2d2f7b06cad61b48a1af81bb06e5361246aa.png'
 import image8  from '../../../assets/Images/secondStaticSwiper/bd30d8322872e7054a54aac3fd00a38d5f5f0742.png'

export default function UsersHome() {
  const firstSaticSwiper:CardData[] = [
    {title:'hmada',imagePath:image1,subTitle:'zabola'},
    {title:'hmada',imagePath:image2,subTitle:'zabola'},
    {title:'hmada',imagePath:image3,subTitle:'zabola'},
    {title:'hmada',imagePath:image4,subTitle:'zabola'}
  ]
  const secondSaticSwiper:CardData[] = [
    {title:'hmada',imagePath:image5,subTitle:'zabola'},
    {title:'hmada',imagePath:image6,subTitle:'zabola'},
    {title:'hmada',imagePath:image7,subTitle:'zabola'},
    {title:'hmada',imagePath:image8,subTitle:'zabola'}
  ]
  return (
    <>
      {/* <UsersNavBar /> */}
      <ExploreSec />
      <FirstADS />
      <StaticSwiper title="main title" cards={firstSaticSwiper}/>
      <StaticSwiper title="main title22" cards={secondSaticSwiper}/>
      <SwiperADS />
    </>
  );
}
