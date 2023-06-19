import { type User, addUserToDB, getUsersFromDB } from '../../repo/users'

const users: Array<Omit<User, 'id'>> = [
  { username: 'luis', first_name: 'luis', last_name: 'marques', email: 'luis.marques@gmail.com', password: 'df1a&s*SDdfs9da', phone: '+351932824893' },
  { username: 'pedro', first_name: 'pedro', last_name: 'santos', email: 'pedro.santos@gmail.com', password: 'df1a&s*SDdfs9da', phone: '+351966824893' },
  { username: 'joao', first_name: 'joao', last_name: 'ramos', email: 'joao.ramos@gmail.com', password: 'df1a&s*SDdfs9da', phone: '+351966827893' }
]

const seedUsers = async () => {
  const existingUsers = await getUsersFromDB()
  if (existingUsers!.length) return
  await addUserToDB(users[0])
  await addUserToDB(users[1])
  await addUserToDB(users[2])
}

export default seedUsers
