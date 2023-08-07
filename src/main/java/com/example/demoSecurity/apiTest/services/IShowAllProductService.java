package com.example.demoSecurity.apiTest.services;

import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.model.ProductModel;
import org.springframework.web.multipart.MultipartFile;

public interface IShowAllProductService {

    ResponseObject showAllProductViaCategory(String cate, Integer page, Integer edit) ;

    ResponseObject showAllProductViaUser(String userId, Integer edit) ;

    ResponseObject showAllProductViaUserPage(String userId, Integer page, Integer edit) ;

    ResponseObject getTotalData(String cateCd,Integer userId, Integer edit);

}
