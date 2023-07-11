package com.example.demoSecurity.apiTest.controller;

import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.model.TestApiModel;
import com.example.demoSecurity.apiTest.mappers.TestApiMapper;
import com.example.demoSecurity.apiTest.services.ITestApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login2/")
public class TestApiController {


    @Autowired
    ITestApiService iTestApiService;


    @GetMapping("/aaa")
    public ResponseEntity<?> login8(@RequestParam("email") String email) {
        ResponseObject bizResponse = new ResponseObject();
        String aa = iTestApiService.getdata(email);
        bizResponse.setData(aa);
        return ResponseEntity.ok(bizResponse);
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<?> confirm(@RequestParam("token")String confirmationToken) {
        ResponseObject bizResponse = new ResponseObject();
        bizResponse.setData("accountVerified");
        return ResponseEntity.ok(bizResponse);
    }

    @GetMapping("/login/aaa")
    public ResponseEntity<?> login() {
        ResponseObject bizResponse = new ResponseObject();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        bizResponse.setData(((UserDetails)principal).getUsername());
        return ResponseEntity.ok(bizResponse);
    }

    @GetMapping("/login/aaa1")
    public ResponseEntity<?> login1() {
        ResponseObject bizResponse = new ResponseObject();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        bizResponse.setData(((UserDetails)principal).getUsername());
        return ResponseEntity.ok(bizResponse);
    }

}
