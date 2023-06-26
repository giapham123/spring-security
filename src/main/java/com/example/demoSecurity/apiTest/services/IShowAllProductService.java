package com.example.demoSecurity.apiTest.services;

import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.model.ProductModel;
import org.springframework.web.multipart.MultipartFile;

public interface IShowAllProductService {

    ResponseObject showAllProductViaCategory(String cate, Integer page) ;

    ResponseObject showAllProductViaUser(Integer userId) ;

}
