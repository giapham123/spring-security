package com.example.demoSecurity.Auth;

import com.example.demoSecurity.Auth.mappers.LoginMapper;
import com.example.demoSecurity.Security.AuthenticationRequest;
import com.example.demoSecurity.Security.AuthenticationResponse;
import com.example.demoSecurity.Security.JwtTokenService;
import com.example.demoSecurity.Security.JwtUserDetailsService;
import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.model.ProductModel;
import com.example.demoSecurity.apiTest.model.ShopModel;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

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

    public ResponseObject insertDataUserShop(MultipartFile[] images, ShopModel shopModel){
        ResponseObject rs = new ResponseObject();
            try {
                int existAccount = loginMapper.checkAccountExist(shopModel.getEmail());
                if(existAccount != 0){
                    rs.setData(null);
                    rs.setSuccess(false);
                    rs.setMessage("Tài khoản đã tồn tại.");
                }else {
                    String name = images[0].getOriginalFilename();
                    String randomID = UUID.randomUUID().toString();
                    String fileName = randomID.concat(name.substring(name.lastIndexOf(".")));
                    shopModel.setImg(fileName);
                    //Save image to folder source
                    String uploadDir = "./product-photos/";
                    byte[] bytes = images[0].getBytes();
                    Path path = Paths.get(uploadDir + fileName);
                    Files.write(path, bytes);
                    //End Save image to folder source
                    loginMapper.insertUserShop(shopModel);
                    rs.setData(null);
                    rs.setSuccess(true);
                    rs.setMessage("Vui lòng kích hoạt tài khoản trong email của bạn.");
                }
            } catch (Exception e) {
                if (e instanceof FileAlreadyExistsException) {
                    throw new RuntimeException("A file of that name already exists.");
                }
                System.out.println(e);
                throw new RuntimeException(e.getMessage());
            }

        return rs;
    }

    public Boolean activeUser(String uuid){
        loginMapper.activeUser(uuid);
        return true;
    }
}
