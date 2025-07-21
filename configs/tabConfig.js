import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import BookmarkWriteScreen from "../screens/BookmarkWriteScreen";
import BookmarkListScreen from "../screens/BookmarkListScreen";
import MyPageScreen from "../screens/MyPageScreen";

const tabConfig = [
  {
    name: "Home",
    title: "메인 홈",
    component: HomeScreen,
    focusedIcon: "home-variant",
    unfocusedIcon: "home-variant-outline",
    iconComponent: MaterialCommunityIcons,
  },
  {
    name: "BookmarkWrite",
    title: "북마크 추가",
    component: BookmarkWriteScreen,
    focusedIcon: "bookmark",
    unfocusedIcon: "bookmark-outline",
    iconComponent: MaterialCommunityIcons,
  },
  {
    name: "BookmarkList",
    title: "북마크 리스트",
    component: BookmarkListScreen,
    focusedIcon: "list-sharp",
    unfocusedIcon: "list-outline",
    iconComponent: Ionicons,
  },
  {
    name: "MyPage",
    title: "내 정보",
    component: MyPageScreen,
    focusedIcon: "person-circle-sharp",
    unfocusedIcon: "person-circle-outline",
    iconComponent: Ionicons,
  },
];

export default tabConfig;
