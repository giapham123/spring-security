package com.example.demoSecurity.apiTest.controller;

import com.example.demoSecurity.Config.ResourceConfigurations;
import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.model.ProductModel;
import com.example.demoSecurity.apiTest.services.IProductService;
import com.google.gson.Gson;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;



@RestController
@RequestMapping("/admin/")
public class ProductController {


    @Autowired
    IProductService iProductService;

    @PostMapping("insert-product")
    public ResponseObject insertProduct(@RequestParam("data") String data, @RequestParam("images") MultipartFile[] images){
        ResponseObject rs = new ResponseObject();
        try{
            Gson g = new Gson();
            ProductModel s = g.fromJson(data, ProductModel.class);
            rs = iProductService.insertProduct(images,s);
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
