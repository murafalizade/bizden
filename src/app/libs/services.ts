import api from "@/shared/libs/service";
import {IFeedbackPayload} from "@/app/libs/models";

export const sendFeedback = async (message: IFeedbackPayload) => {
    await api.post('/feedback', message);
}
