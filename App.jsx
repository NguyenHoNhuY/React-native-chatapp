import { AntDesign } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { auth } from './config/firebase'
import { color } from './constants/colors'
import AuthenticatedUserProvider, {
	AuthenticatedUserContext,
} from './features/context/AuthContext'
import Chat from './screens/Chat'
import Home from './screens/Home'
import Login from './screens/Login'
import SignUp from './screens/SignUp'

const Stack = createStackNavigator()
const MainStack = () => {
	const handleLogout = async () => {
		try {
			await signOut(auth)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Stack.Navigator
			initialRouteName='Home'
			screenOptions={{
				headerTitleAlign: 'center',
				headerRight: () => (
					<TouchableOpacity
						style={{ marginRight: 10 }}
						onPress={handleLogout}
					>
						<AntDesign
							name='logout'
							size={24}
							color={color.gray}
							style={{ marginRight: 10 }}
						/>
					</TouchableOpacity>
				),
			}}
		>
			<Stack.Screen
				name='Home'
				component={Home}
			/>
			<Stack.Screen
				name='Chat'
				component={Chat}
			/>
		</Stack.Navigator>
	)
}

const AuthStack = () => {
	return (
		<Stack.Navigator
			initialRouteName='Login'
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name='Login'
				component={Login}
			/>
			<Stack.Screen
				name='SignUp'
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
