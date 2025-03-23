package com.inventory_management.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Collection;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.inventory_management.entity.User;

public class UserInforDetails implements UserDetails {

    private String username;
    private String password;
    private List<GrantedAuthority> authorities;

    public UserInforDetails(User userinfo){
        this.username = userinfo.getEmail();
        this.password = userinfo.getPassword();
        this.authorities = List.of(userinfo.getRole().split(","))
                                .stream()
                                .map(SimpleGrantedAuthority::new)
                                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return authorities;
    }


    @Override
    public String getUsername() {
        return username;
    }
    
    @Override
    public boolean isAccountNonExpired(){
        return true;
    }

    @Override
    public boolean isAccountNonLocked(){
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired(){
        return true;
    }

    @Override
    public boolean isEnabled(){
        return true;
    }

    @Override
    public String getPassword() {
        return password;
    }
}

