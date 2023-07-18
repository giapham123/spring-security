package com.example.demoSecurity.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    JwtTokenService jwtTokenService;

    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
                                    final FilterChain chain) throws ServletException, IOException {
        // look for Bearer auth header
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        final String token = header.substring(7);
        final String username = jwtTokenService.validateTokenAndGetUsername(token);
        if (username == null) {
            // validation failed or token expired
            chain.doFilter(request, response);
            return;
        }
        // set user details on spring security context
        List<GrantedAuthority> listAuthorities = new ArrayList<GrantedAuthority>();
        listAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
//        final JwtUserDetails userDetails ;
        UserDetails userDetails  = jwtUserDetailsService.loadUserByUsername(username);
//        if(username.equals("giapham")){
//            userDetails = new JwtUserDetails(1,"JN", "giapham","$2a$12$pUb7IttKsTF0NcJfeEm6Ke5yXQyKeC5LrGQ.ovxbUYATiulCRPOgq", Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
//        }else{
//            userDetails = new JwtUserDetails(2, "SE","giapham1","$2a$12$LWqqZDHGA4okGGyYjsQq8O7OtimL7KPaWqYDoxDQzm3YbuQn9Otcm", Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
//        }
        //Store the details of who is authenticated with "UsernamePasswordAuthenticationToken"
        final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // continue with authenticated user
        chain.doFilter(request, response);
    }

}