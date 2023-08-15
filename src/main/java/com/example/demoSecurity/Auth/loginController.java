package com.example.demoSecurity.Auth;

import com.example.demoSecurity.Security.AuthenticationRequest;
import com.example.demoSecurity.Security.AuthenticationResponse;
import com.example.demoSecurity.Security.JwtTokenService;
import com.example.demoSecurity.Security.JwtUserDetailsService;
import com.example.demoSecurity.SendMail.EmailService;
import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.model.ProductModel;
import com.example.demoSecurity.apiTest.model.ShopModel;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class loginController {

    @Autowired
    loginService loginService;

    @Autowired
    EmailService emailService;


//    @RequestMapping({"/post-page","/details/{id}","/personal/{userId}",
//            "/personal-page/{userId}","/all-product/{id}"})
//    public String index(){
//        return "index";
//    }

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

    @PostMapping("/save-user-info")
    public ResponseObject authenticate(@RequestParam("data") String data, @RequestParam("images") MultipartFile[] images) {
        ResponseObject rsUsr = new ResponseObject();
        try{
            Gson g = new Gson();
            ShopModel s = g.fromJson(data, ShopModel.class);
            String ursUuid = emailService.confirmEmail(s.getEmail());
            s.setUsrUuid(ursUuid);
            rsUsr = loginService.insertDataUserShop(images,s);
        }catch (Exception e){
            System.out.println(e);
        }
        return rsUsr;
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<String> confirm(@RequestParam("token")String confirmationToken) {
        loginService.activeUser(confirmationToken);
        return ResponseEntity.ok("Tài Khoản Đã Được Kích Hoạt, Vui Lòng Đăng Nhập Lại!");
    }
}
