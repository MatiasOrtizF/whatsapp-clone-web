import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Chat } from "../lib/definitions";

class ChatService {

    private stompClient: any
    private messageCallbacks: ((message: Chat) => void)[] = [];

    constructor() {
        this.stompClient = null;
    }

    initConnectionSocket(): Promise<void> {
        const url = "//192.168.0.16:8080/chat-socket"; //change this url
        const socket = new SockJS(url);
        this.stompClient = Stomp.over(socket)
    
        return new Promise((resolve, reject) => {
          this.stompClient.connect({}, () => {
            console.log('Stomp client initialized:', this.stompClient);
            resolve();
          }, (error: any) => {
            console.error('Error during connection:', error);
            reject(error);
          });
        });
      }
      async joinRoom(roomId: string) {
        try {
          await this.initConnectionSocket();
          this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
            try {
              const messageContent = JSON.parse(messages.body);
                 // Llamar a los callbacks registrados cuando llega un nuevo mensaje
              this.messageCallbacks.forEach((callback) => {
                callback(messageContent);
              });
            } catch (error) {
              console.error('Error parsing message body:', error);
            }
          });
        } catch (error) {
          console.error('Failed to initialize Stomp client:', error);
        }
      }
    
      subscribeToMessages(callback: (message: Chat) => void): ()=> void {
        // Registra el callback para ser llamado cuando llegue un nuevo mensaje
        this.messageCallbacks.push(callback);
         // Retorna una función que puede ser llamada para deshacer la suscripción
          return () => {
          // Elimina el callback de la lista cuando se deshace la suscripción
          const index = this.messageCallbacks.indexOf(callback);
          if (index !== -1) {
              this.messageCallbacks.splice(index, 1);
          }
      };
      }

    sendMessages(roomId: string, chatMessage: Chat) {
        this.stompClient.send(`/app/chat/${roomId}/send`, {}, JSON.stringify(chatMessage))
    }
} 

export default new ChatService();