export interface Client {
    id: string,
    email: string,
    firstname: string,
    lastname: string,
    phone: string,

    businessIds: string[],
    createdAt: Date,
    updatedAt: Date
}