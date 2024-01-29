package com.whatsapp.server.services;

import com.whatsapp.server.models.Chat;
import com.whatsapp.server.repositories.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    private final ChatRepository chatRepository;

    @Autowired
    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public Chat saveMessage(Chat chat) {
        return chatRepository.save(chat);
    }

    public List<Chat> getChatHistoryByRoomId(String roomId) {
        return chatRepository.findByRoomId(roomId);
    }
}
