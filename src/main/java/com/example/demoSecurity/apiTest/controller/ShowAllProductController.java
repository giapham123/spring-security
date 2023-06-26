package com.example.demoSecurity.apiTest.controller;

import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.model.ProductModel;
import com.example.demoSecurity.apiTest.services.IShowAllProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/view/")
public class ShowAllProductController {

    @Autowired
    IShowAllProductService iShowAllProductService;

    @GetMapping("show-data-category/{category}/{page}")
    public ResponseObject showAllProductViaCategory(@PathVariable("category") String category,@PathVariable("page") Integer page){
        return iShowAllProductService.showAllProductViaCategory(category,page);
    }

    @GetMapping("show-data-user/{userId}")
    public ResponseObject showAllProductViaUser(@PathVariable("userId") Integer userId){
        return iShowAllProductService.showAllProductViaUser(userId);
    }


}
