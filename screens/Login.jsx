import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import LoginBackground from '../assets/login.png'
import { auth } from '../config/firebase'

const Login = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLoginApp = async () => {
		if (email !== '' && password !== '') {
			try {
				const response = await signInWithEmailAndPassword(auth, email, password)
				response ?? console.log(response)
			} catch (error) {
				console.log(error)
			}
		}
	}
	return (
		<View style={styles.container}>
			<Image
				style={styles.loginBackground}
				source={LoginBackground}
			/>
			<View style={styles.whiteSheet} />
			<View style={styles.form}>
				<Text style={styles.title}>Login</Text>
				<TextInput
					style={styles.input}
					placeholder='Enter email'
					autoCapitalize='none'
					keyboardType='email-address'
					textContentType='emailAddress'
					autoFocus={true}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextInput
					style={styles.input}
					placeholder='Enter password'
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={true}
					textContentType='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={handleLoginApp}
				>
					<Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
						Log In
					</Text>
				</TouchableOpacity>
				<View
					style={{
						marginTop: 20,
						flexDirection: 'row',
						alignItems: 'center',
						alignSelf: 'center',
					}}
				>
					<Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>
						Don't have an account?{' '}
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate('signUp')}>
						<Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default Login
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: 'orange',
		alignSelf: 'center',
		paddingBottom: 24,
	},
	input: {
		backgroundColor: '#F6F7FB',
		height: 58,
		marginBottom: 20,
		fontSize: 16,
		borderRadius: 10,
		padding: 12,
	},
	loginBackground: {
		width: '100%',
		height: 340,
		position: 'absolute',
		top: 0,
		resizeMode: 'cover',
	},
	whiteSheet: {
		width: '100%',
		height: '75%',
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#fff',
		borderTopLeftRadius: 60,
		borderTopRightRadius: 60,
	},
	form: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 30,
	},
	button: {
		backgroundColor: '#f57c00',
		height: 58,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
})
