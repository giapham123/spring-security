package com.example.demoSecurity.apiTest.services;

import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.model.ProductModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IProductService {

    ResponseObject insertProduct(MultipartFile[] images,ProductModel productModel) ;

    ResponseEntity<byte[]> getImage(String fileNm);

    ResponseObject deleteProduct(Integer productId) ;

    ResponseObject publishProduct(Integer productId) ;

}
