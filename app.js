import { StackNavigator } from "react-navigation";

import HomeScreen from './HomeScreen';
import ChatScreen from './components/ChatScreen';
const App = StackNavigator({
    Home: {screen:firstReact},
    Chat: {screen:listview}
});

export default  App;
