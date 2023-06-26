package com.example.demoSecurity.apiTest.controller;

import com.example.demoSecurity.Config.ResourceConfigurations;
import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.model.ProductModel;
import com.example.demoSecurity.apiTest.services.IProductService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;


@RestController
@RequestMapping("/login2/")
public class ProductController {


    @Autowired
    IProductService iProductService;

    @PostMapping("insert-product")
    public ResponseObject insertProduct(@RequestPart("images") MultipartFile[] images,
                                        @RequestPart("data") ProductModel data){
        ResponseObject rs = new ResponseObject();
        try{
             rs = iProductService.insertProduct(images,data);
        }catch (Exception e){
            System.out.println(e);
        }
        return rs;
    }

    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable("filename") String filename) {
        return iProductService.getImage(filename);
    }
}
