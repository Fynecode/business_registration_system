import type { Notification } from "./notification.types";

export interface NotificationRepository{
    notify(notification: Notification): Promise<void>
}