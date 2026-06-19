import { ToastNotificationRepository } from "@/infrastructure/notifications/toast/toast-notification.repository";
import { NotifyUseCase } from "@/application/notification/notification.use-case";

const toastNotificationRepository = new ToastNotificationRepository()

export const notifyUseCase = new NotifyUseCase(toastNotificationRepository)