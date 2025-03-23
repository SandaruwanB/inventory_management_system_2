package com.inventory_management.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.inventory_management.repository.UserRepository;
import com.inventory_management.entity.User;

@Service
@Primary
public class UserInfoService implements UserDetailsService {
    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<User> userdetails = repository.findByEmail(username);

        return userdetails.map(UserInforDetails::new)
            .orElseThrow(()->new UsernameNotFoundException("User not found : " + username));
        
    }

    public String addUser(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        repository.save(user);
        return "User added successfully";
    }
}
