'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Chat } from "./lib/definitions";
import { useEffect, useState } from "react";
import MessageService from "./services/MessageService";

export default function Home() {
  const [messages, setMessages] = useState<Chat[]>([]);

  useEffect(()=> {
    MessageService.joinRoom("ABC");

    const unsubscribe = MessageService.subscribeToMessages((nuevoMensaje) => {
        setMessages((prevMessages):any => [...prevMessages, nuevoMensaje]);
    });
}, [])

  const data: Chat[] = [
    {
      id: 1,
      name: "Alex",
      imageProfile: "https://cdn-icons-png.flaticon.com/512/145/145867.png",
      message: "¡Hola! ¿Cómo estás?",
      date: "2024-01-16T10:30:00"
    },
    {
      id: 2,
      name: "Sophia",
      imageProfile: "https://cdn-icons-png.flaticon.com/512/145/145859.png",
      message: "Hola Alex, estoy bien. ¿Y tú?",
      date: "2024-01-16T10:35:00"
    },
    {
      id: 3,
      name: "Carlos",
      imageProfile: "https://cdn-icons-png.flaticon.com/512/145/145848.png",
      message: "¡Hola chicos! ¿Alguien quiere salir esta noche?",
      date: "2024-01-16T11:00:00"
    },
    {
      id: 4,
      name: "Sophia",
      imageProfile: "https://cdn-icons-png.flaticon.com/512/145/145859.png",
      message: "Eso suena genial, Carlos. Contad conmigo.",
      date: "2024-01-16T11:05:00"
    },
    {
      id: 5,
      name: "Alex",
      imageProfile: "https://cdn-icons-png.flaticon.com/512/145/145867.png",
      message: "Yo también me apunto. ¿A dónde iremos?",
      date: "2024-01-16T11:10:00"
    },
    {
      id: 6,
      name: "Carlos",
      imageProfile: "https://cdn-icons-png.flaticon.com/512/145/145848.png",
      message: "Vamos a ese nuevo restaurante en el centro. ¿Os parece?, por mi a las 9 va genial",
      date: "2024-01-16T11:15:00"
    },
    {
      id: 7,
      name: "Sophia",
      imageProfile: "https://cdn-icons-png.flaticon.com/512/145/145859.png",
      message: "Perfecto. Nos vemos allí a las 19:00.",
      date: "2024-01-16T11:20:00"
    },
    {
      id: 8,
      name: "Alex",
      imageProfile: "https://cdn-icons-png.flaticon.com/512/145/145867.png",
      message: "¡Listo! Estaré allí.",
      date: "2024-01-16T11:25:00"
    },
    {
      id: 9,
      name: "Sophia",
      imageProfile: "https://cdn-icons-png.flaticon.com/512/145/145859.png",
      message: "Hasta luego, chicos.",
      date: "2024-01-16T11:30:00"
    },
    {
      id: 10,
      name: "Carlos",
      imageProfile: "https://cdn-icons-png.flaticon.com/512/145/145848.png",
      message: "Hasta luego. ¡Nos vemos!",
      date: "2024-01-16T11:35:00"
    }
  ];
  
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <div className={styles.header}>
          <a>
            <Image
              src='/user-default.png'
              alt="user-default"
              width={40}
              height={40}
            />
          </a>
          <div>
            <a>
              <Image
                src='/new-chat-icon.png'
                alt="new-chat-icon"
                width={27}
                height={27}
              />
            </a>
            <a>
              <Image
                src='/plus-icon.png'
                alt="plus-icon"
                width={27}
                height={27}
                className={styles.icons}
              />
            </a>
          </div>
        </div>
        <div className={styles.chats}>
          {data.map((chat)=> (
            <a className={styles.chatPreview}>
              <img
                src={chat.imageProfile}
                alt="image-profile"
                width={45}
                height={45}
              />
              <div>
                <h3>{chat.name}</h3>
                <p className={styles.messageText}>{chat.message}</p>
              </div>
            </a>
          ))
          }
        </div>
        <footer>
          <hr></hr>
          <h3>Obtener WhatsApp para Windows</h3>
        </footer>
      </div>
      <div className={styles.rigth}>
        <a className={styles.header}>
          {messages.map((message)=> (
              <p>{message.message}</p>
          ))}
          <Image
            src='/user-default.png'
            alt="user-default"
            width={40}
            height={40}
          />
          <div className={styles.userInfo}>
            <h3>Alex</h3>
            <p>Haz click aqui para ver mas informacion</p>
          </div>
        </a>
        <div className={styles.textInput}>
          <textarea></textarea>
          <h2>Hola</h2>
        </div>
      </div>
    </main>
  );
}
