import {RegisterPayload} from "@app/(authless)/register/libs/models";
import api from "@shared/libs/service";

export const postRegister = async (request: RegisterPayload): Promise<string> => {
    const {data} =  await api.post(`/register`, request);
    return data;
}
