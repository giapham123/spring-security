package com.example.demoSecurity.apiTest.services.impl;

import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.mappers.DetailProductMapper;
import com.example.demoSecurity.apiTest.model.ProductModel;
import com.example.demoSecurity.apiTest.services.IDetailProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailProductService implements IDetailProductService {

    @Autowired
    DetailProductMapper productMapper;

    @Override
    public ResponseObject getDetailProduct(Integer productId) {
        ResponseObject rs = new ResponseObject();
        ProductModel resultDetails = productMapper.getDetailProduct(productId);
        List<String> rsImages = productMapper.getLsImages(productId);
        resultDetails.setImages(rsImages);
        rs.setData(resultDetails);
        rs.setMessage("Get Data Success");
        rs.setSuccess(true);
        return rs;
    }
}
