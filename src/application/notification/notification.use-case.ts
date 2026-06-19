import type { Notification } from "@/domain/notification/notification.types";
import type { NotificationRepository } from "@/domain/notification/notification.repository";

export class NotifyUseCase{
    constructor(private readonly repository: NotificationRepository)
    {

    }

    async execute(notification: Notification){
        return this.repository.notify(notification)
    }
}