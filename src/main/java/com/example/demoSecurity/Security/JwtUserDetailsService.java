package com.example.demoSecurity.Security;

import ch.qos.logback.core.net.server.Client;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService  implements UserDetailsService {

    public static final String USER = "USER";
    public static final String ROLE_USER = "ROLE_" + USER;

    @Override
    public UserDetails loadUserByUsername(final String username) {
        List<GrantedAuthority> listAuthorities = new ArrayList<GrantedAuthority>();
        listAuthorities.add(new SimpleGrantedAuthority(ROLE_USER));
        return new JwtUserDetails(1, "giapham","$2a$12$LWqqZDHGA4okGGyYjsQq8O7OtimL7KPaWqYDoxDQzm3YbuQn9Otcm",listAuthorities);
    }

}