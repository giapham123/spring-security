package com.example.demoSecurity.apiTest.controller;

import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.services.IDetailProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/view/")
public class DetailProductController {

    @Autowired
    IDetailProductService iDetailProductService;

    @GetMapping("detail-product/{productId}")
    public ResponseObject getDetailProduct(@PathVariable Integer productId){
        ResponseObject rs = new ResponseObject();
        return iDetailProductService.getDetailProduct(productId);
    }

    @GetMapping("relate-product")
    public ResponseObject getRelateProduct(){
        ResponseObject rs = new ResponseObject();
        return rs;
    }
}
