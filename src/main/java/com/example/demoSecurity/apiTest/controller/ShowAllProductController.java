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

    @GetMapping("show-data-category/{category}/{page}/{edit}")
    public ResponseObject showAllProductViaCategory(@PathVariable("category") String category,@PathVariable("page") Integer page,@PathVariable("edit") Integer edit){
        return iShowAllProductService.showAllProductViaCategory(category,page, edit);
    }

    @GetMapping("show-data-user/{userId}/{edit}")
    public ResponseObject showAllProductViaUser(@PathVariable("userId") String userId,@PathVariable("edit") Integer edit){
        return iShowAllProductService.showAllProductViaUser(userId, edit);
    }

    @GetMapping("show-data-user/{userId}/{page}/{edit}")
    public ResponseObject showAllProductViaUserPage(@PathVariable("userId") String  userId,@PathVariable("page") Integer page,@PathVariable("edit") Integer edit){
        return iShowAllProductService.showAllProductViaUserPage(userId,page,edit);
    }
    @GetMapping("total-data")
    public ResponseObject getTotalData(@RequestParam("cateCd") String cateCd, @RequestParam("userId") Integer userId,@RequestParam("edit") Integer edit){
        return iShowAllProductService.getTotalData(cateCd,userId,edit);
    }

}
