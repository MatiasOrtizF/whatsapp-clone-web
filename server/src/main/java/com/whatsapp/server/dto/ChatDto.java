package com.whatsapp.server.dto;

import com.whatsapp.server.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatDto {
    String message;
    User user;
}
