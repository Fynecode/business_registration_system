import type { NotificationRepository } from "@/domain/notification/notification.repository";
import toast from "./toast.service";
import { type Notification } from "@/domain/notification/notification.types";

export class ToastNotificationRepository implements NotificationRepository {

    async notify(notification: Notification): Promise<void> {
        switch(notification.type){
            case 'SUCCESS':
                toast.success(notification.message)
                break

            case 'ERROR':
                toast.error(notification.message)
                break

            case 'WARNING':
                toast.warning(notification.message)
                break

            case 'INFO':
                toast.info(notification.message)
                break
        }
    }
}