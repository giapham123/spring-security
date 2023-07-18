package com.example.demoSecurity.Auth;

import com.example.demoSecurity.Security.AuthenticationRequest;
import com.example.demoSecurity.Security.AuthenticationResponse;
import com.example.demoSecurity.Security.JwtTokenService;
import com.example.demoSecurity.Security.JwtUserDetailsService;
import com.example.demoSecurity.Shared.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class loginController {

    @Autowired
    loginService loginService;

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody final AuthenticationRequest authenticationRequest) {
        return loginService.authenticate(authenticationRequest);
    }

    @GetMapping("/user-detail")
    public ResponseObject authenticate(@RequestParam("email") String email) {
        ResponseObject rsUsr = new ResponseObject();
        rsUsr.setData(loginService.getUserLogin(email));
        rsUsr.setSuccess(true);
        rsUsr.setMessage("Get usr details success");
        return rsUsr;
    }
}
