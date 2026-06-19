export type NotificationType =
    'SUCCESS' |
    'INFO' |
    'WARNING' |
    'ERROR'


export interface Notification {
    id: string,
    title: string,
    message: string,
    type: NotificationType,
    recipientId?: string,
    read: boolean,
    actionUrl?: string,
    createdAt?: Date
}