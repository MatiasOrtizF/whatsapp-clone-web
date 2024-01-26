package com.whatsapp.server.controllers;

import com.whatsapp.server.dto.ChatDto;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatDto chat(@DestinationVariable String roomId, ChatDto message) {
        System.out.println(message);
        return new ChatDto(message.getMessage(), message.getUser());
    }
}
