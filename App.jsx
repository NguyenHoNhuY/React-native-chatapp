import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { auth } from './config/firebase'
import AuthenticatedUserProvider, {
	AuthenticatedUserContext,
} from './features/context/AuthContext'
import Chat from './screens/Chat'
import Home from './screens/Home'
import Login from './screens/Login'
import SignUp from './screens/SignUp'

const Stack = createStackNavigator()
const MainStack = () => {
	return (
		<Stack.Navigator
			initialRouteName='home'
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name='home'
				component={Home}
				options={{ headerShown: true }}
			/>
			<Stack.Screen
				name='chat'
				component={Chat}
			/>
		</Stack.Navigator>
	)
}

const AuthStack = () => {
	return (
		<Stack.Navigator
			initialRouteName='login'
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name='login'
				component={Login}
			/>
			<Stack.Screen
				name='signUp'
				component={SignUp}
			/>
		</Stack.Navigator>
	)
}

const RootNavigator = () => {
	const { user, setUser } = useContext(AuthenticatedUserContext)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
			authenticatedUser ? setUser(authenticatedUser) : setUser(null)
			setLoading(false)
		})
		return () => unsubscribe()
	}, [user])

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' />
			</View>
		)
	}

	return (
		<NavigationContainer>{user ? <MainStack /> : <AuthStack />}</NavigationContainer>
	)
}

export default function App() {
	return (
		<AuthenticatedUserProvider>
			<RootNavigator />
		</AuthenticatedUserProvider>
	)
}
