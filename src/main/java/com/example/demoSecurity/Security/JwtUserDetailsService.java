package com.example.demoSecurity.Security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class JwtUserDetailsService  implements UserDetailsService {

    public static final String USER = "USER";
    public static final String ADMIN = "ADMIN";
    public static final String ROLE_USER = "ROLE_" + USER;
    public static final String ROLE_ADMIN = "ROLE_" + ADMIN;

    @Override
    public UserDetails loadUserByUsername(final String username) {
//        List<GrantedAuthority> listAuthorities = new ArrayList<GrantedAuthority>();
//        listAuthorities.add(new SimpleGrantedAuthority(ROLE_USER));
//        List<UserModel> lsUser = new ArrayList<>();
//        lsUser.add(new UserModel(1,"giapham", "$2a$12$LWqqZDHGA4okGGyYjsQq8O7OtimL7KPaWqYDoxDQzm3YbuQn9Otcm"));
//        lsUser.add(new UserModel(2,"giapham1", "$2a$12$LWqqZDHGA4okGGyYjsQq8O7OtimL7KPaWqYDoxDQzm3YbuQn9Otcm"));
        if(username.equals("giapham")){
            return new JwtUserDetails(1,"JN", "giapham","$2a$12$LWqqZDHGA4okGGyYjsQq8O7OtimL7KPaWqYDoxDQzm3YbuQn9Otcm", Collections.singletonList(new SimpleGrantedAuthority(ROLE_USER)));
        }
        return new JwtUserDetails(2, "SE","giapham1","$2a$12$LWqqZDHGA4okGGyYjsQq8O7OtimL7KPaWqYDoxDQzm3YbuQn9Otcm", Collections.singletonList(new SimpleGrantedAuthority(ROLE_ADMIN)));
    }

}