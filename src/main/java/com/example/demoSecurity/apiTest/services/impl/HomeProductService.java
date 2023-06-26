
package com.example.demoSecurity.apiTest.services.impl;

import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.mappers.HomeProductMapper;
import com.example.demoSecurity.apiTest.services.IHomeProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeProductService implements IHomeProductService {

    @Autowired
    HomeProductMapper productMapper;

    @Override
    public ResponseObject getNewestProduct() {
        ResponseObject rs = new ResponseObject();
        rs.setData(productMapper.getNewestProduct());
        rs.setMessage("Get Data Success");
        rs.setSuccess(true);
        return rs;
    }

    @Override
    public ResponseObject getAllCategory() {
        ResponseObject rs = new ResponseObject();
        rs.setData(productMapper.getAllCategory());
        rs.setMessage("Get Data Success");
        rs.setSuccess(true);
        return rs;
    }
}
