import { Entypo, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { color } from '../constants/colors'

const Home = () => {
	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<FontAwesome
					name='search'
					size={24}
					color={color.gray}
					style={{ marginLeft: 15 }}
				/>
			),
			// headerRight: () => (
			//     <Image
			//         source={HomeBackground}
			//         style={{
			//             width: 40,
			//             height: 40,
			//             marginRight: 15,
			//         }}
			//     />
			// ),
		})
	}, [navigation])

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate('chat')}
				style={styles.chatButton}
			>
				<Entypo
					name='chat'
					size={24}
					color={color.lightGray}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		backgroundColor: '#fff',
	},
	chatButton: {
		backgroundColor: color.primary,
		height: 50,
		width: 50,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: color.primary,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.9,
		shadowRadius: 8,
		marginRight: 20,
		marginBottom: 50,
	},
})
