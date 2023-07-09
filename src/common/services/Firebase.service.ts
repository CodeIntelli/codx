import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../../../pushNotification.json';
@Injectable()
export class FirebaseService {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as ServiceAccount)
        })
    }

    async send(pushNotificationData) {
        const { title, body, deviceToken } = pushNotificationData;
        const payload = {
            notification: {
                title, body
            }
        };
        Promise.all([await admin.messaging().sendToDevice(deviceToken, payload)])
    }

}