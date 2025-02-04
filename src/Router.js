import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { BottomNavigation, Text, TouchableRipple } from "react-native-paper";

import Calender from "./screens/Calender";
import Home from "./screens/Home";
import Learning from "./screens/Learning";
import Notifications from "./screens/Notifications/Notifications";
import Profile from "./screens/Profile";
import Search from "./screens/Search";
import { CombinedDefaultTheme } from "./styles/theme";
import { Dimensions, RouteNames } from "./utils/constant";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
console.log("im here");

const Tabs = () => (
  <Tab.Navigator
    sceneContainerStyle={{
      backgroundColor: CombinedDefaultTheme.colors.surface,
    }}
    screenOptions={{
      headerShown: false,
      unmountOnBlur: true,
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];

          if (options.tabBarIcon) {
            const size = 24;

            return (
              <>
                <Image
                  style={{
                    height: size,
                    tintColor: color,
                    width: size,
                  }}
                  contentFit="contain"
                  source={options.tabBarIcon}
                />
              </>
            );
          }

          return null;
        }}
        renderLabel={({ route, focused, color }) => {
          const { options } = descriptors[route.key];

          return (
            <>
              <Text
                style={[
                  {
                    color:
                      CombinedDefaultTheme.colors[
                        focused ? "secondary" : "onSurfaceDisabled"
                      ],
                    textAlign: "center",
                  },
                ]}
                variant="labelMedium"
              >
                {options.tabBarLabel}
              </Text>
              <View
                style={[
                  styles.activeIndicator,
                  {
                    backgroundColor: focused
                      ? color
                      : CombinedDefaultTheme.colors.background,
                  },
                ]}
              />
            </>
          );
        }}
        renderTouchable={({ children, key, ...props }) => (
          <TouchableRipple key={key} {...props} rippleColor="transparent">
            {children}
          </TouchableRipple>
        )}
        style={{
          backgroundColor: CombinedDefaultTheme.colors.background,
        }}
        theme={{
          isV3: false,
          version: 2,
        }}
        activeColor={CombinedDefaultTheme.colors.secondary}
        inactiveColor={CombinedDefaultTheme.colors.onSurfaceDisabled}
        navigationState={state}
        safeAreaInsets={insets}
        shifting={false}
        onTabPress={({ route: { key, name, params }, preventDefault }) => {
          const event = navigation.emit({
            canPreventDefault: true,
            target: key,
            type: "tabPress",
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(name, params),
              target: state.key,
            });
          }
        }}
      />
    )}
    id="tabs"
    initialRouteName={RouteNames.Home}
  >
    <Tab.Screen
      options={{
        tabBarIcon: require("./assets/icons/home.png"),
        tabBarLabel: RouteNames.Home,
      }}
      component={Home}
      name={RouteNames.Home}
    />
    <Tab.Screen
      options={{
        tabBarIcon: require("./assets/icons/search.png"),
        tabBarLabel: RouteNames.Search,
      }}
      component={Search}
      name={RouteNames.Search}
    />
    <Tab.Screen
      options={{
        tabBarIcon: require("./assets/icons/courses.png"),
        tabBarLabel: RouteNames.Learning,
      }}
      component={Learning}
      name={RouteNames.Learning}
    />
    <Tab.Screen
      options={{
        tabBarIcon: require("./assets/icons/calender.png"),
        tabBarLabel: RouteNames.Calender,
      }}
      component={Calender}
      name={RouteNames.Calender}
    />
  </Tab.Navigator>
);

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: CombinedDefaultTheme.colors.surface,
          },
          headerShown: false,
        }}
        id="stack"
        initialRouteName={RouteNames.Notifications}
      >
        <Stack.Screen component={Tabs} name={RouteNames.Tabs} />
        <Stack.Screen
          component={Notifications}
          name={RouteNames.Notifications}
        />
        <Stack.Screen component={Profile} name={RouteNames.Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  activeIndicator: {
    alignSelf: "center",
    borderTopLeftRadius: CombinedDefaultTheme.roundness,
    borderTopRightRadius: CombinedDefaultTheme.roundness,
    height: Dimensions.margin / 4,
    // justifyContent: "center",
    // marginBottom: Dimensions.margin / 4,
    // marginTop: -Dimensions.margin / 2,
    width: Dimensions.screenWidth / 4 - Dimensions.margin * 2,
  },
});

export default Router;
