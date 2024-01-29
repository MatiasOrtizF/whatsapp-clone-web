package com.whatsapp.server.controllers;

import com.whatsapp.server.dto.ChatDto;
import com.whatsapp.server.models.Chat;
import com.whatsapp.server.repositories.ChatRepository;
import com.whatsapp.server.services.ChatService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class WebSocketController {

    private final ChatService chatService;
    private final ChatRepository chatRepository;

    public WebSocketController(ChatService chatService,
                               ChatRepository chatRepository) {
        this.chatService = chatService;
        this.chatRepository = chatRepository;
    }

    @MessageMapping("/chat/{roomId}/send")
    @SendTo("/topic/{roomId}")
    public ChatDto sendMessage(@DestinationVariable String roomId, ChatDto message) {
        Chat chat = new Chat();
        chat.setMessage(message.getMessage());
        chat.setUserSender(message.getUser());
        chat.setRoomId(roomId);
        chatService.saveMessage(chat);

        /*List<Chat> history = chatService.getChatHistoryByRoomId(roomId);

        List<ChatDto> historyDto = history.stream()
                .map(chatItem -> new ChatDto(chatItem.getMessage(), chatItem.getUserSender()))
                .collect(Collectors.toList());

        return historyDto;*/
        return new ChatDto(message.getMessage(), message.getUser());
    }

    @MessageMapping("/chat/{roomId}/history")
    public List<ChatDto> getHistory(@DestinationVariable String roomId) {
        List<Chat> history = chatService.getChatHistoryByRoomId(roomId);

        List<ChatDto> historyDto = history.stream()
                .map(chatItem-> new ChatDto(chatItem.getMessage(), chatItem.getUserSender()))
                .collect(Collectors.toList());

        return historyDto;
    }
}
