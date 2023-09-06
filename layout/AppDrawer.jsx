import { createDrawerNavigator } from '@react-navigation/drawer';
import CategoryPage from './CategoryPage';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="CategoryPage" component={CategoryPage} />
    </Drawer.Navigator>
  );
}