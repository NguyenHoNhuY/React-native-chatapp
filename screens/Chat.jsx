import { GiftedChat } from 'react-native-gifted-chat'

import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useCallback, useLayoutEffect, useState } from 'react'
import { auth, database } from '../config/firebase'

const Chat = () => {
	const [messages, setMessages] = useState([])

	useLayoutEffect(() => {
		const collectionRef = collection(database, '/chats')
		const q = query(collectionRef, orderBy('createdAt', 'desc'))

		const unSubscribe = onSnapshot(q, (snapshot) => {
			setMessages(
				snapshot.docs.map((doc) => ({
					_id: doc.data()._id,
					createdAt: doc.data().createdAt.toDate(),
					text: doc.data().text,
					user: doc.data().user,
				})),
			)
		})

		return () => unSubscribe
	}, [])

	const onSend = useCallback((message = []) => {
		console.log(message)
		setMessages((preMessage) => GiftedChat.append(preMessage, message))

		const { _id, createdAt, text, user } = message[0]

		console.log(message[0])
		addDoc(collection(database, 'chats'), { _id, createdAt, text, user })
	}, [])

	return (
		<GiftedChat
			messages={messages}
			onSend={(message) => onSend(message)}
			user={{
				_id: auth?.currentUser?.email,
			}}
		/>
	)
}

export default Chat
