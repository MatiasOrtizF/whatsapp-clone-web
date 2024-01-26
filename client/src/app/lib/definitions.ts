export type User = {
    id: number,
    name: string,
    lastName: string,
    number: number
}

export type Chat = {
    id: number,
    name: string,
    userSender: User,
    userReceiver: User,
    imageProfile: string, 
    message: string,
    date: string // change this
}