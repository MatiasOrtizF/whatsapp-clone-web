package com.whatsapp.server.controllers;

import com.whatsapp.server.dto.ChatDto;
import com.whatsapp.server.models.Chat;
import com.whatsapp.server.repositories.ChatRepository;
import com.whatsapp.server.services.ChatService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    private final ChatService chatService;
    private final ChatRepository chatRepository;

    public WebSocketController(ChatService chatService,
                               ChatRepository chatRepository) {
        this.chatService = chatService;
        this.chatRepository = chatRepository;
    }

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatDto chat(@DestinationVariable String roomId, ChatDto message) {
        System.out.println(message);

        Chat chat = new Chat();
        chat.setMessage(message.getMessage());
        chat.setUserSender(message.getUser());

        chatService.saveMessage(chat);

        return new ChatDto(message.getMessage(), message.getUser());
    }
}
