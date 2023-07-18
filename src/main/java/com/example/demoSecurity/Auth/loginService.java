package com.example.demoSecurity.Auth;

import com.example.demoSecurity.Auth.mappers.LoginMapper;
import com.example.demoSecurity.Security.AuthenticationRequest;
import com.example.demoSecurity.Security.AuthenticationResponse;
import com.example.demoSecurity.Security.JwtTokenService;
import com.example.demoSecurity.Security.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

@Service
public class loginService {

    @Autowired
    LoginMapper loginMapper;

    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    JwtTokenService jwtTokenService;

    @Autowired
    AuthenticationManager authenticationManager;


    public loginModel getUserLogin(String email){
        return loginMapper.getUserLogin(email);
    }

    public ResponseEntity<String> authenticate(final AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getLogin(), authenticationRequest.getPassword()));
        } catch (final BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getLogin());
        final AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setAccessToken(jwtTokenService.generateToken(userDetails));
        return  new ResponseEntity<>(authenticationResponse.getAccessToken(),
                HttpStatus.OK);
    }

}
